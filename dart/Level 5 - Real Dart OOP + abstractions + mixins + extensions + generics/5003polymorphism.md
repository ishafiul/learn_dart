# Polymorphism

## Goal

Write code against a supertype so many subtypes can plug in without `if`/`switch` on concrete classes everywhere.

## Step 1 - One list, many types

```dart
abstract class Notifier {
  void send(String text);
}

class EmailNotifier implements Notifier {
  @override
  void send(String text) => print('email: $text');
}

class SmsNotifier implements Notifier {
  @override
  void send(String text) => print('sms: $text');
}

void notifyAll(List<Notifier> channels, String msg) {
  for (final c in channels) {
    c.send(msg);
  }
}

void main() {
  notifyAll([EmailNotifier(), SmsNotifier()], 'hello');
}
```

- `channels` is typed as `List<Notifier>`; each element uses its own `send`.

## Step 2 - Subtype substitution

- Where a `Notifier` is expected, any class that satisfies `Notifier` is allowed.
- The caller depends on the abstraction, not concrete classes.

## Good habit

- Push polymorphism to boundaries (services, repositories); keep leaf types small.

## Practice tasks

- Add `PushNotifier` and include it in `notifyAll` without changing `notifyAll`’s body.
- Replace the loop with `for (final c in channels) c.send(msg)` using a `void Function(String)` if you want to contrast object polymorphism with function values (optional).
