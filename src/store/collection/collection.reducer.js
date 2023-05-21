import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: null,
  assets: [],
  isLoading: false,
  error: null,
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    actionGetCollection(state) {
      state.isLoading = true;
    },
    actionGetCollectionData(state) {
      state.isLoading = true;
    },
    actionGetCollectionAssetsSuccess(state, { payload }) {
      state.assets = payload;
      state.isLoading = false;
    },
    actionGetCollectionAssetsFailed(state, { payload }) {
      state.error = payload;
      state.isLoading = false;
    },
    actionSetCollectionData(state, { payload }) {
      state.data = payload;
    },
    actionClearCollection(state) {
      state.data = initialState.data;
      state.assets = initialState.assets;
      state.error = initialState.error;
      state.isLoading = initialState.isLoading;
    }
  },
});

export const {
  actionGetCollection,
  actionGetCollectionAssetsSuccess,
  actionGetCollectionAssetsFailed,
  actionSetCollectionData,
  actionClearCollection,
  actionGetCollectionData,
} = collectionSlice.actions;

export default collectionSlice.reducer;
