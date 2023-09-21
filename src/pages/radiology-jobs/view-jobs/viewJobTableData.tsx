import { Attachments } from "../../../components/common/svg-components";
import styles from "./viewJobs.module.scss";
import { colors } from "../../../constants/color";
import moment from "moment";
import { useDispatch } from "react-redux";

import { requestGenerator } from "../../../utils/payloadGenerator";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  UpdateLabJobsAsyncData,
  ViewJobsAsyncData,
} from "../../../redux/features/radiology-jobs/jobsAsyncActions";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { DropdownIndicator } from "../../../components/common/dropdown-indicator/DropdownIndicator";
import { getLastInvoice } from "../../../redux/features/invoice-module/invoiceAsynActions";
import { setCheckPopupStatusKey } from "../../../redux/features/radiology-jobs/jobsSlice";

const resultStatusData = [
  { label: "PENDING" },
  { label: "ENTERED" },
  { label: "APPROVED" },
];

// View Jobs Table
export const viewJobsTableHeaderData: any = [
  {
    Header: "DATE",
    accessor: (row: any) => {
      return moment(row?.createdAt).format("DD-MMM-YYYY") ?? "-";
    },
  },
  {
    Header: "JOB  ID",
    accessor: "job_no",
  },
  {
    Header: "TEST",
    Cell: (props: any) => {
      const rowData = { ...props?.row?.original };
      rowData.headerName = "TEST";
      return (
        <span
          className={styles.view_Btn}
          onClick={() => props.onClick(rowData)}
        >
          View
        </span>
      );
    },
  },
  {
    Header: "PATIENT NAME",
    accessor: (row: any) => {
      return row?.name ?? "-";
    },
  },
  {
    Header: "RESULTS STATUS",
    Cell: (props: any) => {
      const dispatch: any = useDispatch();
      const { getAllLabViewJobsPayload } = useAppSelector(
        (state) => state.radiologyJobs
      );
      const handleRequest = (item: any) => {
        let data: any = {
          job_id: props?.row?.original?._id,
          type: "result_status",
          job_type: "RADIOLOGY",
          result_status: item.label,
        };
        dispatch(UpdateLabJobsAsyncData(requestGenerator(data))).then(
          (e: any) => {
            if (e.type === "job/UpdateLabJobsAsyncData/fulfilled") {
              let reqPayload = {
                page: getAllLabViewJobsPayload?.page,
                pageSize: getAllLabViewJobsPayload?.pageSize,
                job_type: "RADIOLOGY",
                is_internal: true,
              };
              dispatch(ViewJobsAsyncData(requestGenerator(reqPayload)));
            }
          }
        );
      };

      return (
        <div className={styles.DropDownContainer}>
          <Select
            className={styles.selectInputField}
            isDisabled={props.row.original?.invoice_status === "GENERATED"}
            closeMenuOnSelect={true}
            components={{ DropdownIndicator }}
            isSearchable={false}
            value={{
              label: props.row.original.result_status,
              value: props.row.original.result_status,
            }}
            options={resultStatusData?.map((item: any) => ({
              label: item.label,
              value: item.label,
            }))}
            onChange={(e: any) => handleRequest(e)}
            maxMenuHeight={120}
            styles={{
              control: (provided) => ({
                ...provided,
                minWidth: "120px",
                minHeight: "30px",
                cursor: "pointer",
              }),
            }}
          />
        </div>
      );
    },
  },

  {
    Header: "ADD RESULTS",
    Cell: (props: any) => {
      const rowData = { ...props?.row?.original };
      rowData.headerName = "ADD RESULTS";
      const dispatch = useAppDispatch();
      return (
        <span
          className={styles.viewJobAddResults}
          onClick={() => (
            props.onClick(rowData), dispatch(setCheckPopupStatusKey(false))
          )}
        >
          Add Results
        </span>
      );
    },
  },
  {
    Header: "ADD ATTACHMENTS",
    disableSortBy: true,
    Cell: (props: any) => {
      const rowData = { ...props?.row?.original };
      rowData.headerName = "ADD ATTACHMENTS";
      return (
        <div className={styles.viewJobAddAttachmentsContainer}>
          <div
            className={styles.viewJobAddAttachments}
            onClick={() => props.onClick(rowData)}
          >
            <span>Add Attachments</span>
            <Attachments
              fillColor={colors.blue3}
              customClass={styles.attachIcon}
              height={26}
              width={26}
            />
          </div>
        </div>
      );
    },
  },
  {
    Header: "RAISE INVOICE",
    disableSortBy: true,
    Cell: (props: any) => {
      const navigate = useNavigate();
      const dispatch: any = useDispatch();
      const { getAllLabViewJobsPayload } = useAppSelector(
        (state) => state.radiologyJobs
      );
      const handleRequest = () => {
        let data: any = {
          job_id: props?.row?.original?._id,
          type: "invoice",
          job_type: "RADIOLOGY",
          invoice_status: "GENERATED",
        };
        dispatch(UpdateLabJobsAsyncData(requestGenerator(data))).then(
          (e: any) => {
            if (e.type === "job/UpdateLabJobsAsyncData/fulfilled") {
              let reqPayload = {
                page: getAllLabViewJobsPayload?.page,
                pageSize: getAllLabViewJobsPayload?.pageSize,
                job_type: "RADIOLOGY",
                is_internal: true,
              };
              dispatch(ViewJobsAsyncData(requestGenerator(reqPayload)));
              let invoiceDataPayload = {
                patient_id: props.row.original.patient_id,
                type: "RADIOLOGY",
              };
              dispatch(
                getLastInvoice(requestGenerator(invoiceDataPayload))
              ).then((e: any) => {
                if (e.type === "invoice/getLastInvoice/fulfilled") {
                  navigate("/radiology-invoice/information");
                }
              });
            }
          }
        );
      };

      return (
        <>
          {props.row.original?.invoice_status === "PENDING" ? (
            <button
              className={[
                styles.labRequestPendingText,
                props.row.original.result_status !== "APPROVED" &&
                  styles.disabledInvoice,
              ]?.join(" ")}
              onClick={() => handleRequest()}
              disabled={props.row.original.result_status !== "APPROVED"}
            >
              Raise Invoice
            </button>
          ) : (
            <button
              className={styles.labConfirmRaiseInvoice}
              onClick={() => handleRequest()}
              disabled={props.row.original?.result_status === "APPROVED"}
            >
              Invoice Generated
            </button>
          )}
        </>
      );
    },
  },
  {
    Header: "VIEW REPORTS",
    disableSortBy: true,
    Cell: (props: any) => {
      const rowData = { ...props?.row?.original };
      rowData.headerName = "VIEW REPORTS";
      const dispatch = useAppDispatch();
      return (
        <span
          className={styles.viewJobViewReports}
          onClick={() => (
            props.onClick(rowData), dispatch(setCheckPopupStatusKey(true))
          )}
        >
          View
        </span>
      );
    },
  },
];
