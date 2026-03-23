# API Documentation

This server provides both REST and GraphQL endpoints for user management and authentication.

## BASE URL
- REST API: `http://localhost:4000/api`
- GraphQL: `http://localhost:4000/graphql`

---

## Authentication (REST)

### Signup
`POST /api/auth/signup`
- Body: `{ "fullName": "string", "email": "string", "password": "string" }`
- Returns: `{ "token": "string", "user": { ... } }`

### Login
`POST /api/auth/login`
- Body: `{ "email": "string", "password": "string" }`
- Returns: `{ "token": "string", "user": { ... } }`

---

## Users (REST)

### Get All Users
`GET /api/users`
- Requires Authentication: No (can be added via middleware)
- Returns: `[ { ... }, ... ]`

---

## GraphQL Operations

### Queries

#### Get All Users
```graphql
query {
  getUsers {
    id
    fullName
    email
  }
}
```

#### Get User By ID
```graphql
query {
  getUserById(id: 1) {
    id
    fullName
    email
  }
}
```

#### Get Current User (Me)
Requires header: `Authorization: Bearer <token>`
```graphql
query {
  me {
    id
    fullName
    email
  }
}
```

### Mutations

#### Signup
```graphql
mutation {
  signup(fullName: "John Doe", email: "john@example.com", password: "password123") {
    token
    user {
      id
      fullName
    }
  }
}
```

#### Login
```graphql
mutation {
  login(email: "john@example.com", password: "password123") {
    token
    user {
      id
      fullName
    }
  }
}
```

#### Create User (Admin/Utility)
```graphql
mutation {
  createUser(fullName: "Admin", email: "admin@example.com", password: "adminpassword") {
    id
    fullName
  }
}
```

---

## Database & Seeds
- Run Migrations: `npm run migrate`
- Seed Data: `npm run seed`
- Drizzle Studio: `npm run studio`
