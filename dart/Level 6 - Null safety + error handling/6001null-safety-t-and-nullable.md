# Null safety: `T` vs `T?`

## Goal

Know which values may be null and let the type system force you to handle absence.

## Step 1 - Non-nullable by default

```dart
void main() {
  String name = 'Asha';
  name = 'Rafi';
}
```

- `String` cannot hold `null`. Assigning `null` is a compile error.

## Step 2 - Nullable type

```dart
void main() {
  String? nick = null;
  nick = 'Ace';
  print(nick);
}
```

- `T?` means `T` or `null`.

## Step 3 - Passing between worlds

```dart
String requireName(String? input) {
  if (input == null) {
    return 'Anonymous';
  }
  return input;
}

void main() {
  print(requireName(null));
  print(requireName('Asha'));
}
```

- After a null check, Dart promotes `input` to `String` in that branch.

## Good habit

- Prefer `T` for values that must exist; use `T?` when absence is real data.

## Practice tasks

- Change `requireName` to return `String?` and return `null` for empty string after trim.
- List three APIs in `dart:core` that return nullable types and why.
