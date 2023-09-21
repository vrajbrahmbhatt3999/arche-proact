import { useAppDispatch } from "../../../../hooks";
import { LoadFilesAsyncData } from "../../../../redux/features/radiology-jobs/jobsAsyncActions";
import { setGetAllRadiologyTestData } from "../../../../redux/features/radiology-jobs/jobsSlice";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import styles from "./radiologyreportmodal.module.scss";
import moment from "moment";

export const radiologyReportHeaderData: any = [
  {
    Header: "JOB ID",
    accessor: "job_no",
  },
  {
    Header: "PATIENT NAME",
    accessor: "name",
  },
  {
    Header: "DATE",
    accessor: (row: any) => {
      return moment(row?.createdAt).format("DD-MMM-YYYY") ?? "-";
    },
  },
  {
    Header: "VIEW REPORT",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original ? (
            <span
              className={styles.blueLinkText}
              onClick={() => {
                props?.onOpen(props?.row?.original);
              }}
            >
              View
            </span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "VIEW ATTACHMENTS",
    Cell: (props: any) => {
      const dispatch = useAppDispatch();
      const attachements =  props.row.original?.attachements?.map((element: any) => ({...element, url: element.data_uri}));
      const dispatchData = () => {
        let data: any = {
          attachements: attachements,
        };

        dispatch(LoadFilesAsyncData(requestGenerator(data)));
      };
      return (
        <>
          {props?.row?.original?.attachements?.length ? (
            <span
              className={styles.blueLinkText}
              onClick={() => (
                props?.onClick(props?.row?.original), dispatchData(), dispatch(setGetAllRadiologyTestData(props?.row?.original))
              )}
            >
              View
            </span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
];
