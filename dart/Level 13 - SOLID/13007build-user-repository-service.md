# Build: User module with repository, service, and `Repository<User>`

## Goal

Implement the roadmap module: `UserRepository` abstraction, `InMemoryUserRepository`, `UserService` that only talks to the interface, plus a generic `Repository<T>` if it clarifies your design.

## Step 1 - Model

```dart
class User {
  final String id;
  final String name;
  final String email;

  User({required this.id, required this.name, required this.email});
}
```

## Step 2 - Generic repository (optional but recommended)

```dart
abstract class Repository<T> {
  T? getById(String id);
  List<T> getAll();
  void save(T entity);
  bool delete(String id);
}
```

## Step 3 - User repository port

```dart
abstract class UserRepository implements Repository<User> {}
```

- Alternatively, skip `Repository<User>` and keep `UserRepository` with explicit methods only; the generic is useful when you already have `Repository<T>` from earlier levels.

## Step 4 - In-memory implementation

```dart
class InMemoryUserRepository implements UserRepository {
  final Map<String, User> _store = {};

  @override
  User? getById(String id) => _store[id];

  @override
  List<User> getAll() => List.unmodifiable(_store.values);

  @override
  void save(User entity) {
    _store[entity.id] = entity;
  }

  @override
  bool delete(String id) => _store.remove(id) != null;
}
```

## Step 5 - Service (depends on abstraction)

```dart
class UserService {
  final UserRepository _users;

  UserService(this._users);

  User register(String name, String email) {
    final id = 'u-${_users.getAll().length + 1}';
    final u = User(id: id, name: name, email: email);
    _users.save(u);
    return u;
  }

  User? find(String id) => _users.getById(id);
}
```

## Step 6 - Composition root

```dart
void main() {
  final repo = InMemoryUserRepository();
  final users = UserService(repo);
  users.register('Asha', 'a@example.com');
  print(users.find('u-1')?.name);
}
```

## Practice tasks

- Add `class FileUserRepository implements UserRepository` that serializes to JSON (reuse Level 7–8 ideas) behind the same interface.
- Add validation in `register` (email shape) and return `Result<User>` from Level 6 instead of throwing.
- Split `UserRepository` into `UserLookup` + `UserStore` if some callers only read (interface segregation).
