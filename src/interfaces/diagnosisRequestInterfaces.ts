import {
  INSURANCE_TYPE,
  PATIENT_TYPE,
  TEST_TYPE,
  TEST_NAME,
  PRICE,
  BILLABLE_TYPE,
  PRIORITY,
  NOTES,
} from "../constants/diagnosisRequestConstant";

export interface IDiagnosisRequestForm {
  [INSURANCE_TYPE]: any;
  [PATIENT_TYPE]: any;
  [TEST_TYPE]: any;
  [TEST_NAME]: any;
  [PRICE]: string;
  [BILLABLE_TYPE]: any;
  [PRIORITY]: any;
  [NOTES]: string;
}
