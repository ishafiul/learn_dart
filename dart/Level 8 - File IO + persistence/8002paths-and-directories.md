# Paths and directories (basics)

## Goal

Put files under a folder, create missing directories, and build path strings safely enough for exercises.

## Step 1 - Relative paths

```dart
import 'dart:io';

void main() {
  final dir = Directory('data');
  if (!dir.existsSync()) {
    dir.createSync(recursive: true);
  }
  final f = File('${dir.path}/app.json');
  f.writeAsStringSync('{}');
  print(f.absolute.path);
}
```

- `dir.path` is a string; `${dir.path}/app.json` works on POSIX and macOS. On Windows, backslashes appear in `path` from the platform.

## Step 2 - Current directory

```dart
import 'dart:io';

void main() {
  print(Directory.current.path);
}
```

## Step 3 - Parent and absolute

```dart
import 'dart:io';

void main() {
  final f = File('data/app.json');
  print(f.absolute.path);
}
```

## Good habit

- Keep a single place (constant or small config) for your data directory name.

## Practice tasks

- Create `data/backups/` and write a second file there.
- List files in a directory with `Directory('data').listSync()` and print names (handle `FileSystemEntity` types).
