# Collections: List, Set, Map

## Goal

Store many values safely with the right collection type.

## Step 1 - List (ordered, allows duplicates)

```dart
void main() {
  List<String> fruits = ['apple', 'banana', 'apple'];
  fruits.add('orange');
  print(fruits);
}
```

- Keeps insertion order.
- Duplicate values are allowed.

## Step 2 - Set (unique values only)

```dart
void main() {
  Set<String> tags = {'dart', 'beginner', 'dart'};
  tags.add('practice');
  print(tags);
}
```

- Duplicate values are removed automatically.

## Step 3 - Map (key -> value)

```dart
void main() {
  Map<String, int> scores = {'Asha': 90, 'Rafi': 82};
  scores['Nina'] = 88;
  print(scores['Asha']);
  print(scores);
}
```

- Use keys to find values quickly.
- Key and value types can be different.

## When to use which

| Type       | Use case                               |
| ---------- | -------------------------------------- |
| `List<T>`  | Ordered items, can repeat              |
| `Set<T>`   | Unique items only                      |
| `Map<K,V>` | Link one value to another using a key  |

## Practice tasks

- Store 5 names in a `List<String>`.
- Remove duplicates from a list by converting to `Set`.
- Create a `Map<String, double>` for product prices.
