# When to use isolates

## Goal

Use isolates for parallel CPU work, not as a replacement for `async` I/O.

## Async I/O already yields

- Network, disk, and timers schedule callbacks on the same isolate’s event loop. `await` does not create a new thread for I/O.

## CPU-bound examples

- Large JSON/XML decode and transform, cryptography, compression, big `List` crunching, some image or audio processing (often via native plugins too).

## When not to bother

- Tiny computations where isolate startup and message copy cost more than the work itself.
- Operations dominated by waiting on external systems; measure first.

## Rule of thumb

- If `Stopwatch` shows hundreds of milliseconds or more of pure Dart CPU on the hot path, consider an isolate or algorithm change.

## Practice tasks

- Profile one expensive loop with `Stopwatch` and record whether most time is CPU or waiting.
- List two tasks in a typical mobile app that are often offloaded (even if implemented in native code).
