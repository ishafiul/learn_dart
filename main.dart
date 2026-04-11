void main() {
  final data = Employees(
    employees: [
      Person(firstName: 'john', lastName: 'doe'),
      Person(firstName: 'john1', lastName: 'doe1'),
      Person(firstName: 'john2', lastName: 'doe2'),
      Person(firstName: 'john3', lastName: 'doe3'),
    ],
  );

  for (var i = 0; i < data.employees.length; i++) {
    print(data.employees[i].firstName);
    print(data.employees[i].lastName);
  }

  data.employees[0].lastName;
}

class Person {
  final String firstName;
  final String lastName;
  const Person({required this.firstName, required this.lastName});
}

class Employees {
  final List<Person> employees;
  const Employees({required this.employees});
}
