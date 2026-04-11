# Stream vs Future

## Goal

Use a `Future` for one eventual value and a `Stream` for zero or many values over time.

## Step 1 - One value

```dart
Future<int> once() async => 1;

Future<void> main() async {
  print(await once());
}
```

## Step 2 - Many values

```dart
Stream<int> countTo(int n) async* {
  for (var i = 1; i <= n; i++) {
    yield i;
  }
}

Future<void> main() async {
  await for (final v in countTo(3)) {
    print(v);
  }
}
```

## Step 3 - Mental model

- `Future<T>` completes once with `T` or an error.
- `Stream<T>` emits `T` events, then may close, or may signal an error.

## Good habit

- If callers need partial results or cancellations, lean toward `Stream` or pass a callback; if there is exactly one outcome, prefer `Future`.

## Practice tasks

- Rewrite `countTo` using `Stream.periodic` and `take` instead of `async*`.
- Name one browser or CLI event that is naturally a stream (keyboard, ticks, socket chunks).
