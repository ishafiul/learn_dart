# Single responsibility (**S**)

## Goal

Split “God classes” that mix unrelated reasons to change.

## Symptoms

- One file imports UI, HTTP, SQL, and business rules.
- Changing validation forces retesting persistence code.
- Class name is vague (`Manager`, `Helper`, `Util`) and the file is huge.

## Refactor moves

- Extract **persistence** (repository), **rules** (domain service), **DTO mapping**, and **transport** (HTTP handlers) into separate types.
- Keep each extracted type named after its job (`UserValidator`, `UserRepository`).

## Dart angle

- `lib/services/user_service.dart` orchestrates; it should not open sockets directly if you can pass a `UserRepository`.

## Practice tasks

- Open your largest class and list three distinct “reasons to change”; sketch three target types.
- Move one pure function (no I/O) to a dedicated library file and import it from the service.
- Delete dead branches uncovered after the split (merge artifacts).
