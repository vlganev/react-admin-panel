import { SET_LOGIN_SUCCESS, SET_LOGIN_ERROR } from "../actions/login";

const login = (state = {
  isLoginSuccess: false,
  isLoginPending: false,
  loginError: null
}, action) => {
  switch (action.type) {
    case SET_LOGIN_SUCCESS:
      return {
        ...state,
        isLoginSuccess: action.isLoginSuccess
      };

    case SET_LOGIN_ERROR:
      return {
        ...state,
        loginError: action.loginError
      };

    default:
      return state;
  }
}

export default login;