# Intro generics: typed collections and reusable functions

## Goal

Write reusable code that stays type-safe.

## Step 1 - Typed collections

```dart
void main() {
  List<int> numbers = [1, 2, 3];
  Map<String, int> scores = {'Asha': 90, 'Rafi': 82};
  print(numbers);
  print(scores);
}
```

- `List<int>` accepts only `int`.
- `Map<String, int>` means key is `String`, value is `int`.

## Step 2 - Type inference

```dart
void main() {
  var names = <String>['A', 'B'];
  var prices = <double>[9.99, 14.5];
  print(names);
  print(prices);
}
```

- Dart can infer types from values and generic hints.

## Step 3 - Simple generic function

```dart
T identity<T>(T value) {
  return value;
}

void main() {
  print(identity<int>(5));
  print(identity<String>('hello'));
}
```

- Same function works for many types.

## dynamic vs Object (basic)

- `dynamic`: no type checks at compile time, risky.
- `Object`: any object, but you must check/cast before specific use.
- Prefer concrete types first. Use `Object` if needed. Avoid `dynamic` unless required.

## Practice tasks

- Write `List<T> makePair<T>(T a, T b)` and return `[a, b]`.
- Create a typed map: `Map<String, double>`.
- Rewrite one `dynamic` variable into a safer specific type.
