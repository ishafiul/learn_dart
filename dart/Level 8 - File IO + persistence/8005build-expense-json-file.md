# Build: persist Expense tracker to JSON

## Goal

Store expenses and category totals in one JSON file, load on start, save after changes.

## Step 1 - Models

```dart
import 'dart:convert';

class Expense {
  final String id;
  final String category;
  final double amount;
  final String note;

  Expense({
    required this.id,
    required this.category,
    required this.amount,
    this.note = '',
  });

  factory Expense.fromJson(Map<String, dynamic> json) {
    return Expense(
      id: json['id'] as String,
      category: json['category'] as String,
      amount: (json['amount'] as num).toDouble(),
      note: json['note'] as String? ?? '',
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'category': category,
        'amount': amount,
        'note': note,
      };
}

class ExpenseLedger {
  final List<Expense> expenses;

  ExpenseLedger({required this.expenses});

  Map<String, double> totalsByCategory() {
    final m = <String, double>{};
    for (final e in expenses) {
      m[e.category] = (m[e.category] ?? 0) + e.amount;
    }
    return m;
  }

  factory ExpenseLedger.fromJson(Map<String, dynamic> json) {
    final raw = json['expenses'];
    if (raw is! List<dynamic>) {
      return ExpenseLedger(expenses: []);
    }
    final list = raw
        .map((e) => Expense.fromJson(e as Map<String, dynamic>))
        .toList();
    return ExpenseLedger(expenses: list);
  }

  Map<String, dynamic> toJson() => {
        'expenses': expenses.map((e) => e.toJson()).toList(),
      };
}
```

## Step 2 - File store

```dart
import 'dart:convert';
import 'dart:io';

class ExpenseFileStore {
  final File file;
  ExpenseFileStore(String path) : file = File(path);

  Future<ExpenseLedger> load() async {
    if (!await file.exists()) {
      return ExpenseLedger(expenses: []);
    }
    final raw = await file.readAsString();
    if (raw.trim().isEmpty) {
      return ExpenseLedger(expenses: []);
    }
    final decoded = jsonDecode(raw);
    if (decoded is! Map<String, dynamic>) {
      throw FormatException('root must be object');
    }
    return ExpenseLedger.fromJson(decoded);
  }

  Future<void> save(ExpenseLedger ledger) async {
    await file.writeAsString(jsonEncode(ledger.toJson()));
  }
}
```

## Step 3 - `main`

```dart
Future<void> main() async {
  await Directory('data').create(recursive: true);
  final store = ExpenseFileStore('data/expenses.json');
  var ledger = await store.load();
  final next = Expense(
    id: 'e-${ledger.expenses.length + 1}',
    category: 'food',
    amount: 12.5,
    note: 'lunch',
  );
  ledger = ExpenseLedger(expenses: [...ledger.expenses, next]);
  await store.save(ledger);
  print(ledger.totalsByCategory());
}
```

## Practice tasks

- Recompute totals in `toJson` as a `totals` map for quick inspection in the file, or keep only `expenses` and derive totals in code (pick one approach and document why).
- Add `void addExpense(Expense e)` on a small service class that loads, appends, saves.
- Handle `FormatException` by returning an empty ledger and logging a path to a backup file.
