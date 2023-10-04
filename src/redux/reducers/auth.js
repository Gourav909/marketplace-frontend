import {
  CURRENT_USER_ERROR,
  CURRENT_USER_REQUEST,
  CURRENT_USER_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from "../constants";

const initialState = {
  isFetching: true,
  signUpDetails: {},
  signInDetails: {},
  currentUserDetails: {},
  isError: {},
};

export const signUpAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return {
        isFetching: true,
        signUpDetails: {},
      };
    case SIGN_UP_SUCCESS:
      return {
        isFetching: false,
        signUpDetails: action.payload.data,
      };

    case SIGN_UP_ERROR:
      return {
        isFetching: false,
        signUpDetails: {},
        isError: action.error,
      };

    default:
      return state;
  }
};

export const signInAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return {
        isFetching: true,
        signInDetails: {},
      };
    case SIGN_IN_SUCCESS:
      return {
        isFetching: false,
        signInDetails: action.payload,
      };

    case SIGN_IN_ERROR:
      return {
        isFetching: false,
        signInDetails: {},
        isError: action.error,
      };

    default:
      return state;
  }
};
export const getCurrentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_USER_REQUEST:
      return {
        isFetching: true,
        currentUserDetails: {},
      };
    case CURRENT_USER_SUCCESS:
      return {
        isFetching: false,
        currentUserDetails: action.payload.data,
      };

    case CURRENT_USER_ERROR:
      return {
        isFetching: false,
        currentUserDetails: {},
        isError: action.error,
      };

    default:
      return state;
  }
};
