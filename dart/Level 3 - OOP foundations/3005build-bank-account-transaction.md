# Build: BankAccount + Transaction

## Goal

Practice classes, constructors, and modeling money movement with a small domain model.

## Step 1 - Transaction type

```dart
class Transaction {
  final String id;
  final double amount;
  final DateTime at;

  Transaction({required this.id, required this.amount, required this.at});
}
```

- Immutable-looking transaction records are easy to log and inspect.

## Step 2 - Account with balance and history

```dart
class BankAccount {
  final String owner;
  double _balance = 0;
  final List<Transaction> _history = [];

  BankAccount(this.owner);

  double get balance => _balance;

  List<Transaction> get history => List.unmodifiable(_history);

  void deposit(double amount) {
    if (amount <= 0) return;
    _balance = _balance + amount;
    _history.add(Transaction(
      id: 'd${_history.length + 1}',
      amount: amount,
      at: DateTime.now(),
    ));
  }

  bool withdraw(double amount) {
    if (amount <= 0 || amount > _balance) return false;
    _balance = _balance - amount;
    _history.add(Transaction(
      id: 'w${_history.length + 1}',
      amount: -amount,
      at: DateTime.now(),
    ));
    return true;
  }
}

void main() {
  BankAccount acc = BankAccount('Asha');
  acc.deposit(100);
  acc.withdraw(30);
  print(acc.balance);
  for (final t in acc.history) {
    print('${t.id} ${t.amount} ${t.at}');
  }
}
```

## Step 3 - Stretch ideas

- Add a `transfer(BankAccount to, double amount)` on one account or a small `Bank` helper.
- Replace string ids with `int` counters or a tiny id generator.

## Practice tasks

- Reject deposits and withdrawals that are not finite numbers (optional: use `amount.isFinite`).
- Print a one-line summary: owner, balance, count of transactions.
- Add a method `double totalDeposits()` that sums positive `amount` values in history.
