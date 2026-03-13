# Build: Generic helper functions

## Goal

Use generics to write reusable, type-safe helper functions.

## Step 1 - Generic swap

```dart
(T, T) swap<T>(T a, T b) {
  return (b, a);
}
```

## Step 2 - Use swap with different types

```dart
void main() {
  var (a, b) = swap<int>(10, 20);
  print('$a, $b'); // 20, 10

  var (x, y) = swap<String>('left', 'right');
  print('$x, $y'); // right, left
}
```

## Step 3 - Generic firstOrNull

```dart
T? firstOrNull<T>(List<T> items) {
  if (items.isEmpty) return null;
  return items.first;
}

void main() {
  print(firstOrNull<int>([5, 6, 7]));
  print(firstOrNull<String>([]));
}
```

## Why this matters

- One function works for many types.
- Type safety is preserved without `dynamic`.

## Practice tasks

- Write `T? lastOrNull<T>(List<T> items)`.
- Write `List<T> twice<T>(T value)` returning `[value, value]`.
- Call these with `int`, `String`, and `bool`.
