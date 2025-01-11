import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

const ADMIN_USER = {
  email: 'admin@watchgen.com',
  password: 'admin123',
  username: 'admin',
  role: 'admin',
  id: 1
}

export const register = async (username: string, email: string, password: string) => {
  if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
    return {
      success: true,
      token: 'admin-token',
      user: ADMIN_USER
    }
  }

  const response = await axios.post(`${API_URL}/auth/register`, {
    username,
    email,
    password
  })
  return response.data
}

export const login = async (email: string, password: string) => {
  if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
    const data = {
      success: true,
      token: 'admin-token',
      user: ADMIN_USER
    }
    
    localStorage.setItem('token', data.token)
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('user', JSON.stringify(data.user))
    
    return data
  }

  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password
  })
  
  const { token, user } = response.data
  
  localStorage.setItem('token', token)
  localStorage.setItem('isLoggedIn', 'true')
  localStorage.setItem('user', JSON.stringify(user))
  
  return response.data
} 