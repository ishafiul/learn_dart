# Exceptions: `try` / `catch` / `finally` and `throw`

## Goal

Catch recoverable failures, always clean up in `finally`, and throw meaningful errors.

## Step 1 - Throw

```dart
void pay(double amount) {
  if (amount.isNaN || amount.isInfinite) {
    throw ArgumentError('amount must be finite');
  }
}

void main() {
  try {
    pay(double.nan);
  } catch (e) {
    print(e);
  }
}
```

## Step 2 - `try` / `catch` / `finally`

```dart
int parseLen(String raw) {
  try {
    final n = int.parse(raw);
    return n;
  } on FormatException {
    return 0;
  } finally {
    print('parse attempt done');
  }
}

void main() {
  print(parseLen('12'));
  print(parseLen('nope'));
}
```

- `on Type` narrows what you catch. A bare `catch (e, st)` catches everything (use sparingly).

## Step 3 - Stack trace preserved (optional)

- `catch (e, st)` gives you the stack `st` if you log or wrap with `Error.throwWithStackTrace`.
- In app code, often log `e` and `st` at the outer boundary, not inside every helper.

## Good habit

- Catch at boundaries (CLI entry, HTTP handler), not in every tiny helper.

## Practice tasks

- Wrap `int.parse` in a function that throws `FormatException` with a custom message including `raw`.
- Add a `finally` block that increments a `attemptCount` variable and assert it runs on success and failure.
