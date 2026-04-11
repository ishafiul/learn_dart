# Build: immutable User, Product, OrderItem

## Goal

Define three value-style models with `final` fields and no mutating setters.

## Step 1 - User

```dart
class User {
  final String id;
  final String name;
  final String email;

  const User({
    required this.id,
    required this.name,
    required this.email,
  });
}

void main() {
  const User u = User(id: '1', name: 'Asha', email: 'a@example.com');
  print(u.name);
}
```

## Step 2 - Product

```dart
class Product {
  final String sku;
  final String name;
  final double price;

  const Product({
    required this.sku,
    required this.name,
    required this.price,
  });
}
```

## Step 3 - OrderItem

```dart
class OrderItem {
  final String productSku;
  final int quantity;
  final double unitPrice;

  const OrderItem({
    required this.productSku,
    required this.quantity,
    required this.unitPrice,
  });

  double get lineTotal => unitPrice * quantity;
}
```

## Step 4 - Wire in `main`

```dart
void main() {
  const User u = User(id: '1', name: 'Asha', email: 'a@example.com');
  const Product p = Product(sku: 'SKU-1', name: 'Mug', price: 9.99);
  const OrderItem line = OrderItem(
    productSku: p.sku,
    quantity: 2,
    unitPrice: p.price,
  );
  print('${u.name} buys ${line.quantity} for ${line.lineTotal}');
}
```

## Practice tasks

- Add lightweight validation in factories or constructors (reject empty `sku`, non-positive `quantity`) using `ArgumentError` or early returns, still without mutable fields.
- Add `String describe()` on each type returning one readable line.
- Keep `OrderItem` independent of `Product` type (sku + prices only) vs hold a `Product` reference; try both and note tradeoffs.
