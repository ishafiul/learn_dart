# Build: `Result<T>` in validation

## Goal

Return `Result` values from validators and parsers so callers handle errors uniformly.

## Step 1 - `Result` type

```dart
class Result<T> {
  final T? value;
  final String? error;

  const Result._({this.value, this.error});

  const Result.ok(T value) : this._(value: value, error: null);

  const Result.err(String error) : this._(value: null, error: error);

  bool get isOk => error == null;
}
```

## Step 2 - Email as `Result<String>`

```dart
Result<String> validateEmail(String? raw) {
  if (raw == null || raw.trim().isEmpty) {
    return const Result.err('email required');
  }
  final email = raw.trim();
  if (!email.contains('@')) {
    return const Result.err('email invalid');
  }
  return Result.ok(email);
}
```

## Step 3 - Parse age

```dart
Result<int> parseAge(String? raw) {
  if (raw == null || raw.trim().isEmpty) {
    return const Result.err('age required');
  }
  final n = int.tryParse(raw.trim());
  if (n == null) return const Result.err('age not a number');
  if (n < 0 || n > 130) return const Result.err('age out of range');
  return Result.ok(n);
}

void main() {
  final e = validateEmail('a@b.com');
  final a = parseAge('20');
  if (e.isOk) print(e.value);
  if (a.isOk) print(a.value);
}
```

## Practice tasks

- Add `Result<void>` or `Result<Unit>`-style success (use `Result<bool>` with `true` or a tiny `sealed` success marker if you prefer).
- Combine `Result<String>` email + `Result<int>` age into `Result<SignUp>` with a function `Result<SignUp> validateSignUp(...)` that stops on first error or returns both values.
- Add `extension<T> on Result<T> { Result<U> map<U>(U Function(T) f); }` that propagates errors.
