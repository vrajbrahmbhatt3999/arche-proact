import { CREATE_PURCHASE_INVOICE, GET_ALL_Grn, GET_ALL_SUPPLIER } from "../../../constants/asyncActionsType";
import createAsyncThunkForSlice from "../../../utils/utils";
import { getConformGrn, getGrn, getSupplierDetails } from "./purchaseInvoiceCrud";


export const getAllSupplierDetails = createAsyncThunkForSlice(
    GET_ALL_SUPPLIER,
    getSupplierDetails
);

export const getAllGrn = createAsyncThunkForSlice(
    GET_ALL_Grn,
    getGrn
);

export const getPurchaseInvoice = createAsyncThunkForSlice(
    CREATE_PURCHASE_INVOICE,
    getConformGrn
);
