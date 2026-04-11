# Codegen concepts (for later)

## Goal

Know why teams generate serialization code without adopting a tool in this level.

## What codegen usually solves

- Large models with many fields: hand-written `fromJson` drifts from APIs.
- Consistent rules for `null`, defaults, renaming keys (`@JsonKey(name: 'user_id')`), and enums.

## Common stack in Dart

- Package `json_annotation` marks models with annotations.
- Package `json_serializable` plus `build_runner` generates `*.g.dart` files with `fromJson`/`toJson` implementations.

## Typical workflow (overview)

- Add dev dependencies: `build_runner`, `json_serializable`, and `json_annotation`.
- Run `dart run build_runner build` after changing annotated classes.
- Commit generated files if your team policy requires reproducible builds.

## When manual JSON is enough

- Learning exercises, tiny DTOs, scripts, and prototypes.
- Full control over error messages and partial parsing.

## Practice tasks

- Skim the `json_serializable` readme on pub.dev and list three annotations or options you noticed.
- Keep your Week 7 project manual; note one model that would be painful to maintain by hand at 30+ fields.
