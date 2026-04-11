# Interface segregation (**I**)

## Goal

Clients depend only on methods they use; fat interfaces shrink.

## Symptoms

- Implementers leave methods empty or throw because they “do not apply.”
- Tests need huge fake objects for tiny call sites.

## Refactor moves

- Split `UserRepository` into `UserReader`, `UserWriter`, or narrower ports (`UserById`, `UserSearch`) when call sites differ.
- In Dart, **abstract classes** and **typedefs** on function shapes both count as “interfaces.”

## Example direction

```dart
abstract class UserLookup {
  User? byId(String id);
}

abstract class UserRegistration {
  void register(User draft);
}
```

- Admin console might implement both; read-only dashboard implements `UserLookup` only.

## Practice tasks

- List methods on your largest interface and group them by caller; try merging only groups that always travel together.
- Replace a throw-stub in a fake with a smaller interface that omits that method.
- Add one `typedef` alias for a callback type that appears in three files.
