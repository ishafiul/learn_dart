# Classes, objects, constructors, and `this`

## Goal

Model a thing in code with a class, create instances, and use constructors cleanly.

## Step 1 - Class and object

```dart
class Point {
  double x;
  double y;

  Point(this.x, this.y);
}

void main() {
  Point a = Point(1, 2);
  Point b = Point(4, 6);
  print('${a.x}, ${a.y}');
  print('${b.x}, ${b.y}');
}
```

- A class is a blueprint; `Point(1, 2)` is an object (instance).
- Fields `x` and `y` hold state for each instance.

## Step 2 - Named constructor

```dart
class User {
  String name;
  int age;

  User(this.name, this.age);

  User.guest()
      : name = 'Guest',
        age = 0;
}

void main() {
  User u1 = User('Asha', 20);
  User u2 = User.guest();
  print('${u1.name} ${u1.age}');
  print('${u2.name} ${u2.age}');
}
```

- Extra constructors give clear ways to create valid objects.

## Step 3 - `this` in methods

```dart
class Counter {
  int value = 0;

  void increment() {
    value = value + 1;
  }

  void add(int n) {
    this.value = this.value + n;
  }
}

void main() {
  Counter c = Counter();
  c.increment();
  c.add(5);
  print(c.value);
}
```

- Inside instance methods, `this` means the current object. You can omit `this` when there is no name clash.

## Good habit

- Keep constructors simple; push behavior into methods.
- Name classes with `PascalCase`, instances with `camelCase`.

## Practice tasks

- Add a `Rectangle` with `width`, `height`, and a method `double area()`.
- Add a `reset()` method on `Counter` that sets `value` to `0`.
- Create two instances of the same class and show their fields differ.
