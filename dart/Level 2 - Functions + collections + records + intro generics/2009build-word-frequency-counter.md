# Build: Word frequency counter

## Goal

Count how many times each word appears using `Map<String, int>`.

## Step 1 - Input text and split words

```dart
void main() {
  String text = 'dart is fun and dart is fast';
  List<String> words = text.split(' ');
  print(words);
}
```

## Step 2 - Count frequencies

```dart
Map<String, int> countWords(List<String> words) {
  Map<String, int> result = {};
  for (final word in words) {
    result[word] = (result[word] ?? 0) + 1;
  }
  return result;
}
```

## Step 3 - Print results

```dart
void printCounts(Map<String, int> counts) {
  counts.forEach((word, count) {
    print('$word -> $count');
  });
}
```

## Step 4 - (Optional) basic cleanup

- Convert text to lowercase before split.
- Remove commas/periods if needed for cleaner counting.

## Practice tasks

- Try with a longer paragraph.
- Find the most frequent word.
- Ignore common words like `the`, `is` (optional).
