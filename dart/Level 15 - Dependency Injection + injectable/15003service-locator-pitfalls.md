# Service locator pitfalls

## Goal

Recognize hidden globals and static lookups that undo the benefits of injection.

## Pattern

```dart
class Locator {
  static final Locator I = Locator._();
  Locator._();

  late ApiClient api;

  static T get<T>() {
    if (T == ApiClient) return I.api as T;
    throw StateError('unknown $T');
  }
}
```

```dart
void sendPing() {
  final client = Locator.get<ApiClient>();
  client.post('/ping', body: null);
}
```

## Problems

- Call sites hide dependencies; you cannot see `ApiClient` from the signature.
- Tests must mutate global registry order; parallel tests race.
- Refactors miss call sites because there is no constructor to update.

## Better direction

- Pass `ApiClient` into `sendPing` or into a class that owns `sendPing`.
- Use a **container only at the edge** (`main`) and inject concrete dependencies inward.

## Practice tasks

- Find one `getIt<...>()` (or similar) inside a domain class and move the type to a constructor parameter.
- List three test failures you have seen from “forgot to register mock in locator.”
- Compare **pure constructor injection** vs **container resolves graph** in two sentences for your team wiki.
