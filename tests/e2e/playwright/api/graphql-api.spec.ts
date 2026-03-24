import { test, expect } from '@playwright/test';

test.describe('GraphQL API', () => {
  test('Query getUsers - should fetch all users', async ({ request }) => {
    const query = {
      query: `
        query {
          getUsers {
            id
            fullName
            email
          }
        }
      `,
    };

    const response = await request.post('/graphql', {
      data: query,
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.data).toHaveProperty('getUsers');
    expect(Array.isArray(body.data.getUsers)).toBe(true);
  });

  test('Mutation signup - should create a new user via GraphQL', async ({ request }) => {
    const signupEmail = `gql-signup-${Date.now()}@test.com`;
    const signupMutation = {
      query: `
        mutation Signup($fullName: String!, $email: String!, $password: String!) {
          signup(fullName: $fullName, email: $email, password: $password) {
            id
            fullName
            email
          }
        }
      `,
      variables: {
        fullName: "GQL User",
        email: signupEmail,
        password: "password123"
      }
    };

    const response = await request.post('/graphql', {
      data: signupMutation,
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.data.signup).toHaveProperty('email');
    expect(body.data.signup.email).toBe(signupEmail);
  });

  test('Mutation signup - should fail when email already exists (Old Email)', async ({ request }) => {
    const existingEmail = `duplicate-gql-${Date.now()}@test.com`;
    // 1. Create original user
    const signupQuery = { 
      query: `mutation Signup($email: String!) { signup(fullName: "Orig", email: $email, password: "pass") { id } }`,
      variables: { email: existingEmail }
    };
    await request.post('/graphql', { data: signupQuery });

    // 2. Try duplicate signup
    const response = await request.post('/graphql', { data: signupQuery });
    const body = await response.json();

    expect(body).toHaveProperty('errors');
    expect(body.errors[0].message).toBe("User already exists");
  });
  test('Query me - should fetch me with token after login', async ({ request }) => {
    const email = `gql-me-${Date.now()}@test.com`;
    const password = "password123";


    // 1. Signup
    const signupMutation = {
      query: `
        mutation {
          signup(fullName: "Me GQL User", email: "${email}", password: "${password}") {
            id
          }
        }
      `,
    };
    await request.post('/graphql', { data: signupMutation });

    // 2. Login to get token
    const loginMutation = {
      query: `
        mutation {
          login(email: "${email}", password: "${password}") {
            token
          }
        }
      `,
    };
    const loginResponse = await request.post('/graphql', { data: loginMutation });
    const loginBody = await loginResponse.json();
    const token = loginBody.data.login.token;

    // 3. Fetch me using token
    const meQuery = {
      query: `
        query {
          me {
            id
            fullName
            email
          }
        }
      `,
    };


    const response = await request.post('/graphql', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: meQuery,
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.data.me.email).toBe(email);
  });
});
