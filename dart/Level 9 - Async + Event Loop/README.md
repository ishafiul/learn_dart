# Level 9 - Async + Event Loop (Week 9)

## Goals

- Use `Future`, `async`, and `await` confidently.
- Combine futures with `wait`, timeouts, and retries.
- Picture the event loop, microtasks, and why heavy CPU work stalls async code.

## Step-by-step guides (order)

| #   | File                                                                 | Topic                                      |
| --- | -------------------------------------------------------------------- | ------------------------------------------ |
| 1   | [9001future-async-await.md](9001future-async-await.md)               | `Future`, `async` / `await`                |
| 2   | [9002future-wait-timeout.md](9002future-wait-timeout.md)             | `Future.wait`, `timeout`, basic retries      |
| 3   | [9003event-loop.md](9003event-loop.md)                             | Event loop (high level)                    |
| 4   | [9004microtasks-vs-events.md](9004microtasks-vs-events.md)           | Microtask queue vs event queue             |
| 5   | [9005blocking-the-isolate.md](9005blocking-the-isolate.md)           | CPU-heavy work and responsiveness          |
| 6   | [9006build-fake-api-client.md](9006build-fake-api-client.md)       | Build: fake API (delay + data)             |
| 7   | [9007build-retry-exponential-backoff.md](9007build-retry-exponential-backoff.md) | Build: retry + backoff            |
| 8   | [9008build-cli-spinner.md](9008build-cli-spinner.md)               | Build: CLI spinner with timers             |
