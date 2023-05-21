import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import {
    actionGetCollection,
    actionGetCollectionAssetsSuccess,
    actionGetCollectionAssetsFailed,
    actionSetCollectionData,
    actionClearCollection,
    actionGetCollectionData
} from "./collection.reducer";

export const useCollectionActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
        actionGetCollection,
        actionGetCollectionAssetsSuccess,
        actionGetCollectionAssetsFailed,
        actionSetCollectionData,
        actionClearCollection,
        actionGetCollectionData
    },
    dispatch
  );
};
