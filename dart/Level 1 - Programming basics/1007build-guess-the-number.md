# Build: Guess-the-number game

## Goal

Use a fixed secret number, then compare user “guesses” with conditionals and a loop.

## Step 1 — Single guess

```dart
void main() {
  int secret = 7;
  int guess = 5;
  if (guess == secret) {
    print('Correct!');
  } else if (guess < secret) {
    print('Too low');
  } else {
    print('Too high');
  }
}
```

- Run for guess 5, 7, 10 and confirm outputs: Too low, Correct!, Too high.

## Step 2 — Multiple guesses with a loop (hardcoded)

```dart
void main() {
  int secret = 7;
  var guesses = [3, 7, 9, 5];
  for (int guess in guesses) {
    if (guess == secret) {
      print('$guess: Correct!');
      break;
    } else if (guess < secret) {
      print('$guess: Too low');
    } else {
      print('$guess: Too high');
    }
  }
}
```

- Use `break` to stop when the guess is correct.

## Step 3 — Limit attempts (e.g. 5 tries)

```dart
void main() {
  int secret = 7;
  var guesses = [3, 5, 8, 9, 7];
  int maxTries = 5;
  int tries = 0;
  for (int guess in guesses) {
    tries++;
    if (guess == secret) {
      print('Correct in $tries tries!');
      break;
    } else if (guess < secret) {
      print('Too low ($tries/$maxTries)');
    } else {
      print('Too high ($tries/$maxTries)');
    }
    if (tries >= maxTries) {
      print('No more tries. Secret was $secret');
      break;
    }
  }
}
```

- Track `tries` and stop after `maxTries` or on correct guess.

## Practice tasks

- Use a `while` loop and a list of “guesses” (or later, stdin) so the game runs until correct or max tries.
- Add a “hint”: after each wrong guess, print whether the secret is odd or even (using `secret % 2`).
