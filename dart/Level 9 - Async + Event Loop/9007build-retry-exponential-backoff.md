# Build: retry with exponential backoff

## Goal

Retry a flaky `Future` with increasing delays and an optional cap.

## Step 1 - Backoff delay

```dart
import 'dart:async';
import 'dart:math';

Duration backoffDelay(int attempt, {Duration base = const Duration(milliseconds: 100), Duration max = const Duration(seconds: 2)}) {
  final exp = min(attempt, 10);
  final ms = (base.inMilliseconds * pow(2, exp)).round();
  final capped = min(ms, max.inMilliseconds);
  return Duration(milliseconds: capped);
}
```

## Step 2 - Retry helper

```dart
Future<T> retryWithBackoff<T>(
  Future<T> Function() run, {
  int maxAttempts = 4,
  bool Function(Object error)? retryIf,
}) async {
  Object? last;
  for (var attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await run();
    } catch (e) {
      last = e;
      final allow = retryIf?.call(e) ?? true;
      if (!allow || attempt == maxAttempts - 1) {
        break;
      }
      await Future.delayed(backoffDelay(attempt));
    }
  }
  throw last ?? StateError('retry failed');
}
```

## Step 3 - Flaky fake call

```dart
int calls = 0;

Future<String> flakyFetch() async {
  calls++;
  await Future.delayed(const Duration(milliseconds: 30));
  if (calls < 3) {
    throw Exception('temporary');
  }
  return 'ok';
}

Future<void> main() async {
  calls = 0;
  final v = await retryWithBackoff(flakyFetch);
  print(v);
}
```

## Practice tasks

- Add jitter: multiply delay by `0.5 + Random().nextDouble()`.
- Stop retrying on `FormatException` but keep retrying on `TimeoutException`.
- Log each attempt with `Stopwatch` elapsed time.
