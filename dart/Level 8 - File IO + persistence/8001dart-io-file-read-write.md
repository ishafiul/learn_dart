# `dart:io`: read and write files (sync)

## Goal

Create a `File`, check existence, and read or write text synchronously.

## VM and CLI

- `dart:io` works on the Dart VM (CLI, servers, Flutter desktop). It does not run in the browser.

## Step 1 - Write then read

```dart
import 'dart:io';

void main() {
  final f = File('hello.txt');
  f.writeAsStringSync('hello\n');
  final text = f.readAsStringSync();
  print(text);
}
```

## Step 2 - `existsSync` and append

```dart
import 'dart:io';

void main() {
  final f = File('log.txt');
  if (f.existsSync()) {
    f.writeAsStringSync('line\n', mode: FileMode.append);
  } else {
    f.writeAsStringSync('line\n');
  }
}
```

## Step 3 - Bytes (optional)

- `readAsBytesSync` / `writeAsBytesSync` for binary data.

## Good habit

- Sync I/O blocks the isolate; prefer async in real apps (next guide).

## Practice tasks

- Write a function `void ensureFileWithDefault(File f, String defaultText)` that creates the file with default content only if missing.
- Delete the test file with `deleteSync()` after experiments or use a dedicated `data/` folder.
