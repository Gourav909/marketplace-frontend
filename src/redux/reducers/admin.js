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

const initialState = {
  isFetching: true,
  properties: [],
  updatePropertyDetails: {},
  propertyDetail: {},
  deleteProperty: {},
  newPropertyDetails: {},
  isError: "",
};

export const addNewPropertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_PROPERTY_REQUEST:
      return {
        isFetching: true,
        newPropertyDetails: {},
      };
    case ADD_NEW_PROPERTY_SUCCESS:
      return {
        isFetching: false,
        newPropertyDetails: action.payload,
      };

    case ADD_NEW_PROPERTY_ERROR:
      return {
        isFetching: false,
        newPropertyDetails: {},
        isError: action.payload,
      };

    default:
      return state;
  }
};

export const updatePropertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROPERTY_REQUEST:
      return {
        isFetching: true,
        updatePropertyDetails: {},
      };
    case UPDATE_PROPERTY_SUCCESS:
      return {
        isFetching: false,
        updatePropertyDetails: action.payload,
      };

    case UPDATE_PROPERTY_ERROR:
      return {
        isFetching: false,
        updatePropertyDetails: {},
        isError: action.payload,
      };

    default:
      return state;
  }
};

export const deletePropertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PROPERTY_REQUEST:
      return {
        isFetching: true,
        deleteProperty: {},
      };
    case DELETE_PROPERTY_SUCCESS:
      return {
        isFetching: false,
        deleteProperty: action.payload,
      };

    case DELETE_PROPERTY_ERROR:
      return {
        isFetching: false,
        deleteProperty: {},
        isError: action.payload,
      };

    default:
      return state;
  }
};
