import {
  RECEIPT_TYPE,
  BRANCH_TYPE,
  PATIENT_NAME,
  FILE_NO,
  MOBILE_NO,
  REFERENCE_RECEIPT_NO,
  RECEIPT_DATE,
} from "../constants/receiptConstants";

export interface IReceiptForm {
  [RECEIPT_TYPE]: string;
  [BRANCH_TYPE]: string;
  [PATIENT_NAME]: string;
  [FILE_NO]: string;
  [MOBILE_NO]: string;
  [REFERENCE_RECEIPT_NO]: any;
  [RECEIPT_DATE]: string;
  selectedInvoiceData: any;
}
