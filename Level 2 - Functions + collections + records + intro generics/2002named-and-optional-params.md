# Named and optional parameters

## Goal

Call functions in a readable way and make some inputs optional.

## Step 1 - Named parameters

```dart
void createUser({required String name, required int age}) {
  print('User: $name ($age)');
}

void main() {
  createUser(name: 'Rafi', age: 20);
}
```

- Named parameters use braces `{}`.
- `required` means caller must pass that value.

## Step 2 - Optional named parameter with default value

```dart
void printGreeting(String name, {String title = 'Mr/Ms'}) {
  print('Hello $title $name');
}

void main() {
  printGreeting('Asha');
  printGreeting('Asha', title: 'Dr.');
}
```

- Default value is used when caller does not pass it.

## Step 3 - Optional positional parameter (basic)

```dart
String formatName(String first, [String? last]) {
  if (last == null) {
    return first;
  }
  return '$first $last';
}

void main() {
  print(formatName('Shafi'));
  print(formatName('Shafiul', 'Islam'));
}
```

- Optional positional parameters use `[]`.

## Quick rule

- Use named parameters for clarity.
- Use positional parameters for short, obvious inputs.

## Practice tasks

- Make a `register` function with required named params: `email`, `password`.
- Add an optional named param `isAdmin = false`.
- Make a function with one optional positional parameter.
