import { GET_ALL_TAG } from "../../../../constants/asyncActionsType";
import createAsyncThunkForSlice from "../../../../utils/utils";
import { getAllTags } from "./tagCrud";

export const getAllTag = createAsyncThunkForSlice(GET_ALL_TAG, getAllTags, {
  isToast: true,
});
