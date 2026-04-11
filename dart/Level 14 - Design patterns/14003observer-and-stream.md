# Observer / Observable and stream-shaped observables

## Goal

Notify multiple listeners when state changes without hard-wiring each subscriber into the model.

## Step 1 - Listener list

```dart
class ObservableCounter {
  int _value = 0;
  final List<void Function(int)> _listeners = [];

  int get value => _value;

  void addListener(void Function(int next) listener) {
    _listeners.add(listener);
  }

  void removeListener(void Function(int next) listener) {
    _listeners.remove(listener);
  }

  void increment() {
    _value++;
    for (final listener in List<void Function(int)>.from(_listeners)) {
      listener(_value);
    }
  }
}

void main() {
  final c = ObservableCounter();
  c.addListener((v) => print('a $v'));
  c.addListener((v) => print('b $v'));
  c.increment();
}
```

## Step 2 - Stream-shaped (bonus)

```dart
import 'dart:async';

class CounterStream {
  int _value = 0;
  final _ctrl = StreamController<int>.broadcast();

  int get value => _value;
  Stream<int> get changes => _ctrl.stream;

  void increment() {
    _value++;
    _ctrl.add(_value);
  }

  Future<void> close() => _ctrl.close();
}
```

- Fits reactive APIs; remember to `close` the controller when the owner is disposed.

## Tradeoffs

- Manual lists are simple; streams add async backpressure and `listen`/`cancel` ergonomics.
- Avoid notifying during a listener callback if that callback mutates the same model unless you design for re-entrancy.

## Practice tasks

- Add `void decrement()` and ensure both listeners see consistent ordering.
- Reimplement `ObservableCounter` with a single `StreamController` and no `List` of functions.
- Compare to `ChangeNotifier` in Flutter (read docs only; no Flutter required here).
