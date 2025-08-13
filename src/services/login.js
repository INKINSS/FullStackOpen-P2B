import axios from 'axios'

const baseUrl = 'https://fullstackopen-back-ikel.onrender.com/api/login'

export const setToken = (newToken) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
}

export const loginServices = async (credentials) => {
    try {
      const response = await axios.post(baseUrl, credentials)
      setToken(response.data.token)
      return response.data
    } catch (error) {
      throw error
    }
  }
