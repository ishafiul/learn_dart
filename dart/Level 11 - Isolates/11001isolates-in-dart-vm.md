# Isolates in the Dart VM (not Flutter-only)

## Goal

Treat isolates as a Dart language + runtime feature; Flutter only adds ergonomics on top.

## Dart VM and CLI

- `dart:isolate` works in command-line Dart, servers, and Flutter desktop or mobile when you need extra isolates.
- Flutter’s `compute` helper wraps isolate work for widgets; the underlying idea is the same.

## One default isolate

- Your program starts on the main isolate. Long synchronous CPU work there delays timers, stream events, and frame work on that isolate.

## Mental model

- An isolate is a separate memory space with its own event loop. You do not share mutable objects across isolates; you send messages or use APIs like `Isolate.run` that copy data in and out.

## Practice tasks

- Skim `dart:isolate` API docs and list three class names you saw besides `Isolate`.
- Note one Flutter API name that delegates to isolates for image decoding or JSON (search Flutter docs).
