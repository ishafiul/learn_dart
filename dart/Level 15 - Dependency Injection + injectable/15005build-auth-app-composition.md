# Build: ApiClient, AuthRepository, AuthService (composition root)

## Goal

Wire a tiny auth-shaped stack with constructor injection and a single place that calls `new` (or factories).

## Step 1 - `ApiResponse` and client contract

```dart
class ApiResponse<T> {
  final int status;
  final T? data;
  final String? error;

  ApiResponse({required this.status, this.data, this.error});

  bool get isSuccess => status >= 200 && status < 300;
}

abstract class ApiClient {
  Future<ApiResponse<Map<String, dynamic>>> post(
    String path, {
    Map<String, dynamic>? body,
  });
}
```

## Step 2 - Fake HTTP client

```dart
class FakeApiClient implements ApiClient {
  ApiResponse<Map<String, dynamic>>? next;

  @override
  Future<ApiResponse<Map<String, dynamic>>> post(
    String path, {
    Map<String, dynamic>? body,
  }) async {
    return next ?? ApiResponse(status: 500, error: 'unset');
  }
}
```

## Step 3 - Repository

```dart
abstract class AuthRepository {
  Future<ApiResponse<Map<String, dynamic>>> login(String email, String password);
}

class RemoteAuthRepository implements AuthRepository {
  final ApiClient _api;

  RemoteAuthRepository(this._api);

  @override
  Future<ApiResponse<Map<String, dynamic>>> login(String email, String password) {
    return _api.post(
      '/login',
      body: <String, dynamic>{'email': email, 'password': password},
    );
  }
}
```

## Step 4 - Service

```dart
class AuthService {
  final AuthRepository _repo;

  AuthService(this._repo);

  Future<bool> signIn(String email, String password) async {
    final r = await _repo.login(email, password);
    return r.isSuccess;
  }
}
```

## Step 5 - Composition root

```dart
Future<void> main() async {
  final api = FakeApiClient()
    ..next = ApiResponse(status: 200, data: {'token': 'abc'});
  final repo = RemoteAuthRepository(api);
  final auth = AuthService(repo);
  print(await auth.signIn('a@b.com', 'x'));
}
```

## Practice tasks

- Add `HttpApiClient implements ApiClient` with `dart:io` `HttpClient` or `package:http` if you want real I/O.
- Register the same graph in a `get_it` setup function without changing `AuthService`’s constructor.
- Add `Result<bool>` from Level 6 instead of bare `bool` for `signIn` outcomes.
