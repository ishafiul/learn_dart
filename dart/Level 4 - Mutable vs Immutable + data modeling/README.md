# Level 4 - Mutable vs Immutable + data modeling (Week 4)

## Goals

- Prevent bugs by controlling how state changes.
- Model data with immutable types, `copyWith`, and value equality where it matters.

## Step-by-step guides (order)

| #   | File                                                                 | Topic                                              |
| --- | -------------------------------------------------------------------- | -------------------------------------------------- |
| 1   | [4001mutable-vs-immutable.md](4001mutable-vs-immutable.md)           | Mutable vs immutable; mutation and hidden bugs     |
| 2   | [4002final-and-immutable-classes.md](4002final-and-immutable-classes.md) | `final` fields and immutable classes           |
| 3   | [4003copywith-manual.md](4003copywith-manual.md)                     | Manual `copyWith` pattern                          |
| 4   | [4004equals-hashcode.md](4004equals-hashcode.md)                     | `==`, `hashCode`, and collections                  |
| 5   | [4005build-immutable-user-product-order-item.md](4005build-immutable-user-product-order-item.md) | Build: immutable User, Product, OrderItem |
| 6   | [4006build-copywith-manual.md](4006build-copywith-manual.md)         | Build: implement `copyWith()` manually             |
| 7   | [4007build-immutability-equality-checks.md](4007build-immutability-equality-checks.md) | Build: checks after copyWith + value equality |
