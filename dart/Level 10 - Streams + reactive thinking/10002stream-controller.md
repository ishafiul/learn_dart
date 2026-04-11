# `StreamController`

## Goal

Push events into a stream from imperative code with `add`, `addError`, and `close`.

## Step 1 - Single-subscription controller

```dart
import 'dart:async';

Future<void> main() async {
  final ctrl = StreamController<int>();
  ctrl.add(1);
  ctrl.add(2);
  ctrl.close();

  await for (final v in ctrl.stream) {
    print(v);
  }
}
```

## Step 2 - Broadcast for multiple listeners

```dart
import 'dart:async';

void main() {
  final ctrl = StreamController<int>.broadcast();
  ctrl.stream.listen(print);
  ctrl.stream.listen((v) => print('again $v'));
  ctrl.add(7);
  ctrl.close();
}
```

- Default controllers allow only one `listen` unless you use `broadcast()`.

## Step 3 - Lifecycle

- Call `close()` when no more events will arrive so listeners can finish.
- Prefer `StreamController` fields on a class that exposes `stream` publicly and keeps `add` private if you need encapsulation.

## Practice tasks

- Wrap a `Timer.periodic` that `add`s ticks into a controller; cancel the timer in `onCancel` if you use `StreamController` with a listener API.
- Compare memory: one listener vs two on a non-broadcast stream and note the runtime error.
