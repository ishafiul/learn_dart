# Build: Order + OrderItem

## Goal

Model a cart-style order: header (`Order`) and lines (`OrderItem`) with composition.

## Step 1 - OrderItem

```dart
class OrderItem {
  final String productName;
  final double unitPrice;
  final int quantity;

  OrderItem({
    required this.productName,
    required this.unitPrice,
    required this.quantity,
  });

  double get lineTotal => unitPrice * quantity;
}
```

## Step 2 - Order holds items

```dart
class Order {
  final String id;
  final List<OrderItem> _items = [];

  Order(this.id);

  List<OrderItem> get items => List.unmodifiable(_items);

  void addLine(OrderItem item) {
    if (item.quantity <= 0) return;
    _items.add(item);
  }

  double get subtotal {
    double sum = 0;
    for (final i in _items) {
      sum = sum + i.lineTotal;
    }
    return sum;
  }

  int get itemCount {
    int n = 0;
    for (final i in _items) {
      n = n + i.quantity;
    }
    return n;
  }
}

void main() {
  Order o = Order('ORD-1');
  o.addLine(OrderItem(productName: 'Pen', unitPrice: 1.2, quantity: 3));
  o.addLine(OrderItem(productName: 'Book', unitPrice: 15.0, quantity: 1));
  print(o.subtotal);
  print(o.itemCount);
}
```

## Step 3 - Stretch ideas

- Add `void removeLine(int index)` or remove by product name.
- Add tax: `double totalWithTax(double rate)` where rate is `0.08` for 8%.

## Practice tasks

- Reject `addLine` when `unitPrice` is negative or not finite.
- Add `String summary()` returning id, line count, and subtotal on one string.
- Build two orders in `main` and print which has higher subtotal.
