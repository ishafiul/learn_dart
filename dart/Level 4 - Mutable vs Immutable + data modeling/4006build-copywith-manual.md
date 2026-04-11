# Build: implement `copyWith()` manually

## Goal

Add `copyWith` to your immutable models without code generation.

## Step 1 - User with `copyWith`

```dart
class User {
  final String id;
  final String name;
  final String email;

  User({required this.id, required this.name, required this.email});

  User copyWith({String? id, String? name, String? email}) {
    return User(
      id: id ?? this.id,
      name: name ?? this.name,
      email: email ?? this.email,
    );
  }
}

void main() {
  User a = User(id: '1', name: 'Asha', email: 'old@example.com');
  User b = a.copyWith(email: 'new@example.com');
  print(a.email);
  print(b.email);
}
```

- `const` may no longer apply if you use non-const initial values; that is fine for this exercise.

## Step 2 - Product

```dart
class Product {
  final String sku;
  final String name;
  final double price;

  Product({required this.sku, required this.name, required this.price});

  Product copyWith({String? sku, String? name, double? price}) {
    return Product(
      sku: sku ?? this.sku,
      name: name ?? this.name,
      price: price ?? this.price,
    );
  }
}
```

## Step 3 - OrderItem

```dart
class OrderItem {
  final String productSku;
  final int quantity;
  final double unitPrice;

  OrderItem({
    required this.productSku,
    required this.quantity,
    required this.unitPrice,
  });

  OrderItem copyWith({String? productSku, int? quantity, double? unitPrice}) {
    return OrderItem(
      productSku: productSku ?? this.productSku,
      quantity: quantity ?? this.quantity,
      unitPrice: unitPrice ?? this.unitPrice,
    );
  }

  double get lineTotal => unitPrice * quantity;
}
```

## Practice tasks

- Add `copyWith` to a small `Address` type with `street`, `city`, `postalCode`.
- Change quantity from `2` to `5` via `copyWith` on an `OrderItem` and print `lineTotal` before and after (using two variables, not mutation).
