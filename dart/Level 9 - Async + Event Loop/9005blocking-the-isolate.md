# Why CPU-heavy work blocks the isolate

## Goal

See that async does not create parallel threads for Dart computation.

## Step 1 - Tight loop delays timers

```dart
import 'dart:async';

void burnCpu() {
  final sw = Stopwatch()..start();
  while (sw.elapsedMilliseconds < 500) {}
}

void main() {
  print('start');
  Timer(const Duration(milliseconds: 50), () => print('timer fired'));
  burnCpu();
  print('burn done');
}
```

- The timer callback waits until `burnCpu` returns because nothing else runs on this isolate meanwhile.

## Step 2 - `await` does not help inside sync CPU

```dart
Future<void> heavyWrong() async {
  final sw = Stopwatch()..start();
  while (sw.elapsedMilliseconds < 800) {}
}

Future<void> main() async {
  await heavyWrong();
}
```

- The loop never yields; it is still one uninterrupted run on the isolate.

## Step 3 - Mitigations (overview)

- Chunk work with `await Future<void>.delayed(Duration.zero)` occasionally (crude).
- Move real parallel CPU to isolates (later level) or native code.

## Practice tasks

- Replace part of a long loop with periodic `await Future.delayed(Duration.zero)` and verify timers fire sooner (still not ideal for huge work).
- Measure `Stopwatch` around a JSON encode of a large structure vs a naive string build in a loop.
