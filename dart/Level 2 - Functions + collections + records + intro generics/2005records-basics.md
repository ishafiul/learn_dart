# Records: positional, named, destructuring

## Goal

Return multiple related values from a function without creating a class.

## Step 1 - Positional record

```dart
(int, String) getStatus() {
  return (200, 'OK');
}

void main() {
  var result = getStatus();
  print(result.$1); // 200
  print(result.$2); // OK
}
```

- Positional record values are accessed with `$1`, `$2`, etc.

## Step 2 - Named record

```dart
({int code, String message}) getStatusNamed() {
  return (code: 200, message: 'Success');
}

void main() {
  var result = getStatusNamed();
  print(result.code);
  print(result.message);
}
```

- Named records are clearer for readability.

## Step 3 - Destructuring

```dart
(int, int) minMax(List<int> nums) {
  int min = nums.reduce((a, b) => a < b ? a : b);
  int max = nums.reduce((a, b) => a > b ? a : b);
  return (min, max);
}

void main() {
  var (smallest, largest) = minMax([4, 8, 1, 9]);
  print('min: $smallest, max: $largest');
}
```

- Destructuring unpacks record values into variables.

## When to use records

- Good for small helper returns (min/max, code/message).
- For big data models, use a class instead.

## Practice tasks

- Return `(firstName, lastName)` from a function.
- Return named record `({double min, double max, double avg})`.
- Destructure and print each value.
