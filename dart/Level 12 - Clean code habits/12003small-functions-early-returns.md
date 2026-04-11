# Small functions and early returns

## Goal

Keep each function easy to read top-to-bottom and cheap to test.

## Size

- If you scroll a long way to see the end, consider extracting steps with names (`_validate`, `_normalize`, `_persist`).
- “Small” is not a character count; it is **one clear job** per function.

## Early returns

- Handle guard clauses first: null, empty input, feature flags, permission checks.
- After guards, the “happy path” stays at one indentation level.

## Nesting

- Deep `if` inside `if` inside `for` is a signal to extract or invert conditions.

## Practice tasks

- Take one function with nested `if`/`else` and rewrite with early returns only.
- Extract the body of a `try` block into `Future<void> performWork()` so `try`/`catch` stays thin at the boundary.
- Add a private helper whose name reads like a sentence in the caller.
