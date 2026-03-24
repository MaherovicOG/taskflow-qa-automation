# TaskFlow Cypress API Test Suite

This directory contains the automated API tests for the TaskFlow project using **Cypress**.

## 🚀 Overview

The test suite covers both **REST** and **GraphQL** protocols, ensuring feature parity and security across all endpoints.

## 🛠️ Getting Started

### 1. Installation
Navigate to the Cypress directory and install dependencies:
```bash
cd tests/e2e/cypress
npm install
```

### 2. Running Tests
To run all tests in headless mode (terminal):
```bash
npm test
```

To open the Cypress Test Runner (UI):
```bash
npm run open
```

## 📋 Test Coverage

### REST API (`cypress/e2e/api/rest-api.cy.ts`)
- [x] POST `/api/auth/signup` (New Email)
- [x] POST `/api/auth/signup` (Duplicate Email - Error 400)
- [x] POST `/api/auth/login` (Token Generation)
- [x] GET `/api/auth/me` (Protected Profile)
- [x] GET `/api/users` (Protected User List)

### GraphQL API (`cypress/e2e/api/graphql-api.cy.ts`)
- [x] Mutation `signup` (User Creation)
- [x] Mutation `signup` (Duplicate Email - GQL Error)
- [x] Mutation `login` (AuthPayload with Token)
- [x] Query `me` (Protected Profile)
- [x] Query `getUsers` (Protected User List)

## 🏗️ Architecture Rules Verified
- **No Token on Signup**: Ensures the architecture only provides tokens upon login.
- **User Protection**: Verifies that user-related queries/routes require a valid `Authorization: Bearer <token>` header.
- **Service Unification**: Tests that both protocols interact correctly with the shared `userService` logic.
