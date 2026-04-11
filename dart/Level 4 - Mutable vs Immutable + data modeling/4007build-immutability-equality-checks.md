# Build: checks for `copyWith` and value equality

## Goal

Prove immutability and equality behavior with small assertions or prints.

## Step 1 - Old object unchanged after `copyWith`

```dart
class CounterState {
  final int value;

  CounterState(this.value);

  CounterState copyWith({int? value}) {
    return CounterState(value ?? this.value);
  }
}

void main() {
  CounterState before = CounterState(1);
  CounterState after = before.copyWith(value: 2);
  assert(before.value == 1);
  assert(after.value == 2);
  assert(!identical(before, after));
  print('ok');
}
```

## Step 2 - Value equality for User

```dart
class User {
  final String id;
  final String name;

  User({required this.id, required this.name});

  User copyWith({String? id, String? name}) {
    return User(id: id ?? this.id, name: name ?? this.name);
  }

  @override
  bool operator ==(Object other) {
    return other is User && other.id == id && other.name == name;
  }

  @override
  int get hashCode => Object.hash(id, name);
}

void main() {
  User a = User(id: '1', name: 'Asha');
  User b = User(id: '1', name: 'Asha');
  User c = a.copyWith(name: 'Rafi');
  assert(a == b);
  assert(a != c);
  final set = {a, b};
  assert(set.length == 1);
  print('ok');
}
```

## Step 3 - Run with checks enabled

- Use `dart run` (asserts enabled in VM mode by default for `dart run` on script).
- If an assert fails, fix `==`/`hashCode` or `copyWith` until invariants hold.

## Practice tasks

- Add `==`/`hashCode` to `Product` (`sku` enough for equality, or include `name` and `price` if you want full value semantics).
- Write asserts showing two different `copyWith` chains from the same `OrderItem` produce distinct objects but predictable `lineTotal`.
- Build a `Map<User, String>` with two `User` keys that are value-equal; second insert should overwrite, map length `1`.
