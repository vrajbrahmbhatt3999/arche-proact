import axios from "axios";
import { CREATE_PURCHASE_INVOICE, GET_ALL_GRN, GET_ALL_SUPPLIER } from "../../../config/config";
import { IAPIPayload } from "../../../interfaces/apiInterface";

export const getSupplierDetails = (data: IAPIPayload) => {
    return axios.post(GET_ALL_SUPPLIER, data);
};

export const getGrn = (data: IAPIPayload) => {
    return axios.post(GET_ALL_GRN, data);
};

export const getConformGrn = (data: IAPIPayload) => {
    return axios.post(CREATE_PURCHASE_INVOICE, data);
};

