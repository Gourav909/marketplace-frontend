import { makeApiOptions, makeApiRequest } from "src/utils/apiRequest";
import {
  ADD_ITEM_TO_FAVOURITES_ERROR,
  ADD_ITEM_TO_FAVOURITES_REQUEST,
  ADD_ITEM_TO_FAVOURITES_SUCCESS,
  FAVOURITE_PROPERTIES_ERROR,
  FAVOURITE_PROPERTIES_REQUEST,
  FAVOURITE_PROPERTIES_SUCCESS,
  FILTER_PROPERTIES_ERROR,
  FILTER_PROPERTIES_REQUEST,
  FILTER_PROPERTIES_SUCCESS,
  DELETE_ITEMS_FROM_FAVOURITES_ERROR,
  DELETE_ITEMS_FROM_FAVOURITES_REQUEST,
  DELETE_ITEMS_FROM_FAVOURITES_SUCCESS,
} from "../constants";
import {
  DELETE_METHODE_TYPE,
  FAVOURITE_PROPERTIES_ROUTE,
  GET_METHOD_TYPE,
  POST_METHOD_TYPE,
} from "src/utils/apiEndPoints";

export const addItemToFavouriteList = (data) => {
  const options = makeApiOptions(POST_METHOD_TYPE, data);

  return makeApiRequest({
    url: `${process.env.REACT_APP_API_BASE_URL}${FAVOURITE_PROPERTIES_ROUTE}`,
    options: options,
    requestAction: ADD_ITEM_TO_FAVOURITES_REQUEST,
    successAction: ADD_ITEM_TO_FAVOURITES_SUCCESS,
    errorAction: ADD_ITEM_TO_FAVOURITES_ERROR,
  });
};

export const fetchFavouritePropertiesList = () => {
  const options = makeApiOptions(GET_METHOD_TYPE);

  return makeApiRequest({
    url: `${process.env.REACT_APP_API_BASE_URL}${FAVOURITE_PROPERTIES_ROUTE}`,
    options: options,
    requestAction: FAVOURITE_PROPERTIES_REQUEST,
    successAction: FAVOURITE_PROPERTIES_SUCCESS,
    errorAction: FAVOURITE_PROPERTIES_ERROR,
  });
};

export const filterPropertiesAction = (queryParams) => {
  const options = makeApiOptions(GET_METHOD_TYPE);
  console.log("dsfdsf", queryParams);
  return makeApiRequest({
    url: `${process.env.REACT_APP_API_BASE_URL}${FAVOURITE_PROPERTIES_ROUTE}?${queryParams}`,
    options: options,
    requestAction: FILTER_PROPERTIES_REQUEST,
    successAction: FILTER_PROPERTIES_SUCCESS,
    errorAction: FILTER_PROPERTIES_ERROR,
  });
};

export const deleteFavProperty = (id) => {
  const options = makeApiOptions(DELETE_METHODE_TYPE);

  return makeApiRequest({
    url: `${process.env.REACT_APP_API_BASE_URL}${FAVOURITE_PROPERTIES_ROUTE}/${id}`,
    options: options,
    requestAction: DELETE_ITEMS_FROM_FAVOURITES_REQUEST,
    successAction: DELETE_ITEMS_FROM_FAVOURITES_SUCCESS,
    errorAction: DELETE_ITEMS_FROM_FAVOURITES_ERROR,
  });
};
