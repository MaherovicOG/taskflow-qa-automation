describe('REST API Authentication with Cypress', () => {
  const email = `cy-rest-${Date.now()}@example.com`;
  const password = 'Password123!';

  it('POST /api/auth/signup - should create user without token', () => {
    cy.request('POST', '/api/auth/signup', {
      fullName: 'Cypress REST',
      email,
      password
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.success).to.be.true;
      expect(response.body.user.email).to.eq(email);
      expect(response.body).to.not.have.property('token'); // Architecture rule: No token on signup
    });
  });

  it('POST /api/auth/signup - should fail with duplicate email', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/signup',
      body: { fullName: 'Dup', email, password },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400); // Bad Request
      expect(response.body.error).to.eq("User already exists");
    });
  });

  it('POST /api/auth/login - should return a valid JWT token', () => {
    cy.request('POST', '/api/auth/login', { email, password }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
    });
  });

  it('GET /api/auth/me - should fetch profile with token', () => {
    // Signup and login to get fresh token
    const testEmail = `cy-me-${Date.now()}@example.com`;
    cy.request('POST', '/api/auth/signup', { fullName: 'ME cy', email: testEmail, password });
    cy.request('POST', '/api/auth/login', { email: testEmail, password }).then((loginRes) => {
      const token = loginRes.body.token;
      cy.request({
        method: 'GET',
        url: '/api/auth/me',
        headers: { Authorization: `Bearer ${token}` }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.email).to.eq(testEmail);
      });
    });
  });

  it('GET /api/users - should list users when authenticated', () => {
    // 1. Get token
    cy.request('POST', '/api/auth/login', { email, password }).then((loginRes) => {
      const token = loginRes.body.token;
      // 2. Fetch users
      cy.request({
        method: 'GET',
        url: '/api/users',
        headers: { Authorization: `Bearer ${token}` }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(Array.isArray(response.body)).to.be.true;
      });
    });
  });

  it('GET /api/users - should fail list users when NOT authenticated', () => {
    cy.request({
      method: 'GET',
      url: '/api/users',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401); // Unauthorized rule
    });
  });
});
