import {
  DOCUMENT_CATEGORY,
  DOCUMENT_NAME,
  UPLOAD_DOCUMENT,
} from "../constants/constant";

export const uploadDocumentValidators = {
  [DOCUMENT_CATEGORY]: {
    required: "Please select document category",
  },
  [DOCUMENT_NAME]: {
    required: "Please enter document name",
  },
  [UPLOAD_DOCUMENT]: {
    required: "Please upload document",
    validate: {
      fileSize: (file: FileList) => {
        return (
          file[0].size <= 2 * 1024 * 1024 || "File size should be less than 2MB"
        );
      },
      // fileType: (file: FileList) =>
      //   /pdf|docx|txt/.test(file[0].type) ||
      //   "Only PDF/DOCX/TXT files are allowed",
      fileType: (file: FileList) => {
        const allowedExtensions = ["pdf"];
        const fileName: any = file[0].name;
        const fileExtension = fileName.split(".").pop().toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
          return "Only PDF files are allowed";
        }

        return true;
      },
    },
  },
};
