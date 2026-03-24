# TaskFlow QA Automation Suite

This directory contains the automated test suite for the TaskFlow project. It is built using **Playwright**, providing a robust framework for both API and UI automation.

## Architecture

The test suite is designed to be decoupled from the server and frontend, allowing it to run against any environment (local, staging, production) by changing the `baseURL` in the configuration.

### Frameworks & Tools

- **Playwright Test**: The core test runner.
- **TypeScript**: Ensuring type safety and better developer experience.
- **Extra HTTP Headers**: Configured to handle `Content-Type: application/json` by default.

## Directory Structure

- `api/`: Contains API-specific test specifications.
  - `rest-api.spec.ts`: Tests for REST endpoints (Login, Signup, Users, Me).
  - `graphql-api.spec.ts`: Tests for GraphQL Queries and Mutations.
- `playwright.config.ts`: Main configuration file.
- `tsconfig.json`: TypeScript configuration for the test suite.

## Getting Started

### Prerequisites

1.  Ensure the server is running on `http://localhost:5001`.
2.  Install dependencies in the `tests/` directory:
    ```bash
    npm install
    ```

### Running Tests

To run the entire test suite:
```bash
npm test
```

To run a specific test file:
```bash
npx playwright test rest-api.spec.ts
```

To view the generated HTML report:
```bash
npx playwright show-report
```

## Test Coverage

Currently, the suite covers:

### REST API
- [x] POST `/api/auth/signup`
- [x] POST `/api/auth/login`
- [x] GET `/api/auth/me` (Protected)
- [x] GET `/api/users`

### GraphQL API
- [x] Query `getUsers`
- [x] Mutation `signup`
- [x] Query `me` (Protected)

## Best Practices
1.  **Unique Identifiers**: Each test uses `Date.now()` to ensure unique emails and avoid conflicts during parallel execution.
2.  **Serial Execution**: Auth-related tests use `test.describe.configure({ mode: 'serial' })` to ensure sequential flow where needed.
3.  **Independence**: Tests are designed to be as independent as possible, creating their own data when necessary.
