# Abstract factory: Dev vs Prod notification families

## Goal

Swap **whole families** of related senders (transactional vs marketing) per environment without `if (isProd)` scattered everywhere.

## Step 1 - Products

```dart
abstract class TransactionalSender {
  void sendReceipt(String userId, String orderId);
}

abstract class MarketingSender {
  void sendPromo(String userId, String campaign);
}
```

## Step 2 - Abstract factory

```dart
abstract class NotificationFamilyFactory {
  TransactionalSender transactional();
  MarketingSender marketing();
}
```

## Step 3 - Dev family

```dart
class ConsoleTransactional implements TransactionalSender {
  @override
  void sendReceipt(String userId, String orderId) {
    print('[dev][txn] $userId order $orderId');
  }
}

class ConsoleMarketing implements MarketingSender {
  @override
  void sendPromo(String userId, String campaign) {
    print('[dev][mkt] $userId campaign $campaign');
  }
}

class DevNotificationFactory implements NotificationFamilyFactory {
  @override
  TransactionalSender transactional() => ConsoleTransactional();

  @override
  MarketingSender marketing() => ConsoleMarketing();
}
```

## Step 4 - Prod family (fake)

```dart
class HttpTransactional implements TransactionalSender {
  @override
  void sendReceipt(String userId, String orderId) {
    print('[prod][txn] POST receipt $userId $orderId');
  }
}

class HttpMarketing implements MarketingSender {
  @override
  void sendPromo(String userId, String campaign) {
    print('[prod][mkt] POST promo $userId $campaign');
  }
}

class ProdNotificationFactory implements NotificationFamilyFactory {
  @override
  TransactionalSender transactional() => HttpTransactional();

  @override
  MarketingSender marketing() => HttpMarketing();
}
```

## Step 5 - App wiring

```dart
NotificationFamilyFactory factoryForEnv(String env) {
  return env == 'prod' ? ProdNotificationFactory() : DevNotificationFactory();
}

void main() {
  final f = factoryForEnv('dev');
  f.transactional().sendReceipt('u1', 'o9');
}
```

## Practice tasks

- Add `AuditSender` to both families and extend the abstract factory.
- Read one call site that still branches on `env`; collapse it to receive `NotificationFamilyFactory` only.
- Contrast **Factory method** (one product) vs this **Abstract factory** (product family) in two sentences.
