# Enums

## Goal

Model a fixed set of choices with a named type.

## Step 1 - Simple enum

```dart
enum Priority { low, medium, high }

void main() {
  Priority p = Priority.high;
  print(p.name);
}
```

## Step 2 - Enhanced enum (fields + methods)

```dart
enum HttpCode {
  ok(200),
  notFound(404);

  final int value;
  const HttpCode(this.value);

  bool get isSuccess => value >= 200 && value < 300;
}

void main() {
  HttpCode c = HttpCode.ok;
  print(c.value);
  print(c.isSuccess);
}
```

## Step 3 - Switch exhaustiveness

```dart
String label(Priority p) {
  return switch (p) {
    Priority.low => 'Low',
    Priority.medium => 'Medium',
    Priority.high => 'High',
  };
}
```

- Prefer `switch` on enums so new values force you to update call sites (analyzer helps).

## Practice tasks

- Add `Theme { light, dark }` and a function `String cssClass(Theme t)`.
- Add an enum `Role` with a `int level` field and compare two roles by `level`.
