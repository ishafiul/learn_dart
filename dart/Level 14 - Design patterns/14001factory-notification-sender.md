# Factory: notification sender chooser

## Goal

Centralize construction of `NotificationSender` implementations behind one API (`SenderFactory.create`).

## Step 1 - Types

```dart
enum SenderKind { email, sms, push }

abstract class NotificationSender {
  void send(String to, String body);
}

class EmailSender implements NotificationSender {
  @override
  void send(String to, String body) {
    print('email -> $to: $body');
  }
}

class SmsSender implements NotificationSender {
  @override
  void send(String to, String body) {
    print('sms -> $to: $body');
  }
}

class PushSender implements NotificationSender {
  @override
  void send(String to, String body) {
    print('push -> $to: $body');
  }
}
```

## Step 2 - Factory

```dart
class SenderFactory {
  static NotificationSender create(SenderKind kind) {
    return switch (kind) {
      SenderKind.email => EmailSender(),
      SenderKind.sms => SmsSender(),
      SenderKind.push => PushSender(),
    };
  }
}

void main() {
  final sender = SenderFactory.create(SenderKind.sms);
  sender.send('+1000', 'hello');
}
```

## When this fits

- Construction rules grow (config flags, A/B tests, environment).
- Call sites should not list every `new` variant.

## Practice tasks

- Add `SenderKind.console` that prints a tagged line for local dev.
- Throw `ArgumentError` for unsupported combinations when you add a second enum (for example `Region`).
- Replace `static create` with a top-level function `NotificationSender senderFor(SenderKind k)` and note readability tradeoffs.
