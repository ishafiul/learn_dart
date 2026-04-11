# Build: save and load Todo list as JSON (in-memory string)

## Goal

Serialize `List<Todo>` to a single JSON string and rebuild the list from that string.

## Step 1 - Encode list

```dart
import 'dart:convert';

class Todo {
  final String id;
  final String title;
  final bool done;
  final String userId;

  Todo({
    required this.id,
    required this.title,
    this.done = false,
    required this.userId,
  });

  factory Todo.fromJson(Map<String, dynamic> json) {
    return Todo(
      id: json['id'] as String,
      title: json['title'] as String,
      done: json['done'] as bool? ?? false,
      userId: json['userId'] as String,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'title': title,
        'done': done,
        'userId': userId,
      };
}

String todosToJsonString(List<Todo> todos) {
  final list = todos.map((t) => t.toJson()).toList();
  return jsonEncode(list);
}
```

## Step 2 - Decode list

```dart
List<Todo> todosFromJsonString(String raw) {
  final decoded = jsonDecode(raw);
  if (decoded is! List<dynamic>) {
    throw FormatException('expected JSON array');
  }
  return decoded
      .map((e) => Todo.fromJson(e as Map<String, dynamic>))
      .toList();
}

void main() {
  final original = [
    Todo(id: '1', title: 'a', userId: 'u1'),
    Todo(id: '2', title: 'b', done: true, userId: 'u1'),
  ];
  final text = todosToJsonString(original);
  final restored = todosFromJsonString(text);
  print(text);
  print(restored.length);
}
```

## Step 3 - In-memory “persistence”

- Keep `String storage` in a variable or tiny class field; assign `todosToJsonString` after edits, call `todosFromJsonString` when loading.
- Level 8 moves the same string to a real file.

## Practice tasks

- Wrap `todosFromJsonString` in `Result<List<Todo>>` and map `FormatException` and cast failures to messages.
- Add schema version key: encode `{"v":1,"items":[...]}` and read both old raw array and new object for backward compatibility.
- Pretty-print with `JsonEncoder.withIndent('  ')` when saving for readable diffs in exercises.
