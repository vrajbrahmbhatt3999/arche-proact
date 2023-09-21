import {
  CREATE_INVENTORY_ITEM_TABLE,
  GET_ALL_INVENTORY_ITEM,
  UPDATE_INVENTORY_ITEM_TABLE,
  UPDATE_STATUS_INVENTORY_ITEM_TABLE,
} from '../../../constants/asyncActionsType';
import createAsyncThunkForSlice from '../../../utils/utils';
import {
  createInventoryItemTable,
  getAllInventoryItemTable,
  updateInventoryItemTable,
  updateStatusInventoryItemTable
} from './inventoryItemCrud';

export const getInventoryItemList = createAsyncThunkForSlice(
  GET_ALL_INVENTORY_ITEM,
  getAllInventoryItemTable
);

export const createInventoryItem = createAsyncThunkForSlice(
  CREATE_INVENTORY_ITEM_TABLE,
  createInventoryItemTable,
  {
    isToast: true,
  }
);

export const updateInventoryItem = createAsyncThunkForSlice(
  UPDATE_INVENTORY_ITEM_TABLE,
  updateInventoryItemTable,
  {
    isToast: true,
  }
);

export const updateStatusInventoryItem = createAsyncThunkForSlice(
  UPDATE_STATUS_INVENTORY_ITEM_TABLE,
  updateStatusInventoryItemTable,
  {
    isToast: true,
  }
);
