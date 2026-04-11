# Build: validation and errors for broken JSON

## Goal

Catch `FormatException`, validate top-level shape, and return errors instead of crashing.

## Step 1 - Parse string safely

```dart
import 'dart:convert';

typedef JsonMap = Map<String, dynamic>;

Result<JsonMap> decodeObject(String raw) {
  try {
    final v = jsonDecode(raw);
    if (v is JsonMap) return Result.ok(v);
    return const Result.err('root must be object');
  } on FormatException catch (e) {
    return Result.err('invalid json: ${e.message}');
  }
}

class Result<T> {
  final T? value;
  final String? error;
  const Result.ok(this.value) : error = null;
  const Result.err(this.error) : value = null;
  bool get isOk => error == null;
}
```

## Step 2 - Expect an array root

```dart
import 'dart:convert';

Result<List<dynamic>> decodeArray(String raw) {
  try {
    final v = jsonDecode(raw);
    if (v is List<dynamic>) return Result.ok(v);
    return const Result.err('root must be array');
  } on FormatException catch (e) {
    return Result.err('invalid json: ${e.message}');
  }
}
```

## Step 3 - Todo list payload

Reuse `Result<T>` from step 1.

```dart
import 'dart:convert';

Result<List<Map<String, dynamic>>> decodeTodoMaps(String raw) {
  try {
    final v = jsonDecode(raw);
    if (v is! List<dynamic>) {
      return const Result.err('root must be array');
    }
    final out = <Map<String, dynamic>>[];
    for (final item in v) {
      if (item is Map<String, dynamic>) {
        out.add(item);
      } else {
        return const Result.err('each todo must be object');
      }
    }
    return Result.ok(out);
  } on FormatException catch (e) {
    return Result.err('invalid json: ${e.message}');
  }
}
```

## Practice tasks

- Map `decodeTodoMaps` into `Result<List<Todo>>` using `Todo.fromJson` inside a loop; fail fast on first bad row with an index in the message.
- Accept both `{"todos":[...]}` and a raw array `[...]` with a small dispatcher.
- Log the offending substring (first 80 chars) when `FormatException` fires (no full secrets in logs).
