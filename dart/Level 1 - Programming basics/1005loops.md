# Loops: for, while, break, continue

## Goal

Repeat code with for and while, and control flow with break and continue.

## Step 1 — for loop

```dart
void main() {
  for (int i = 0; i < 5; i++) {
    print(i);
  }
}
```

- `i = 0`: start; `i < 5`: condition; `i++`: step.
- Body runs while condition is true.

## Step 2 — for-in (when you have a collection later)

```dart
void main() {
  for (int i in [1, 2, 3, 4, 5]) {
    print(i);
  }
}
```

- Runs once per element (you’ll use this more with lists).

## Step 3 — while loop

```dart
void main() {
  int count = 0;
  while (count < 3) {
    print(count);
    count++;
  }
}
```

- Repeats while the condition is true.
- Ensure the condition eventually becomes false to avoid infinite loops.

## Step 4 — break (exit loop)

```dart
void main() {
  for (int i = 0; i < 10; i++) {
    if (i == 4) break;
    print(i);
  }
}
```

- Stops the loop as soon as `break` runs.

## Step 5 — continue (skip rest of iteration)

```dart
void main() {
  for (int i = 0; i < 5; i++) {
    if (i == 2) continue;
    print(i);
  }
}
```

- Skips the rest of the current iteration and goes to the next one.

## Practice tasks

- Use a for loop to print 1 to 10.
- Use a while loop to print "Hello" 3 times.
- Use a for loop and break to stop when you reach 7.
- Use a for loop and continue to print only odd numbers from 1 to 10.
