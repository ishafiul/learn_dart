# Build: chat-like event stream

## Goal

Model messages as a stream with join/leave events from a controller-backed API.

## Step 1 - Event types

```dart
sealed class ChatEvent {}

class MessageEvent extends ChatEvent {
  final String user;
  final String text;
  MessageEvent(this.user, this.text);
}

class JoinEvent extends ChatEvent {
  final String user;
  JoinEvent(this.user);
}

class PartEvent extends ChatEvent {
  final String user;
  PartEvent(this.user);
}
```

## Step 2 - Room facade

```dart
import 'dart:async';

class ChatRoom {
  final _ctrl = StreamController<ChatEvent>.broadcast();

  Stream<ChatEvent> get events => _ctrl.stream;

  void join(String user) => _ctrl.add(JoinEvent(user));

  void part(String user) => _ctrl.add(PartEvent(user));

  void say(String user, String text) => _ctrl.add(MessageEvent(user, text));

  Future<void> close() async {
    await _ctrl.close();
  }
}

Future<void> main() async {
  final room = ChatRoom();
  final sub = room.events.listen((e) {
    if (e is JoinEvent) print('${e.user} joined');
    if (e is PartEvent) print('${e.user} left');
    if (e is MessageEvent) print('${e.user}: ${e.text}');
  });
  room.join('Asha');
  room.say('Asha', 'hi');
  room.part('Asha');
  await Future.delayed(const Duration(milliseconds: 20));
  await sub.cancel();
  await room.close();
}
```

## Practice tasks

- Replace `sealed class` with a simple `enum ChatKind` + record payload if you target an older Dart SDK.
- Add `SystemEvent` for moderation messages and show how `switch` stays exhaustive with `sealed`.
- Buffer the last 20 `MessageEvent` values in a `List` inside one listener for a fake transcript.
