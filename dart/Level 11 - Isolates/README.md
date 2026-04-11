# Level 11 - Isolates (Week 11)

## Goals

- Run CPU-heavy Dart work on another isolate without shared mutable memory.
- Choose `Isolate.run` or explicit `spawn` + ports when the job fits.
- Measure wins with `Stopwatch` instead of guessing.

## Step-by-step guides (order)

| #   | File                                                                 | Topic                              |
| --- | -------------------------------------------------------------------- | ---------------------------------- |
| 1   | [11001isolates-in-dart-vm.md](11001isolates-in-dart-vm.md)           | Isolates are Dart, not Flutter-only |
| 2   | [11002memory-and-message-passing.md](11002memory-and-message-passing.md) | Separate heaps and ports         |
| 3   | [11003when-to-use-isolates.md](11003when-to-use-isolates.md)         | CPU-bound vs async I/O             |
| 4   | [11004worker-isolate-pattern.md](11004worker-isolate-pattern.md)     | `Isolate.run` and worker results   |
| 5   | [11005build-json-parse-isolate.md](11005build-json-parse-isolate.md) | Build: heavy JSON-style work       |
| 6   | [11006build-prime-isolate.md](11006build-prime-isolate.md)           | Build: primes on a worker          |
| 7   | [11007build-isolate-benchmark.md](11007build-isolate-benchmark.md)   | Build: `Stopwatch` comparison      |
