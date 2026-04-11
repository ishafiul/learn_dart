# Build: `String.isEmail` and `num.toCurrency()`

## Goal

Practice extensions for validation and display formatting.

## Step 1 - Email check (practical, not RFC-complete)

```dart
extension EmailCheck on String {
  bool get isEmail {
    final trimmed = trim();
    final at = trimmed.indexOf('@');
    if (at <= 0 || at == trimmed.length - 1) return false;
    return !trimmed.contains(' ');
  }
}

void main() {
  print('a@b.com'.isEmail);
  print('not-an-email'.isEmail);
}
```

## Step 2 - Currency-style string

```dart
extension CurrencyFormat on num {
  String toCurrency({String symbol = '\$', int fractionDigits = 2}) {
    final fixed = toStringAsFixed(fractionDigits);
    return '$symbol$fixed';
  }
}

void main() {
  print((19.5).toCurrency());
  print((1000).toCurrency(symbol: 'BDT ', fractionDigits: 0));
}
```

## Step 3 - Combine in a tiny UI string

```dart
String priceLine(String email, num price) {
  if (!email.isEmail) return 'bad email';
  return 'Receipt to $email: ${price.toCurrency()}';
}
```

## Practice tasks

- Tighten `isEmail` with a single `RegExp` you document as “demo-only”.
- Add `extension on String { String get normalizedEmail => trim().toLowerCase(); }` and use it before `isEmail`.
- Add `num.toPercent()` returning `"12%"` style strings from a `0.12` input.
