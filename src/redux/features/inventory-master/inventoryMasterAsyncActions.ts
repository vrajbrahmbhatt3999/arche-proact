import {
  CREATE_INVENTORY_MASTER_TABLE,
  GET_ALL_INVENTORY_MASTER,
  UPDATE_INVENTORY_MASTER_TABLE,
} from '../../../constants/asyncActionsType';
import createAsyncThunkForSlice from '../../../utils/utils';
import {
  createInventoryMasterTable,
  getAllInventoryMasterTable,
  updateInventoryMasterTable,
} from './inventoryMasterCrud';

export const getInventoryMasterList = createAsyncThunkForSlice(
  GET_ALL_INVENTORY_MASTER,
  getAllInventoryMasterTable
);

export const createInventoryMaster = createAsyncThunkForSlice(
  CREATE_INVENTORY_MASTER_TABLE,
  createInventoryMasterTable,
  {
    isToast: true,
  }
);

export const updateInventoryMaster = createAsyncThunkForSlice(
  UPDATE_INVENTORY_MASTER_TABLE,
  updateInventoryMasterTable,
  {
    isToast: true,
  }
);
