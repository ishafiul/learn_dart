# JSON as maps and lists in Dart

## Goal

Navigate decoded JSON with maps and lists without unsafe casts everywhere.

## Step 1 - Object shape

```dart
import 'dart:convert';

void main() {
  final raw = '''
  {
    "user": {"id": "1", "name": "Asha"},
    "tags": ["dart", "json"]
  }
  ''';
  final root = jsonDecode(raw) as Map<String, dynamic>;
  final user = root['user'] as Map<String, dynamic>;
  final tags = root['tags'] as List<dynamic>;
  print(user['name']);
  print(tags.first);
}
```

## Step 2 - List of objects

```dart
import 'dart:convert';

void main() {
  final raw = '[{"id":"1"},{"id":"2"}]';
  final list = jsonDecode(raw) as List<dynamic>;
  for (final item in list) {
    final m = item as Map<String, dynamic>;
    print(m['id']);
  }
}
```

## Step 3 - Prefer model types at the boundary

- Parse once into your `User`, `Todo`, etc., then the rest of the app uses strong types.

## Practice tasks

- Decode nested `{"data":{"items":[1,2,3]}}` and sum the items.
- Write a helper `Map<String, dynamic>? asMap(Object? value)` that returns null if not a map.
