import axios from "axios";
import { IAPIPayload } from "../../../interfaces/apiInterface";
import {
  ADD_INVENTORY_PURCHASE_ORDER,
  ADD_ISSUE_INVENTORY_DATA,
  CREATE_GRN_REQUEST,
  CREATE_INVENTORY_REQUEST,
  DELETE_INVENTORY_REQUEST,
  DELETE_INVENTORY_REQUEST_ITEM,
  EDIT_INVENTORY_REQUEST,
  EDIT_INVENTORY_REQUEST_ITEM,
  GET_ALL_INVENTORY_ITEM,
  GET_ALL_INVENTORY_REQUEST,
  GET_ALL_REQUEST_INVENTORY_DATA,
  GET_INVENTORY_REQUEST_BY_ID,
  GET_INVENTORY_REQUEST_PDF,
  GET_INVENTORY_STORE,
  GET_Inventory_ITEM_WITHSTORE,
  GET_Inventory_PURCHASE_ORDER_ALL,
  MARK_INVENTORY_REQUEST_AUTHORIZE,
  UPDATE_INVENTORY_PO,
} from "../../../config/config";

export const getAllInventoryItems = (data: IAPIPayload) => {
  return axios.post(GET_ALL_INVENTORY_ITEM, data);
};

export const createInventoryReqs = (data: IAPIPayload) => {
  return axios.post(CREATE_INVENTORY_REQUEST, data);
};

export const editInventoryReqs = (data: IAPIPayload) => {
  return axios.post(EDIT_INVENTORY_REQUEST, data);
};

export const deleteInventoryReqs = (data: IAPIPayload) => {
  return axios.post(DELETE_INVENTORY_REQUEST, data);
};

export const getAllInventoryReqs = (data: IAPIPayload) => {
  return axios.post(GET_ALL_INVENTORY_REQUEST, data);
};

export const getInventoryReqsByIds = (data: IAPIPayload) => {
  return axios.post(GET_INVENTORY_REQUEST_BY_ID, data);
};

export const markInventoryReqsAuthorizes = (data: IAPIPayload) => {
  return axios.post(MARK_INVENTORY_REQUEST_AUTHORIZE, data);
};

export const getInventoryReqsPdfs = (data: IAPIPayload) => {
  return axios.post(GET_INVENTORY_REQUEST_PDF, data);
};

export const editInventoryReqsItems = (data: IAPIPayload) => {
  return axios.post(EDIT_INVENTORY_REQUEST_ITEM, data);
};

export const deleteInventoryReqsItems = (data: IAPIPayload) => {
  return axios.post(DELETE_INVENTORY_REQUEST_ITEM, data);
};

export const getInventoryStores = (data: IAPIPayload) => {
  return axios.post(GET_INVENTORY_STORE, data);
};

export const addInventoryPurchaseOrder = (data: IAPIPayload) => {
  return axios.post(ADD_INVENTORY_PURCHASE_ORDER, data);
};

export const getAllInventoryPo = (data: IAPIPayload) => {
  return axios.post(GET_Inventory_PURCHASE_ORDER_ALL, data);
};  

export const getAllItemFromStore = (data: IAPIPayload) => {
  return axios.post(GET_Inventory_ITEM_WITHSTORE, data);
};

export const getAllInventoryRequestData = (data: IAPIPayload) => {
  return axios.post(GET_ALL_REQUEST_INVENTORY_DATA, data);
};

export const addIssueInventoryData = (data: IAPIPayload) => {
  return axios.post(ADD_ISSUE_INVENTORY_DATA, data)
}


export const createGrnReq = (data: IAPIPayload) => {
  return axios.post(CREATE_GRN_REQUEST, data);
};

export const updatePoInventory = (data: IAPIPayload) => {
  return axios.post(UPDATE_INVENTORY_PO, data);
};
