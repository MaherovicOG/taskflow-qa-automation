import axios from 'axios';

const REST_URL = 'http://localhost:5001/api';
const GQL_URL = 'http://localhost:5001/graphql';

export enum Protocol {
  REST = 'REST',
  GRAPHQL = 'GRAPHQL'
}

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const authService = {
  async signup(protocol: Protocol, data: any) {
    if (protocol === Protocol.REST) {
      const response = await axios.post(`${REST_URL}/auth/signup`, data);
      return response.data;
    } else {
      const query = `
        mutation Signup($fullName: String!, $email: String!, $password: String!) {
          signup(fullName: $fullName, email: $email, password: $password) {
            id
            fullName
            email
          }
        }
      `;
      const response = await fetch(GQL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: data })
      });
      const result = await response.json();
      if (result.errors) throw new Error(result.errors[0].message);
      return result.data.signup;
    }
  },

  async login(protocol: Protocol, data: any) {
    if (protocol === Protocol.REST) {
      const response = await axios.post(`${REST_URL}/auth/login`, data);
      return response.data;
    } else {
      const query = `
        mutation Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            token
            user {
              id
              fullName
              email
            }
          }
        }
      `;
      const response = await fetch(GQL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: data })
      });
      const result = await response.json();
      if (result.errors) throw new Error(result.errors[0].message);
      return result.data.login;
    }
  },

  async getMe(protocol: Protocol) {
    if (protocol === Protocol.REST) {
      const response = await axios.get(`${REST_URL}/auth/me`, { headers: getHeaders() });
      return response.data;
    } else {
      const query = `
        query {
          me {
            id
            fullName
            email
          }
        }
      `;
      const response = await fetch(GQL_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...getHeaders()
        },
        body: JSON.stringify({ query })
      });
      const result = await response.json();
      if (result.errors) throw new Error(result.errors[0].message);
      return result.data.me;
    }
  },

  async getAllUsers(protocol: Protocol) {
    if (protocol === Protocol.REST) {
      const response = await axios.get(`${REST_URL}/users`, { headers: getHeaders() });
      return response.data;
    } else {
      const query = `
        query {
          getUsers {
            id
            fullName
            email
          }
        }
      `;
      const response = await fetch(GQL_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...getHeaders()
        },
        body: JSON.stringify({ query })
      });
      const result = await response.json();
      if (result.errors) throw new Error(result.errors[0].message);
      return result.data.getUsers;
    }
  }
};
