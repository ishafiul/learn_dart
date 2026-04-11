# Variables: var, explicit types, final, const

## Goal

Declare variables with the right kind of binding for your use case.

## Step 1 — Explicit type

```dart
void main() {
  int score = 100;
  String city = 'Dhaka';
  print(score);
  print(city);
}
```

- Type is written before the variable name.
- Use when you want the type to be obvious.

## Step 2 — var (type inferred)

```dart
void main() {
  var score = 100;
  var city = 'Dhaka';
  print(score);
  print(city);
}
```

- Dart infers `score` as `int`, `city` as `String`.
- Once set, the type does not change.

## Step 3 — final (assign once)

```dart
void main() {
  final name = 'Alice';
  final age = 25;
  print(name);
  print(age);
}
```

- Value is set once and cannot be reassigned.
- Use for values that do not change after initialization.

## Step 4 — const (compile-time constant)

```dart
void main() {
  const pi = 3.14159;
  const appName = 'MyApp';
  print(pi);
  print(appName);
}
```

- Value must be known at compile time.
- Use for literals and constant expressions.

## When to use which

| Keyword  | Reassign? | When to use            |
| -------- | --------- | ---------------------- |
| type/var | Yes       | Value may change later |
| final    | No        | Set once at runtime    |
| const    | No        | Known at compile time  |

## Practice tasks

- Declare a changing counter with `var`, print it, then change and print again.
- Declare your birth year with `final` and print it.
- Declare a constant like `maxAttempts = 3` with `const` and print it.
