# Level 7 - JSON + Serialization (Week 7)

## Goals

- Encode and decode JSON with `dart:convert`.
- Map JSON objects to Dart models with manual `toJson` / `fromJson`.
- Handle bad or partial payloads without crashing.

## Step-by-step guides (order)

| #   | File                                                                 | Topic                                      |
| --- | -------------------------------------------------------------------- | ------------------------------------------ |
| 1   | [7001dart-convert-json.md](7001dart-convert-json.md)                 | `jsonEncode`, `jsonDecode`, JSON types     |
| 2   | [7002json-as-maps-and-lists.md](7002json-as-maps-and-lists.md)       | `Map<String, dynamic>` and nested data     |
| 3   | [7003manual-tofrom-json.md](7003manual-tofrom-json.md)               | Manual `toJson` / `fromJson` on models     |
| 4   | [7004missing-and-invalid-fields.md](7004missing-and-invalid-fields.md) | Missing keys, wrong types, safe parsing |
| 5   | [7005codegen-concepts.md](7005codegen-concepts.md)                   | Codegen concepts (later path)              |
| 6   | [7006build-user-todo-json.md](7006build-user-todo-json.md)           | Build: User + Todo `fromJson` / `toJson`   |
| 7   | [7007build-json-error-handling.md](7007build-json-error-handling.md) | Build: validation + errors on broken JSON  |
| 8   | [7008build-todo-list-json-string.md](7008build-todo-list-json-string.md) | Build: Todo list as JSON string        |
