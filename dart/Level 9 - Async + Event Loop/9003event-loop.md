# Event loop (high level)

## Goal

Picture how Dart runs your code when futures, timers, and I/O complete.

## One isolate, one thread of execution

- Dart code on an isolate runs in a single logical thread. Only one chunk of Dart runs at a time.
- When you `await`, the current function suspends and other scheduled work can run.

## What the event loop does

- When synchronous work finishes, the runtime looks for more work: microtasks first, then events (timers, I/O completions, message callbacks).
- Each callback runs to completion unless it hits `await`, which yields back to the loop.

## Futures and scheduling

- `Future(() => print('later'))` schedules work on the event queue.
- Completing a future runs registered `then` callbacks and continuations after `await` when their turn comes.

## Good habit

- Long synchronous loops starve timers and I/O callbacks; keep heavy CPU off the hot path or move it (Level 11 isolates preview).

## Practice tasks

- Print before and after `Future(() => print('inside'))` and predict order; run to confirm.
- Read the official async-await documentation page and write one sentence in your own words describing “continuation” after `await`.
