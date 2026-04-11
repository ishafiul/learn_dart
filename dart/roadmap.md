# Dart Learning Roadmap

## Level 0 — Setup + How programs run (1–2 days)

### Goals

- Run Dart locally or in DartPad
- Understand execution flow: top-to-bottom inside `main()`

### Learn

- `main()`, `print()`
- Comments: `//`, `/* */`
- Syntax vs runtime errors

### Build

- "Hello + your name"
- Simple calculator (hardcoded)

---

## Level 1 — Programming basics (Week 1)

### Goals

- Write logic with conditions and loops

### Learn

- Types: `int`, `double`, `String`, `bool`
- Variables: `var`, explicit types, `final`, `const`
- Operators: math + comparison + logical
- `if`/`else`, `switch`
- Loops: `for`, `while`, `break`, `continue`

### Build

- Grade calculator
- Guess-the-number game
- Multiplication table generator

---

## Level 2 — Functions + collections + records + intro generics (Week 2)

### Goals

- Write reusable code and manage lists/maps safely

### Learn

- Functions: params, return values
- Named/optional params
- Collections: `List`, `Set`, `Map`
- Iteration + functional ops: `.map`, `.where`, `.fold`
- Records
  - Positional: `(int, String)`
  - Named: `({int code, String message})`
  - Destructuring: `var (a, b) = fn();`
- Generics (intro)
  - `List<int>`, `Map<String, int>`
  - Type inference
  - `dynamic` vs `Object` (basic)

### Build

- Todo list (in-memory)
- Expense tracker (category totals with Map)
- Word frequency counter
- Records mini-build: (min, max, avg) stats function
- Generics mini-build: `swap<T>(T a, T b) -> (T, T)`

---

## Level 3 — OOP foundations (Week 3)

### Goals

- Model real-world concepts with classes

### Learn

- Classes/objects, constructors, `this`
- Private members: `_field`
- Getters/setters (use only when needed)
- Composition (has-a) vs inheritance (is-a)

### Build

- BankAccount + Transaction
- Inventory with Product items
- Order + OrderItem

---

## Level 4 — Mutable vs Immutable + data modeling (Week 4)

### Goals

- Prevent bugs by controlling state changes

### Learn

- Mutable vs immutable (core concept)
- What mutation is and why it causes hidden bugs
- Final fields and immutable classes
- `copyWith` pattern (manual)
- Value equality: `==` and `hashCode` basics (why Sets/Maps care)

### Build

- Make User, Product, OrderItem immutable
- Implement `copyWith()` manually
- Write tiny checks: old object unchanged after copyWith; two objects with same values considered equal (basic)

---

## Level 5 — Real Dart OOP: abstractions + mixins + extensions + generics deep dive (Week 5)

### Goals

- Write scalable architecture with strong typing

### Learn

- `abstract class`
- `implements` vs `extends`
- Polymorphism
- Enums (`enum`)
- Mixins: `mixin`, `with`
- Extensions: `extension on ...`
- Generics (deep dive)
  - Generic classes: `Box<T>`
  - Generic methods
  - Constraints: `T extends Base`
  - Reusable patterns: `Repository<T>`, `Result<T>`

### Build

- Payment system: PaymentMethod with Bkash, Card, Cash
- Logger interface: ConsoleLogger, FileLogger (fake)
- Mixin build: Auditable for createdAt/updatedAt
- Extension build: `String.isEmail`, `num.toCurrency()`
- Generics build: `Repository<T>` + `InMemoryRepository<T>`

---

## Level 6 — Null safety + error handling (Week 6)

### Goals

- Avoid crashes and handle failures cleanly

### Learn

- Null safety: `T` vs `T?`
- `?.`, `??`, `??=`, avoid `!`
- Exceptions: `try`/`catch`/`finally`, `throw`
- Custom exceptions
- Structured results: records `({bool ok, String? error})` or `Result<T>` style (recommended)

### Build

- Input validator library (email/password)
- Safe parsing utilities
- `Result<T>` type + use it in validation

---

## Level 7 — JSON + Serialization (Week 7)

### Goals

- Read/write data like real apps (APIs, files)

### Learn

- JSON basics: `dart:convert` (`jsonEncode`, `jsonDecode`)
- Convert JSON ↔ Dart models
- Manual `toJson`/`fromJson`
- Handling missing/invalid fields
- (Later) codegen concepts (even if you don't use them yet)

### Build

- Convert User and Todo models: `Todo.fromJson(Map<String, dynamic>)`, `Map<String, dynamic> toJson()`
- Add validation + error handling for broken JSON
- Save/load Todo list as JSON (in-memory string first)

---

## Level 8 — File I/O + persistence (Week 8)

### Goals

- Persist your app data locally

### Learn

- Read/write files (`dart:io`)
- Paths, directories (basic)
- Async file operations

### Build

- Persist Todo/Expense tracker to a `.json` file
- Load on start, save after changes

---

## Level 9 — Async + Event Loop (Week 9)

### Goals

- Understand concurrency and avoid blocking

### Learn

- `Future`, `async`/`await`
- `Future.wait`, timeouts, retries
- Event loop concept
- Microtask vs event queue (high-level)
- Why CPU-heavy work blocks the isolate

### Build

- Fake API client (delay + return data)
- Retry with exponential backoff
- CLI loading spinner with timers

---

## Level 10 — Streams + reactive thinking (Week 10)

### Goals

- Handle continuous events and updates

### Learn

- Stream vs Future
- StreamController
- `listen`/`cancel`
- Transforms: `map`, `where`

### Build

- Live ticker stream
- Chat-like event stream
- Stream-based file line processing

---

## Level 11 — Isolates (Week 11)

### Goals

- Parallel CPU work safely

### Learn

- Isolates are Dart (not Flutter)
- Separate memory + message passing
- When to use isolates
- Worker isolate returns result pattern

### Build

- Offload heavy JSON parsing simulation
- Prime checker isolate vs main isolate
- Benchmark with Stopwatch

---

# Professional Engineering Track

## Level 12 — Clean code habits (ongoing)

### Learn + apply

- Naming conventions (PascalCase / camelCase / isHasCan)
- DRY (don't over-abstract)
- Small functions, early returns
- Folder structure + separation of concerns
- Linting/formatting: `dart format`, `dart analyze`
- Docs: `///` comments

### Build

- Refactor one project into: `models/`, `services/`, `repositories/`, `utils/`

---

## Level 13 — SOLID (Week 12–13)

### Goals

- Clean architecture thinking, not just theory

### Practice refactors

- **S:** Split "God classes"
- **O:** Extend behavior without editing old logic (Strategy)
- **L:** Safe subclass behavior
- **I:** Smaller interfaces
- **D:** Depend on abstractions

### Build

- User Management module: UserRepository interface, InMemoryUserRepository, UserService depends on the interface
- Use generics if appropriate: `Repository<User>`

---

## Level 14 — Design patterns (Week 14–15)

### Factory Pattern

- Notification sender chooser
- `SenderFactory.create(type)`

### Abstract Factory Pattern

- Dev vs Prod notification families
- DevNotificationFactory, ProdNotificationFactory

### Observer / Observable

- Listener-based observable state
- Bonus: Stream-based observable

### Singleton (careful)

- Logger or Config
- Show why mutable singleton is harmful
- Prefer DI for most services

### Strategy

- Pricing/discount rules swapped at runtime

---

## Level 15 — Dependency Injection + injectable (Week 16+)

### Goals

- Scalable and testable apps

### Learn

- Constructor injection
- DI container concept
- Service locator pitfalls
- Where injectable fits (codegen wiring)

### Build

- Small app skeleton: ApiClient, AuthRepository, AuthService wired via DI (no `new` everywhere)
- Use `Result<T>` + typed responses like `ApiResponse<T>`
