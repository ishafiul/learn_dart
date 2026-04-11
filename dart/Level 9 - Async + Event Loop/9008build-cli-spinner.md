# Build: CLI loading spinner with timers

## Goal

Show activity on the terminal while a `Future` runs, using `Timer.periodic`.

## Step 1 - Spinner frames

```dart
import 'dart:async';
import 'dart:io';

Future<void> withSpinner(Future<void> work) async {
  const frames = ['|', '/', '-', '\\'];
  var i = 0;
  final timer = Timer.periodic(const Duration(milliseconds: 120), (_) {
    stdout.write('\r${frames[i % frames.length]} loading...');
    i++;
  });
  try {
    await work;
  } finally {
    timer.cancel();
    stdout.write('\r');
    stdout.writeln('done.        ');
  }
}

Future<void> slowWork() async {
  await Future.delayed(const Duration(seconds: 2));
}

Future<void> main() async {
  await withSpinner(slowWork());
}
```

## Step 2 - One-line progress

- Replace frames with a growing `.` sequence or a numeric counter if you prefer minimal output.

## Practice tasks

- Pass a `String message` into `withSpinner` and show it after the frame.
- If `work` throws, print the error on a new line after clearing the spinner line.
- Use `Future.any` with a timeout future to stop waiting and cancel the timer on timeout.
