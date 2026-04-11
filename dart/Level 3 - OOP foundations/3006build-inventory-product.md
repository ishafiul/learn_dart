# Build: Inventory with Product items

## Goal

Model stock with a `Product` class and an `Inventory` that holds many products.

## Step 1 - Product

```dart
class Product {
  final String sku;
  String name;
  double price;
  int quantity;

  Product({
    required this.sku,
    required this.name,
    required this.price,
    this.quantity = 0,
  });
}
```

## Step 2 - Inventory by SKU

```dart
class Inventory {
  final Map<String, Product> _bySku = {};

  void addProduct(Product p) {
    _bySku[p.sku] = p;
  }

  Product? find(String sku) => _bySku[sku];

  void restock(String sku, int n) {
    final p = _bySku[sku];
    if (p == null || n <= 0) return;
    p.quantity = p.quantity + n;
  }

  bool sell(String sku, int n) {
    final p = _bySku[sku];
    if (p == null || n <= 0 || p.quantity < n) return false;
    p.quantity = p.quantity - n;
    return true;
  }

  List<Product> get all => List.unmodifiable(_bySku.values);
}

void main() {
  Inventory inv = Inventory();
  inv.addProduct(Product(sku: 'A1', name: 'Notebook', price: 2.5, quantity: 10));
  inv.restock('A1', 5);
  inv.sell('A1', 3);
  print(inv.find('A1')?.quantity);
}
```

## Step 3 - Stretch ideas

- Add `double stockValue()` summing `price * quantity` for all products.
- Prevent duplicate `sku` on `addProduct` (replace vs error vs ignore).

## Practice tasks

- Add `removeProduct(String sku)` that deletes from the map.
- Add `List<Product> lowStock(int maxQty)` returning products where `quantity <= maxQty`.
- Print a table: sku, name, qty, line value (`price * quantity`).
