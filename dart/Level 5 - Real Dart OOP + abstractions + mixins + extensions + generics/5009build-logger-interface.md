# Build: Logger interface with ConsoleLogger and FileLogger (fake)

## Goal

Depend on a `Logger` abstraction; swap sinks without changing callers.

## Step 1 - Interface

```dart
abstract class Logger {
  void info(String message);
  void error(String message);
}
```

## Step 2 - Console implementation

```dart
class ConsoleLogger implements Logger {
  @override
  void info(String message) => print('[INFO] $message');

  @override
  void error(String message) => print('[ERROR] $message');
}
```

## Step 3 - Fake file logger (no real I/O)

```dart
class FileLogger implements Logger {
  final String path;
  final List<String> lines = [];

  FileLogger(this.path);

  @override
  void info(String message) {
    lines.add('$path [INFO] $message');
  }

  @override
  void error(String message) {
    lines.add('$path [ERROR] $message');
  }
}
```

## Step 4 - Service uses `Logger`

```dart
class Greeter {
  final Logger log;
  Greeter(this.log);

  void hello(String name) {
    log.info('hello $name');
  }
}

void main() {
  Greeter(ConsoleLogger()).hello('Asha');
  FileLogger f = FileLogger('/tmp/app.log');
  Greeter(f).hello('Rafi');
  print(f.lines.join('\n'));
}
```

## Practice tasks

- Add `void warn(String message)` to `Logger` and update both implementations.
- Inject `Logger` into a second service (for example `UserService` that logs sign-in).
- Add `MultiLogger(List<Logger> sinks)` that forwards each method to every sink.
