# Build: stream-based file line processing

## Goal

Read a text file as a stream of lines without loading the whole file into memory at once.

## VM only

- Uses `dart:io` `File`.

## Step 1 - Line stream

```dart
import 'dart:convert';
import 'dart:io';

Stream<String> linesOf(File file) {
  return file.openRead().transform(utf8.decoder).transform(const LineSplitter());
}
```

## Step 2 - Process with `await for`

```dart
import 'dart:convert';
import 'dart:io';

Future<void> main() async {
  final f = File('sample.txt');
  await f.writeAsString('one\ntwo\nthree\n');
  await for (final line in linesOf(f)) {
    if (line.trim().isEmpty) continue;
    print('line: $line');
  }
}

Stream<String> linesOf(File file) {
  return file.openRead().transform(utf8.decoder).transform(const LineSplitter());
}
```

## Step 3 - Transform pipeline

```dart
import 'dart:convert';
import 'dart:io';

Future<void> main() async {
  final f = File('sample.txt');
  await f.writeAsString('alpha\nBETA\nGamma\n');
  final upperCount = await linesOf(f)
      .map((s) => s.trim())
      .where((s) => s.isNotEmpty)
      .where((s) => s == s.toUpperCase())
      .fold<int>(0, (c, _) => c + 1);
  print(upperCount);
}

Stream<String> linesOf(File file) {
  return file.openRead().transform(utf8.decoder).transform(const LineSplitter());
}
```

## Practice tasks

- Count lines matching a prefix using `where` and `fold<int>(0, (c, _) => c + 1)` without collecting a `List`.
- On `FileSystemException`, print a friendly message and exit with non-zero code from `main`.
- Split work: first stream that only validates UTF-8, then map to a small record `(int lineNo, String text)` with `asyncMap` or an indexed helper.
