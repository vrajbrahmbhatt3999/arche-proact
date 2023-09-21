import axios from 'axios';
import { IAPIPayload } from '../../../interfaces/apiInterface';
import {
  INVENTORY_ITEM_CREATE,
  INVENTORY_ITEM_GET_ALL,
  INVENTORY_ITEM_UPDATE,
  INVENTORY_ITEM_UPDATE_STATUS,
} from '../../../config/config';

export const getAllInventoryItemTable = (data: IAPIPayload) => {
  return axios.post(INVENTORY_ITEM_GET_ALL, data);
};

export const createInventoryItemTable = (data: IAPIPayload) => {
  return axios.post(INVENTORY_ITEM_CREATE, data);
};

export const updateInventoryItemTable = (data: IAPIPayload) => {
  return axios.post(INVENTORY_ITEM_UPDATE, data);
};

export const updateStatusInventoryItemTable = (data: IAPIPayload) => {
  return axios.post(INVENTORY_ITEM_UPDATE_STATUS, data);
};
