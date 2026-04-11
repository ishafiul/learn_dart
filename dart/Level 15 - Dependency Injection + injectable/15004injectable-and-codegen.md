# `injectable` and codegen wiring

## Goal

Know what `package:injectable` adds on top of manual registration: less boilerplate, still **constructor-based** classes.

## Stack (typical)

- `get_it`: service locator registry (`GetIt.instance`).
- `injectable`: annotations that describe how to register each class.
- `build_runner`: generates `dependency_injection.config.dart` (name may vary with version) that calls `GetIt` registration functions.

## Shape (conceptual)

```dart
@injectable
class AuthService {
  AuthService(this._client, this._repo);
  final ApiClient _client;
  final AuthRepository _repo;
}
```

- Codegen discovers constructors and dependency types, then emits registration code so you do not hand-write every `registerSingleton`.

## Where it fits

- Medium and large graphs with many implementations and environments (dev, prod, test).
- Teams that want compile-time checks on constructor lists and less merge conflict in one giant `setup()` file.

## Costs

- Build step: `dart run build_runner build --delete-conflicting-outputs`.
- Learning curve when generated files disagree with manual edits.

## Practice tasks

- Read the `injectable` readme on pub.dev and note three annotations (`@singleton`, `@lazySingleton`, `@injectable`, etc.).
- Start a throwaway package, add `get_it` + `injectable`, generate once, and diff the output file.
- Decide one rule: “no `GetIt.I` inside domain classes” and enforce in review.
