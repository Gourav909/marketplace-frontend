import {
  ADD_ITEM_TO_FAVOURITES_ERROR,
  ADD_ITEM_TO_FAVOURITES_REQUEST,
  ADD_ITEM_TO_FAVOURITES_SUCCESS,
  DELETE_ITEMS_FROM_FAVOURITES_ERROR,
  DELETE_ITEMS_FROM_FAVOURITES_REQUEST,
  DELETE_ITEMS_FROM_FAVOURITES_SUCCESS,
  FAVOURITE_PROPERTIES_ERROR,
  FAVOURITE_PROPERTIES_REQUEST,
  FAVOURITE_PROPERTIES_SUCCESS,
  UPDATE_FAV_LIST,
} from "../constants";

const initialState = {
  isFetching: true,
  propertyAddedToFavouriteRes: {},
  favouriteProperties: {},
  unFavouriteProperty: {},
  isError: "",
};

export const addItemToFavouriteListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_FAVOURITES_REQUEST:
      return {
        isFetching: true,
        propertyAddedToFavouriteRes: {},
      };
    case ADD_ITEM_TO_FAVOURITES_SUCCESS:
      return {
        isFetching: false,
        propertyAddedToFavouriteRes: action.payload.data,
      };

    case ADD_ITEM_TO_FAVOURITES_ERROR:
      return {
        isFetching: false,
        propertyAddedToFavouriteRes: {},
        isError: action.payload,
      };

    default:
      return state;
  }
};

export const fetchFavouriteList = (state = initialState, action) => {
  switch (action.type) {
    case FAVOURITE_PROPERTIES_REQUEST:
      return {
        isFetching: true,
        favouriteProperties: [],
      };
    case FAVOURITE_PROPERTIES_SUCCESS:
      return {
        isFetching: false,
        favouriteProperties: action.payload.data,
      };

    case FAVOURITE_PROPERTIES_ERROR:
      return {
        isFetching: false,
        favouriteProperties: [],
        isError: action.payload,
      };

    case UPDATE_FAV_LIST:
      return {
        ...state,
        properties: [...state.favouriteProperties].filter(
          (user) => user.id !== action.payload
        ),
      };

    default:
      return state;
  }
};
export const deleteFavPropertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_ITEMS_FROM_FAVOURITES_REQUEST:
      return {
        isFetching: true,
        unFavouriteProperty: {},
      };
    case DELETE_ITEMS_FROM_FAVOURITES_SUCCESS:
      return {
        isFetching: false,
        unFavouriteProperty: action.payload.data,
      };

    case DELETE_ITEMS_FROM_FAVOURITES_ERROR:
      return {
        isFetching: false,
        unFavouriteProperty: [],
        isError: action.payload,
      };

    default:
      return state;
  }
};
