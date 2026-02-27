# Conditionals: if/else, switch

## Goal

Control flow with conditions and multiple branches.

## Step 1 — if

```dart
void main() {
  int age = 16;
  if (age >= 18) {
    print('Adult');
  }
}
```

- Code inside `if` runs only when the condition is true.

## Step 2 — if / else

```dart
void main() {
  int age = 16;
  if (age >= 18) {
    print('Adult');
  } else {
    print('Minor');
  }
}
```

- One branch or the other runs.

## Step 3 — if / else if / else

```dart
void main() {
  int score = 75;
  if (score >= 90) {
    print('A');
  } else if (score >= 80) {
    print('B');
  } else if (score >= 70) {
    print('C');
  } else {
    print('Below C');
  }
}
```

- First true condition wins; only that block runs.

## Step 4 — switch

```dart
void main() {
  String grade = 'B';
  switch (grade) {
    case 'A':
      print('Excellent');
      break;
    case 'B':
      print('Good');
      break;
    case 'C':
      print('Fair');
      break;
    default:
      print('Unknown');
  }
}
```

- Use `switch` for many equal-value checks.
- Every `case` should end with `break` (or `return`/`throw`) to avoid fall-through.
- `default` runs when no case matches.

## Practice tasks

- Write an if/else that prints "Even" or "Odd" for a number.
- Convert the score → letter grade example to use if/else if/else with your own thresholds.
- Use switch on a day name (e.g. 'Mon', 'Tue') and print a short message for each; use default for unknown.
