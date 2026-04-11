# SOLID overview

## Goal

Use five complementary rules to keep modules understandable as they grow.

## The letters

- **S**ingle responsibility: one reason to change per type (cohesion).
- **O**pen/closed: extend behavior with new types instead of editing stable core logic (often Strategy or similar).
- **L**iskov substitution: subtypes honor the contract of the base type; callers must not special-case subclasses.
- **I**nterface segregation: many small interfaces beat one “do everything” type.
- **D**ependency inversion: high-level modules depend on abstractions; low-level details implement them.

## Misuse

- Turning every private method into a class “for S.”
- Abstracting before you have two real implementations “for D.”

## Practice tasks

- Pick one feature you own and name which letter would help most this week, and one letter that does not apply yet.
- Read [SOLID - Wikipedia](https://en.wikipedia.org/wiki/SOLID) once for the original intent behind each principle.
