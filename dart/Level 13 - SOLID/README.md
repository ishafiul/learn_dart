# Level 13 - SOLID (Week 12–13)

Professional Engineering Track. Each letter is a lens for refactors, not a checklist to satisfy blindly.

## Goals

- Refactor toward single-purpose types, safe extension, and smaller, focused abstractions.
- Wire services to interfaces so implementations can swap (memory, file, API).

## Step-by-step guides (order)

| #   | File                                                                 | Topic                         |
| --- | -------------------------------------------------------------------- | ----------------------------- |
| 1   | [13001solid-overview.md](13001solid-overview.md)                     | SOLID map and misuse          |
| 2   | [13002single-responsibility.md](13002single-responsibility.md)       | **S** — split God classes     |
| 3   | [13003open-closed-strategy.md](13003open-closed-strategy.md)         | **O** — Strategy, extend      |
| 4   | [13004liskov-substitution.md](13004liskov-substitution.md)           | **L** — safe subtypes         |
| 5   | [13005interface-segregation.md](13005interface-segregation.md)       | **I** — smaller interfaces    |
| 6   | [13006dependency-inversion.md](13006dependency-inversion.md)         | **D** — depend on abstractions |
| 7   | [13007build-user-repository-service.md](13007build-user-repository-service.md) | Build: User module + `Repository<User>` |
