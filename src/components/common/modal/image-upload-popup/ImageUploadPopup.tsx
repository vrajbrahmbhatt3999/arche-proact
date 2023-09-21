import { FC, useEffect, useState } from "react";
import styles from "./imageUploadPopup.module.scss";
import { CloseIcon } from "../../svg-components";
import { colors } from "../../../../constants/color";
import Divider from "../../divider/Divider";
import Button from "../../button/Button";
import AttachFiles from "../../attach-files/single-file/AttachSingleFile";
import { useForm } from "react-hook-form";
import { IImageUploadForm } from "../../../../interfaces/interfaces";
import { uploadImageValidators } from "../../../../form-validators/uploadImageFormValidators";
import {
  IMAGE_CATEGORY,
  IMAGE_NAME,
  UPLOAD_IMAGE,
} from "../../../../constants/constant";
import { dataURI, trimValue } from "../../../../utils/utils";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import { addDiagnosisImg } from "../../../../redux/features/diagnosis/diagnosisAsyncActions";
import Select from "react-select";

interface IImageUploadPopup {
  handleClose?: any;
  setModelOpenClose?: any;
  popData?: any;
}

const ImageUploadPopup: FC<IImageUploadPopup> = ({
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
  } = useForm<IImageUploadForm>();

  const [imageUpload, setImageUpload] = useState({ name: "", data_uri: "" });

  const selectIconData = watch(UPLOAD_IMAGE);
  const fileName = selectIconData?.[0];
  const dispatch = useAppDispatch();
  const { masterValueData } = useAppSelector((state) => state.login);
  const [docCategory, setDocCategory] = useState<any>([]);

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

  console.log("popData", popData);

  const onSubmit = async (data: IImageUploadForm) => {
    let data_uri = await dataURI(data?.img[0]);
    let file = {
      name: data?.img_name,
      data_uri: data_uri,
    };
    let payloadData = {
      diagnosis_id: popData.length > 0 && popData,
      // diagnosis_id: "6454975dddf2093946625995",
      image_category: data.image_category,
      file,
    };
    dispatch(addDiagnosisImg(requestGenerator(payloadData))).then((e) => {
      if ((e.type = "diagnosis/addDiagnosisImage/fulfilled")) {
        setTimeout(() => {
          setModelOpenClose(false);
        }, 2000);
      }
    });
  };

  const customStyles = {
    option: (base: any) => ({
      ...base,
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#d3d3d3",
      },
    }),
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
          <p className={styles.title}>Images</p>
          <Divider customClass={styles.dividerStyle} />
          <form
            className={styles.formContainer}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.fieldContainer}>
              <label className={styles.labelText}>Image Category</label>
              <div className={styles.inputContainer}>
                <Select
                  className={styles.selectStyle}
                  placeholder="Select Category"
                  closeMenuOnSelect={true}
                  {...register(
                    IMAGE_CATEGORY,
                    uploadImageValidators[IMAGE_CATEGORY]
                  )}
                  isSearchable={true}
                  options={docCategory?.map((item: any) => ({
                    label: item?.label,
                    value: item?.value,
                  }))}
                  onChange={(e: any) => {
                    setValue(IMAGE_CATEGORY, e.label);
                    trigger(IMAGE_CATEGORY);
                  }}
                  maxMenuHeight={200}
                  // styles={customStyles}
                />
                {errors[IMAGE_CATEGORY] && (
                  <p className="errorText">{errors[IMAGE_CATEGORY].message}</p>
                )}
              </div>
            </div>
            <div className={styles.fieldContainer}>
              <label className={styles.labelText}>Image Name</label>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  className={styles.inputStyle}
                  placeholder="Enter image name"
                  {...register(IMAGE_NAME, uploadImageValidators[IMAGE_NAME])}
                  onChange={(e) => trimValue(e)}
                />
                {errors[IMAGE_NAME] && (
                  <p className="errorText">{errors[IMAGE_NAME].message}</p>
                )}
              </div>
            </div>
            <div className={styles.fieldContainer}>
              <label className={styles.labelText}>Upload Image</label>
              <div className={styles.inputContainer}>
                <AttachFiles
                  register={register}
                  fileKey={UPLOAD_IMAGE}
                  id={UPLOAD_IMAGE}
                  validation={
                    imageUpload?.data_uri?.length > 0
                      ? {}
                      : uploadImageValidators[UPLOAD_IMAGE]
                  }
                  fileList={imageUpload}
                  isName={false}
                />
                {errors[UPLOAD_IMAGE] && (
                  <p className="errorText">{errors[UPLOAD_IMAGE].message}</p>
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

export default ImageUploadPopup;
