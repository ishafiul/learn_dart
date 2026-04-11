# `dart:convert`: `jsonEncode` and `jsonDecode`

## Goal

Turn Dart values into JSON text and parse JSON text into Dart values.

## Step 1 - Encode

```dart
import 'dart:convert';

void main() {
  final map = {'name': 'Asha', 'score': 10};
  final text = jsonEncode(map);
  print(text);
}
```

- JSON object keys become strings. Dart `Map` keys must be strings for `jsonEncode` (or it throws).

## Step 2 - Decode

```dart
import 'dart:convert';

void main() {
  final text = '{"name":"Asha","score":10}';
  final value = jsonDecode(text);
  print(value.runtimeType);
  print((value as Map)['name']);
}
```

- `jsonDecode` returns `Object?` at compile time; at runtime you usually get `Map<String, dynamic>`, `List<dynamic>`, `String`, `num`, `bool`, or `null`.

## Step 3 - Pretty print (optional)

```dart
import 'dart:convert';

void main() {
  const encoder = JsonEncoder.withIndent('  ');
  print(encoder.convert({'a': 1, 'b': [2, 3]}));
}
```

## Good habit

- Treat decoded data as untrusted: validate shape before using as your model.

## Practice tasks

- Encode a `List` of maps and decode it back, then assert list length.
- Try `jsonDecode('{bad')` in `try`/`catch` and print `FormatException`.
