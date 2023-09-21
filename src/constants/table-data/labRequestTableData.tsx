import { useNavigate } from "react-router-dom";
import {
  getAllLabRequestsList,
  changeLabRequestsStatus,
} from "../../redux/features/lab-request/labRequestAsyncActions";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { requestGenerator } from "../../utils/payloadGenerator";
import { CHANGE_LAB_REQUESTS_STATUS_TYPE } from "../../constants/asyncActionsType";

import moment from "moment";
import styles from "../../pages/lab-request/labRequest/labRequest.module.scss";
import { ViewJobsAsyncData } from "../../redux/features/jobs/jobsAsyncActions";

// Lab Request Table Data
export const labRequestTableHeaderData: any = [
  {
    Header: "DATE",
    accessor: "job_date",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.job_date ? (
            <span>
              {moment(props?.row?.original?.job_date).format("DD-MMM-yyyy")}
            </span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "DOCTOR NAME",
    accessor: "doctor_name",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.doctor_name ? (
            <span>{`Dr. ${props?.row?.original?.doctor_name}`}</span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "MEDICAL CENTER",
    accessor: "mc_name",
  },
  {
    Header: "TEST NAME",
    // accessor: "test_name",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.profile?.[0]?.tests ? (
            <span
              className={styles.viewPopupLink}
              onClick={() => {
                props?.onClick(props?.row?.original?.profile?.[0]?.tests);
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
    disableSortBy: true,
  },
  {
    Header: "TEST TYPE",
    accessor: "is_job_internal",
    Cell: (props: any) => {
      return (
        <>
          <span>
            {props?.row?.original?.is_job_internal ? "Internal" : "External"}
          </span>
        </>
      );
    },
  },

  {
    Header: "PRIORITY",
    accessor: "job_priority",
    Cell: (props: any) => {
      return (
        <>
          <span>{props?.row?.original?.job_priority?.toLowerCase()}</span>
        </>
      );
    },
  },
  // {
  //   Header: "CATEGORY",
  //   // accessor: "_category",
  //   Cell: (props: any) => {
  //     return (
  //       <>
  //         <span>-</span>
  //       </>
  //     );
  //   },
  // },
  {
    Header: "JOB LINK",
    accessor: "job_link",
    Cell: (props: any) => {
      const navigate = useNavigate();
      const dispatch = useAppDispatch();
      const navigateToViewJob = () => {
        if (props.row.original.job_status === "CONFIRMED") {
          navigate("/job/viewJobs");
          let reqPayload = {
            page: 10,
            pageSize: 10,
            job_type: "LABORATORY",
            is_internal: true,
          };
          dispatch(ViewJobsAsyncData(requestGenerator(reqPayload)));
        }
      };

      return (
        <>
          <span
            className={styles.labRequestJobLink}
            onClick={navigateToViewJob}
          >
            {" "}
            View Job
          </span>
        </>
      );
    },
    disableSortBy: true,
  },
  {
    Header: "CONFIRM REQUEST",
    accessor: "confirm_request",
    Cell: (props: any) => {
      // console.log("type :>> ", props.row.original.job_status);
      // const [confirmRequest, setConfirmRequest] = useState(
      //   props?.row?.original?.job_status
      // );
      const dispatch = useAppDispatch();
      const { getAllLabRequestPayload } = useAppSelector(
        (state) => state.labRequests
      );
      const payload = { job_id: props?.row?.original?._id };
      const handleRequest = () => {
        if (props.row.original.job_status === "PENDING") {
          dispatch(changeLabRequestsStatus(requestGenerator(payload))).then(
            (e) => {
              if (e.type === `${CHANGE_LAB_REQUESTS_STATUS_TYPE}/fulfilled`) {
                dispatch(
                  getAllLabRequestsList(
                    requestGenerator(getAllLabRequestPayload)
                  )
                );
              }
            }
          );
        }
      };

      return (
        <>
          {props.row.original.job_status === "PENDING" ? (
            <p
              className={styles.labRequestPendingText}
              onClick={() => handleRequest()}
            >
              {props?.row?.original?.job_status}
            </p>
          ) : (
            <p
              className={styles.labRequestConfirmText}
              onClick={() => handleRequest()}
            >
              {props?.row?.original?.job_status}
            </p>
          )}
        </>
      );
    },
    disableSortBy: true,
  },
];
