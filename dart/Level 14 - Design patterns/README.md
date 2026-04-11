# Level 14 - Design patterns (Week 14–15)

Professional Engineering Track. Patterns are **named structures** for recurring problems; reach for them when duplication or coupling shows up, not by default.

## Goals

- Choose a factory when construction rules cluster.
- Model families of related objects with abstract factories.
- Publish state with Observer or streams.
- Know singleton tradeoffs and prefer DI for most services.
- Swap pricing rules at runtime with Strategy.

## Step-by-step guides (order)

| #   | File                                                                 | Topic                          |
| --- | -------------------------------------------------------------------- | ------------------------------ |
| 1   | [14001factory-notification-sender.md](14001factory-notification-sender.md) | Factory: `SenderFactory.create` |
| 2   | [14002abstract-factory-dev-prod.md](14002abstract-factory-dev-prod.md) | Abstract factory: Dev vs Prod |
| 3   | [14003observer-and-stream.md](14003observer-and-stream.md)           | Observer + stream bonus        |
| 4   | [14004singleton-and-alternatives.md](14004singleton-and-alternatives.md) | Singleton pitfalls + DI      |
| 5   | [14005strategy-pricing-discounts.md](14005strategy-pricing-discounts.md) | Strategy: pricing rules        |
