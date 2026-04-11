# Worker isolate pattern and `Isolate.run`

## Goal

Run a function on a fresh isolate and get a `Future` result back.

## Step 1 - `Isolate.run` (Dart 3 style)

```dart
import 'dart:isolate';

int sumRange(int from, int to) {
  var s = 0;
  for (var i = from; i <= to; i++) {
    s += i;
  }
  return s;
}

Future<void> main() async {
  final n = await Isolate.run(() => sumRange(1, 1000000));
  print(n);
}
```

- The closure runs in a new isolate. Arguments are copied; keep captures small and sendable.

## Step 2 - Top-level worker for clarity

```dart
import 'dart:isolate';

int work(String payload) {
  return payload.length * 2;
}

Future<void> main() async {
  final r = await Isolate.run(() => work('hello'));
  print(r);
}
```

## Step 3 - `spawn` + single reply

```dart
import 'dart:isolate';

void worker(SendPort replyTo) {
  replyTo.send(7 * 7);
}

Future<void> main() async {
  final rp = ReceivePort();
  await Isolate.spawn(worker, rp.sendPort);
  final answer = await rp.first;
  print(answer);
  rp.close();
}
```

- The spawned entry point must be a top-level function or a static method. Two-way chats add another port or a small protocol; `Isolate.run` stays simpler for one-shot work.

## Practice tasks

- Wrap `Isolate.run` in a function `Future<R> offload<R>(R Function() job)` that logs duration.
- Read `Isolate.spawn` docs for `errorsAreFatal` and `onExit` and note when you would set them.
