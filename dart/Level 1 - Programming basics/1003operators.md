# Operators: math, comparison, logical

## Goal

Use arithmetic, comparison, and logical operators in Dart.

## Step 1 — Arithmetic operators

```dart
void main() {
  int a = 10;
  int b = 3;
  print(a + b);
  print(a - b);
  print(a * b);
  print(a ~/ b);
  print(a % b);
}
```

- `+` add, `-` subtract, `*` multiply.
- `~/` integer division, `%` remainder.

## Step 2 — Comparison operators

```dart
void main() {
  int x = 5;
  int y = 10;
  print(x == y);
  print(x != y);
  print(x < y);
  print(x > y);
  print(x <= y);
  print(x >= y);
}
```

- `==` equal, `!=` not equal.
- `<`, `>`, `<=`, `>=` for ordering.
- Result is a `bool`.

## Step 3 — Logical operators

```dart
void main() {
  bool a = true;
  bool b = false;
  print(a && b);
  print(a || b);
  print(!a);
}
```

- `&&` and, `||` or, `!` not.

## Step 4 — Combine in conditions

```dart
void main() {
  int age = 18;
  bool hasId = true;
  bool canEnter = age >= 18 && hasId;
  print(canEnter);
}
```

## Quick reference

| Math   | Comparison | Logical |
| ------ | ---------- | ------- |
| + - \* | == !=      | && \|\| |
| ~/ %   | < > <= >=  | !       |

## Practice tasks

- Compute and print: (15 + 7), (20 - 8), (6 \* 7), (17 ~/ 4), (17 % 4).
- Compare two numbers with `<`, `>`, `==` and print the results.
- Write an expression: “age >= 16 and hasTicket” and print the result for sample values.
