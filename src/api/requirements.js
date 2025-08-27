import axios from 'axios';
import { API_BASE_URL } from '../config';

const requirementsAPI = {
  // Post a new requirement
  postRequirement: async (requirementData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/ngo/postRequirement`, requirementData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to post requirement' };
    }
  },

  // Search approved requirements
  searchRequirements: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.item) params.append('item', filters.item);
      
      const response = await axios.get(`${API_BASE_URL}/searchRequirements?${params}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Search failed' };
    }
  },

  // Get approved requirements for a specific NGO (server-side)
  getApprovedRequirementsByNgo: async (ngoEmail) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/ngo/approvedRequirements/${encodeURIComponent(ngoEmail)}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch approved requirements' };
    }
  },

  // Get pending requirements for a specific NGO (server-side)
  getPendingRequirementsByNgo: async (ngoEmail) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/ngo/pendingRequirements/${encodeURIComponent(ngoEmail)}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch pending requirements' };
    }
  },

  // Admin: approve requirement
  approveRequirement: async (requirementId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/approveRequirement`, { requirementId });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Approval failed' };
    }
  },

  // Admin: fetch pending requirements
  getPendingRequirements: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/pendingRequirements`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch pending requirements' };
    }
  },

  // Admin: reject requirement
  rejectRequirement: async (requirementId, reason) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/rejectRequirement`, { requirementId, reason });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Rejection failed' };
    }
  },
  // Get rejected requirements for a specific NGO
  getRejectedRequirementsByNgo: async (ngoEmail) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/ngo/rejectedRequirements/${encodeURIComponent(ngoEmail)}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch rejected requirements' };
    }
  },
  updateRequirement: async (requirementId, requirementData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/ngo/updateRequirement/${requirementId}`, requirementData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to update requirement' };
    }
  },
};

export default requirementsAPI;
