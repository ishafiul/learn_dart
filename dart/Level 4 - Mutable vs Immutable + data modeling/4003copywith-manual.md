# Manual `copyWith` pattern

## Goal

Create a new instance like the old one but with a few fields changed, without mutating the original.

## Step 1 - Simple `copyWith`

```dart
class User {
  final String name;
  final int age;

  User({required this.name, required this.age});

  User copyWith({String? name, int? age}) {
    return User(
      name: name ?? this.name,
      age: age ?? this.age,
    );
  }
}

void main() {
  User a = User(name: 'Asha', age: 20);
  User b = a.copyWith(age: 21);
  print('${a.name} ${a.age}');
  print('${b.name} ${b.age}');
}
```

- `??` keeps the old value when the argument is omitted (`null` means “no change”).

## Step 2 - Nullable fields need a sentinel (later pattern)

- If `String? bio` can be `null` on purpose, `copyWith({String? bio})` cannot distinguish “leave bio alone” from “set bio to null” with only `??`.
- For this level, prefer non-nullable fields or accept the limitation until you learn wrapper types or `Object?` sentinels.

## Step 3 - When to use

- UI state, value models, configs: copy instead of mutating shared instances.
- Large graphs: consider where copying should be shallow vs deep (manual `copyWith` is usually shallow).

## Good habit

- After `copyWith`, assert or test that the old instance still has old values (see build guides).

## Practice tasks

- Add `copyWith` to a `Product` with `sku`, `name`, `price` (all non-nullable `String`/`double`).
- Create `u2 = u1.copyWith()` with no args; confirm `u1` and `u2` are equal in value but not the same object (`identical` vs `==` once you implement equality).
