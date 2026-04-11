# Stream transforms: `map` and `where`

## Goal

Derive new streams without manual controllers when transforms fit.

## Step 1 - `map`

```dart
import 'dart:async';

Future<void> main() async {
  final s = Stream.fromIterable([1, 2, 3]).map((n) => 'n=$n');
  await for (final v in s) {
    print(v);
  }
}
```

## Step 2 - `where`

```dart
import 'dart:async';

Future<void> main() async {
  final s = Stream.fromIterable([1, 2, 3, 4]).where((n) => n.isEven);
  print(await s.toList());
}
```

## Step 3 - Chaining

```dart
import 'dart:async';

Future<void> main() async {
  final out = Stream.fromIterable([1, 2, 3, 4])
      .where((n) => n.isOdd)
      .map((n) => n * 10);
  await for (final v in out) {
    print(v);
  }
}
```

## Good habit

- Transforms are lazy: nothing runs until someone listens or pulls with `await for`.

## Practice tasks

- Add `distinct()` from `package:async` in a real project, or implement a tiny `distinct` extension that tracks the last value (optional).
- Build `Stream<String>` from ints with `map` and filter empty strings with `where`.
