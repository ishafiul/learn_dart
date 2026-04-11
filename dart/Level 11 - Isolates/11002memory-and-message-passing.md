# Separate memory and message passing

## Goal

Understand why you cannot pass a mutable object by reference to another isolate.

## No shared heap

- Each isolate has its own allocator. A `List` or `Map` in isolate A is not visible to isolate B unless you send a copy or use special transfer rules.

## What you can send

- Messages are usually copies of immutable-friendly data: numbers, bools, `null`, strings, lists and maps of sendable values, `SendPort`, and `TransferableTypedData` for byte buffers (advanced).

## Ports

- `ReceivePort` listens for messages. `SendPort` targets a specific receive port. You pass a `SendPort` to the worker so it can reply.

## Good habit

- Keep messages small and plain. Huge structures cost copy time; sometimes chunking or files + paths is better.

## Practice tasks

- Try to send a `void Function()` closure through a `SendPort` in a toy example and read the error or documentation explaining why it fails.
- Contrast “copy message” overhead with “seconds of CPU” for a heavy parse; when is copying cheap enough?
