import { FC } from "react";
import styles from "./attachSingleFileV2.module.scss";
import { UseFormRegister } from "react-hook-form";
import Button from "../../button/Button";

interface IAttachFiles {
  fileKey?: any;
  error?: string;
  register: UseFormRegister<any>;
  validation?: any;
  id?: any;
  fileList?: any;
  attachmentContainerCustomClass?: string;
  isName?: boolean;
  readOnly?: boolean;
}

const AttachSingleFileV2: FC<IAttachFiles> = ({
  fileKey,
  error,
  register,
  validation,
  id,
  fileList,
  attachmentContainerCustomClass,
  isName,
  readOnly,
}) => {
  const handleFileInputOpen = (element: string) => {
    if (!readOnly) {
      const fileInput = document.getElementById(element);
      fileInput?.click();
    }
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
            accept=".jpg, .jpeg, .png, .svg"
            style={{ display: "none" }}
            {...register(fileKey, validation)}
            disabled={readOnly}
          />

          <Button
            type="button"
            title="Change"
            customClass={styles.changeButtonStyle}
            disable={readOnly}
          />
        </span>
        <div className={styles.attachedFileListsContainer}>
          <div className={styles.attachedFile}>
            {isName === true && fileList?.name && (
              <span className={styles.attachedFileName}>{fileList?.name}</span>
            )}
          </div>
        </div>
      </div>
      <p className="dashboardFormError">{error}</p>
    </div>
  );
};

export default AttachSingleFileV2;
