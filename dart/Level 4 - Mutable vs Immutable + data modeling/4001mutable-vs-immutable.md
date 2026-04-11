# Mutable vs immutable

## Goal

Know what mutation is, why shared mutable state surprises you, and what “immutable” buys you.

## Step 1 - Mutable: state changes in place

```dart
void main() {
  List<int> a = [1, 2, 3];
  List<int> b = a;
  b.add(4);
  print(a);
  print(b);
}
```

- `a` and `b` refer to the same list. Changing through `b` changes what `a` “sees”.
- That is aliasing: two names, one object.

## Step 2 - Hidden bug shape

```dart
List<String> buildTags() {
  return ['dart', 'oop'];
}

void main() {
  List<String> mine = buildTags();
  List<String> yours = buildTags();
  mine.add('immutable');
  print(mine);
  print(yours);
}
```

- If `buildTags` returned a shared static list instead of a new list each time, `mine` and `yours` could stomp each other. Mutation + sharing is the footgun.

## Step 3 - Immutable mindset

- Immutable data: after you construct a value, you do not change its fields in place. You make a new value when something should differ.
- Benefits: easier reasoning, safer passing values around, fewer “who changed this?” bugs.

## Good habit

- When something is wrong, ask: “Who holds a reference?” and “Did anyone mutate shared state?”

## Practice tasks

- Predict output before running the `List<int> a = b` example.
- Find one place in your own code where you `.add` to a list that might be shared; decide whether to copy first (`List.of(...)`) or keep a single owner of mutation.
