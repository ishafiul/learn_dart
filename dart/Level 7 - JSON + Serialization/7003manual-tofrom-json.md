# Manual `toJson` and `fromJson`

## Goal

Convert between `Map<String, dynamic>` and your own classes explicitly.

## Step 1 - `toJson`

```dart
class User {
  final String id;
  final String name;

  User({required this.id, required this.name});

  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
      };
}
```

## Step 2 - `fromJson` factory

```dart
class User {
  final String id;
  final String name;

  User({required this.id, required this.name});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] as String,
      name: json['name'] as String,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
      };
}

void main() {
  final u = User.fromJson({'id': '1', 'name': 'Asha'});
  print(u.toJson());
}
```

## Step 3 - Nested model

```dart
class Profile {
  final String bio;
  Profile(this.bio);

  factory Profile.fromJson(Map<String, dynamic> json) {
    return Profile(json['bio'] as String);
  }

  Map<String, dynamic> toJson() => {'bio': bio};
}
```

- `User` can hold a `Profile` and delegate `toJson` / `fromJson` for the nested object.

## Practice tasks

- Add optional `email` (`String?`) and emit `null` or omit the key in `toJson` (pick one convention and stay consistent).
- Add `List<Todo>` on a `User` and serialize as a JSON array of objects.
