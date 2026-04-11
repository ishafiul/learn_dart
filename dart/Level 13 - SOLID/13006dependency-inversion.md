# Dependency inversion (**D**)

## Goal

High-level policy depends on abstractions; concrete IO sits behind them.

## Pattern

- `UserService` takes `UserRepository` (abstract), not `SqlUserRepository`.
- Construct concrete repos in `main`, tests, or a composition root.

## Compared to **I**

- **I** shrinks what clients see.
- **D** flips the dependency direction so domain code does not point at infrastructure types.

## Construction

- Manual constructor injection is enough for learning.
- Containers and codegen come later (Level 15 in this roadmap).

## Practice tasks

- Change one `new ConcreteRepo()` inside a service to a constructor parameter; update `main` to pass the concrete type.
- Add a second implementation (fake or file-based) without editing the service body.
- Draw arrows: `Service -> Repository (abstract) <- SqlRepository`.
