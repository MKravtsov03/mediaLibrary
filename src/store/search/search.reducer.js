import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  searchResults: null,
  isLoading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    actionGetSearchResults(state) {
      state.isLoading = true;
    },
    actionGetSearchResultsSuccess(state, { payload }) {
      state.searchResults = payload;
      state.isLoading = false;
    },
    actionGetSearchResultsFailed(state, { payload }) {
      state.error = payload;
      state.isLoading = false;
    },
    actionClearSearchResults(state) {
      state.searchResults = initialState.searchResults
    }
  },
});

export const {
  actionGetSearchResults,
  actionGetSearchResultsSuccess,
  actionGetSearchResultsFailed,
  actionClearSearchResults
} = searchSlice.actions;

export default searchSlice.reducer;
