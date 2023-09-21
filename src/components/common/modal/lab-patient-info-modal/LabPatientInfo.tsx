import React, { FC, useState, useEffect } from "react";
import styles from "./LabPatientInfo.module.scss";
import { RectangleIcon } from "../../svg-components";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { useForm } from "react-hook-form";
import { IPatientInvoiceForm } from "../../../../interfaces/interfaces";
import {
    LAB_INVOICE_PATIENT_MOBILE_NO,
    LAB_INVOICE_PATIENT_NATIONAL_ID,
    LAB_INVOICE_PATIENT_PROFILE_PIC,
} from "../../../../constants/constant";
import { dataURI, isDataUri, trimValue } from "../../../../utils/utils";
import SelectImage from "../../../../assets/images/Default Image.png";

interface IPatientInfoModal {
    modalRef?: any;
}
interface FileList {
    name: string;
    data_uri: any;
}
const LabPatientInfo: FC<IPatientInfoModal> = ({ modalRef }) => {

    const { patientSearchObject } = useAppSelector(
        (state) => state.labInvoice
    );
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
        if (patientSearchObject) {
            reset(patientSearchObject);
        }
    }, [reset, patientSearchObject]);

    useEffect(() => {
        if (patientSearchObject?.profile_pic) {
            setImageFiles({
                name: "abc.jpg",
                data_uri: patientSearchObject?.profile_pic,
            });
        }
    }, [patientSearchObject?.profile_pic]);


    const selectImageFile = watch(LAB_INVOICE_PATIENT_PROFILE_PIC);
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
            } catch (error) { }
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
                            {...register(LAB_INVOICE_PATIENT_NATIONAL_ID)}
                            onChange={(e) => trimValue(e)}
                        />
                    </span>

                    <span style={{ display: "flex", flexDirection: "row" }}>
                        <label className={styles.labelTextStyle}>Mobile No :</label>
                        <input
                            className={styles.inputField}
                            {...register(LAB_INVOICE_PATIENT_MOBILE_NO)}
                            onChange={(e) => trimValue(e)}
                        />
                    </span>
                </div>
                <div className={styles.patientImageContainer}>
                    {/* {imageFiles?.data_uri.length ? ( */}
                        <img
                            src={imageFiles?.data_uri.length ? imageFiles?.data_uri : SelectImage }
                            style={{
                                objectFit: "cover",
                                width: "90%",
                                height: "80px",
                                margin: "5px ",
                            }}
                            alt=""
                        />
                    {/* // ) : (
                    //     <img
                    //         src={SelectImage}
                    //         className={styles.avtarImageFitStyle}
                    //         alt=""
                    //     />
                    // )} */}
                </div>
            </form>
        </>
    );
};

export default LabPatientInfo;
