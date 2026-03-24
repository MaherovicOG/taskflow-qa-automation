# API Documentation

This server provides both REST and GraphQL endpoints for user management and authentication.

## BASE URL

The server runs on the port specified in the `.env` file (default is 7000).

- REST API: `http://localhost:<PORT>/api`
- GraphQL: `http://localhost:<PORT>/graphql`
- **Swagger Documentation (REST):** `http://localhost:<PORT>/api-docs`

---

## Authentication (REST)

### Me (Get Current User)

**Endpoint:** `GET /api/auth/me`  
**Requires Header:** `Authorization: Bearer <token>`  
**Returns:** `{ "id": number, "fullName": "string", "email": "string" }`

### Signup

**Endpoint:** `POST /api/auth/signup`  
**Body:** `{ "fullName": "string", "email": "string", "password": "string" }`  
**Returns:** `{ "token": "string", "user": { ... } }`

### Login

**Endpoint:** `POST /api/auth/login`  
**Body:** `{ "email": "string", "password": "string" }`  
**Returns:** `{ "token": "string", "user": { ... } }`

---

## Users (REST)

### Get All Users

**Endpoint:** `GET /api/users`  
**Requires Authentication:** No (can be added via middleware)  
**Returns:** `[ { ... }, ... ]`

---

## GraphQL Operations

### Important: Authorization

For protected queries/mutations, you must provide the JWT token in the **HTTP Headers**:

```json
{
  "Authorization": "Bearer YOUR_TOKEN_HERE"
}
```

### Queries

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
