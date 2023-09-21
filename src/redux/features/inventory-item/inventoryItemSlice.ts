import { createSlice } from '@reduxjs/toolkit';
import {
  createInventoryItem,
  getInventoryItemList,
  updateInventoryItem,
  updateStatusInventoryItem,
} from './inventoryItemAsyncActions';
import { IInventoryItem } from '../../../interfaces/apiInterface';

export const initialState: IInventoryItem = {
  isLoading: false,
  isStatusUpdated: true,
  inventoryItemList: [],
  error: null,
};

export const InventoryItemSlice = createSlice({
  name: 'inventoryItem',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // GET ALL INVENTORY Item table list of SUPPLIER
    builder.addCase(getInventoryItemList.pending, (state) => {
      state.isLoading = true;
      state.isStatusUpdated = false
    });
    builder.addCase(getInventoryItemList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isStatusUpdated = false
      state.inventoryItemList = action.payload?.data;
    });
    builder.addCase(getInventoryItemList.rejected, (state, error) => {
      state.isLoading = false;
      state.isStatusUpdated = false
      state.error = error;
    });

    // CREATE INVENTORY Item SUPPLIER

    builder.addCase(createInventoryItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createInventoryItem.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createInventoryItem.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // EDIT INVENTORY Item SUPPLIER
    builder.addCase(updateInventoryItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateInventoryItem.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateInventoryItem.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    builder.addCase(updateStatusInventoryItem.pending, (state) => {
      state.isLoading = true;
      state.isStatusUpdated = false;
    });
    builder.addCase(updateStatusInventoryItem.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isStatusUpdated = true;
    });
    builder.addCase(updateStatusInventoryItem.rejected, (state, error) => {
      state.isLoading = false;
      state.isStatusUpdated = false;
      state.error = error;
    });
  },
});

export default InventoryItemSlice.reducer;
