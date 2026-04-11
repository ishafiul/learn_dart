# Null-aware operators and avoiding `!`

## Goal

Read and write null-safe code with `?.`, `??`, and `??=` without defaulting to `!`.

## Step 1 - Conditional access `?.`

```dart
void main() {
  String? s = null;
  print(s?.length);
  s = 'hi';
  print(s?.length);
}
```

- If the receiver is `null`, the whole expression short-circuits to `null` (unless context requires promotion elsewhere).

## Step 2 - Coalesce `??`

```dart
void main() {
  String? a = null;
  String b = a ?? 'fallback';
  print(b);
}
```

- `??` picks the right side only when the left is `null`.

## Step 3 - Assign if null `??=`

```dart
void main() {
  String? cache;
  cache ??= 'loaded';
  cache ??= 'ignored';
  print(cache);
}
```

## Step 4 - Why avoid `!`

- `value!` tells the compiler “trust me, not null.” A wrong `!` throws at runtime.
- Replace with checks, early returns, `??`, or refactor APIs to return non-null when possible.

## Practice tasks

- Rewrite `String x = maybe!;` using `if (maybe != null) { ... }` with a local variable.
- Chain `user?.profile?.avatarUrl ?? 'default.png'` with nullable `user` and `profile`.
- Use `??=` to lazily initialize a `List<String>? buffer` once.
