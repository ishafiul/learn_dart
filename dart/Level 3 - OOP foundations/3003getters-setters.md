# Getters and setters (use only when needed)

## Goal

Expose computed values or validated updates without turning every field into a free-for-all.

## Step 1 - Getter

```dart
class Circle {
  double radius;

  Circle(this.radius);

  double get area => 3.14159 * radius * radius;
}

void main() {
  Circle c = Circle(2);
  print(c.area);
}
```

- `get area` looks like a property but runs code each time it is read.

## Step 2 - Setter with validation

```dart
class Temperature {
  double _celsius = 0;

  double get celsius => _celsius;

  set celsius(double value) {
    if (value < -273.15) {
      throw ArgumentError('Too cold');
    }
    _celsius = value;
  }
}

void main() {
  Temperature t = Temperature();
  t.celsius = 20;
  print(t.celsius);
}
```

- Setters are for when assignment should run checks or side effects.

## Step 3 - Prefer simple fields first

- If there is no extra logic, use a normal field (or `final` when it never changes).
- Add getters/setters when you need computation, validation, or a stable API while internals change.

## Good habit

- Do not add getters/setters “just in case”; YAGNI applies.

## Practice tasks

- Add a `Rectangle` with `width` and `height` and a getter `perimeter`.
- Add a `Username` class that stores `_value` and rejects empty strings in the setter.
- Replace a redundant `getX`/`setX` pair with a public `final` field if nothing special happens on read/write.
