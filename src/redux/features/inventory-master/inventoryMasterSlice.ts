import { createSlice } from '@reduxjs/toolkit';
import {
  createInventoryMaster,
  getInventoryMasterList,
  updateInventoryMaster,
} from './inventoryMasterAsyncActions';
import { IInventoryMaster } from '../../../interfaces/apiInterface';

export const initialState: IInventoryMaster = {
  isLoading: false,
  inventoryDataList: [],
  error: null,
};

export const InventoryMasterSlice = createSlice({
  name: 'inventoryMaster',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // GET ALL INVENTORY Master table list of SUPPLIER
    builder.addCase(getInventoryMasterList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getInventoryMasterList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.inventoryDataList = action.payload?.data;
    });
    builder.addCase(getInventoryMasterList.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // CREATE INVENTORY MASTER SUPPLIER

    builder.addCase(createInventoryMaster.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createInventoryMaster.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createInventoryMaster.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // EDIT INVENTORY MASTER SUPPLIER
    builder.addCase(updateInventoryMaster.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateInventoryMaster.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateInventoryMaster.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });
  },
});

export default InventoryMasterSlice.reducer;
