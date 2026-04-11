# Strategy: pricing and discount rules at runtime

## Goal

Swap how a cart is priced without editing the cart class every time marketing adds a rule.

## Overlap

- Same structural idea as **Open/closed** (Level 13). Here the focus is **runtime** selection of rules.

## Step 1 - Strategy interface

```dart
abstract class DiscountStrategy {
  double discount(double subtotal);
}

class NoDiscount implements DiscountStrategy {
  @override
  double discount(double subtotal) => 0;
}

class PercentOff implements DiscountStrategy {
  final double rate;
  PercentOff(this.rate);

  @override
  double discount(double subtotal) => subtotal * rate;
}

class FixedOff implements DiscountStrategy {
  final double amount;
  FixedOff(this.amount);

  @override
  double discount(double subtotal) {
    final d = amount;
    return d > subtotal ? subtotal : d;
  }
}
```

## Step 2 - Context

```dart
class Cart {
  final List<double> linePrices;
  DiscountStrategy strategy;

  Cart({required this.linePrices, required this.strategy});

  double subtotal() => linePrices.fold<double>(0, (a, b) => a + b);

  double total() {
    final s = subtotal();
    final d = strategy.discount(s);
    return s - d;
  }
}

void main() {
  final cart = Cart(
    linePrices: [10, 20],
    strategy: PercentOff(0.1),
  );
  print(cart.total());
  cart.strategy = FixedOff(25);
  print(cart.total());
}
```

## Practice tasks

- Add `class MemberTuesday implements DiscountStrategy` with a simple rule you invent.
- Load strategy from a string config (`none`, `percent:0.15`, `fixed:5`) in a tiny parser function.
- Ensure `discount` never returns negative or NaN; clamp in strategies or in `Cart.total`.
