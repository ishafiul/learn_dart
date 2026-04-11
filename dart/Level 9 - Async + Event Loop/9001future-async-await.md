# `Future`, `async`, and `await`

## Goal

Chain asynchronous work without callback pyramids.

## Step 1 - `Future` value

```dart
Future<int> delayedOne() {
  return Future.delayed(const Duration(milliseconds: 100), () => 1);
}

Future<void> main() async {
  final n = await delayedOne();
  print(n);
}
```

- `await` pauses the current `async` function until the future completes; it does not block other tasks on the isolate.

## Step 2 - `async` function

```dart
Future<String> fetchLabel() async {
  await Future.delayed(const Duration(milliseconds: 50));
  return 'ready';
}

Future<void> main() async {
  print(await fetchLabel());
}
```

## Step 3 - Errors propagate

```dart
Future<void> boom() async {
  await Future.delayed(const Duration(milliseconds: 10));
  throw StateError('no');
}

Future<void> main() async {
  try {
    await boom();
  } catch (e) {
    print(e);
  }
}
```

## Good habit

- Return `Future<void>` from `main` when using top-level `await` (Dart allows async `main`).

## Practice tasks

- Write `Future<int> sumAfterDelays()` that awaits two `Future.value` delays and returns the sum of two ints.
- Call an `async` function without `await` and observe that `main` can finish before it runs; fix by awaiting or returning the future from `main`.
