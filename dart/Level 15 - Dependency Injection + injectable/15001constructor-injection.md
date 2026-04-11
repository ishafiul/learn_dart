# Constructor injection

## Goal

Pass dependencies in through constructors (or factories) so callers and tests control implementations.

## Step 1 - Before (hidden dependency)

```dart
class AuthService {
  Future<bool> login(String email, String password) async {
    final client = HttpApiClient();
    final raw = await client.post('/login', body: {'email': email, 'password': password});
    return raw.status == 200;
  }
}
```

- Hard to fake `HttpApiClient` in a unit test without network hooks.

## Step 2 - After (injected)

```dart
class AuthService {
  final ApiClient _client;

  AuthService(this._client);

  Future<bool> login(String email, String password) async {
    final raw = await _client.post('/login', body: {'email': email, 'password': password});
    return raw.status == 200;
  }
}

abstract class ApiClient {
  Future<HttpResponse> post(String path, {Map<String, String>? body});
}

class HttpResponse {
  final int status;
  HttpResponse(this.status);
}
```

- Tests pass a `FakeApiClient` that returns canned `HttpResponse` values.

## Good habits

- Prefer `final` fields set once in the constructor.
- Avoid optional “inject or construct internally” parameters; pick one style per type.

## Practice tasks

- Convert one static `DateTime.now()` usage to an injectable `Clock` interface with `DateTime now()` for tests.
- List constructors in a feature and mark which parameters are **infrastructure** vs **pure config**.
