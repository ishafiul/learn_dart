# Structured results: records and `Result<T>`

## Goal

Represent success and failure as values instead of throwing for expected cases.

## Step 1 - Record-style result

```dart
({bool ok, String? error}) validateNonEmpty(String? value) {
  if (value == null || value.trim().isEmpty) {
    return (ok: false, error: 'required');
  }
  return (ok: true, error: null);
}

void main() {
  final r = validateNonEmpty(' ');
  if (r.ok) {
    print('fine');
  } else {
    print(r.error);
  }
}
```

## Step 2 - Generic `Result<T>`

```dart
class Result<T> {
  final T? value;
  final String? error;

  const Result._({this.value, this.error});

  const Result.ok(T this.value) : error = null;

  const Result.err(String this.error) : value = null;

  bool get isOk => error == null;
}

void main() {
  Result<int> r = const Result.ok(7);
  if (r.isOk) print(r.value);
}
```

## Step 3 - When to throw vs return `Result`

- Throw for truly exceptional or programmer errors, or when you want stack traces at the boundary.
- Return `Result` (or `Future<Result>`) when failure is a normal branch callers must handle.

## Practice tasks

- Write `Result<int> parseIntSafe(String raw)` without throwing on bad input.
- Map `Result<String>` to `Result<int>` with a method `Result<U> map<U>(U Function(T) f)` that preserves errors (implement for non-null success only first).
