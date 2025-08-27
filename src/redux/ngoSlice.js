import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ngoAPI from '../api/ngo';

// Async thunks
export const searchNgos = createAsyncThunk(
  'ngo/searchNgos',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await ngoAPI.searchNgos(filters);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getPendingNgos = createAsyncThunk(
  'ngo/getPendingNgos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ngoAPI.getPendingNgos();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const approveNgo = createAsyncThunk(
  'ngo/approveNgo',
  async (ngoId, { rejectWithValue }) => {
    try {
      const response = await ngoAPI.approveNgo(ngoId);
      return { ngoId, response };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  ngos: [],
  pendingNgos: [],
  loading: false,
  error: null,
  searchFilters: {
    city: '',
    name: ''
  }
};

const ngoSlice = createSlice({
  name: 'ngo',
  initialState,
  reducers: {
    setSearchFilters: (state, action) => {
      state.searchFilters = { ...state.searchFilters, ...action.payload };
    },
    clearSearchResults: (state) => {
      state.ngos = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Search NGOs
      .addCase(searchNgos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchNgos.fulfilled, (state, action) => {
        state.loading = false;
        state.ngos = action.payload;
      })
      .addCase(searchNgos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Search failed';
      })
      // Get Pending NGOs
      .addCase(getPendingNgos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPendingNgos.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingNgos = action.payload;
      })
      .addCase(getPendingNgos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Failed to fetch pending NGOs';
      })
      // Approve NGO
      .addCase(approveNgo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveNgo.fulfilled, (state, action) => {
        state.loading = false;
        // Remove approved NGO from pending list
        state.pendingNgos = state.pendingNgos.filter(ngo => ngo.id !== action.payload.ngoId);
      })
      .addCase(approveNgo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Approval failed';
      });
  },
});

export const { setSearchFilters, clearSearchResults, clearError } = ngoSlice.actions;
export default ngoSlice.reducer;
