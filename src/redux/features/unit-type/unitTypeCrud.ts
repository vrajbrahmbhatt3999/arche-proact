import axios from "axios";
import { CREATE_INVENTORY_ITEM_UNIT, DELETE_INVENTORY_ITEM_UNIT, EDIT_INVENTORY_ITEM_UNIT, GET_INVENTORY_ITEM_UNITS, GET_MASTER_VALUE_URL } from "../../../config/config";
import { IAPIPayload } from "../../../interfaces/apiInterface";


export const getAllUnits = (data: IAPIPayload) => {
    return axios.post(GET_MASTER_VALUE_URL, data);
};

export const getItemUnits = (data: IAPIPayload) => {
    return axios.post(GET_INVENTORY_ITEM_UNITS, data);
};

export const createUnits = (data: IAPIPayload) => {
    return axios.post(CREATE_INVENTORY_ITEM_UNIT, data);
};

export const deleteUnitItem = (data: IAPIPayload) => {
    return axios.post(DELETE_INVENTORY_ITEM_UNIT, data);
};

export const editUnitItem = (data: IAPIPayload) => {
    return axios.post(EDIT_INVENTORY_ITEM_UNIT, data);
};