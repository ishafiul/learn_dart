# Build: Multiplication table generator

## Goal

Print a multiplication table using nested loops.

## Step 1 — Table for one number (e.g. 5)

```dart
void main() {
  int n = 5;
  for (int i = 1; i <= 10; i++) {
    int result = n * i;
    print('$n x $i = $result');
  }
}
```

- Run and confirm lines like: 5 x 1 = 5, 5 x 2 = 10, … 5 x 10 = 50.

## Step 2 — Full table 1×1 to 5×5 (nested loop)

```dart
void main() {
  for (int row = 1; row <= 5; row++) {
    for (int col = 1; col <= 5; col++) {
      int result = row * col;
      print('$row x $col = $result');
    }
  }
}
```

- Outer loop: row (first factor).
- Inner loop: column (second factor).
- Each pair (row, col) prints one product.

## Step 3 — One line per row (optional)

```dart
void main() {
  for (int row = 1; row <= 5; row++) {
    String line = '';
    for (int col = 1; col <= 5; col++) {
      int result = row * col;
      line += '${row * col}'.padLeft(3) + ' ';
    }
    print(line.trim());
  }
}
```

- Build a string per row, then print one line per row.
- Use `padLeft(3)` so columns align.

## Practice tasks

- Change the table size (e.g. 1–10) by changing the loop bounds.
- Use a variable `int size = 10` and use it in both loops so one change updates the whole table.
