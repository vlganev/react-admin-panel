import Constants from '../utils/constants';
import { LOAD_GENERAL_ERROR } from '../reducers/errors';
import { setServiceStatus, TOAST_DANGER_MESSAGE, TOAST_SUCCESS_MESSAGE } from './service'

export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export const LOAD_ROLES_SUCCESS = 'LOAD_ROLES_SUCCESS';
export const LOAD_DETAILED_ROLES_SUCCESS = 'LOAD_DETAILED_ROLES_SUCCESS';
export const LOAD_ACCESS_KEYS = 'LOAD_ACCESS_KEYS';

export function loadAllUsers() {
  return dispatch => {
    callUsersApi((data, error) => {
      if (!error) {
        dispatch(loadUsersSuccess(data.users));
      } else {
        dispatch(loadUsersError(error));
      }
    });
  }
}

export function loadAllRoles() {
  return dispatch => {
    callUserRolesApi((data, error) => {
      if (!error) {
        dispatch(loadUserRolesSuccess(data));
      } else {
        dispatch(loadUsersSuccess(error));
      }
    });
  }
}

export function loadAllDetailedRoles() {
  return dispatch => {
    callUserDetailedRolesApi((data, error) => {
      if (!error) {
        dispatch(loadUserDetailedRolesSuccess(data));
      } else {
        dispatch(loadUsersError(error));
      }
    });
  }
}

export function loadAllAccessKeys() {
  return dispatch => {
    callAccessKeysApi((data, error) => {
      if (!error) {
        dispatch(loadAccessKeysSuccess(data));
      } else {
        dispatch(loadUsersError(error));
      }
    });
  }
}

export function sendUserProfile(obj, edit) {
  return dispatch => {
    callCreateNewUser(obj, edit, (data, error) => {
      if (!error) {
        dispatch(setServiceStatus(data.result, TOAST_SUCCESS_MESSAGE))
      } else {
        dispatch(loadUsersError(error));
        dispatch(setServiceStatus(error, TOAST_DANGER_MESSAGE))
      }
    });
  }
}

export function modifyRole(obj) {
  return dispatch => {
    callAddNewRole(obj, (data, error) => {
      if (!error) {
        dispatch(setServiceStatus(data.result, TOAST_SUCCESS_MESSAGE))
      } else {
        dispatch(loadUsersError(error));
        dispatch(setServiceStatus(error, TOAST_DANGER_MESSAGE))
      }
    });
  }
}

export function modifyAccessCheckbox(obj, callback) {
  return dispatch => {
    callModifyRoleAccess(obj, (data, error) => {
      if (!error) {
        dispatch(setServiceStatus(data.result, TOAST_SUCCESS_MESSAGE))
        callback();
      } else {
        dispatch(loadUsersError(error));
        dispatch(setServiceStatus(error, TOAST_DANGER_MESSAGE))
      }
    });
  }
}

function loadAccessKeysSuccess(data) {
  return {
    type: LOAD_ACCESS_KEYS,
    data
  };
}

function loadUserDetailedRolesSuccess(data) {
  return {
    type: LOAD_DETAILED_ROLES_SUCCESS,
    data
  };
}

function loadUserRolesSuccess(data) {
  return {
    type: LOAD_ROLES_SUCCESS,
    data
  };
}

function loadUsersSuccess(data) {
  return {
    type: LOAD_USERS_SUCCESS,
    data
  };
}

function loadUsersError(isLoadError) {
  return {
    type: LOAD_GENERAL_ERROR,
    isError: isLoadError
  };
}

export async function callAccessKeysApi(callback) {
  const BASE_URL = Constants.remoteServer + 'access/keys'
  const request = { method: 'GET', headers: Constants.headers }
  try {
    const response = await fetch(BASE_URL, request);
    const json = await response.json();
    if (response.ok) {
      return callback(json);
    } else {
      return callback({}, new Error('Неизвестна грешка!'));
    }
  } catch (error) {
    return callback({}, new Error('Неуспешен опит да заредим пътищата за достъп!'));
  }
}

export async function callUserDetailedRolesApi(callback) {
  const BASE_URL = Constants.remoteServer + 'roles?include=permissions'
  const request = { method: 'GET', headers: Constants.headers }
  try {
    const response = await fetch(BASE_URL, request);
    const json = await response.json();
    if (response.ok) {
      return callback(json);
    } else {
      return callback({}, new Error('Неизвестна грешка!'));
    }
  } catch (error) {
    return callback({}, new Error('Неуспешен опит да заредим детайлите за позволенията!'));
  }
}

export async function callUserRolesApi(callback) {
  const BASE_URL = Constants.remoteServer + 'roles'
  const request = { method: 'GET', headers: Constants.headers }
  try {
    const response = await fetch(BASE_URL, request);
    const json = await response.json();
    if (response.ok) {
      return callback(json);
    } else {
      return callback({}, new Error('Неизвестна грешка!'));
    }
  } catch (error) {
    return callback({}, new Error('Неуспешен опит да заредим позволенията!'));
  }
}

export async function callModifyRoleAccess(obj, callback) {
  let method, id;
  if (obj.modify === 'new') {
    method = 'POST';
    id = ''
  } else {
    method = 'DELETE';
    id = obj.id;
  }
  doRequest(method, 'access/' + id, '', obj, 'Неуспешен опит да променим достъпа!', callback)
}

export async function callAddNewRole(obj, callback) {
  // let method, id;
  // if (edit === 'new') {
  //   method = 'POST';
  //   id = '';
  // } else {
  //   method = 'PUT';
  //   id = obj.id;
  // }
  doRequest('POST', 'roles/', '', obj, 'Неуспешен опит да променим ролята!', callback)
}

export async function callUsersApi(callback) {
  doRequest('GET', 'users', '?include=roles', '', 'Неуспешен опит да заредим потребителите!', callback)
}

export async function callCreateNewUser(obj, edit, callback) {
  let method, id;
  if (edit === 'new') {
    method = 'POST';
    id = '';
  } else {
    method = 'PUT';
    id = obj.id;
  }

  doRequest(method, 'users/' + id, '', obj, 'Неуспешен опит да променим потребител', callback);
}

async function doRequest(method, endpoint, query, obj, message, callback) {
  const BASE_URL = Constants.remoteServer + endpoint + query;
  const request = { 
    method: method, 
    headers: Constants.headers,
  }

  if (obj) {
    request.body = JSON.stringify(obj);
  }
  console.log(BASE_URL)
  console.log(request)
  console.log(obj)

  try {
    const response = await fetch(BASE_URL, request);
    const json = await response.json();
    if (response.ok) {
      return callback(json);
    } else {
      return callback({}, json.error.message);
    }
  } catch (error) {
    return callback({}, new Error(message));
  }
}