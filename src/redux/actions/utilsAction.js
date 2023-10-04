import { makeApiOptions, makeApiRequest } from "src/utils/apiRequest";
import {
  FETCH_PROPERTIES_ERROR,
  FETCH_PROPERTIES_REQUEST,
  FETCH_PROPERTIES_SUCCESS,
  FETCH_PROPERTY_BY_ID_ERROR,
  FETCH_PROPERTY_BY_ID_REQUEST,
  FETCH_PROPERTY_BY_ID_SUCCESS,
  UPDATE_PROPERTIES_DELETE,
  UPDATE_FAV_PROPERTIES,
  UPDATE_FAV_LIST,
} from "../constants";
import { GET_METHOD_TYPE, PROPERTIES_ROUTE } from "src/utils/apiEndPoints";
export const fetchProperties = (params) => {
  const options = makeApiOptions(GET_METHOD_TYPE);
  const query = "";
  return makeApiRequest({
    url: `${process.env.REACT_APP_API_BASE_URL}${PROPERTIES_ROUTE}?page=${params}`,
    options: options,
    requestAction: FETCH_PROPERTIES_REQUEST,
    successAction: FETCH_PROPERTIES_SUCCESS,
    errorAction: FETCH_PROPERTIES_ERROR,
  });
};

export const fetchPropertyById = (id) => {
  const options = makeApiOptions(GET_METHOD_TYPE);
  return makeApiRequest({
    url: `${process.env.REACT_APP_API_BASE_URL}${PROPERTIES_ROUTE}/${id}`,
    options: options,
    requestAction: FETCH_PROPERTY_BY_ID_REQUEST,
    successAction: FETCH_PROPERTY_BY_ID_SUCCESS,
    errorAction: FETCH_PROPERTY_BY_ID_ERROR,
  });
};

export const updateStore = ({ actionType, id }) => {
  return (dispatch) => {
    if (actionType === "deleteProperty") {
      dispatch({ type: UPDATE_PROPERTIES_DELETE, payload: id });
      return;
    }
    if (actionType === "addedToFavorite") {
      dispatch({ type: UPDATE_FAV_PROPERTIES, payload: id });
      return;
    }
    if (actionType === "unfavouriteActionType") {
      dispatch({ type: UPDATE_FAV_LIST, payload: id });
      return;
    }
  };
};
