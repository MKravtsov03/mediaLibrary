import { combineReducers } from "@reduxjs/toolkit";
import searchReducer from "./search/search.reducer";
import collectionReducer from "./collection/collection.reducer";

export default combineReducers({
  search: searchReducer,
  collection: collectionReducer,
});
