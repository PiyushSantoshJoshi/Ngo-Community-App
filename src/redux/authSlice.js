import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authAPI from '../api/auth';

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.loginUser(credentials);
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', 'dummy-token'); // Since backend doesn't have JWT
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.registerUser(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const registerNgo = createAsyncThunk(
  'auth/registerNgo',
  async (ngoData, { rejectWithValue }) => {
    try {
      const response = await authAPI.registerNgo(ngoData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('user'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('user', JSON.stringify(state.user));
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Login failed';
      })
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Registration failed';
      })
      // Register NGO
      .addCase(registerNgo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerNgo.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerNgo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'NGO registration failed';
      });
  },
});

export const { logout, clearError, updateUser } = authSlice.actions;
export default authSlice.reducer;
