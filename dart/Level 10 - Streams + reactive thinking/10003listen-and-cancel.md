# `listen` and `cancel`

## Goal

Attach to a stream, handle events and errors, and release resources with `cancel`.

## Step 1 - `listen` basics

```dart
import 'dart:async';

void main() {
  final sub = Stream.periodic(const Duration(milliseconds: 50), (i) => i).listen(
    (v) => print(v),
    onError: (e, st) => print(e),
    onDone: () => print('done'),
  );

  Future.delayed(const Duration(milliseconds: 200), () {
    sub.cancel();
  });
}
```

## Step 2 - Pause and resume

```dart
import 'dart:async';

void main() {
  final sub = Stream<int>.periodic(const Duration(milliseconds: 30), (i) => i).listen(print);
  sub.pause();
  Future.delayed(const Duration(milliseconds: 100), sub.resume);
  Future.delayed(const Duration(milliseconds: 250), sub.cancel);
}
```

## Step 3 - `await for` vs `listen`

- `await for` pulls events inside an `async` function until the stream completes or you `break`.
- `listen` is callback-based and returns a `StreamSubscription` you cancel explicitly.

## Good habit

- Cancel subscriptions tied to UI lifecycles or request scopes to avoid leaks and late events.

## Practice tasks

- Use `listen` with `cancelOnError: true` and throw from inside the stream; confirm `onDone` behavior.
- Store subscriptions in a `List<StreamSubscription>` and cancel all in one `dispose`-style function.
