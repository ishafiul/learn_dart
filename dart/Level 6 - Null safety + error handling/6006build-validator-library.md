# Build: input validator library (email/password)

## Goal

Combine null-safe checks and small validators you can reuse.

## Step 1 - Field error alias

```dart
typedef FieldError = String?;
```

## Step 2 - Present check

```dart
FieldError requirePresent(String? value) {
  if (value == null || value.trim().isEmpty) {
    return 'required';
  }
  return null;
}
```

## Step 3 - Email

```dart
FieldError validateEmail(String? value) {
  if (value == null || value.trim().isEmpty) {
    return 'required';
  }
  final v = value.trim();
  if (!v.contains('@')) return 'invalid email';
  return null;
}
```

## Step 4 - Password rules

```dart
FieldError validatePassword(String? value) {
  if (value == null || value.trim().isEmpty) {
    return 'required';
  }
  final v = value.trim();
  if (v.length < 8) return 'min length 8';
  if (!RegExp(r'[0-9]').hasMatch(v)) return 'need a digit';
  return null;
}
```

## Step 5 - Aggregate

```dart
Map<String, FieldError> validateSignUp({String? email, String? password}) {
  return {
    'email': validateEmail(email),
    'password': validatePassword(password),
  };
}

void main() {
  final errors = validateSignUp(email: 'bad', password: 'short');
  print(errors);
}
```

## Practice tasks

- Return a record `(bool ok, Map<String, String> errors)` where the map only contains keys that failed.
- Add `validatePasswordConfirm(String? password, String? confirm)`.
- Add maximum length checks with one shared helper `FieldError? lengthLimit(String trimmed, int max)`.
