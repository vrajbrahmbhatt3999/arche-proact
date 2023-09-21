import { CREATE_INVENTORY_ITEM_UNIT, DELETE_INVENTORY_ITEM_UNIT, EDIT_INVENTORY_ITEM_UNIT, GET_ALL_UNITS, GET_INVENTORY_ITEM_UNIT } from "../../../constants/asyncActionsType";
import createAsyncThunkForSlice from "../../../utils/utils";
import { getItemUnits, createUnits, getAllUnits, deleteUnitItem, editUnitItem } from "./unitTypeCrud";

export const getInventoryAllUnits = createAsyncThunkForSlice(
    GET_ALL_UNITS,
    getAllUnits
);

export const getInventoryItemUnits = createAsyncThunkForSlice(
    GET_INVENTORY_ITEM_UNIT,
    getItemUnits
);

export const createInventoryUnits = createAsyncThunkForSlice(
    CREATE_INVENTORY_ITEM_UNIT,
    createUnits
);

export const deleteInventoryUnits = createAsyncThunkForSlice(
    DELETE_INVENTORY_ITEM_UNIT,
    deleteUnitItem
);

export const editInventoryUnits = createAsyncThunkForSlice(
    EDIT_INVENTORY_ITEM_UNIT,
    editUnitItem
);
