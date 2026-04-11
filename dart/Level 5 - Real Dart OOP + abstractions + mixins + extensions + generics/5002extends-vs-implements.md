# `extends` vs `implements`

## Goal

Know when to inherit implementation versus redeclare an entire interface.

## Step 1 - `extends` (single superclass)

```dart
class Animal {
  void breathe() => print('breathing');
}

class Dog extends Animal {
  void bark() => print('woof');
}

void main() {
  Dog d = Dog();
  d.breathe();
}
```

- You get superclass methods and fields. Override with `@override` when you replace behavior.

## Step 2 - `implements` (no inherited body)

```dart
class Console {
  void write(String s) => print(s);
}

class FileSink implements Console {
  @override
  void write(String s) {
    print('[file] $s');
  }
}

void main() {
  Console c = FileSink();
  c.write('hi');
}
```

- `FileSink` must provide every member of `Console` even if `Console` had defaults (those defaults are not copied via `implements`).

## Step 3 - Rules of thumb

- `extends`: true subtype, reuse and specialize behavior.
- `implements`: adapt an existing class shape, or satisfy multiple interfaces.
- Dart allows only one `extends`; you can `implements` many types.

## Practice tasks

- Make an `abstract class Storage` with `void save(String key, String value)` and `String? load(String key)`. Implement it twice: `MemoryStorage` and `LoggingStorage` that delegates to another `Storage`.
- Compare: `extends` a class with a non-empty method body vs `implements` the same class; note what you must reimplement.
