import { useSelector, useDispatch } from 'react-redux';
import { loginUser, registerUser, registerNgo, logout, clearError } from '../redux/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const login = (credentials) => {
    return dispatch(loginUser(credentials));
  };

  const register = (userData) => {
    return dispatch(registerUser(userData));
  };

  const registerNgoUser = (ngoData) => {
    return dispatch(registerNgo(ngoData));
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  const isAdmin = user?.role === 'admin';
  const isNgo = user?.role === 'ngo';

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    registerNgoUser,
    logoutUser,
    clearAuthError,
    isAdmin,
    isNgo
  };
};
