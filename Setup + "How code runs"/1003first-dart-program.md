# First Dart program

## Goal

Understand `main()` and `print()`.

## Concept

Every Dart program starts at:

```dart
void main() {
  // code here runs first
}
```

## Tutorial steps

1. Write this in `main.dart`:

```dart
void main() {
  print('Hello Dart!');
}
```

2. Run it.
3. Change the message and run again.

## Quick rules

- Dart strings can use `'` or `"`
- Every statement ends with `;`

## Practice tasks

- Print your name
- Print your favorite food
- Print 3 lines (3 `print()` calls)

---

# How code runs (execution order)

## Goal

Understand top-to-bottom execution.

## Tutorial

Write:

```dart
void main() {
  print('1) Start');
  print('2) Middle');
  print('3) End');
}
```

Run and confirm the order of output.

## Practice tasks

- Make a "morning routine" log: Wake up, Brush, Breakfast
- Try rearranging lines and see how the output changes

---

# Comments

## Goal

Learn how to write notes in code.

## Types of comments

```dart
// Single line comment

/*
Multi-line comment
for bigger notes
*/
```

## Tutorial

Add comments above your prints:

```dart
void main() {
  // This is the start of my program
  print('Hello!');
}
```

## Practice task

Write a comment describing what your program does.

---

# Your first "bug" (syntax error)

## Goal

Get comfortable reading errors (don't fear them).

## Try this (intentionally wrong)

Remove a semicolon:

```dart
void main() {
  print('Hello')
}
```

## What you should notice

- Error shows line number
- It complains about `;` or "Expected …"

## Fix it

Add the semicolon back.

## Practice

Make 2 different syntax mistakes on purpose and read the errors:

- Missing `)`
- Missing `}`

---

# Runtime error vs syntax error

## Goal

Know the difference.

## Syntax error (won't run)

Code is not valid Dart. The program won't compile or run.

## Runtime error (runs then crashes)

Example:

```dart
void main() {
  int a = 10;
  int b = 0;
  print(a ~/ b); // integer divide by zero
}
```

## Practice

Change `b` to 2, then 1, then 0. Observe what happens.

---

# Mini Project — "Hello + your name"

## Goal

Create a tiny program with multiple prints.

## Build

```dart
void main() {
  print('Hello!');
  print('My name is Shafiul.');
  print('I am learning Dart.');
}
```

## Upgrade ideas

- Add your city
- Add your goal (e.g., "I want to build apps")

---

# Mini Project - Simple calculator (hardcoded)

## Goal

Do basic math and print results.

```dart
void main() {
  int a = 12;
  int b = 4;

  print('a = $a, b = $b');
  print('a + b = ${a + b}');
  print('a - b = ${a - b}');
  print('a * b = ${a * b}');
  print('a / b = ${a / b}');
}
```

## Practice upgrades

- Change `int` to `double`
- Try `~/` (integer division)
- Try `%` (remainder/modulo)
