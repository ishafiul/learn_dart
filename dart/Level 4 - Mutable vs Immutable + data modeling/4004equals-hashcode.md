# Value equality: `==` and `hashCode`

## Goal

Treat two objects as “the same value” for logic and collections (`Set`, `Map` keys).

## Step 1 - Default `==` is identity

```dart
class Box {
  final int v;
  Box(this.v);
}

void main() {
  Box a = Box(1);
  Box b = Box(1);
  print(a == b);
  print(identical(a, b));
}
```

- Without overrides, `==` is reference equality: same object only.

## Step 2 - Override `==` and `hashCode` together

```dart
class Box {
  final int v;
  Box(this.v);

  @override
  bool operator ==(Object other) {
    return other is Box && other.v == v;
  }

  @override
  int get hashCode => Object.hash(v);
}

void main() {
  Box a = Box(1);
  Box b = Box(1);
  print(a == b);
  final set = {a, b};
  print(set.length);
}
```

- If two values are equal, they must have the same `hashCode`. Break that rule and `Set`/`Map` behave badly.

## Step 3 - Why collections care

- `Set` and `Map` use `hashCode` for buckets and `==` for collisions.
- Value objects used as keys should be immutable (or at least not change fields that affect `hashCode` after insertion).

## Good habit

- Use `Object.hash(field1, field2, ...)` for combining fields (from `dart:core`).

## Practice tasks

- Add `==`/`hashCode` to `User` with `name` and `age` (both part of equality).
- Build a `Set` of three `User` instances where two are value-equal; `length` should be `2`.
- Explain in one sentence why mutating a field that affects `hashCode` after inserting into a `Set` is dangerous.
