# Build: `Result<T>` with `ApiResponse<T>`

## Goal

Keep HTTP metadata in `ApiResponse` while domain callers use `Result` for success vs failure.

## Step 1 - `Result`

```dart
class Result<T> {
  final T? value;
  final String? error;

  const Result._({this.value, this.error});

  const Result.ok(T this.value) : error = null;

  const Result.err(String this.error) : value = null;

  bool get isOk => error == null;
}
```

## Step 2 - Map response to result

```dart
Result<T> fromApi<T>(
  ApiResponse<T> response, {
  String Function(ApiResponse<T> r)? mapError,
}) {
  if (response.isSuccess) {
    final d = response.data;
    if (d == null) {
      return const Result.err('missing data');
    }
    return Result.ok(d);
  }
  final msg = mapError?.call(response) ?? response.error ?? 'request failed';
  return Result.err(msg);
}
```

## Step 3 - Service returns `Result`

Use `AuthRepository` and `ApiResponse` from the composition guide.

```dart
class AuthService {
  final AuthRepository _repo;

  AuthService(this._repo);

  Future<Result<String>> signIn(String email, String password) async {
    final r = await _repo.login(email, password);
    return fromApi<Map<String, dynamic>>(r).map((m) {
      final token = m['token'];
      if (token is! String || token.isEmpty) {
        return const Result.err('invalid token');
      }
      return Result.ok(token);
    });
  }
}

extension<T> on Result<T> {
  Result<U> map<U>(Result<U> Function(T value) f) {
    if (!isOk || value == null) {
      return Result.err(error ?? 'bad');
    }
    return f(value as T);
  }
}
```

- Implement `map` once in your project or use a small shared helper; keep behavior consistent.

## Step 4 - Typed API surface

```dart
class ApiResponse<T> {
  final int status;
  final T? data;
  final String? error;

  ApiResponse({required this.status, this.data, this.error});

  bool get isSuccess => status >= 200 && status < 300;
}
```

## Practice tasks

- Add `ApiResponse<List<UserDto>>` parsing with `fromApi` and a mapper that validates each row.
- Return `Result<void>` for logout by using a sentinel or a tiny `sealed class Outcome`.
- Log `status` and a redacted `error` when `Result.err` is produced at the service boundary.
