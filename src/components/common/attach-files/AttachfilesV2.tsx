import { FC, useRef, useState } from "react";
import { colors } from "../../../constants/color";
import styles from "./attachfiles.module.scss";
import { Attachments, CrossIcon } from "../svg-components/index";
import { handleRefClick } from "../../../utils/utils";
import { fileType } from "../../../interfaces/interfaces";
import { UseFormSetValue } from "react-hook-form";
import { dataURI } from "../../../utils/utils";

interface IAttachFiles {
  fileKey?: any;
  error?: string;
  setValue?: UseFormSetValue<any>;
  isMultiSelect?: boolean;
  attachments?: any;
  setAttachments?: any;
  customClassFileName?: any;
  customAttachFileName?: any;
}

const AttachfilesV2: FC<IAttachFiles> = ({
  fileKey,
  error,
  setValue,
  isMultiSelect,
  attachments,
  setAttachments,
  customClassFileName,
  customAttachFileName,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<any>();
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const newAttachments = [...attachments];
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        const getDataURI = await dataURI(file);
        newAttachments.push({
          name: file.name,
          data_uri: getDataURI,
        });
      }
      setAttachments(newAttachments);
      if (setValue && fileKey && newAttachments) {
        setValue(fileKey, newAttachments);
      }
    }
  };
  const handleRemoveAttachment = (index: number) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
    if (setValue && fileKey && newAttachments) {
      setValue(fileKey, newAttachments);
    }
  };

  const handleChange = (e: any) => {
    let file = e.target.files[0].name;
    setFile(file);
    if (setValue && fileKey && file) {
      setValue(fileKey, file);
    }
  };

  return (
    <div className={styles.attachmentsContainer}>
      <div className={styles.attachmentsIconListContainer}>
        <span onClick={() => handleRefClick(fileInputRef)}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={isMultiSelect ? handleFileChange : handleChange}
            style={{ display: "none" }}
            accept=".jpg, .jpeg, .png, .svg"
          />
          <Attachments
            fillColor={colors.white1}
            fillColor1={colors.green1}
            customClass={styles.attchmentsIcon}
          />
        </span>
        <div
          className={[
            styles.attachedFileListsContainer,
            customClassFileName,
          ].join(" ")}
        >
          {!isMultiSelect && <p>{file}</p>}
          {attachments.length > 0 &&
            attachments.map((item: fileType, index: number) => {
              return (
                <div className={styles.attachedFile} key={index}>
                  <span
                    className={[
                      styles.attachedFileName,
                      customAttachFileName,
                    ].join(" ")}
                  >
                    {item.name}
                  </span>
                  <span
                    onClick={() => handleRemoveAttachment(index)}
                    className={styles.crossIcon}
                  >
                    <CrossIcon
                      fillColor={colors.white1}
                      fillColor1={colors.red1}
                    />
                  </span>
                </div>
              );
            })}
        </div>
      </div>
      <p className="dashboardFormError">{error}</p>
    </div>
  );
};

export default AttachfilesV2;
