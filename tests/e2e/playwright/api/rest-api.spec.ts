import { test, expect } from '@playwright/test';

test.describe('REST API Authentication', () => {
  test.describe.configure({ mode: 'serial' });
  const email = `test-${Date.now()}@example.com`;

  const password = 'Password123!';
  let token: string;

  test('POST /api/auth/signup - should create a new user (New Email)', async ({ request }) => {
    const response = await request.post('/api/auth/signup', {
      data: {
        fullName: 'Test User',
        email,
        password,
      },
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.user.email).toBe(email);
    expect(body).not.toHaveProperty('token');
  });

  test('POST /api/auth/signup - should fail with existing email (Old Email)', async ({ request }) => {
    const duplicateEmail = `duplicate-${Date.now()}@example.com`;
    // 1. Create first user
    await request.post('/api/auth/signup', {
      data: { fullName: 'First User', email: duplicateEmail, password: 'password123' },
    });

    // 2. Try duplicate signup with second user
    const response = await request.post('/api/auth/signup', {
      data: { fullName: 'Second User', email: duplicateEmail, password: 'password123' },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBe("User already exists");
  });


  test('POST /api/auth/login - should login the user', async ({ request }) => {
    const response = await request.post('/api/auth/login', {
      data: {
        email,
        password,
      },
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toHaveProperty('token');
  });

  test('GET /api/auth/me - should return the current user (After Login)', async ({ request }) => {
    const meEmail = `me-${Date.now()}@example.com`;
    const mePassword = 'password123';

    // 1. Signup first
    await request.post('/api/auth/signup', {
      data: { fullName: 'ME User', email: meEmail, password: mePassword }
    });

    // 2. Login to get token
    const loginRes = await request.post('/api/auth/login', {
      data: { email: meEmail, password: mePassword }
    });
    const { token: meToken } = await loginRes.json();

    // 3. Get /me
    const response = await request.get('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${meToken}`,
      },
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.email).toBe(meEmail);
  });

});

test.describe('REST API Users', () => {
  test('GET /api/users - should return a list of users', async ({ request }) => {
    const response = await request.get('/api/users');
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
  });
});
