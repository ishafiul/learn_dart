# Generics deep dive

## Goal

Use generic classes and methods with bounds, and recognize `Repository<T>` / `Result<T>` shapes.

## Step 1 - Generic class

```dart
class Box<T> {
  final T value;
  Box(this.value);
}

void main() {
  Box<int> a = Box(1);
  Box<String> b = Box('hi');
  print(a.value + 1);
  print(b.value.toUpperCase());
}
```

## Step 2 - Generic method

```dart
T? firstOrNull<T>(List<T> items) {
  if (items.isEmpty) return null;
  return items.first;
}

void main() {
  print(firstOrNull<int>([1, 2]));
  print(firstOrNull(<String>[]));
}
```

## Step 3 - Bounded type parameter

```dart
T maxOf<T extends Comparable<T>>(T a, T b) {
  return a.compareTo(b) >= 0 ? a : b;
}

void main() {
  print(maxOf(3, 7));
  print(maxOf('b', 'a'));
}
```

## Step 4 - Repository pattern

```dart
abstract class Repository<T> {
  T? getById(String id);
  void save(T item);
}
```

- One interface, many storages: memory, file, API.

## Step 5 - Result type (minimal)

```dart
class Result<T> {
  final T? value;
  final String? error;

  Result.ok(this.value) : error = null;
  Result.err(this.error) : value = null;

  bool get isOk => error == null;
}

void main() {
  Result<int> r = Result.ok(42);
  if (r.isOk) print(r.value);
}
```

- Real projects often use sealed types, unions, or packages; this is the idea in small form.

## Practice tasks

- Write `Pair<A, B>` with `A first`, `B second`, and `Pair<B, A> swap()`.
- Implement `InMemoryRepository<User>` with `Map<String, User>` backing `getById`/`save`.
- Write `Result<T> map<T, U>(Result<T> r, U Function(T) f)` that returns `Result.err` if `r` failed.
