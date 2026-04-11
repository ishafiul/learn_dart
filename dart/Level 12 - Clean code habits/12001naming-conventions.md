# Naming conventions

## Goal

Match what Dart readers expect so navigation and APIs stay predictable.

## Types and members

- Classes, enums, typedefs, extensions: `PascalCase` (`UserRepository`, `HttpClient`).
- Methods, fields, parameters, locals: `lowerCamelCase` (`fetchUser`, `maxRetries`).
- Prefer **nouns** for types and **verbs** for methods (`load`, `save`, `parse`).

## Booleans: `is`, `has`, `can`

- `isEmpty`, `isValid`, `hasToken`, `canSubmit` read well in `if` conditions.
- Avoid double negatives (`isNotDisabled`) when a positive name works (`isEnabled`).

## Getters

- Nouns or short phrases: `displayName`, `items`, `isOpen`.
- Side-effectful work belongs in methods, not getters named like properties.

## Libraries and files

- `snake_case.dart` file names (`user_repository.dart`).
- One public library per file is a common default; `part`/`part of` only when you have a deliberate split.

## Practice tasks

- Rename three locals in an old script from single letters to intent-revealing names.
- Find one `bool` field or getter in your code that would read better as `is`/`has`/`can`.
- Skim the [Effective Dart: Style](https://dart.dev/effective-dart/style) naming section and adopt one rule you were not using.
