# Format, analyze, and lints

## Goal

Make consistent style and static checks automatic, not a debate in review.

## `dart format`

- Formats Dart source to the canonical style.
- Run on save in the editor, or `dart format .` before commit.

## `dart analyze`

- Runs the static analyzer (types, null safety, unresolved names, many lints).
- Fix or suppress with care; prefer fixing.

## `analysis_options.yaml`

- Lives at package root (or repo root for a single package).
- Extends `package:lints/recommended.yaml` or `package:flutter_lints/flutter.yaml` in Flutter projects.
- Add or tighten rules as the team agrees.

## CI

- In pipelines, run `dart format --output=none --set-exit-if-changed .` and `dart analyze` so drift fails the build.

## Practice tasks

- Add `analysis_options.yaml` to a small Dart package if missing; extend recommended lints.
- Turn on one stricter lint (for example `prefer_final_locals`) and fix five violations.
- Run `dart analyze` on a legacy file and fix the first three issues without disabling rules.
