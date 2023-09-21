import {
  APPOINTMENT_TYPE,
  TITLE,
  DESCRIPTION,
  PRICE,
  ICON,
  NEWS_TITLE,
  NEWS_DESCRIPTION,
} from "../constants/mobileAppConfigurationConstant";

export const mobileAppAppointmentValidators = {
  [APPOINTMENT_TYPE]: {
    required: "Please Select Type",
  },
  [TITLE]: {
    required: "Please Enter Title",
  },
  [DESCRIPTION]: {
    required: "Please Enter Description",
  },
  [PRICE]: {
    required: "Please Enter Price Listing",
    validate: {
      handleZero: (value: any) => {
        if (value <= 0) {
          return "Please Enter Valid Price Listing";
        }
      },
    },
  },
  [ICON]: {
    required: "Please Select Icon",
    validate: {
      fileSize: (file: FileList) => {
        return (
          file[0].size <= 2 * 1024 * 1024 || "Icon size should be less than 2MB"
        );
      },
    },
  },
};

export const medicalCenterNewsValidators = {
  [NEWS_TITLE]: {
    required: "Please enter title",
  },
  [NEWS_DESCRIPTION]: {
    required: "Please enter description",
  },
};
