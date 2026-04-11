# Final fields and immutable classes

## Goal

Use `final` instance fields so object identity stays tied to stable field values unless you replace the whole object.

## Step 1 - `final` field

```dart
class Point {
  final double x;
  final double y;

  const Point(this.x, this.y);
}

void main() {
  Point p = const Point(1, 2);
  print('${p.x}, ${p.y}');
}
```

- `final` means each instance sets the field once (in the constructor or initializer), then it cannot be reassigned.

## Step 2 - Not immutable if internals are mutable

```dart
class Bag {
  final List<String> items;

  Bag(this.items);
}

void main() {
  Bag b = Bag(['a']);
  b.items.add('b');
  print(b.items);
}
```

- The `Bag` reference does not replace `items`, but the list inside still mutates. True immutability often means `List.unmodifiable` or defensive copies (covered more in builds).

## Step 3 - Immutable class recipe (typical)

- All fields `final` (or getters over frozen data).
- No methods that mutate internal collections in place; return copies or new instances instead.
- `const` constructor when every field can be `const` (optional but nice for literals).

## Good habit

- Say “immutable at the field level” vs “deeply immutable”: they are different.

## Practice tasks

- Change `Point` so it is not `const` but still uses `final` fields with a normal constructor.
- Make a `Label` class with `final String text` only; try to assign `text` later and fix the error by using a new `Label` instead.
