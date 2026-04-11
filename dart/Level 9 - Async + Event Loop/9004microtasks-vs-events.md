# Microtasks vs event queue

## Goal

Know that microtasks run before the next event, and why that matters for ordering.

## Step 1 - `scheduleMicrotask`

```dart
import 'dart:async';

void main() {
  print('1');
  scheduleMicrotask(() => print('3'));
  Future(() => print('4'));
  print('2');
}
```

- Typical output: `1`, `2`, `3`, `4`. Microtasks drain before the next event-queue task.

## Step 2 - Why it exists

- Some APIs schedule follow-up work that should run before other timers or I/O to keep internal invariants.
- Most application code should prefer `async`/`await` and `Future` over sprinkling microtasks.

## Step 3 - `Future.microtask`

```dart
Future<void> main() async {
  print('a');
  Future.microtask(() => print('c'));
  print('b');
}
```

## Good habit

- If ordering surprises you, log with timestamps; avoid relying on microtask ordering across packages.

## Practice tasks

- Interleave `scheduleMicrotask`, `Future(() {})`, and `Future.microtask` and sketch the print order before running.
- Find one Flutter or SDK API doc that mentions microtasks and note when they say to use them.
