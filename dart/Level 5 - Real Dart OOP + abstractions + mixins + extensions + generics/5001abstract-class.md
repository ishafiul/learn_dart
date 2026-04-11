# Abstract class

## Goal

Define a type API that cannot be instantiated directly, forcing concrete subclasses.

## Step 1 - Abstract method

```dart
abstract class Shape {
  double area();
}

class Square extends Shape {
  final double side;
  Square(this.side);

  @override
  double area() => side * side;
}

void main() {
  Shape s = Square(3);
  print(s.area());
}
```

- `Shape` promises `area()` but does not implement it. Subtypes must.

## Step 2 - Abstract class with concrete members

```dart
abstract class Logger {
  void log(String message);

  void logError(String message) {
    log('ERROR: $message');
  }
}

class ConsoleLogger extends Logger {
  @override
  void log(String message) {
    print(message);
  }
}

void main() {
  Logger l = ConsoleLogger();
  l.logError('oops');
}
```

- Shared default behavior can live on the abstract class; hooks stay abstract.

## Good habit

- Use `abstract class` when you want both interface-like contracts and shared implementation.

## Practice tasks

- Add `Circle extends Shape` with `radius` and `area() => pi * radius * radius` (import `dart:math` for `pi` if you want).
- Try `Shape s = Shape();` and read the compile error.
