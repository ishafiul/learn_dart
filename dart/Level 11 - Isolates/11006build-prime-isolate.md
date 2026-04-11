# Build: prime check on a worker isolate

## Goal

Run trial division on many candidates off the main isolate with `Isolate.run`.

## Step 1 - Batch on a worker

```dart
import 'dart:isolate';
import 'dart:math';

bool isPrime(int n) {
  if (n < 2) return false;
  if (n == 2) return true;
  if (n.isEven) return false;
  final limit = sqrt(n).floor();
  for (var i = 3; i <= limit; i += 2) {
    if (n % i == 0) return false;
  }
  return true;
}

List<bool> checkMany(List<int> values) {
  return values.map(isPrime).toList();
}

Future<void> main() async {
  final values = List<int>.generate(2000, (i) => 100000 + i);
  final flags = await Isolate.run(() => checkMany(values));
  print(flags.where((b) => b).length);
}
```

## Practice tasks

- Return `List<int>` of primes only to shrink the reply payload.
- Split `values` into two halves and await two `Isolate.run` calls, then merge counts.
- Benchmark main vs isolate with `Stopwatch` like the Level 11 benchmark guide.
