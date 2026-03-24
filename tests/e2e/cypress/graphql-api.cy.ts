describe('GraphQL API with Cypress', () => {
  const email = `cy-gql-${Date.now()}@example.com`;
  const password = 'Password123!';

  it('Query getUsers - should fetch users with authorized token', () => {
    // 1. Signup and Login to get a token
    const userEmail = `gql-cy-list-${Date.now()}@test.com`;
    cy.request('POST', '/graphql', {
      query: `mutation { signup(fullName: "cy GQL", email: "${userEmail}", password: "${password}") { id } }`
    });
    cy.request('POST', '/graphql', {
      query: `mutation { login(email: "${userEmail}", password: "${password}") { token } }`
    }).then((loginRes) => {
      const token = loginRes.body.data.login.token;
      // 2. Query getUsers
      cy.request({
        method: 'POST',
        url: '/graphql',
        headers: { Authorization: `Bearer ${token}` },
        body: {
          query: `query { getUsers { id fullName email } }`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.property('getUsers');
        expect(Array.isArray(response.body.data.getUsers)).to.be.true;
      });
    });
  });

  it('Mutation signup - should create a user without token', () => {
    cy.request('POST', '/graphql', {
      query: `mutation Signup($fullName: String!, $email: String!, $password: String!) {
        signup(fullName: $fullName, email: $email, password: $password) {
          id
          fullName
          email
        }
      }`,
      variables: {
        fullName: "cy GQL User",
        email,
        password
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.signup).to.have.property('email');
      expect(response.body.data.signup.email).to.eq(email);
      expect(response.body.data.signup).to.not.have.property('token');
    });
  });

  it('Mutation signup - should fail on duplicate email', () => {
    cy.request('POST', '/graphql', {
      query: `mutation Signup($fullName: String!, $email: String!, $password: String!) {
        signup(fullName: $fullName, email: $email, password: $password) {
          id
        }
      }`,
      variables: {
        fullName: "cy GQL User",
        email,
        password
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('errors');
      expect(response.body.errors[0].message).to.eq("User already exists");
    });
  });

  it('Mutation login - should return token for valid credentials', () => {
    cy.request('POST', '/graphql', {
      query: `mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
          user { id email }
        }
      }`,
      variables: { email, password }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.login).to.have.property('token');
      expect(response.body.data.login.user.email).to.eq(email);
    });
  });

  it('Query me - should fetch me profile using token', () => {
    cy.request('POST', '/graphql', {
      query: `mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
        }
      }`,
      variables: { email, password }
    }).then((loginRes) => {
      const token = loginRes.body.data.login.token;
      cy.request({
        method: 'POST',
        url: '/graphql',
        headers: { Authorization: `Bearer ${token}` },
        body: {
          query: `query { me { id fullName email } }`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data.me.email).to.eq(email);
      });
    });
  });
});
