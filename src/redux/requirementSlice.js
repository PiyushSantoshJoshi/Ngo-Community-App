import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import requirementsAPI from '../api/requirements';

// Async thunks
export const postRequirement = createAsyncThunk(
  'requirement/postRequirement',
  async (requirementData, { rejectWithValue }) => {
    try {
      const response = await requirementsAPI.postRequirement(requirementData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Admin: Fetch all pending requirements
export const fetchPendingRequirements = createAsyncThunk(
  "requirements/fetchPending",
  async (_, { rejectWithValue }) => {
    try {
      const response = await requirementsAPI.getPendingRequirements();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// NGO: Fetch pending requirements for a specific NGO
export const fetchNgoPendingRequirements = createAsyncThunk(
  'requirement/fetchNgoPendingRequirements',
  async (ngoEmail, { rejectWithValue }) => {
    try {
      const response = await requirementsAPI.getPendingRequirementsByNgo(ngoEmail);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchNgoRejectedRequirements = createAsyncThunk(
  'requirement/fetchNgoRejectedRequirements',
  async (ngoEmail, { rejectWithValue }) => {
    try {
      const response = await requirementsAPI.getRejectedRequirementsByNgo(ngoEmail);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const searchRequirements = createAsyncThunk(
  'requirement/searchRequirements',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await requirementsAPI.searchRequirements(filters);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchNgoApprovedRequirements = createAsyncThunk(
  'requirement/fetchNgoApprovedRequirements',
  async (ngoEmail, { rejectWithValue }) => {
    try {
      const response = await requirementsAPI.getApprovedRequirementsByNgo(ngoEmail);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const approveRequirement = createAsyncThunk(
  'requirement/approveRequirement',
  async (requirementId, { rejectWithValue }) => {
    try {
      const response = await requirementsAPI.approveRequirement(requirementId);
      return { requirementId, response };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const rejectRequirement = createAsyncThunk(
  'requirement/rejectRequirement',
  async ({ requirementId, reason }, { rejectWithValue }) => {
    try {
      const response = await requirementsAPI.rejectRequirement(requirementId, reason);
      return { requirementId, reason, response };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  requirements: [], // For search results
  pendingRequirements: [], // For admin pending requirements
  ngoPendingRequirements: [], // For NGO-specific pending requirements
  ngoRejectedRequirements: [], // For NGO-specific rejected requirements
  myApprovedRequirements: [], // For NGO-approved requirements
  loading: false,
  error: null,
  searchFilters: {
    item: ''
  }
};

const requirementSlice = createSlice({
  name: 'requirement',
  initialState,
  reducers: {
    setSearchFilters: (state, action) => {
      state.searchFilters = { ...state.searchFilters, ...action.payload };
    },
    clearSearchResults: (state) => {
      state.requirements = [];
    },
    clearError: (state) => {
      state.error = null;
    },
    addRequirement: (state, action) => {
      state.requirements.unshift(action.payload);
    },
    // Clear admin pending requirements when needed
    clearPendingRequirements: (state) => {
      state.pendingRequirements = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Post Requirement
      .addCase(postRequirement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postRequirement.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(postRequirement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Failed to post requirement';
      })
      // Search Requirements
      .addCase(searchRequirements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchRequirements.fulfilled, (state, action) => {
        state.loading = false;
        state.requirements = action.payload;
      })
      .addCase(searchRequirements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Search failed';
      })
      // Fetch admin pending requirements
      .addCase(fetchPendingRequirements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingRequirements.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingRequirements = action.payload;
      })
      .addCase(fetchPendingRequirements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Failed to fetch pending requirements';
      })
      // Fetch NGO pending requirements
      .addCase(fetchNgoPendingRequirements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNgoPendingRequirements.fulfilled, (state, action) => {
        state.loading = false;
        state.ngoPendingRequirements = action.payload;
      })
      .addCase(fetchNgoPendingRequirements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Failed to fetch NGO pending requirements';
      })
      // Fetch NGO approved requirements
      .addCase(fetchNgoApprovedRequirements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNgoApprovedRequirements.fulfilled, (state, action) => {
        state.loading = false;
        state.myApprovedRequirements = action.payload;
      })
      .addCase(fetchNgoApprovedRequirements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Failed to fetch approved requirements';
      })
      // Fetch NGO rejected requirements - ADD THIS SECTION
      .addCase(fetchNgoRejectedRequirements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNgoRejectedRequirements.fulfilled, (state, action) => {
        state.loading = false;
        state.ngoRejectedRequirements = action.payload; // Store rejected requirements
      })
      .addCase(fetchNgoRejectedRequirements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Failed to fetch rejected requirements';
      })
      // Approve requirement (admin)
      .addCase(approveRequirement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveRequirement.fulfilled, (state, action) => {
        state.loading = false;
        // Remove from pending requirements
        state.pendingRequirements = state.pendingRequirements.filter(
          req => req.id !== action.payload.requirementId
        );
      })
      .addCase(approveRequirement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Approval failed';
      })
      // Reject requirement (admin)
      .addCase(rejectRequirement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectRequirement.fulfilled, (state, action) => {
        state.loading = false;
        // Remove from pending requirements
        state.pendingRequirements = state.pendingRequirements.filter(
          req => req.id !== action.payload.requirementId
        );
      })
      .addCase(rejectRequirement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Rejection failed';
      });
  },
});

export const { 
  setSearchFilters, 
  clearSearchResults, 
  clearError, 
  addRequirement,
  clearPendingRequirements 
} = requirementSlice.actions;
export default requirementSlice.reducer;