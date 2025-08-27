import axios from 'axios';
import { API_BASE_URL } from '../config';

const messagesAPI = {
  // Send a message
  sendMessage: async (messageData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/messages`, messageData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to send message' };
    }
  },

  // Get conversation messages
  getMessages: async (user, withUser) => {
    try {
      const params = new URLSearchParams({ user, withUser });
      const response = await axios.get(`${API_BASE_URL}/messages/${withUser}?${params}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch messages' };
    }
  }
};

export default messagesAPI;
