import Constants from '../utils/constants';

export const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';

export function login(email, password) {
  return dispatch => {
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));
    callLoginApi(email, password, error => {
      if (!error) {
        dispatch(setLoginSuccess(true));
      } else {
        dispatch(setLoginError(error));
      }
    });
  }
}

export function logout () {
  return dispatch => {
    Constants.deleteToken();
    dispatch(setLoginSuccess(false));
  }
}

export function isLoggedIn() {
  return dispatch => {
    if (Constants.token != null) {
      dispatch(setLoginSuccess(true));
    }
  }
}

function setLoginSuccess(isLoginSuccess) {
  return {
    type: SET_LOGIN_SUCCESS,
    isLoginSuccess
  };
}

function setLoginError(loginError) {
  return {
    type: SET_LOGIN_ERROR,
    loginError
  }
}

async function callLoginApi(username, password, callback) {
  const BASE_URL = Constants.remoteServer + 'users/authenticate'
  const request = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: username, password: password})
  }

  console.log(BASE_URL)
  console.log(request)

  try {
    const response = await fetch(BASE_URL, request);
    const json = await response.json();
    console.log(response);
    if (response.ok) {
      Constants.setToken(json.data.token)
      return callback(null);
    } else {
      if (json.errors !== undefined) {
        return callback(new Error(json.errors[0]));
      } else {
        return callback(new Error('Грешка при логин!'));
      }
    }
  } catch (error) {
    return callback(new Error('Грешка при логин!'));
  }

}