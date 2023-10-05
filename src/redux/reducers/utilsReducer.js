import {
  FETCH_PROPERTIES_ERROR,
  FETCH_PROPERTIES_REQUEST,
  FETCH_PROPERTIES_SUCCESS,
  FETCH_PROPERTY_BY_ID_ERROR,
  FETCH_PROPERTY_BY_ID_REQUEST,
  FETCH_PROPERTY_BY_ID_SUCCESS,
  FILTER_PROPERTIES_ERROR,
  FILTER_PROPERTIES_REQUEST,
  FILTER_PROPERTIES_SUCCESS,
  UPDATE_FAV_PROPERTIES,
  UPDATE_PROPERTIES_DELETE,
  FETCH_CITIES_REQUEST,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_ERROR,
} from "../constants";

const initialState = {
  isFetching: true,
  properties: [],
  propertyDetail: {},
  isError: "",
  pagination: {},
};

const citiesInitialState = {
  cities: [],
  isError: "",
};

export const fetchPropertiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROPERTIES_REQUEST:
    case FILTER_PROPERTIES_REQUEST:
      return {
        isFetching: true,
        properties: [],
      };
    case FETCH_PROPERTIES_SUCCESS:
    case FILTER_PROPERTIES_SUCCESS:
      return {
        isFetching: false,
        properties: action.payload.data,
        pagination: action.payload.data.meta.pagination,
      };

    case FETCH_PROPERTIES_ERROR:
    case FILTER_PROPERTIES_ERROR:
      return {
        isFetching: false,
        properties: [],
        isError: action.payload,
      };
    case UPDATE_PROPERTIES_DELETE:
      return {
        ...state,
        properties: [...state.properties].filter(
          (user) => user.id !== action.payload
        ),
      };
    case UPDATE_FAV_PROPERTIES:
      return {
        ...state,
        properties: [...state.properties.properties].map((user) => {
          if (user.id === action.payload) {
            user["is_favourite"] = true;
            return user;
          }
          return user;
        }),
      };

    default:
      return state;
  }
};

export const fetchPropertyByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROPERTY_BY_ID_REQUEST:
      return {
        isFetching: true,
        propertyDetail: {},
      };
    case FETCH_PROPERTY_BY_ID_SUCCESS:
      return {
        isFetching: false,
        propertyDetail: action.payload.data,
      };

    case FETCH_PROPERTY_BY_ID_ERROR:
      return {
        isFetching: false,
        propertyDetail: {},
        isError: action.payload,
      };

    default:
      return state;
  }
};

export const fetchCitiesByReducer = (state = citiesInitialState, action) => {
  switch (action.type) {
    case FETCH_CITIES_REQUEST:
      return {
        cities: [],
      };
    case FETCH_CITIES_SUCCESS:
      return {
        cities: action.payload.data,
      };

    case FETCH_CITIES_ERROR:
      return {
        cities: [],
        isError: action.payload,
      };

    default:
      return state;
  }
};
