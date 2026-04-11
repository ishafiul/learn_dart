# Missing and invalid JSON fields

## Goal

Read partial or malformed JSON without throwing from blind `as` casts.

## Step 1 - Read with defaults

```dart
String readString(Map<String, dynamic> json, String key, [String fallback = '']) {
  final v = json[key];
  if (v is String) return v;
  return fallback;
}

int? readInt(Map<String, dynamic> json, String key) {
  final v = json[key];
  if (v is int) return v;
  if (v is num) return v.toInt();
  return null;
}
```

## Step 2 - `Result` or exceptions at the model boundary

Use `readString` from step 1 in the same file.

```dart
class User {
  final String id;
  final String name;
  User({required this.id, required this.name});
}

class Result<T> {
  final T? value;
  final String? error;
  const Result.ok(this.value) : error = null;
  const Result.err(this.error) : value = null;
  bool get isOk => error == null;
}

Result<User> userFromJsonSafe(Map<String, dynamic> json) {
  final id = readString(json, 'id');
  final name = readString(json, 'name');
  if (id.isEmpty) return const Result.err('missing id');
  if (name.isEmpty) return const Result.err('missing name');
  return Result.ok(User(id: id, name: name));
}
```

## Step 3 - Type mismatch

- If the API sends `"id": 1` but you want `String`, convert explicitly: `json['id'].toString()` when `id` is `num`.

## Good habit

- One function owns parsing for each model; callers get `User` or a clear error, not raw maps.

## Practice tasks

- Implement `readBool` accepting `true`/`false`, `1`/`0`, `"yes"`/`"no"`.
- Return `Result<Todo>` when `title` is missing or not a string.
