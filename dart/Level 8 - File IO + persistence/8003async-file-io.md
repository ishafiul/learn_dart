# Async file I/O

## Goal

Use `Future`-based APIs so file work does not block other async tasks on the same isolate.

## Step 1 - Read and write with `await`

```dart
import 'dart:io';

Future<void> main() async {
  final f = File('async_demo.txt');
  await f.writeAsString('one\n');
  final text = await f.readAsString();
  print(text.trim());
}
```

## Step 2 - Create directory asynchronously

```dart
import 'dart:io';

Future<void> ensureDataDir() async {
  final dir = Directory('data');
  if (!await dir.exists()) {
    await dir.create(recursive: true);
  }
}

Future<void> main() async {
  await ensureDataDir();
  final f = File('data/note.txt');
  await f.writeAsString('ok');
}
```

## Step 3 - Error handling

```dart
import 'dart:io';

Future<String?> readOptional(File f) async {
  try {
    if (!await f.exists()) return null;
    return await f.readAsString();
  } on FileSystemException catch (e) {
    print(e.message);
    return null;
  }
}
```

## Good habit

- Propagate `Future` from the entrypoint (`main` async) or use `then`; avoid mixing sync and async for the same file without a clear reason.

## Practice tasks

- Rewrite `ensureFileWithDefault` from the sync guide using `exists()` and `writeAsString`.
- Use `readAsString` with `try`/`catch` and return `Result<String>` from Level 6.
