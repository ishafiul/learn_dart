# Build: Auditable mixin for `createdAt` / `updatedAt`

## Goal

Reuse timestamps across models with a `mixin` and a `touch` helper.

## Step 1 - Mixin

```dart
mixin Auditable {
  late DateTime createdAt;
  DateTime? updatedAt;

  void initAudit() {
    createdAt = DateTime.now();
  }

  void touch() {
    updatedAt = DateTime.now();
  }
}
```

## Step 2 - Apply to a model

```dart
class Task with Auditable {
  String title;

  Task(this.title) {
    initAudit();
  }

  void rename(String next) {
    title = next;
    touch();
  }
}

void main() {
  Task t = Task('learn mixins');
  print(t.createdAt);
  t.rename('learn Dart');
  print(t.updatedAt);
}
```

## Step 3 - Optional constructor pattern

- If you prefer not to call `initAudit()` manually, use a factory or a small `AuditableModel` base class that calls it from an initializer list (tradeoffs apply).

## Practice tasks

- Add `Duration? get age => DateTime.now().difference(createdAt)` as a getter on the mixin.
- Add a second type `Note with Auditable` and verify each instance has its own timestamps.
- Guard `touch` so it does nothing if `title` did not actually change (compare in `rename`).
