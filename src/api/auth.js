import axios from 'axios';
import { API_BASE_URL } from '../config';

const authAPI = {
  // User registration
  registerUser: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/registerUser`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Registration failed' };
    }
  },

  // User login
  loginUser: async (credentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/loginUser`, credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Login failed' };
    }
  },

  // NGO registration
  registerNgo: async (ngoData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/registerNgo`, ngoData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'NGO registration failed' };
    }
  }
};

export default authAPI;
