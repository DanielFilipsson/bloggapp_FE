const BASE_URL = `${process.env.REACT_APP_API_URL}/auth`;

export const login = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const register = async (userInfo) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};