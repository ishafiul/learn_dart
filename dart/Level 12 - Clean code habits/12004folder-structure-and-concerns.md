# Folder structure and separation of concerns

## Goal

Put code where the next reader expects it; keep layers boring and obvious.

## Typical buckets (Dart CLI or package)

- **`models/`** (or `domain/`): data types, value objects, enums used across features.
- **`services/`**: orchestration, use cases, “do the thing” APIs that coordinate repositories and rules.
- **`repositories/`**: persistence and external data boundaries (file, HTTP, fake impl for tests).
- **`utils/`**: small pure helpers with no app policy (`formatCurrency`, `clampInt`). Keep this folder from becoming a junk drawer.

## Dependencies point inward

- Models should not import repositories.
- Services depend on repository **interfaces** or abstract classes, not concrete IO details when you can help it.

## One package vs many

- Small learning repos: one `lib/` with folders is enough.
- Growing apps: consider `package:` splits later; do not front-load.

## Practice tasks

- Draw a one-way arrow diagram: `main` → service → repository → model.
- List three files in your repo that are “misc” and assign each to `models`, `services`, `repositories`, or `utils`.
- Delete or merge a `utils/` file that only has one one-liner used once (move it next to the caller).
