# GraphQL API Test Suite Documentation

This document describes the automated test cases for the TaskFlow GraphQL API. The tests are located in `tests/e2e/playwright/api/graphql-api.spec.ts`.

## 🎨 Framework: Playwright + GraphQL

The test suite performs POST requests to the `/graphql` endpoint using standard JSON body objects containing `query` and `variables`.

---

## 🚀 Test Scenarios

### 1. Mutation `signup`
The registration process for new accounts via GraphQL.
- **New Email**: Creates a user and verifies that the mutation returns the user ID and fullName.
- **Duplicate Email**: Verifies that the system returns a standard GraphQL Error with the message `"User already exists"`.
- **No Token on Signup**: Ensures the mutation return type `User!` follows our architectural decision to *not* provide an `AuthPayload` (token) during registration.

### 2. Mutation `login`
The authentication flow via GraphQL.
- **Valid Credentials**: Returns an `AuthPayload` containing both the `token` and the `user` object.
- **Invalid Credentials**: (Future) Verify that incorrect passwords return a GraphQL error.

### 3. Query `me`
A protected query to retrieve the current user's profile.
- **Authorized Query**: Verifies that providing a valid Bearer token in the `Authorization` header returns the correct `User` object (`id`, `fullName`, `email`).
- **Authorization Context**: The query test performs a `signup` followed by a `login` to obtain the token, ensuring the full authentication chain works.

### 4. Query `getUsers`
A query to list all users in the system.
- **Success Case**: Verifies that the query returns a valid array of user objects.

---

## 🏗️ Technical Details

- **GQL Errors**: Tests verify partial failures by checking the `errors` property in the GraphQL response body.
- **Variables Usage**: Tests use GraphQL variables appropriately (e.g., in the `Signup` mutation) instead of string concatenation, adhering to best practices.
- **Schema Validation**: The tests implicitly validate the current schema (`User!`, `AuthPayload!`) as defined in the server code.
- **Setup**:
  - `baseURL`: `http://localhost:5001/graphql`
  - `Content-Type`: `application/json`
