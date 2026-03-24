# REST API Test Suite Documentation

This document describes the automated test cases for the TaskFlow REST API. The tests are located in `tests/e2e/playwright/api/rest-api.spec.ts`.

## 🛠️ Framework: Playwright

The test suite leverages **Playwright's Request Context** to perform high-performance HTTP requests directly against the server.

## 🚀 Test Scenarios

### 1. User Signup
Tests the registration process for new accounts.
- **New Email**: Verifies that a user can be created with a unique email.
- **Duplicate Email**: Verifies that the system prevents duplicate account creation and returns a proper `400 Bad Request` with an appropriate error message (`"User already exists"`).
- **No Token on Signup**: Ensures the API follows our architectural decision to *not* provide a JWT token upon successful signup (user must login separately).

### 2. User Login
Verifies the authentication flow.
- **Valid Credentials**: Ensures the system returns a valid JWT token when provided with correct email and password.
- **Invalid Credentials**: (Future) Verify that incorrect passwords result in a `401 Unauthorized` response.

### 3. Get Me (`/api/auth/me`)
Tests the retrieval of account details for the currently authenticated user.
- **Authorized Access**: Verifies that providing a valid Bearer token in the `Authorization` header returns the correct user object (ID, fullName, email).
- **Unauthorized Access**: (Future) Verify that missing or invalid tokens return a `401 Unauthorized` response.

### 4. Fetch All Users (`/api/users`)
A utility query to list all users in the system.
- **Success Case**: Verifies that the endpoint returns a valid JSON array of user objects.

---

## 🏗️ Technical Details

- **Email Uniqueness**: Tests generate emails using `Date.now()` to prevent collisions during parallel or repeated execution.
- **Execution Mode**: The authentication tests are set to `mode: 'serial'` because they rely on a shared state (signup must happen before login).
- **Setup**:
  - `baseURL`: `http://localhost:5001` (configurable in `playwright.config.ts`)
  - `Content-Type`: `application/json` (automatically set for all requests)
