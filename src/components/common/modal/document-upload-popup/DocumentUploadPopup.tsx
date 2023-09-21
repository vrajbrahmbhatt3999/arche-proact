import { FC, useEffect, useState } from "react";
import styles from "./documentUploadPopup.module.scss";
import { CloseIcon } from "../../svg-components";
import { colors } from "../../../../constants/color";
import Divider from "../../divider/Divider";
import Button from "../../button/Button";
import AttachFiles from "../../attach-files/single-file/AttachSingleFile";
import { useForm } from "react-hook-form";
import {
  IDocumentUploadForm,
  IImageUploadForm,
} from "../../../../interfaces/interfaces";
import { uploadImageValidators } from "../../../../form-validators/uploadImageFormValidators";
import {
  //   DOCUMENT_CATEGORY,
  //   DOCUMENT_NAME,
  //   UPLOAD_DOCUMENT,
  DOCUMENT_CATEGORY,
  DOCUMENT_NAME,
  UPLOAD_DOCUMENT,
} from "../../../../constants/constant";
import { dataURI, trimValue } from "../../../../utils/utils";
import { uploadDocumentValidators } from "../../../../form-validators/uploadDocumentFormValidators";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { addDiagnosisDocument } from "../../../../redux/features/diagnosis/diagnosisAsyncActions";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import Select from "react-select";

interface IDocumentUploadPopup {
  handleClose?: any;
  setModelOpenClose?: any;
  popData?: any;
}

const DocumentUploadPopup: FC<IDocumentUploadPopup> = ({
  handleClose,
  setModelOpenClose,
  popData,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<IDocumentUploadForm>();

  const [imageUpload, setImageUpload] = useState({ name: "", data_uri: "" });
  const { masterValueData } = useAppSelector((state) => state.login);
  const [docCategory, setDocCategory] = useState<any>([]);

  const selectIconData = watch(UPLOAD_DOCUMENT);
  const fileName = selectIconData?.[0];
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (masterValueData && masterValueData.length > 0) {
      const statusArray = masterValueData
        ?.find((item: any) => item.category_name === "DOCUMENT_CATEGORY")
        ?.values?.map((item: any) => {
          return {
            label: item?.value,
            value: item?._id,
          };
        });
      statusArray?.length > 0 && setDocCategory([...statusArray]);
    } else {
      setDocCategory([]);
    }
  }, [masterValueData]);

  useEffect(() => {
    const fileList: any = { name: "", data_uri: "" };
    const getDataURI = async (fileName: File | any) => {
      try {
        const result = await dataURI(fileName);
        fileList.data_uri = result;
        fileList.name = fileName.name;
        setImageUpload(fileList);
      } catch (error) {
        console.log({ error });
      }
    };
    if (fileName) {
      getDataURI(fileName);
    }
  }, [fileName]);

  const onSubmit = async (data: IDocumentUploadForm) => {
    console.log("data", data);
    let data_uri = await dataURI(data?.document[0]);
    let file = {
      name: data?.document_name,
      data_uri: data_uri,
    };
    let payloadData = {
      diagnosis_id: popData.length > 0 && popData,
      // diagnosis_id: "6454975dddf2093946625995",
      doc_category: data.doc_category,
      file,
    };
    dispatch(addDiagnosisDocument(requestGenerator(payloadData))).then((e) => {
      if ((e.type = "diagnosis/addDiagnosisImage/fulfilled")) {
        setTimeout(() => {
          setModelOpenClose(false);
        }, 2000);
      }
    });
  };
  return (
    <>
      <div
        className={styles.mainContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={handleClose}
        />
        <div className={styles.uploadContainer}>
          <p className={styles.title}>Documents</p>
          <Divider customClass={styles.dividerStyle} />
          <form
            className={styles.formContainer}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.fieldContainer}>
              <label className={styles.labelText}>Doc. Category</label>
              <div className={styles.inputContainer}>
                <Select
                  className={styles.selectStyle}
                  placeholder="Select Category"
                  closeMenuOnSelect={true}
                  {...register(
                    DOCUMENT_CATEGORY,
                    uploadDocumentValidators[DOCUMENT_CATEGORY]
                  )}
                  isSearchable={true}
                  options={docCategory?.map((item: any) => ({
                    label: item?.label,
                    value: item?.value,
                  }))}
                  onChange={(e: any) => {
                    setValue(DOCUMENT_CATEGORY, e.label);
                    trigger(DOCUMENT_CATEGORY);
                  }}
                  maxMenuHeight={200}
                />
                {errors[DOCUMENT_CATEGORY] && (
                  <p className="errorText">
                    {errors[DOCUMENT_CATEGORY].message}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.fieldContainer}>
              <label className={styles.labelText}>Doc. Name</label>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  className={styles.inputStyle}
                  placeholder="Enter document name"
                  {...register(
                    DOCUMENT_NAME,
                    uploadDocumentValidators[DOCUMENT_NAME]
                  )}
                  onChange={(e) => trimValue(e)}
                />
                {errors[DOCUMENT_NAME] && (
                  <p className="errorText">{errors[DOCUMENT_NAME].message}</p>
                )}
              </div>
            </div>
            <div className={styles.fieldContainer}>
              <label className={styles.labelText}>Upload Doc.</label>
              <div className={styles.inputContainer}>
                <AttachFiles
                  register={register}
                  fileKey={UPLOAD_DOCUMENT}
                  id={UPLOAD_DOCUMENT}
                  validation={
                    imageUpload?.data_uri?.length > 0
                      ? {}
                      : uploadDocumentValidators[UPLOAD_DOCUMENT]
                  }
                  fileList={imageUpload}
                  isName={true}
                  isDocument={true}
                />
                {errors[UPLOAD_DOCUMENT] && (
                  <p className="errorText">{errors[UPLOAD_DOCUMENT].message}</p>
                )}
              </div>
            </div>
            <Button
              title="Submit"
              customClass={styles.buttonStyle}
              type="submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default DocumentUploadPopup;
