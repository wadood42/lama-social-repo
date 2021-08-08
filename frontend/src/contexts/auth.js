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
    case "FOLLOW": {
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    }
    case "UNFOLLOW": {
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (following) => following !== action.payload
          ),
        },
      };
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

  const follow = (userData) => {
    dispatch({
      type: "FOLLOW",
      payload: userData,
    });
  };

  const unfollow = (userData) => {
    dispatch({
      type: "UNFOLLOW",
      payload: userData,
    });
  };
  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout, follow, unfollow }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
