import { useNavigate } from "react-router-dom";
import {
  getAllRadiologyRequestsList,
  changeRadiologyRequestsStatus,
} from "../../redux/features/radiology-request/radiologyRequestAsyncActions";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { requestGenerator } from "../../utils/payloadGenerator";
import { CHANGE_RADIOLOGY_REQUESTS_STATUS_TYPE } from "../../constants/asyncActionsType";
import moment from "moment";
import styles from "../../pages/radiology-request/radioLogyRequest/radioLogyRequest.module.scss";

// Radiology Request Table Data
export const radiologyRequestTableHeaderData: any = [
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
      const navigateToViewJob = () => {
        if (props.row.original.job_status === "CONFIRMED") {
          navigate("/radiology-job/viewJobs");
        }
      };

      return (
        <>
          <span
            className={styles.radiologyRequestJobLink}
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
      const { getAllRadiologyRequestPayload } = useAppSelector(
        (state) => state.radiolgyRequests
      );
      const payload = { job_id: props?.row?.original?._id };
      const handleRequest = () => {
        if (props.row.original.job_status === "PENDING") {
          dispatch(
            changeRadiologyRequestsStatus(requestGenerator(payload))
          ).then((e) => {
            if (
              e.type === `${CHANGE_RADIOLOGY_REQUESTS_STATUS_TYPE}/fulfilled`
            ) {
              dispatch(
                getAllRadiologyRequestsList(
                  requestGenerator(getAllRadiologyRequestPayload)
                )
              );
            }
          });
        }
      };

      return (
        <>
          {props.row.original.job_status === "PENDING" ? (
            <p
              className={styles.radiologyRequestPendingText}
              onClick={() => handleRequest()}
            >
              {props?.row?.original?.job_status}
            </p>
          ) : (
            <p
              className={styles.radiologyRequestConfirmText}
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
