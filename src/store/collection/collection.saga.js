import { call, takeLatest, put, all } from "redux-saga/effects";
import NasaImagesService from "../../api/NasaImagesSevice";
import {
  actionGetCollection,
  actionGetCollectionAssetsSuccess,
  actionGetCollectionAssetsFailed,
  actionGetCollectionData,
  actionSetCollectionData,
} from "./collection.reducer";
import { mapCollectionMetadata } from "../../helpers";

export function* getAssetResults({ payload }) {
  try {
    const assetResultsResponse = yield call(
      NasaImagesService.getAssetResults,
      payload
    );
    yield put(
      actionGetCollectionAssetsSuccess(
        assetResultsResponse?.data?.collection?.items
      )
    );
  } catch (error) {
    yield put(actionGetCollectionAssetsFailed(error));
  }
}
export function* getCollectionData({ payload }) {
  try {
    const collectionDataResponse = yield call(
      NasaImagesService.getCollectionData,
      payload
    );
    yield put(
      actionSetCollectionData(
        mapCollectionMetadata(collectionDataResponse.data)
      )
    );
  } catch (error) {
    yield put(actionGetCollectionAssetsFailed(error));
  }
}

export function* watchCollection() {
  yield all([
    takeLatest(actionGetCollection().type, getAssetResults),
    takeLatest(actionGetCollectionData().type, getCollectionData),
  ]);
}
