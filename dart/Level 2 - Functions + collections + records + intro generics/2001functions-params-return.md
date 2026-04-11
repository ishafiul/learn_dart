# Functions: parameters and return values

## Goal

Write reusable code by moving repeated logic into functions.

## Step 1 - Function with no parameters

```dart
void sayHello() {
  print('Hello');
}

void main() {
  sayHello();
  sayHello();
}
```

- `void` means this function does not return a value.

## Step 2 - Function with parameters

```dart
void greet(String name) {
  print('Hello, $name');
}

void main() {
  greet('Shafi');
  greet('Maria');
}
```

- `name` is an input parameter.
- Function becomes reusable for different values.

## Step 3 - Function with return value

```dart
int add(int a, int b) {
  return a + b;
}

void main() {
  int sum = add(3, 4);
  print(sum);
}
```

- Return type (`int`) should match the returned value.

## Good habit

- One function should do one clear job.
- Use clear names: `calculateTotal`, `findMax`, `isValidEmail`.

## Practice tasks

- Write `int multiply(int a, int b)`.
- Write `bool isEven(int n)`.
- Write `String fullName(String first, String last)`.
