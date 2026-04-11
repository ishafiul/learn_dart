# Build: live ticker stream

## Goal

Emit periodic ticks as a `Stream` and stop cleanly.

## Step 1 - Periodic ticks

```dart
import 'dart:async';

Stream<int> ticker({Duration interval = const Duration(seconds: 1), int maxTicks = 5}) {
  final ctrl = StreamController<int>();
  var count = 0;
  Timer? timer;
  timer = Timer.periodic(interval, (_) {
    count++;
    ctrl.add(count);
    if (count >= maxTicks) {
      timer?.cancel();
      ctrl.close();
    }
  });
  return ctrl.stream;
}

Future<void> main() async {
  await for (final t in ticker(maxTicks: 3)) {
    print('tick $t');
  }
}
```

## Step 2 - Subscription style

```dart
import 'dart:async';

void main() {
  final sub = ticker(interval: const Duration(milliseconds: 200), maxTicks: 10).listen(print);
  Future.delayed(const Duration(milliseconds: 900), sub.cancel);
}
```

## Practice tasks

- Add `Stream<int> tickerForever()` that never closes and document how callers should cancel.
- Map ticks to ISO timestamps with `.map((n) => DateTime.now().toIso8601String())`.
- Combine two tickers with `StreamZip` from `package:async` or merge patterns (optional).
