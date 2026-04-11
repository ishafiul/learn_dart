# Build: Grade calculator

## Goal

Turn a numeric score into a letter grade using conditionals.

## Step 1 — One score, one grade

```dart
void main() {
  int score = 85;
  if (score >= 90) {
    print('A');
  } else if (score >= 80) {
    print('B');
  } else if (score >= 70) {
    print('C');
  } else if (score >= 60) {
    print('D');
  } else {
    print('F');
  }
}
```

- Run and confirm output for 85 is B.
- Change `score` and run again for 95, 72, 55.

## Step 2 — Use a variable for the grade

```dart
void main() {
  int score = 85;
  String grade;
  if (score >= 90) {
    grade = 'A';
  } else if (score >= 80) {
    grade = 'B';
  } else if (score >= 70) {
    grade = 'C';
  } else if (score >= 60) {
    grade = 'D';
  } else {
    grade = 'F';
  }
  print('Score: $score -> Grade: $grade');
}
```

- Use string interpolation `$score` and `$grade` in the print.

## Step 3 — Add +/- (optional)

- For A: 93+ A, 90–92 A-.
- For B: 87+ B+, 83–86 B, 80–82 B-.
- Implement with nested or chained if/else and print the result.

## Practice tasks

- Support scores 0–100 and handle invalid input (e.g. print "Invalid" for `score < 0` or `score > 100`).
- Try the same logic with a `switch` on a numeric range (e.g. score ~/ 10) and compare with if/else.
