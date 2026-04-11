# Build: PaymentMethod with Bkash, Card, Cash

## Goal

Model payments behind one abstraction and swap implementations polymorphically.

## Step 1 - Abstract payment type

```dart
abstract class PaymentMethod {
  String get label;
  bool pay(double amount);
}
```

## Step 2 - Concrete methods

```dart
class BkashPayment implements PaymentMethod {
  final String phone;
  BkashPayment(this.phone);

  @override
  String get label => 'bKash $phone';

  @override
  bool pay(double amount) {
    print('bKash charge $amount to $phone');
    return amount > 0;
  }
}

class CardPayment implements PaymentMethod {
  final String last4;
  CardPayment(this.last4);

  @override
  String get label => 'Card ****$last4';

  @override
  bool pay(double amount) {
    print('Card charge $amount');
    return amount > 0;
  }
}

class CashPayment implements PaymentMethod {
  @override
  String get label => 'Cash';

  @override
  bool pay(double amount) {
    print('Cash received $amount');
    return amount >= 0;
  }
}
```

## Step 3 - Checkout

```dart
bool checkout(double total, PaymentMethod method) {
  print('Pay with ${method.label}');
  return method.pay(total);
}

void main() {
  checkout(120, BkashPayment('01700'));
  checkout(55.5, CardPayment('4242'));
  checkout(10, CashPayment());
}
```

## Practice tasks

- Add `bool refund(double amount)` to the abstraction with sensible fake behavior per type.
- Add `enum PaymentKind { bkash, card, cash }` and a factory `PaymentMethod? fromKind(PaymentKind k)` that returns a default instance for demos.
- Reject non-finite or negative totals in `checkout` before calling `pay`.
