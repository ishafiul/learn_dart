# Build: heavy JSON-style work on an isolate

## Goal

Simulate expensive parsing or tree walking off the main isolate.

## Step 1 - Payload + worker + `main`

```dart
import 'dart:convert';
import 'dart:isolate';

String buildPayload(int rows) {
  final list = <Map<String, dynamic>>[];
  for (var i = 0; i < rows; i++) {
    list.add({'id': i, 'name': 'item-$i', 'flags': [i % 3, i % 5]});
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
  final raw = buildPayload(80000);
  final sum = await Isolate.run(() => parseAndWalk(raw));
  print(sum);
}
```

## Step 2 - Tune size

- If work finishes too fast, raise `rows`. If allocations dominate, lower `rows` and add a deliberate CPU loop inside `parseAndWalk` for simulation only.

## Practice tasks

- Time `parseAndWalk(raw)` on the main isolate vs `Isolate.run` with `Stopwatch` and print both durations.
- Return a record `({int sum, int count})` from the worker instead of a single `int`.
- Estimate copy cost vs compute time by trying several `rows` values.
