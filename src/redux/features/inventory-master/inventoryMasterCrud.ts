import axios from 'axios';
import { IAPIPayload } from '../../../interfaces/apiInterface';
import {
  INVENTORY_MASTER_CREATE,
  INVENTORY_MASTER_GET_ALL,
  INVENTORY_MASTER_UPDATE,
} from '../../../config/config';

export const getAllInventoryMasterTable = (data: IAPIPayload) => {
  return axios.post(INVENTORY_MASTER_GET_ALL, data);
};

export const createInventoryMasterTable = (data: IAPIPayload) => {
  return axios.post(INVENTORY_MASTER_CREATE, data);
};

export const updateInventoryMasterTable = (data: IAPIPayload) => {
  return axios.post(INVENTORY_MASTER_UPDATE, data);
};
