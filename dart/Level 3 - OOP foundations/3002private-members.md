# Private members: `_field`

## Goal

Hide implementation details so other code cannot change internal state by accident.

## Step 1 - Underscore means library-private

```dart
class Wallet {
  double _balance = 0;

  void deposit(double amount) {
    if (amount > 0) {
      _balance = _balance + amount;
    }
  }

  double get balance => _balance;
}

void main() {
  Wallet w = Wallet();
  w.deposit(10);
  print(w.balance);
}
```

- In Dart, privacy is per library (file), not per class.
- Names starting with `_` are visible only inside the same `.dart` file.

## Step 2 - Why use private fields

- You control how `_balance` changes (only through `deposit`, not random writes).
- You can change internals later without breaking callers if the public API stays stable.

## Step 3 - Same file, two classes

```dart
class Engine {
  void start() {
    print('vroom');
  }
}

class Car {
  final Engine _engine = Engine();

  void drive() {
    _engine.start();
  }
}

void main() {
  Car c = Car();
  c.drive();
}
```

- `Car` uses `Engine` as an implementation detail; `_engine` is not part of the public surface of `Car` from outside this library.

## Good habit

- Start public API small: methods and getters callers need, keep fields private when possible.

## Practice tasks

- Make a `SafeCounter` with private `_count`, public `increment()`, and a read-only way to see the count.
- Try moving `Wallet` into a second file and call `w._balance` from `main` there; note the analyzer error and why it appears.
