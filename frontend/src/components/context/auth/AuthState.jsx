import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import authReducer from './AuthReducer';
import setAuthToken from '../../utils/SetAuthtoken';
import {
USER_LOADED,
AUTH_ERROR,
LOGIN_SUCCESS,
LOGIN_FAIL,
LOGOUT,
REGISTER_SUCCESS,
REGISTER_FAIL,
CLEAR_ERRORS
} from '../types';

const AuthState = props => {
const initialState = {
token: localStorage.getItem('token'),
isAuthenticated: null,
loading: true,
user: null,
error: null
};

const [state, dispatch] = useReducer(authReducer, initialState);
const base_url='http://localhost:5001';

// Load User
const loadUser = async () => {
  // Check if token exists in localStorage
  if (localStorage.token) {
    // Set the token in axios headers
    setAuthToken(localStorage.token);
  } else {
    // If no token, dispatch AUTH_ERROR and return early
    dispatch({ type: AUTH_ERROR });
    return;
  }

  try {
    const res = await axios.get(`${base_url}/api/auth`);
    
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};


// Register User
const register = async formData => {
const config = {
headers: {
'Content-Type': 'application/json'
}
};
try {
    const res = await axios.post(`${base_url}/api/auth/register`, formData, config);
  
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  
    loadUser();
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.msg
    });
  }
};

// Login User
const login = async formData => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  try {
    const res = await axios.post(`${base_url}/api/auth/login`, formData, config);
    
    // Set the token in axios headers for future requests
    setAuthToken(res.data.token);
    
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    
    loadUser();
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response?.data?.msg || 'Login failed'
    });
  }
};


// Logout
const logout = () => dispatch({ type: LOGOUT });

// Clear Errors
const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

return (
<AuthContext.Provider
value={{
token: state.token,
isAuthenticated: state.isAuthenticated,
loading: state.loading,
user: state.user,
error: state.error,
register,
loadUser,
login,
logout,
clearErrors
}}
>
{props.children}
</AuthContext.Provider>
);
};

export default AuthState;


  

