import React, { createContext, useReducer } from "react";
import jwt_decode from "jwt-decode";

const initialState = {
  user: null,
};
if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwt_decode(localStorage.getItem("jwtToken"));
  console.log("decoded token", decodedToken);
  initialState.user = decodedToken;
}

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return { ...state, user: action.payload };
    }
    case "LOGOUT": {
      return { ...state, user: null };
    }
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData.user,
    });
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
