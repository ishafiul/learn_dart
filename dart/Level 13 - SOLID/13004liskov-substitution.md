# Liskov substitution (**L**)

## Goal

Subtypes must be usable anywhere the base type is expected without surprises.

## Contract

- Preconditions: subclass cannot require **more** from callers than the base.
- Postconditions: subclass cannot deliver **less** than the base promises.
- Invariants: rules that always held for the base should still hold for the subtype in spirit.

## Dart smell

- `if (x is SpecificSubtype)` scattered outside factories.
- Overrides that `throw UnimplementedError` for some base methods.
- Subclass narrows return types in a way callers did not expect (rare in Dart with strong types; more about behavior).

## Safer patterns

- Prefer **composition** when “is-a” is awkward.
- Prefer **sealed** or small interfaces when variants are closed and exhaustive.

## Practice tasks

- Find one `extends` where the child disables a parent method; sketch a composition-based replacement.
- Write a single function `void notify(Notifier n)` and list two implementations that are safely interchangeable.
- Read your favorite Liskov article once and relate it to one Flutter `Widget` subtype you use daily.
