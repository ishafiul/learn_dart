# Level 15 - Dependency Injection + injectable (Week 16+)

Professional Engineering Track. Start with **manual** wiring until pain appears; add containers and codegen when registration becomes noisy.

## Goals

- Compose apps from constructors instead of scattered `new` calls.
- Understand containers vs service locators and where `injectable` helps.

## Step-by-step guides (order)

| #   | File                                                                 | Topic                              |
| --- | -------------------------------------------------------------------- | ---------------------------------- |
| 1   | [15001constructor-injection.md](15001constructor-injection.md)       | Constructor injection              |
| 2   | [15002di-container-concept.md](15002di-container-concept.md)       | DI container idea                  |
| 3   | [15003service-locator-pitfalls.md](15003service-locator-pitfalls.md) | Locator smells                     |
| 4   | [15004injectable-and-codegen.md](15004injectable-and-codegen.md)     | `injectable` + `get_it` wiring     |
| 5   | [15005build-auth-app-composition.md](15005build-auth-app-composition.md) | Build: ApiClient, repos, services |
| 6   | [15006build-result-apiresponse.md](15006build-result-apiresponse.md)   | Build: `Result<T>`, `ApiResponse<T>` |
