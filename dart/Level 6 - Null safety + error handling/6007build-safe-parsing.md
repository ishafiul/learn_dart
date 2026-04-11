# Build: safe parsing utilities

## Goal

Parse strings into numbers and booleans without throwing for expected bad input.

## Step 1 - Int

```dart
int? tryParseInt(String? raw) {
  if (raw == null) return null;
  final t = raw.trim();
  if (t.isEmpty) return null;
  return int.tryParse(t);
}
```

## Step 2 - Double

```dart
double? tryParseDouble(String? raw) {
  if (raw == null) return null;
  final t = raw.trim();
  if (t.isEmpty) return null;
  return double.tryParse(t);
}
```

## Step 3 - Bool (small convention table)

```dart
bool? tryParseBool(String? raw) {
  if (raw == null) return null;
  switch (raw.trim().toLowerCase()) {
    case 'true':
    case '1':
    case 'yes':
      return true;
    case 'false':
    case '0':
    case 'no':
      return false;
    default:
      return null;
  }
}

void main() {
  print(tryParseInt(' 42 '));
  print(tryParseDouble('3.14'));
  print(tryParseBool('YES'));
  print(tryParseInt('nope'));
}
```

## Practice tasks

- Add `Result<int> parseIntResult(String? raw)` using your `Result` type from earlier guides.
- Reject `double` strings that are `NaN` or infinite after parse (return null or `Result.err`).
- Add `List<int>? tryParseIntList(String? csv)` splitting on `,` and failing if any part is invalid.
