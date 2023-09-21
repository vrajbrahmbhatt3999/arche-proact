import { ADD_ATTACHMENT_ID, DEPT, SPECIALITY, SPECIALITY_IMG } from "../constants/constant";

export interface ISpecialityValidators {
  [DEPT]: {
    required: string;
  };
  [SPECIALITY]: {
    required: string;
  };
  [SPECIALITY_IMG]: {
    required: string;
  };
  [ADD_ATTACHMENT_ID]: {
    required: string;
  }
}

export const specialityValidators = {
  [DEPT]: {
    required: "Please select department",
  },
  [SPECIALITY]: {
    required: "Please enter specialty name",
  },
  [SPECIALITY_IMG]: {
    required: "Please select specialty photo",
    validate: {
      fileSize: (file: FileList) => {
        return (
          file[0].size < 2 * 1024 * 1024 || "File size should be less than 2MB"
        );
      },
      fileType: (file: FileList) =>
        /jpeg|png/.test(file[0].type) || "Only JPEG/PNG files are allowed",
    },
  },
  [ADD_ATTACHMENT_ID]: {
    required: "Please select Attachment",
    validate: {
      fileSize: (file: FileList) => {
        return (
          file[0].size < 2 * 1024 * 1024 || "File size should be less than 2MB"
        );
      },
      fileType: (file: FileList) =>
        /jpeg|png/.test(file[0].type) || "Only JPEG/PNG files are allowed",
    },
  }
};

