# Build: persist Todo list to a `.json` file

## Goal

Load todos when the program starts and save after changes, using the same JSON shape as Level 7.

## Step 1 - Minimal `Todo`

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
```

## Step 2 - Store with path

```dart
import 'dart:convert';
import 'dart:io';

class TodoFileStore {
  final File file;

  TodoFileStore(String path) : file = File(path);

  Future<List<Todo>> load() async {
    if (!await file.exists()) {
      return [];
    }
    final raw = await file.readAsString();
    if (raw.trim().isEmpty) {
      return [];
    }
    final decoded = jsonDecode(raw);
    if (decoded is! List<dynamic>) {
      throw FormatException('root must be array');
    }
    return decoded
        .map((e) => Todo.fromJson(e as Map<String, dynamic>))
        .toList();
  }

  Future<void> save(List<Todo> todos) async {
    final list = todos.map((t) => t.toJson()).toList();
    await file.writeAsString(jsonEncode(list));
  }
}
```

## Step 3 - `main` flow

```dart
Future<void> main() async {
  await Directory('data').create(recursive: true);
  final store = TodoFileStore('data/todos.json');
  var todos = await store.load();
  todos = [
    ...todos,
    Todo(id: 't-${todos.length + 1}', title: 'file io', userId: 'u1'),
  ];
  await store.save(todos);
  print(await store.load());
}
```

## Practice tasks

- Save after every mutation in small functions (`addTodo`, `toggleDone`) instead of batching in `main`.
- On `FormatException`, rename the bad file to `todos.broken.json` and start fresh with `[]`.
- Add `pretty` save using `JsonEncoder.withIndent('  ')`.
