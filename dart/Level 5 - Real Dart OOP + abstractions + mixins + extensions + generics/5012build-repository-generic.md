# Build: `Repository<T>` + `InMemoryRepository<T>`

## Goal

Abstract persistence with a generic interface and a map-backed implementation.

## Step 1 - Entity with id

```dart
class User {
  final String id;
  final String name;

  User({required this.id, required this.name});
}
```

## Step 2 - Repository interface

```dart
abstract class Repository<T> {
  T? getById(String id);
  List<T> getAll();
  void upsert(T item);
  bool delete(String id);
}
```

## Step 3 - In-memory implementation with callback for id

```dart
class InMemoryRepository<T> implements Repository<T> {
  final Map<String, T> _store = {};
  final String Function(T item) idOf;

  InMemoryRepository({required this.idOf});

  @override
  T? getById(String id) => _store[id];

  @override
  List<T> getAll() => List.unmodifiable(_store.values);

  @override
  void upsert(T item) {
    _store[idOf(item)] = item;
  }

  @override
  bool delete(String id) {
    return _store.remove(id) != null;
  }
}

void main() {
  Repository<User> users = InMemoryRepository<User>(idOf: (u) => u.id);
  users.upsert(User(id: '1', name: 'Asha'));
  users.upsert(User(id: '2', name: 'Rafi'));
  print(users.getById('1')?.name);
  print(users.getAll().length);
}
```

## Practice tasks

- Add `Repository<Product>` in the same style with `sku` as id.
- Add `void clear()` and `int get count` to `InMemoryRepository`.
- Write a `LoggingRepository<T>` that `implements Repository<T>` and wraps another `Repository<T>` (decorator), printing each operation.
