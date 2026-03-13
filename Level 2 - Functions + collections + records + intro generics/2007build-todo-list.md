# Build: Todo list (in-memory)

## Goal

Practice functions + list operations by managing todos in memory.

## Step 1 - Start with a typed list

```dart
void main() {
  List<String> todos = [];
  todos.add('Learn functions');
  todos.add('Practice map/where');
  print(todos);
}
```

## Step 2 - Add helper functions

```dart
void addTodo(List<String> todos, String task) {
  todos.add(task);
}

void removeTodo(List<String> todos, String task) {
  todos.remove(task);
}
```

- Keep logic in functions, not all inside `main`.

## Step 3 - Mark done (simple style)

```dart
void markDone(List<String> done, String task) {
  done.add(task);
}
```

- For beginner level, use a second list for done tasks.

## Step 4 - Print with index

```dart
void printTodos(List<String> todos) {
  for (int i = 0; i < todos.length; i++) {
    print('${i + 1}. ${todos[i]}');
  }
}
```

## Practice tasks

- Add at least 5 tasks.
- Remove one task by value.
- Show `pending` and `done` lists separately.
