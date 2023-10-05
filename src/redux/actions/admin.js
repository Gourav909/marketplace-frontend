import { makeApiOptions, makeApiRequest } from "src/utils/apiRequest";
import {
  ADD_NEW_PROPERTY_ERROR,
  ADD_NEW_PROPERTY_REQUEST,
  ADD_NEW_PROPERTY_SUCCESS,
  DELETE_PROPERTY_ERROR,
  DELETE_PROPERTY_REQUEST,
  DELETE_PROPERTY_SUCCESS,
  UPDATE_PROPERTY_ERROR,
  UPDATE_PROPERTY_REQUEST,
  UPDATE_PROPERTY_SUCCESS,
} from "../constants";
import {
  DELETE_METHODE_TYPE,
  POST_METHOD_TYPE,
  PROPERTIES_ROUTE,
  PUT_METHOD_TYPE,
} from "src/utils/apiEndPoints";

export const addNewPropertyAction = (data) => {
  const options = makeApiOptions(POST_METHOD_TYPE, data);
  return makeApiRequest({
    url: `${process.env.REACT_APP_API_BASE_URL}${PROPERTIES_ROUTE}`,
    options: options,
    requestAction: ADD_NEW_PROPERTY_REQUEST,
    successAction: ADD_NEW_PROPERTY_SUCCESS,
    errorAction: ADD_NEW_PROPERTY_ERROR,
  });
};

export const updateProperty = (data) => {
  const options = makeApiOptions(PUT_METHOD_TYPE, data);

  return makeApiRequest({
    url: `${process.env.REACT_APP_API_BASE_URL}${PROPERTIES_ROUTE}/${data?.id}`,
    options: options,
    requestAction: UPDATE_PROPERTY_REQUEST,
    successAction: UPDATE_PROPERTY_SUCCESS,
    errorAction: UPDATE_PROPERTY_ERROR,
  });
};

export const deletePropertyAction = (id) => {
  const options = makeApiOptions(DELETE_METHODE_TYPE);

  return makeApiRequest({
    url: `${process.env.REACT_APP_API_BASE_URL}${PROPERTIES_ROUTE}/${id}`,
    options: options,
    requestAction: DELETE_PROPERTY_REQUEST,
    successAction: DELETE_PROPERTY_SUCCESS,
    errorAction: DELETE_PROPERTY_ERROR,
  });
};
