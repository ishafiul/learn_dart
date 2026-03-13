# Iteration and functional ops: map, where, fold

## Goal

Read, transform, filter, and summarize collection data.

## Step 1 - Simple iteration with for-in

```dart
void main() {
  List<int> numbers = [2, 4, 6];
  for (final n in numbers) {
    print(n);
  }
}
```

- Use `for-in` when you just need to read each item.

## Step 2 - map (transform each item)

```dart
void main() {
  List<int> numbers = [1, 2, 3];
  List<int> doubled = numbers.map((n) => n * 2).toList();
  print(doubled); // [2, 4, 6]
}
```

- `map` returns transformed values.

## Step 3 - where (filter items)

```dart
void main() {
  List<int> numbers = [1, 2, 3, 4, 5, 6];
  List<int> evens = numbers.where((n) => n.isEven).toList();
  print(evens); // [2, 4, 6]
}
```

- `where` keeps only items that match the condition.

## Step 4 - fold (combine into one result)

```dart
void main() {
  List<int> prices = [100, 250, 50];
  int total = prices.fold(0, (sum, item) => sum + item);
  print(total); // 400
}
```

- `fold` is useful for totals, counts, and summaries.

## Practice tasks

- Convert a `List<String>` to uppercase using `map`.
- Keep only words longer than 3 letters using `where`.
- Sum a list of expenses using `fold`.
