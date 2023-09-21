import {
  ADD_INVENTORY_ISSUE,
  ADD_GRN,
  ADD_INVENTORY_PO,
  CREATE_INVENTORY_REQUEST,
  DELETE_INVENTORY_REQUEST,
  DELETE_INVENTORY_REQUEST_ITEM,
  EDIT_INVENTORY_REQUEST,
  EDIT_INVENTORY_REQUEST_ITEM,
  GET_ALL_INVENTORY_ITEM,
  GET_ALL_INVENTORY_REQUEST,
  GET_ALL_PO_DATA,
  GET_INVENTORY_PO,
  GET_INVENTORY_REQUEST_BY_ID,
  GET_INVENTORY_REQUEST_DATA,
  GET_INVENTORY_REQUEST_PDF,
  GET_INVENTORY_STORE,
  GET_ITEM_FROM_STORE,
  MARK_INVENTORY_REQUEST_AUTHORIZE,
  UPDATE_PO,
} from "../../../constants/asyncActionsType";
import createAsyncThunkForSlice from "../../../utils/utils";
import {
  addInventoryPurchaseOrder,
  addIssueInventoryData,
  createGrnReq,
  createInventoryReqs,
  deleteInventoryReqs,
  deleteInventoryReqsItems,
  editInventoryReqs,
  editInventoryReqsItems,
  getAllInventoryItems,
  getAllInventoryPo,
  getAllInventoryReqs,
  getAllInventoryRequestData,
  getAllItemFromStore,
  getInventoryReqsByIds,
  getInventoryReqsPdfs,
  getInventoryStores,
  markInventoryReqsAuthorizes,
  updatePoInventory,
} from "./inventoryRequestCrud";

export const getAllInventoryItem = createAsyncThunkForSlice(
  GET_ALL_INVENTORY_ITEM,
  getAllInventoryItems
);

export const createInventoryRequest = createAsyncThunkForSlice(
  CREATE_INVENTORY_REQUEST,
  createInventoryReqs,
  {
    isToast: true,
  }
);

export const editInventoryRequest = createAsyncThunkForSlice(
  EDIT_INVENTORY_REQUEST,
  editInventoryReqs,
  {
    isToast: true,
  }
);

export const deleteInventoryRequest = createAsyncThunkForSlice(
  DELETE_INVENTORY_REQUEST,
  deleteInventoryReqs,
  {
    isToast: true,
  }
);

export const getAllInventoryRequest = createAsyncThunkForSlice(
  GET_ALL_INVENTORY_REQUEST,
  getAllInventoryReqs
);

export const getInventoryReqsById = createAsyncThunkForSlice(
  GET_INVENTORY_REQUEST_BY_ID,
  getInventoryReqsByIds
);

export const markInventoryReqsAuthorize = createAsyncThunkForSlice(
  MARK_INVENTORY_REQUEST_AUTHORIZE,
  markInventoryReqsAuthorizes
);

export const getInventoryReqsPdf = createAsyncThunkForSlice(
  GET_INVENTORY_REQUEST_PDF,
  getInventoryReqsPdfs
);

export const editInventoryReqsItem = createAsyncThunkForSlice(
  EDIT_INVENTORY_REQUEST_ITEM,
  editInventoryReqsItems,
  {
    isToast: true,
  }
);

export const deleteInventoryReqsItem = createAsyncThunkForSlice(
  DELETE_INVENTORY_REQUEST_ITEM,
  deleteInventoryReqsItems,
  {
    isToast: true,
  }
);

export const getInventoryStore = createAsyncThunkForSlice(
  GET_INVENTORY_STORE,
  getInventoryStores
);

//Inventory MainStore

export const addInventoryAddPo = createAsyncThunkForSlice(
  ADD_INVENTORY_PO,
  addInventoryPurchaseOrder,
  {
    isToast: true,
  }
);

export const getInventoryAllPo = createAsyncThunkForSlice(
  GET_INVENTORY_PO,
  getAllInventoryPo
);
export const getAllInventoryAllPo = createAsyncThunkForSlice(
  GET_ALL_PO_DATA,
  getAllInventoryPo
);

export const getItemFromStore = createAsyncThunkForSlice(
  GET_ITEM_FROM_STORE,
  getAllItemFromStore
);

export const getInventoryRequestDataAll = createAsyncThunkForSlice(
  GET_INVENTORY_REQUEST_DATA,
  getAllInventoryRequestData
);

export const addInventoryIssueDataAll = createAsyncThunkForSlice(
  ADD_INVENTORY_ISSUE,
  addIssueInventoryData,
  {
    isToast: true,
  }
);

export const grnAdd = createAsyncThunkForSlice(ADD_GRN, createGrnReq, {
  isToast: true,
});

export const poInventoryUpdate = createAsyncThunkForSlice(UPDATE_PO, updatePoInventory, {
  isToast: true,
});
