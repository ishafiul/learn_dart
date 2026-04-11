# DI container concept

## Goal

Centralize how objects are created and how lifetimes are chosen (singleton vs factory) without hiding dependencies from readers.

## What a container does

- Registers **how** to build `AuthService` when someone asks for it.
- May cache one shared `ApiClient` or create a fresh instance per request.

## Manual container (learning shape)

```dart
class AppContainer {
  late final ApiClient api;
  late final AuthRepository repo;
  late final AuthService auth;

  AppContainer() {
    api = HttpApiClient(baseUrl: 'https://api.example.com');
    repo = RemoteAuthRepository(api);
    auth = AuthService(repo);
  }
}

void main() {
  final app = AppContainer();
  app.auth.signIn('a@b.com', 'secret');
}
```

- `AppContainer` is your **composition root**: the only place that chooses concrete classes for this run.

## Libraries

- `get_it` is a common Dart service locator / registry that can behave like a container when used with explicit registration.
- Spring-style full containers are rarer in Dart; teams often combine `get_it` + constructor injection.

## Practice tasks

- Split `AppContainer` into `AppContainer.test()` that wires fakes and `AppContainer.prod()` that wires HTTP.
- Add a `void dispose()` that closes clients if they hold sockets or streams.
- Sketch registration order: which type must exist before `AuthService` can be constructed?
