import {
  APPOINTMENT_TYPE,
  TITLE,
  DESCRIPTION,
  PRICE,
  ICON,
  VISIBILITY,
  PRICE_VISIBILITY,
  NEWS_TITLE,
  NEWS_DESCRIPTION,
  EDITICON,
} from "../constants/mobileAppConfigurationConstant";

export interface IMobileAppAppointmentForm {
  [APPOINTMENT_TYPE]: string;
  [TITLE]: string;
  [DESCRIPTION]: string;
  [PRICE]: string;
  [ICON]: fileType[];
  [VISIBILITY]: boolean;
  [PRICE_VISIBILITY]: boolean;
  [EDITICON]: string;
  name: string;
  _id: string;
}

export interface IMedicalCenterNewsForm {
  [id: string]: {
    [NEWS_TITLE]: string;
    [NEWS_DESCRIPTION]: string;
  };
}
