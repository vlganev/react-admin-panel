import { 
  LOAD_USERS_SUCCESS, 
  LOAD_ROLES_SUCCESS, 
  LOAD_DETAILED_ROLES_SUCCESS, 
  LOAD_ACCESS_KEYS, 
  // CREATE_USER_SUCCESS,
} from "../actions/users";

import { LOAD_GENERAL_ERROR } from '../reducers/errors';

const users = (state = {
  data: {},
  roles: []
}, action) => {
  switch (action.type) {
    case LOAD_USERS_SUCCESS:
      return {
        ...state,
        data: action.data
      };
    case LOAD_ROLES_SUCCESS:
      return {
        ...state,
        roles: action.data.roles
      };
    case LOAD_DETAILED_ROLES_SUCCESS:
      return {
        ...state,
        detailedRoles: action.data.roles
      };
    case LOAD_ACCESS_KEYS:
      return {
        ...state,
        accessKeys: action.data.permissions.collections
      };
    // case CREATE_USER_SUCCESS:
    //   return {
    //     ...state,
    //     createUserStatus: action.data
    //   };
    case LOAD_GENERAL_ERROR:
      return {
        ...state,
        isError: action.isError
      };
    default:
      return state;
  }
}

export default users;