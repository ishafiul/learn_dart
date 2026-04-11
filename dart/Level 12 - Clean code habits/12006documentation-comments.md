# Documentation comments (`///`)

## Goal

Document **public** APIs and non-obvious behavior so `dart doc` and IDE hovers stay useful.

## Syntax

- Use `///` on the line(s) immediately above libraries, classes, fields, getters, and methods.
- First sentence is a short summary; blank line, then details if needed.

## What to document

- Preconditions, postconditions, thrown exceptions, and side effects callers rely on.
- Units (`milliseconds` vs `seconds`) and invariants (`id` non-empty).

## What to skip

- Redundant restatement of the name (`/// Gets the user` on `User get user`).
- Obvious getters/setters with no extra contract.

## Example shape

```dart
/// Loads persisted todos from [path].
///
/// Returns an empty list if the file is missing. Throws [FormatException]
/// if the JSON root is not an array.
Future<List<Todo>> loadTodos(String path);
```

## Practice tasks

- Add `///` to one public class and two public methods in a package you own.
- Run `dart doc` in that package and open the generated docs once.
- Remove one comment that only repeats the signature verbatim.
