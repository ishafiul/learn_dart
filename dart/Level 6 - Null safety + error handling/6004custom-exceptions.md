# Custom exceptions

## Goal

Model domain failures as types you can catch selectively and message clearly.

## Step 1 - Simple custom type

```dart
class ValidationException implements Exception {
  final String field;
  final String message;

  ValidationException(this.field, this.message);

  @override
  String toString() => 'ValidationException($field): $message';
}

void main() {
  try {
    throw ValidationException('email', 'missing @');
  } on ValidationException catch (e) {
    print(e.field);
    print(e.message);
  }
}
```

## Step 2 - Extending built-in errors

```dart
class OutOfStockError extends StateError {
  OutOfStockError(String sku) : super('out of stock: $sku');
}
```

- `Error` vs `Exception` in Dart is conventional: `Exception` for expected failures, `Error` for programming mistakes. Many apps blur the line; stay consistent in your project.

## Step 3 - Carrying a cause

```dart
class SaveFailed implements Exception {
  final Object cause;
  SaveFailed(this.cause);
}

void main() {
  try {
    throw SaveFailed(ValidationException('id', 'empty'));
  } on SaveFailed catch (e) {
    print(e.cause);
  }
}
```

## Practice tasks

- Add `AuthException` with `reason` enum `{ badPassword, locked, network }`.
- Catch `ValidationException` specifically, then a generic `catch` as last resort in one `try` (document why the generic catch exists).
