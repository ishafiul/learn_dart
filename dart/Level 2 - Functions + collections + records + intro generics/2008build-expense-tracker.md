# Build: Expense tracker with category totals

## Goal

Use `Map<String, double>` and `fold` to track and total expenses.

## Step 1 - Store expenses

```dart
void main() {
  Map<String, double> expenses = {
    'Food': 250.0,
    'Transport': 120.0,
    'Food': 300.0,
  };
  print(expenses);
}
```

- A `Map` cannot keep duplicate keys. Latest value replaces older one.

## Step 2 - Better approach: list of entries

```dart
void main() {
  List<Map<String, Object>> entries = [
    {'category': 'Food', 'amount': 250.0},
    {'category': 'Transport', 'amount': 120.0},
    {'category': 'Food', 'amount': 300.0},
  ];
  print(entries);
}
```

## Step 3 - Create category totals map

```dart
Map<String, double> categoryTotals(List<Map<String, Object>> entries) {
  Map<String, double> totals = {};
  for (final item in entries) {
    final category = item['category'] as String;
    final amount = item['amount'] as double;
    totals[category] = (totals[category] ?? 0) + amount;
  }
  return totals;
}
```

## Step 4 - Compute grand total with fold

```dart
double grandTotal(Map<String, double> totals) {
  return totals.values.fold(0, (sum, value) => sum + value);
}
```

## Practice tasks

- Add `Education` and `Bills` entries.
- Print each category total.
- Print grand total at the end.
