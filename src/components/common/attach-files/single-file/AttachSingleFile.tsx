import { FC } from "react";
import styles from "../attachfiles.module.scss";
import { UseFormRegister } from "react-hook-form";
import { Attachments } from "../../svg-components";
import { colors } from "../../../../constants/color";

interface IAttachFiles {
  fileKey: any;
  error?: string;
  register: UseFormRegister<any>;
  validation?: any;
  id: string;
  fileList?: any;
  attachmentContainerCustomClass?: string;
  isName?: boolean;
  isDocument?: boolean;
}

const AttachFiles: FC<IAttachFiles> = ({
  fileKey,
  error,
  register,
  validation,
  id,
  fileList,
  attachmentContainerCustomClass,
  isName,
  isDocument,
}) => {
  const handleFileInputOpen = (element: string) => {
    const fileInput = document.getElementById(element);
    fileInput?.click();
  };

  return (
    <div
      className={[
        styles.attachmentsContainer,
        attachmentContainerCustomClass,
      ].join(" ")}
    >
      <div className={styles.attachmentsIconListContainer}>
        <span onClick={() => handleFileInputOpen(id)}>
          <input
            type="file"
            id={id}
            // accept=".jpg, .jpeg, .png, .svg"
            accept={
              isDocument === true
                ? ".pdf, .docx, .txt"
                : ".jpg, .jpeg, .png, .svg"
            }
            style={{ display: "none" }}
            {...register(fileKey, validation)}
          />
          <Attachments
            fillColor={colors.white1}
            fillColor1={colors.green1}
            customClass={styles.attchmentsIcon}
          />
        </span>
        <div className={styles.attachedFileListsContainer}>
          <div className={styles.attachedFile}>
            {/* {Object.values(fileList).length > 0 && fileList?.data_uri} */}
            {isName === true && fileList?.name && (
              <span className={styles.attachedFileName}>{fileList?.name}</span>
            )}
            {!isDocument && fileList?.data_uri && (
              <img
                className={styles.attachedImg}
                src={fileList?.data_uri}
                alt="images"
              />
            )}
          </div>
        </div>
      </div>
      <p className="dashboardFormError">{error}</p>
    </div>
  );
};

export default AttachFiles;
