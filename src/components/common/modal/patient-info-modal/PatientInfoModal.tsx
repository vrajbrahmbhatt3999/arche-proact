import React, { FC, useState, useEffect } from "react";
import styles from "./patientInfoModal.module.scss";
import { RectangleIcon } from "../../svg-components";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { useForm } from "react-hook-form";
import { IPatientInvoiceForm } from "../../../../interfaces/interfaces";
import {
  INVOICE_PATIENT_MOBILE_NO,
  INVOICE_PATIENT_NATIONAL_ID,
  INVOICE_PATIENT_PROFILE_PIC,
} from "../../../../constants/constant";
import { dataURI, isDataUri, trimValue } from "../../../../utils/utils";
import SelectImage from "../../../../assets/images/Default Image.png";
import { clearInvoicePatientData } from "../../../../redux/features/invoice-module/invoiceSlice";
interface IPatientInfoModal {
  modalRef?: any;
}
interface FileList {
  name: string;
  data_uri: any;
}
const PatientInfoModal: FC<IPatientInfoModal> = ({ modalRef }) => {
  const dispatch = useAppDispatch();
  const { invoiceObjectById } = useAppSelector((state) => state.invoice);
  const [imageFiles, setImageFiles] = useState(
    { name: "", data_uri: "" } || null
  );
  // FORM
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    watch,
    formState: { errors },
  } = useForm<IPatientInvoiceForm>({});
  // set the data on form
  useEffect(() => {
    if (invoiceObjectById) {
      reset(invoiceObjectById);
    }
  }, [reset, invoiceObjectById]);

  useEffect(() => {
    if (invoiceObjectById?.profile_pic) {
      setImageFiles({
        name: "abc.jpg",
        data_uri: invoiceObjectById?.profile_pic,
      });
    }
  }, [invoiceObjectById?.profile_pic]);
  const selectImageFile = watch(INVOICE_PATIENT_PROFILE_PIC);
  const fileName = isDataUri(selectImageFile) ? "" : selectImageFile?.[0];
  // convert file object to data_uri
  useEffect(() => {
    const fileList: FileList = { name: "", data_uri: "" };
    const getDataURI = async (fileName: File) => {
      try {
        const result = await dataURI(fileName);
        fileList.name = fileName.name;
        fileList.data_uri = result;
        setImageFiles(fileList);
      } catch (error) {}
    };
    if (fileName) {
      getDataURI(fileName);
    }
  }, [fileName]);

  return (
    <>
      <RectangleIcon
        customClass={styles.rectangleIconStyle}
        fillColor="#ffffff"
      />
      <form className={styles.patientInfoMainContainer} ref={modalRef}>
        <div className={styles.patientDetailContainer}>
          <span style={{ display: "flex", flexDirection: "row" }}>
            <label className={styles.labelTextStyle}>National ID :</label>
            <input
              className={styles.inputField}
              {...register(INVOICE_PATIENT_NATIONAL_ID)}
              onChange={(e) => trimValue(e)}
            />
          </span>

          <span style={{ display: "flex", flexDirection: "row" }}>
            <label className={styles.labelTextStyle}>Mobile No :</label>
            <input
              className={styles.inputField}
              {...register(INVOICE_PATIENT_MOBILE_NO)}
              onChange={(e) => trimValue(e)}
            />
          </span>
        </div>
        <div className={styles.patientImageContainer}>
          {imageFiles?.data_uri ? (
            <img
              src={imageFiles?.data_uri}
              style={{
                objectFit: "cover",
                width: "90%",
                height: "80px",
                margin: "5px ",
              }}
              alt=""
            />
          ) : (
            <img
              src={SelectImage}
              className={styles.avtarImageFitStyle}
              alt=""
            />
          )}
        </div>
      </form>
    </>
  );
};

export default PatientInfoModal;
