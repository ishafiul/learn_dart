# Build: benchmark with `Stopwatch`

## Goal

Measure main-isolate vs worker-isolate time for the same job and interpret results.

## Step 1 - Timing helper + JSON compare

```dart
import 'dart:async';
import 'dart:convert';
import 'dart:isolate';

Future<Duration> timeAsync(Future<void> Function() body) async {
  final sw = Stopwatch()..start();
  await body();
  sw.stop();
  return sw.elapsed;
}

String buildPayload(int rows) {
  final list = <Map<String, dynamic>>[];
  for (var i = 0; i < rows; i++) {
    list.add({'id': i});
  }
  return jsonEncode(list);
}

int parseAndWalk(String raw) {
  final decoded = jsonDecode(raw);
  if (decoded is! List<dynamic>) return 0;
  var sum = 0;
  for (final row in decoded) {
    if (row is Map<String, dynamic>) {
      final id = row['id'];
      if (id is int) sum += id;
    }
  }
  return sum;
}

Future<void> main() async {
  final raw = buildPayload(60000);
  final mainTime = await timeAsync(() async {
    parseAndWalk(raw);
  });
  final isoTime = await timeAsync(() async {
    await Isolate.run(() => parseAndWalk(raw));
  });
  print('main: $mainTime');
  print('isolate: $isoTime');
}
```

## Step 2 - Reading numbers

- Wall time includes isolate startup and copying. Very small jobs often look slower on a worker.
- Run release mode (`dart run --release` when applicable) for steadier timings.

## Practice tasks

- Warm up each path once before timing to reduce JIT effects, then average three runs.
- Log payload byte length next to timings to relate copy cost to total time.
- Try doubling rows until the isolate version clearly wins on your machine.
