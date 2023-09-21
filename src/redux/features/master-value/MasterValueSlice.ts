import { createSlice } from "@reduxjs/toolkit";
import { IMasterValue } from "../../../interfaces/apiInterface";
import {
  addAllMasterValue,
  getAllMasterValue,
  updatMasterValue,
  updateStatusValue,
} from "./MasterValueAsyncActions";

export const initialState: IMasterValue = {
  isLoading: false,
  error: null,
  addMasterValue: {},
  getAllMasterValueData: [],
  statusUpdate: {},
  updateMasterValueData: {},
  getAllMasterValueDataReducer: {},
};

export const masterValueSlice = createSlice({
  name: "masterValueSlice",
  initialState,
  reducers: {
    getAllMasterValuePayloadData: (state, action) => {
      state.getAllMasterValueDataReducer = action.payload;
    },
    
    clearState: (state) => {
      state.isLoading = false;
      state.error = "";
      state.getAllMasterValueData = {};
      state.getAllMasterValueDataReducer = {};
      state.updateMasterValueData = {};
      state.statusUpdate={};
    },
  },
  extraReducers: (builder) => {
    // add mastervalue
    builder
      .addCase(addAllMasterValue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAllMasterValue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addMasterValue = action?.payload;
      })
      .addCase(addAllMasterValue.rejected, (state, error) => {
        state.isLoading = false;
        state.error = error;
      });

    // get all master value
    builder
      .addCase(getAllMasterValue.pending, (state) => {
        state.isLoading = true;
        // state.getAllMasterValueData = []
      })
      .addCase(getAllMasterValue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getAllMasterValueData = action?.payload?.data;
      })
      .addCase(getAllMasterValue.rejected, (state, error) => {
        state.isLoading = false;
        state.error = error;
      });

    // update status value
    builder
      .addCase(updateStatusValue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStatusValue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getAllMasterValueData = action?.payload;
      })
      .addCase(updateStatusValue.rejected, (state, error) => {
        state.isLoading = false;
        state.error = error;
      });

    // update status value
    builder
      .addCase(updatMasterValue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatMasterValue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updateMasterValueData = action?.payload;
      })
      .addCase(updatMasterValue.rejected, (state, error) => {
        state.isLoading = false;
        state.error = error;
      });
  },
});

export const { getAllMasterValuePayloadData,clearState} = masterValueSlice.actions;
export default masterValueSlice.reducer;
