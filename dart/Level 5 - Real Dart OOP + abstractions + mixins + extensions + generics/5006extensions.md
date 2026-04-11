# Extensions: `extension on ...`

## Goal

Add methods and getters to existing types (including SDK types) without subclassing.

## Step 1 - Extension method

```dart
extension StringRepeat on String {
  String repeatTimes(int n) {
    return List.filled(n, this).join();
  }
}

void main() {
  print('ha'.repeatTimes(3));
}
```

## Step 2 - Getter on `int`

```dart
extension IntChecks on int {
  bool get isEven => this % 2 == 0;
}

void main() {
  print(4.isEven);
}
```

## Step 3 - Scope and hiding

- Extensions apply when imported; name clashes resolve by `hide`/`show` or prefixing the import.
- They are static sugar: not true runtime subtyping (`dynamic` will not find your extension without a cast).

## Good habit

- Use for ergonomics (`isBlank`, formatting), not for core domain rules that belong in model types.

## Practice tasks

- Add `extension on List<T> { T? get secondOrNull => length > 1 ? this[1] : null; }` and try on `[1]` and `[1, 2]`.
- Add `extension on String { bool get isEmptyOrWhitespace => trim().isEmpty; }` (reimplement without calling `isEmpty` on raw string if you want stricter whitespace-only behavior).
