import { makeApiOptions, makeApiRequest } from "src/utils/apiRequest";
import {
  SIGN_IN_ERROR,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  CURRENT_USER_ERROR,
  CURRENT_USER_REQUEST,
  CURRENT_USER_SUCCESS,
} from "../constants";
import {
  GET_CURRENT_USER_ROUTE,
  GET_METHOD_TYPE,
  POST_METHOD_TYPE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
} from "src/utils/apiEndPoints";

export const signUpAuth = (data) => {
  const options = makeApiOptions(POST_METHOD_TYPE, data);
  return makeApiRequest({
    url: `${process.env.REACT_APP_API_BASE_URL}${SIGN_UP_ROUTE}`,
    options: options,
    requestAction: SIGN_UP_REQUEST,
    successAction: SIGN_UP_SUCCESS,
    errorAction: SIGN_UP_ERROR,
  });
};

export const signInAuth = (data) => {
  const options = makeApiOptions(POST_METHOD_TYPE, data);

  return makeApiRequest({
    url: `${process.env.REACT_APP_API_BASE_URL}${SIGN_IN_ROUTE}`,
    options: options,
    requestAction: SIGN_IN_REQUEST,
    successAction: SIGN_IN_SUCCESS,
    errorAction: SIGN_IN_ERROR,
  });
};

export const getCurrentUser = () => {
  const options = makeApiOptions(GET_METHOD_TYPE);

  return makeApiRequest({
    url: `${process.env.REACT_APP_API_BASE_URL}${GET_CURRENT_USER_ROUTE}`,
    options: options,
    requestAction: CURRENT_USER_REQUEST,
    successAction: CURRENT_USER_SUCCESS,
    errorAction: CURRENT_USER_ERROR,
  });
};
