# `Future.wait`, timeouts, and simple retries

## Goal

Run futures in parallel, fail fast with time limits, and retry flaky work.

## Step 1 - `Future.wait`

```dart
Future<int> slow(int n) async {
  await Future.delayed(Duration(milliseconds: n * 50));
  return n;
}

Future<void> main() async {
  final results = await Future.wait([slow(1), slow(2), slow(3)]);
  print(results);
}
```

- Order of `results` matches the input list, not completion order.

## Step 2 - `timeout`

```dart
import 'dart:async';

Future<void> main() async {
  try {
    await Future.delayed(const Duration(seconds: 5))
        .timeout(const Duration(milliseconds: 200));
  } on TimeoutException catch (e) {
    print(e.message);
  }
}
```

## Step 3 - Retry loop

```dart
Future<int> flaky() async {
  await Future.delayed(const Duration(milliseconds: 20));
  throw Exception('temporary');
}

Future<T> retry<T>(
  Future<T> Function() run, {
  int attempts = 3,
  Duration pause = const Duration(milliseconds: 50),
}) async {
  Object? last;
  for (var i = 0; i < attempts; i++) {
    try {
      return await run();
    } catch (e) {
      last = e;
      if (i < attempts - 1) {
        await Future.delayed(pause);
      }
    }
  }
  if (last != null) {
    throw last;
  }
  throw StateError('retry exhausted');
}

Future<void> main() async {
  try {
    await retry(flaky, attempts: 2);
  } catch (e) {
    print('gave up: $e');
  }
}
```

- The build guide replaces fixed `pause` with exponential backoff.

## Practice tasks

- Use `Future.wait` with `eagerError: true` vs default and compare behavior when one future throws.
- Wrap `retry` with `timeout` on the whole operation.
