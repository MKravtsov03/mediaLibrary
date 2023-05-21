import { all, fork } from "redux-saga/effects";
import { watchSearch } from "./search/search.saga";
import { watchCollection } from "./collection/collection.saga";

export default function* rootSaga() {
  yield all([fork(watchSearch), fork(watchCollection)]);
}
