# Build: refactor into `models/`, `services/`, `repositories/`, `utils/`

## Goal

Take one working project (Todo file store, expense ledger, or a small CLI) and split `lib/` by concern.

## Step 1 - Inventory

- List types: plain data vs IO vs orchestration vs string/date helpers.
- Note which files import `dart:io` or `http` (repository side) vs only `dart:core` (models, many utils).

## Step 2 - Target layout

```text
lib/
  main.dart
  models/
    todo.dart
    user.dart
  repositories/
    todo_file_repository.dart
  services/
    todo_service.dart
  utils/
    json_helpers.dart
```

- Names match your domain; extra folders (`cli/`, `config/`) are fine if they clarify.

## Step 3 - Move rules

- **Models**: classes that mostly hold data and `toJson`/`fromJson`; no `File` or sockets.
- **Repositories**: `read`/`write` boundaries; return models or failures, not raw `String` everywhere if you can avoid it.
- **Services**: methods like `addTodo`, `completeTodo`, `loadAll` that call repositories and enforce rules.
- **Utils**: pure helpers used in two or more places; otherwise keep next to the single caller.

## Step 4 - Fix imports

- Run `dart analyze` after each batch of moves.
- Use `package:your_package/...` imports inside `lib/` for clarity in multi-file packages.

## Step 5 - Verify

- `dart run` or tests still pass.
- `dart format .` once at the end.

## Practice tasks

- Add a **fake** `TodoRepository` in-memory next to the file implementation; inject one or the other from `main`.
- Move JSON decode error handling into `utils/` or keep it on the repository—pick one and write one sentence why.
- Add `README.md` section “Structure” with the folder list (only if your repo already uses a root README).
