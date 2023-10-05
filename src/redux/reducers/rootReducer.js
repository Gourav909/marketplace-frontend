import { combineReducers } from "redux";
import {
  signUpAuthReducer,
  signInAuthReducer,
  getCurrentUserReducer,
} from "./auth";
import {
  addNewPropertyReducer,
  deletePropertyReducer,
  updatePropertyReducer,
} from "./admin";
import {
  fetchPropertiesReducer,
  fetchPropertyByIdReducer,
  fetchCitiesByReducer,
} from "./utilsReducer";

import {
  addItemToFavouriteListReducer,
  deleteFavPropertyReducer,
  fetchFavouriteList,
} from "./user";

const rootReducer = combineReducers({
  signUpAuthReducer: signUpAuthReducer,
  signInAuthReducer: signInAuthReducer,
  getCurrentUserReducer: getCurrentUserReducer,
  updatePropertyReducer: updatePropertyReducer,
  deletePropertyReducer: deletePropertyReducer,
  fetchPropertiesReducer: fetchPropertiesReducer,
  fetchPropertyByIdReducer: fetchPropertyByIdReducer,
  addNewPropertyReducer: addNewPropertyReducer,
  addItemToFavouriteListReducer: addItemToFavouriteListReducer,
  fetchFavouriteList: fetchFavouriteList,
  deleteFavPropertyReducer: deleteFavPropertyReducer,
  fetchCitiesByReducer: fetchCitiesByReducer,
});

export default rootReducer;
