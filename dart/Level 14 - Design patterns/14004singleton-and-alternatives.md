# Singleton (careful): logger, config, and DI

## Goal

Know why a mutable global is attractive, why it hurts tests and reasoning, and what to do instead.

## Step 1 - Classic singleton shape

```dart
class AppConfig {
  AppConfig._();
  static final AppConfig instance = AppConfig._();

  String apiBaseUrl = 'https://api.example.com';
}
```

- Every caller shares one object. Reads are easy; **lifecycle and tests** get harder.

## Step 2 - Mutable singleton harm

```dart
void featureA() {
  AppConfig.instance.apiBaseUrl = 'https://a.example.com';
}

void featureB() {
  print(AppConfig.instance.apiBaseUrl);
}
```

- Order of calls changes behavior. Parallel tests mutate shared state. Failures become intermittent.

## Step 3 - Prefer constructor injection

```dart
class ApiClient {
  final String baseUrl;
  ApiClient({required this.baseUrl});

  void ping() {
    print('GET $baseUrl/health');
  }
}

void main() {
  final client = ApiClient(baseUrl: 'https://api.example.com');
  client.ping();
}
```

- `main` (or a composition root) chooses values once; tests pass a fake base URL per case.

## When singleton is less bad

- Truly process-wide **immutable** config created at startup.
- Thin wrappers around SDK globals you cannot inject (rare in pure Dart apps).

## Practice tasks

- Convert one static `Logger.d` style helper to `Logger` passed into constructors.
- Write two tests (or two `main`-style scripts) that need different `baseUrl` and show singleton clashes vs injection wins.
- Read about **service locator** pitfalls (Level 15 preview) and relate to singleton globals.
