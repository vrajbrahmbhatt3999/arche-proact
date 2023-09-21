import {
  IMAGE_CATEGORY,
  IMAGE_NAME,
  UPLOAD_IMAGE,
} from "../constants/constant";

export const uploadImageValidators = {
  [IMAGE_CATEGORY]: {
    required: "Please select image category",
  },
  [IMAGE_NAME]: {
    required: "Please enter image name",
  },
  [UPLOAD_IMAGE]: {
    required: "Please upload image",
    validate: {
      fileSize: (file: FileList) => {
        return (
          file[0].size <= 2 * 1024 * 1024 || "File size should be less than 2MB"
        );
      },
      fileType: (file: FileList) =>
        /jpeg|png/.test(file[0].type) || "Only JPEG/PNG files are allowed",
    },
  },
};
