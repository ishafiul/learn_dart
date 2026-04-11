# Mixins: `mixin` and `with`

## Goal

Reuse behavior across unrelated classes without forcing a single superclass tree.

## Step 1 - Basic mixin

```dart
mixin Timestamped {
  DateTime get stampedAt => DateTime.now();
}

class Event with Timestamped {
  final String name;
  Event(this.name);
}

void main() {
  Event e = Event('login');
  print('${e.name} at ${e.stampedAt}');
}
```

## Step 2 - Mixin with dependency on class

```dart
class Model {
  String id = 'x';
}

mixin Pretty on Model {
  String describe() => 'Model($id)';
}

class User extends Model with Pretty {}

void main() {
  User u = User();
  print(u.describe());
}
```

- `on Model` means `Pretty` may only be applied to types that are `Model` (or subclass), so `id` is safe to use.

## Step 3 - Order: `extends` then `with`

```dart
class Base {}
mixin M1 {}
mixin M2 {}

class C extends Base with M1, M2 {}
```

## Good habit

- Prefer composition for large state; mixins for small cross-cutting slices (logging, serialization hooks, equality helpers).

## Practice tasks

- Add a `mixin Identified` that requires `String get id` via `on` and implements `bool sameAs(Identified other) => id == other.id`.
- Apply two mixins to one class and call methods from both.
