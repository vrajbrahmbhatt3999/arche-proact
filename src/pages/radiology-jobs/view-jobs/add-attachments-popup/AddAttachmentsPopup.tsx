import { FC, useState, useEffect } from "react";
import { colors } from "../../../../constants/color";
import { CloseIcon } from "../../../../components/common/svg-components/index";
import styles from "./addresultsPopup.module.scss";
import Button from "../../../../components/common/button/Button";
import TableV2 from "../../../../components/common/table/tableV2/TableV2";
import { addResultsPopupHeaderData } from "./addResultTableData";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { useForm } from "react-hook-form";
import AttachFiles from "../../../../components/common/attach-files/single-file/AttachSingleFile";
import { dataURI, trimValue } from "../../../../utils/utils";
import { fileType } from "../../../../interfaces/interfaces";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import { Input } from "../../../../components/common/input/input";
import {
  AttachmentsJobsAsyncData,
  DocumentJobsAsyncData,
} from "../../../../redux/features/radiology-jobs/jobsAsyncActions";
// import { ADD_ATTACHMENT_ID } from "../../../../constants/constant";
// import { specialityValidators } from "../../../../form-validators/specialityValidators";
import Loader from "../../../../components/common/spinner/Loader";

interface IPropsData {
  handleClose?: any;
  popData: any;
  handleOpen: any;
}
const AddAttachmentsPopup: FC<IPropsData> = ({
  handleClose,
  popData,
  handleOpen,
}) => {
  const [userPhoto, setuserPhoto] = useState({ name: "", data_uri: "" });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useAppDispatch();
  const { getAttachmentDataApi, isLoading } = useAppSelector(
    (state) => state.radiologyJobs
  );

  useEffect(() => {
    dispatch(
      AttachmentsJobsAsyncData(requestGenerator({ job_id: popData?._id }))
    );
  }, [dispatch, popData?._id]);

  const onSubmit = (item: any) => {
    dispatch(
      DocumentJobsAsyncData(
        requestGenerator({
          file: userPhoto,
          job_id: popData?._id,
          name: item?.document,
          action: "ADD",
        })
      )
    ).then((e: any) => {
      if (e.type === "JOB/DocumentJobsAsyncData/fulfilled") {
        dispatch(
          AttachmentsJobsAsyncData(requestGenerator({ job_id: popData?._id }))
        );
        setValue("document", "");
        setuserPhoto({ name: "", data_uri: "" });
      }
    });
  };
  const userPhotoField = watch("add_attachments");
  const fileName = userPhotoField?.[0];

  useEffect(() => {
    const fileList: fileType = { name: "", data_uri: "" };
    const getDataURI = async (fileName: File) => {
      try {
        const result = await dataURI(fileName);
        fileList.data_uri = result;
        fileList.name = fileName.name;
        setuserPhoto(fileList);
      } catch (error) {
        console.log({ error });
      }
    };
    if (fileName) {
      getDataURI(fileName);
    }
  }, [fileName]);

  return (
    <>
      {isLoading && <Loader />}
      <div
        className={styles.addResultsPopupContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => handleClose()}
        />
        <div className={styles.addResultsContainer}>
          <div className={styles.titleContainer}>
            <h2 className={styles.addClaimHeading}>Add Attachments</h2>
            <span className={styles.textUnderline} />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.formContainer}
          >
            <Input
              type="text"
              placeholder="please add name"
              {...register("document", { required: true })}
              inlineClass={styles.inputWid}
              onChange={trimValue}
            />
            {errors?.document?.type === "required" && (
              <div className={styles.errorContainer}>
                <span className={styles.extraSpan} />
                <p className="dashboardFormError">Please Enter Name</p>
              </div>
            )}
            <div className={styles.filesContainer}>
              Add Attachment
              <AttachFiles
                fileKey={"add_attachments"}
                id={"add_attachments"}
                register={register}
                fileList={userPhoto}
                validation={
                  userPhoto?.data_uri?.length > 0 ? {} : { required: true }
                }
                isName={true}
                isDocument={true}
              />
              {errors?.add_attachments && (
                <p className="errorText">Please select Attachment</p>
              )}
            </div>
            <div className={styles.buttonContainer}>
              <Button
                title="Save"
                type="submit"
                customClass={styles.submitBtn}
              />
            </div>
          </form>

          <div className={styles.tableContainer}>
            <TableV2
              tableHeaderData={addResultsPopupHeaderData}
              tableRowData={
                getAttachmentDataApi?.attachements &&
                getAttachmentDataApi?.attachements?.length
                  ? getAttachmentDataApi?.attachements
                  : []
              }
              handleClick={handleOpen}
              active={false}
              handleRowClick={popData}
            />
          </div>
          <p className={styles.note}>
            <strong> Note :</strong> Diacom viewer only supports DICOM(.dcm),
            NIFTI(.nii, for 3D), KTX(.ktx), HDR(.hdr) extensions.
          </p>
        </div>
      </div>
    </>
  );
};

export default AddAttachmentsPopup;
