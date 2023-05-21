import {
  actionClearSearchResults,
  actionGetSearchResults,
} from "./search.reducer";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

export const useSearchActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      actionGetSearchResults,
      actionClearSearchResults,
    },
    dispatch
  );
};
