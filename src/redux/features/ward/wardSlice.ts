import { createSlice } from "@reduxjs/toolkit";
import { IWard } from "../../../interfaces/apiInterface";
import {
  addWards,
  editWard,
  getAllWard,
  getWardById,
  updateWardStatus,
} from "./wardAsyncActions";

export const initialState: IWard = {
  isLoading: false,
  wardData: [],
  wardlistInfo: {},
  wardInfo: {},
  error: null,
};

export const wardSlice = createSlice({
  name: "ward",
  initialState,
  reducers: {
    clearWardInfo: (state) => {
      state.wardInfo = {};
    },
    clearWardData: (state) => {
      state.wardInfo = [];
    },
  },
  extraReducers(builder) {
    // GET ALL BRANCH

    builder.addCase(getAllWard.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllWard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.wardData = action.payload?.data;
      state.wardlistInfo = action.payload;
    });
    builder.addCase(getAllWard.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // ADD BRANCH

    builder.addCase(addWards.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addWards.fulfilled, (state, action) => {
      state.isLoading = false;
      state.wardInfo = action.payload;
    });
    builder.addCase(addWards.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // GET BRANCH BY ID

    builder.addCase(getWardById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getWardById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.wardInfo = action.payload;
    });
    builder.addCase(getWardById.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // EDIT BRANCH

    builder.addCase(editWard.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editWard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.wardInfo = action.payload;
    });
    builder.addCase(editWard.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // UPDATE BRANCH STATUS

    builder.addCase(updateWardStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateWardStatus.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateWardStatus.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });
  },
});

export const { clearWardInfo, clearWardData } = wardSlice.actions;
export default wardSlice.reducer;
