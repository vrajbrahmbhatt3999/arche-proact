import { createSlice } from "@reduxjs/toolkit";
import { IBed } from "../../../interfaces/apiInterface";
import {
  addBeds,
  editBed,
  getAllbed,
  getBedById,
  updateBedStatus,
} from "./bedAsyncActions";

export const initialState: IBed = {
  isLoading: false,
  bedData: [],
  bedlistInfo: {},
  bedInfo: {},
  error: null,
};

export const bedSlice = createSlice({
  name: "bed",
  initialState,
  reducers: {
    clearWardInfo: (state) => {
      state.bedInfo = {};
    },
    clearWardData: (state) => {
      state.bedInfo = [];
    },
  },
  extraReducers(builder) {
    // GET ALL BRANCH

    builder.addCase(getAllbed.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllbed.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bedData = action.payload?.data;
      state.bedlistInfo = action.payload;
    });
    builder.addCase(getAllbed.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // ADD BRANCH

    builder.addCase(addBeds.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addBeds.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bedInfo = action.payload;
    });
    builder.addCase(addBeds.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // GET BRANCH BY ID

    builder.addCase(getBedById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBedById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bedInfo = action.payload;
    });
    builder.addCase(getBedById.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // EDIT BRANCH

    builder.addCase(editBed.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editBed.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bedInfo = action.payload;
    });
    builder.addCase(editBed.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // UPDATE BRANCH STATUS

    builder.addCase(updateBedStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateBedStatus.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateBedStatus.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });
  },
});

export const { clearWardInfo, clearWardData } = bedSlice.actions;
export default bedSlice.reducer;
