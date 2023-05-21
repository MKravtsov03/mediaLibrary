import { call, put, takeLatest } from "redux-saga/effects";
import {
  actionGetSearchResults,
  actionGetSearchResultsFailed,
  actionGetSearchResultsSuccess,
} from "./search.reducer";
import NasaImagesService from "../../api/NasaImagesSevice";

export function* getSearchResults({ payload }) {
  try {
    const searchResultsResponse = yield call(
      NasaImagesService.getSearchResults,
      payload
    );
    console.log(searchResultsResponse);
    const {
      items,
      metadata: { total_hits: total },
    } = searchResultsResponse?.data?.collection;
    yield put(actionGetSearchResultsSuccess({ items, total }));
  } catch (error) {
    yield put(actionGetSearchResultsFailed({ error: error }));
  }
}

export function* watchSearch() {
  yield takeLatest(actionGetSearchResults().type, getSearchResults);
}
