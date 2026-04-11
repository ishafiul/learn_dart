# Build: Stats function returning a record

## Goal

Return multiple statistics (`min`, `max`, `avg`) from one function.

## Step 1 - Create stats function

```dart
({double min, double max, double avg}) calculateStats(List<double> nums) {
  double min = nums.reduce((a, b) => a < b ? a : b);
  double max = nums.reduce((a, b) => a > b ? a : b);
  double total = nums.fold(0, (sum, n) => sum + n);
  double avg = total / nums.length;

  return (min: min, max: max, avg: avg);
}
```

## Step 2 - Use the result

```dart
void main() {
  final stats = calculateStats([10, 20, 30, 40]);
  print('min: ${stats.min}');
  print('max: ${stats.max}');
  print('avg: ${stats.avg}');
}
```

## Step 3 - Destructure the record

```dart
void main() {
  final (:min, :max, :avg) = calculateStats([10, 20, 30, 40]);
  print('min: $min, max: $max, avg: $avg');
}
```

## Practice tasks

- Round average to 2 decimal places.
- Handle empty list case (print error or return default values).
- Try the same function with `List<int>` by converting values.
