import moment from "moment";
import { DeleteIcon } from "../../../../components/common/svg-components";
import { colors } from "../../../../constants/color";
import styles from "./addresultsPopup.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
  AttachmentsJobsAsyncData,
  DocumentJobsAsyncData,
} from "../../../../redux/features/jobs/jobsAsyncActions";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import { useEffect } from "react";
import { LoadFilesAsyncData } from "../../../../redux/features/radiology-jobs/jobsAsyncActions";

// Add Results Popup Header Data
export const addResultsPopupHeaderData: any = [
  {
    Header: "DATE",
    accessor: (row: any) => {
      return moment(row?.date).format("DD-MMM-YYYY") ?? "-";
    },
  },
  {
    Header: "DOC NAME",
    accessor: "name",
  },
  {
    Header: "ATTACHMENTS",
    Cell: (props: any) => {
      const getAttachmentType = props.row.original?.data_uri?.split?.(".")?.[1] ?? '';
      const dispatch = useAppDispatch();
      const dispatchData = () => {
        let data: any = {
          attachements: [props.row.original.data_uri],
        };

        dispatch(LoadFilesAsyncData(requestGenerator(data)));
      };
      return (
        <>
          {getAttachmentType === "nii" || getAttachmentType === "dcm" ? (
            <p>-</p>
          ) : (
            <p
              className={styles.view_Btn}
              onClick={() => (props.onClick(), dispatchData())}
            >
              View
            </p>
          )}
        </>
      );
    },
  },
  {
    Header: "ACTION",
    Cell: (props: any) => {
      const dispatch = useAppDispatch();
      useEffect(() => {
        dispatch(
          AttachmentsJobsAsyncData(
            requestGenerator({ job_id: props?.onRowClick?._id })
          )
        );
      }, [dispatch, props?.onRowClick?._id]);
      const deleteAttachment = () => {
        let data: any = {
          job_id: props.onRowClick._id,
          doc_id: props.row.original._id,
          data_uri: props.row.original.data_uri,
          action: "DELETE",
        };
        dispatch(DocumentJobsAsyncData(requestGenerator(data))).then(
          (e: any) => {
            console.log(e, "event");
            if (e.type === "JOB/DocumentJobsAsyncData/fulfilled") {
              dispatch(
                AttachmentsJobsAsyncData(
                  requestGenerator({ job_id: props?.onRowClick?._id })
                )
              );
            }
          }
        );
      };
      return (
        <DeleteIcon
          fillColor={colors.grey4}
          customClass={styles.iconStyle}
          handleClick={deleteAttachment}
        />
      );
    },
  },
];

export const addResultsPopupTableDummyData: any = [
  {
    date: "10 jan 2023",
    dov_name: "Attachments 1",
  },
];
