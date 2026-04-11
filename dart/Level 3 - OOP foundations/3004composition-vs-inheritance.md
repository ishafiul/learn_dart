# Composition (has-a) vs inheritance (is-a)

## Goal

Model relationships clearly: “has a part” vs “is a kind of”.

## Step 1 - Composition: has-a

```dart
class Battery {
  int percent = 100;

  void drain(int n) {
    percent = percent - n;
    if (percent < 0) percent = 0;
  }
}

class Phone {
  final Battery battery = Battery();

  void use(int amount) {
    battery.drain(amount);
  }
}

void main() {
  Phone p = Phone();
  p.use(30);
  print(p.battery.percent);
}
```

- `Phone` has a `Battery`. The battery can be thought about on its own.
- Default first choice for reuse: compose smaller types inside larger ones.

## Step 2 - Inheritance: is-a

```dart
class Animal {
  void breathe() {
    print('breathing');
  }
}

class Dog extends Animal {
  void bark() {
    print('woof');
  }
}

void main() {
  Dog d = Dog();
  d.breathe();
  d.bark();
}
```

- `Dog` is a kind of `Animal`; shared behavior lives on the base class.
- Use when the subtype truly is the base type everywhere you pass the base type.

## Step 3 - Rule of thumb

- Favor composition when the relationship is “uses” or “contains”.
- Use inheritance when behavior is shared and the subtype substitutability story is clear.
- Deep inheritance trees get hard to change; shallow bases + composition often age better.

## Practice tasks

- Model `House` with composed `Room` objects (list or a few fields).
- Model `Vehicle` and `Bicycle extends Vehicle` with one shared method and one bike-only method.
- Sketch one design twice: once with only composition, once with inheritance, and note which feels clearer.
