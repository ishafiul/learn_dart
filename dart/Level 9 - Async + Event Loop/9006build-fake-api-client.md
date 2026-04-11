# Build: fake API client (delay + return data)

## Goal

Model `GET`-style calls with `Future.delayed` and typed results.

## Step 1 - Client type

```dart
class UserDto {
  final String id;
  final String name;
  UserDto({required this.id, required this.name});
}

class FakeApiClient {
  Future<List<UserDto>> fetchUsers() async {
    await Future.delayed(const Duration(milliseconds: 400));
    return [
      UserDto(id: '1', name: 'Asha'),
      UserDto(id: '2', name: 'Rafi'),
    ];
  }

  Future<UserDto?> fetchUser(String id) async {
    await Future.delayed(const Duration(milliseconds: 200));
    if (id == '1') return UserDto(id: '1', name: 'Asha');
    return null;
  }
}
```

## Step 2 - `main`

```dart
Future<void> main() async {
  final api = FakeApiClient();
  final users = await api.fetchUsers();
  for (final u in users) {
    print('${u.id} ${u.name}');
  }
  print(await api.fetchUser('99'));
}
```

## Practice tasks

- Add `Future<Map<String, dynamic>> fetchJson(String path)` that returns different maps per path after a delay.
- Simulate random failures: `throw Exception('network')` on 30% of calls using `Random`.
- Compose `fetchUser` after `fetchUsers` without awaiting the list first (parallel) and compare total time with sequential awaits.
