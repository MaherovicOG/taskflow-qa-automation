# 🧪 TaskFlow — QA Automation

A full-stack task management application built as a **QA engineering portfolio project**. The app itself is functional, but the real focus is the **comprehensive test infrastructure** — covering every layer of the testing pyramid with 20+ modern tools, fully automated in CI/CD pipelines.

> Jest · React Testing Library · Cypress · Playwright · Selenium · k6 · MSW · Supertest · Postman · Swagger · Lighthouse · axe-core · Docker · GitHub Actions

---

## 📌 What This Project Demonstrates

- **Unit & Integration Testing** — Jest + React Testing Library for components, hooks, and utilities
- **End-to-End Testing** — Cypress, Playwright (multi-browser), and Selenium WebDriver
- **API Testing** — Supertest for REST, GraphQL test suites, Postman collections with Newman
- **API Mocking** — Mock Service Worker (MSW) for isolated frontend testing
- **Performance & Load Testing** — k6 scripts simulating real traffic patterns
- **Accessibility Audits** — axe-core integrated into E2E tests + Lighthouse CI
- **Cross-Browser & Device Testing** — Playwright multi-browser + BrowserStack config
- **CI/CD Automation** — GitHub Actions pipeline running the full test suite on every push
- **Containerized Environments** — Docker Compose for consistent local and CI test runs

---

## 🏗️ Project Structure

```
taskflow-qa-automation/
│
├── server/                        # Backend (Express + GraphQL)
│   ├── src/
│   │   ├── routes/                # REST API endpoints
│   │   ├── graphql/               # GraphQL schema & resolvers
│   │   ├── middleware/            # Auth, validation, error handling
│   │   ├── models/               # Data models
│   │   └── utils/                # Helper functions
│   ├── swagger.yaml              # OpenAPI specification
│   ├── Dockerfile
│   └── package.json
│
├── frontend/                      # Frontend (Next.js / React)
│   ├── src/
│   │   ├── components/           # React components
│   │   ├── pages/                # Next.js pages / app routes
│   │   ├── hooks/                # Custom React hooks
│   │   ├── context/              # State management
│   │   └── utils/                # Client-side utilities
│   ├── Dockerfile
│   └── package.json
│
├── tests/
│   ├── unit/                     # Jest unit tests
│   ├── integration/              # Jest + RTL integration tests
│   ├── e2e/
│   │   ├── cypress/              # Cypress E2E specs
│   │   ├── playwright/           # Playwright E2E specs
│   │   └── selenium/             # Selenium WebDriver tests
│   ├── api/
│   │   ├── supertest/            # Supertest API tests
│   │   ├── graphql/              # GraphQL query/mutation tests
│   │   └── postman/              # Postman collections + Newman config
│   ├── performance/              # k6 load & stress test scripts
│   ├── accessibility/            # axe-core + Lighthouse configs
│   └── mocks/                    # MSW handlers & fixtures
│
├── .github/workflows/            # GitHub Actions CI/CD pipelines
├── docker-compose.yml            # Full-stack local environment
├── docs/
│   ├── test-strategy.md          # Test strategy & approach
│   ├── coverage-matrix.md        # Feature × test type coverage
│   └── quality-metrics.md        # Reporting & metrics
│
└── README.md
```

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | Next.js, React, TypeScript |
| **Backend** | Node.js, Express, GraphQL |
| **Database** | PostgreSQL |
| **Unit / Integration** | Jest, React Testing Library |
| **E2E** | Cypress, Playwright, Selenium WebDriver |
| **API Testing** | Supertest, Postman / Newman, Swagger / OpenAPI |
| **Mocking** | Mock Service Worker (MSW) |
| **Performance** | k6 |
| **Accessibility** | axe-core, Lighthouse |
| **Cross-Browser** | Playwright multi-browser, BrowserStack |
| **CI/CD** | GitHub Actions, Docker |
| **Infrastructure** | Docker Compose |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- Git

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/taskflow-qa-automation.git
cd taskflow-qa-automation

# Install dependencies
cd server && npm install && cd ..
cd frontend && npm install && cd ..
```

### Run the Full Stack

```bash
# Start everything with Docker
docker-compose up -d

# Or run individually
cd server && npm run dev      # API on http://localhost:4000
cd frontend && npm run dev    # App on http://localhost:3000
```

---

## 🧪 Running Tests

### Unit & Integration Tests
```bash
# Run all unit tests with coverage
npm run test:unit

# Run component integration tests
npm run test:integration

# Watch mode during development
npm run test:unit -- --watch
```

### API Tests
```bash
# Supertest suite
npm run test:api

# Postman / Newman
npx newman run tests/api/postman/taskflow.postman_collection.json -e tests/api/postman/dev.env.json

# GraphQL tests
npm run test:graphql
```

### End-to-End Tests
```bash
# Cypress (interactive)
npx cypress open

# Cypress (headless)
npx cypress run

# Playwright (all browsers)
npx playwright test

# Playwright (specific browser)
npx playwright test --project=chromium

# Selenium
npm run test:selenium
```

### Performance Tests
```bash
# k6 load test
k6 run tests/performance/load-test.js

# k6 with HTML report
k6 run tests/performance/load-test.js --out json=results.json
```

### Accessibility & Performance Audits
```bash
# Lighthouse audit
npx lighthouse http://localhost:3000 --output=html --output-path=./reports/lighthouse.html

# axe-core (runs within Playwright)
npx playwright test tests/accessibility/
```

### Run Everything
```bash
# Full test suite (mirrors CI pipeline)
npm run test:all
```

---

## ⚙️ CI/CD Pipeline

The GitHub Actions workflow runs on every push and PR:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Unit Tests  │     │  API Tests  │     │  Lint/Type   │
│  + Coverage  │     │  + Newman   │     │    Check     │
└──────┬───────┘     └──────┬──────┘     └──────┬───────┘
       │                    │                    │
       └────────────┬───────┘────────────────────┘
                    ▼
          ┌─────────────────┐
          │   E2E Tests     │
          │ (Chromium,      │
          │  Firefox,       │
          │  WebKit)        │
          └────────┬────────┘
                   ▼
       ┌───────────┴───────────┐
       ▼                       ▼
┌──────────────┐     ┌─────────────────┐
│  Performance │     │  Accessibility  │
│  (k6 load)   │     │  (axe + LH)     │
└──────┬───────┘     └────────┬────────┘
       └───────────┬──────────┘
                   ▼
          ┌─────────────────┐
          │  Smoke Tests    │
          │  (pre-deploy)   │
          └─────────────────┘
```

---

## 📊 Test Coverage Matrix

| Feature | Unit | Integration | E2E | API | Performance | Accessibility |
|---------|:----:|:-----------:|:---:|:---:|:-----------:|:-------------:|
| Authentication | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Task CRUD | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Kanban Board | ✅ | ✅ | ✅ | — | — | ✅ |
| Search & Filters | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| User Profile | ✅ | ✅ | ✅ | ✅ | — | ✅ |
| GraphQL API | ✅ | — | — | ✅ | ✅ | — |

---

## 📖 Documentation

- [`docs/test-strategy.md`](docs/test-strategy.md) — Testing approach, scope, risk assessment
- [`docs/coverage-matrix.md`](docs/coverage-matrix.md) — Detailed feature × test type mapping
- [`docs/quality-metrics.md`](docs/quality-metrics.md) — Pass rates, flaky test tracking, trends
- [`server/swagger.yaml`](server/swagger.yaml) — OpenAPI specification

---

## 🤝 About This Project

This project was built as a hands-on learning exercise and portfolio piece for **QA Automation Engineering** roles. It demonstrates practical experience with the full testing pyramid — from isolated unit tests to production-like load testing — using industry-standard tools and practices.

If you're learning QA automation, feel free to fork this repo and build your own version.

---

## 📄 License

MIT
