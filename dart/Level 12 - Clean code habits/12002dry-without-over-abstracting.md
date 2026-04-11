# DRY without over-abstracting

## Goal

Remove real duplication; keep harmless repetition when abstraction would cost clarity.

## When DRY helps

- The same bug fix would need to land in multiple places.
- Business rules drift when copied (`if (user.role == ...)` in five files).

## When duplication is fine

- Two pieces look similar today but are expected to diverge (different domains, different error policies).
- Extracting a helper would need many parameters or booleans to branch behavior (“boolean trap”).

## Rule of thumb

- First make the two copies **clear and correct**. If they still change together twice, extract a shared function or type.

## Practice tasks

- Find duplicated validation in your project; extract one function with a single responsibility.
- Find an abstraction you regret (too generic); inline or split into two specific helpers.
- Write one sentence describing the **rule** shared by extracted code, and put it in a doc comment on the helper.
