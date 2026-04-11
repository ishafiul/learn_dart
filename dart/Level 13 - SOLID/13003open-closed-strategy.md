# Open/closed (**O**) and Strategy

## Goal

Add new behavior by introducing new types instead of editing a growing `switch`.

## Idea

- Core flow stays stable: “compute price,” “send notification,” “score risk.”
- Variations live in pluggable strategies (`implements` a small interface).

## Step shape

```dart
abstract class PricingStrategy {
  double quote(double base);
}

class StandardPricing implements PricingStrategy {
  @override
  double quote(double base) => base;
}

class MemberPricing implements PricingStrategy {
  @override
  double quote(double base) => base * 0.9;
}

class Checkout {
  final PricingStrategy pricing;
  Checkout(this.pricing);

  double total(double base) => pricing.quote(base);
}
```

- New member tier? Add `class VipPricing implements PricingStrategy` instead of editing `Checkout` internals.

## Practice tasks

- Replace a three-branch `if` on an enum with a `Map<Role, PricingStrategy>` or a small registry.
- Identify one `switch` that grows every sprint; sketch Strategy types for two branches only.
- Note when **O** is overkill: two branches that never grow can stay as `if`.
