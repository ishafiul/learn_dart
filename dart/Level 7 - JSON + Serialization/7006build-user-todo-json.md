# Build: User and Todo `fromJson` / `toJson`

## Goal

Implement manual serialization for two models used together.

## Step 1 - User

```dart
class User {
  final String id;
  final String name;
  final String? email;

  User({required this.id, required this.name, this.email});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] as String,
      name: json['name'] as String,
      email: json['email'] as String?,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'email': email,
      };
}
```

## Step 2 - Todo (with `userId`)

```dart
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

void main() {
  final u = User(id: 'u1', name: 'Asha', email: 'a@b.com');
  final t = Todo(id: 't1', title: 'Learn JSON', userId: u.id);
  print(t.toJson());
}
```

## Practice tasks

- Add `DateTime? dueAt` stored in JSON as ISO-8601 strings (`toIso8601String` / `DateTime.tryParse`).
- Round-trip: `jsonEncode` then `jsonDecode` then `Todo.fromJson` and assert fields match.
- Omit `email` from `toJson` when null (use a small map built with conditional entries).
