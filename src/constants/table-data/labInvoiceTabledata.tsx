import moment from "moment";
import react, { useEffect, useState } from "react";
import styles from "./labInvoiceTabledata.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  allowedNumberOfDigitsAfterDecimal,
  disableArrowKey,
  disableScroll,
} from "../../utils/utils";
import { updatedNewPaymentAmountArray } from "../../redux/features/invoice-module/invoiceSlice";

export const addInsuranceHeaderData: any = [
  {
    Header: "ID",
    accessor: "plan_id",
    Cell: ({ row, onPopClose, onRowClick }: any) => {
      const objectId = row?.original;
      return (
        <>
          <span style={{ cursor: "pointer", color: "#0e26a3" }}>
            {objectId?.plan_id}
          </span>
        </>
      );
    },
  },
  {
    Header: "INSURANCE PLAN",
    accessor: "insurance_plan",
  },
  {
    Header: "EXPIRY DATE",
    accessor: "expiry_date",
    Cell: ({ row }: any) => {
      const originalDate = row?.original?.expiry_date;
      const formattedDate = moment(originalDate).format("DD MMM YYYY");
      return <>{formattedDate}</>;
    },
  },
  {
    Header: "POLICY NO",
    accessor: "policy_no",
  },
  {
    Header: "DETAILS",
    accessor: "details",
    Cell: ({ row, onPopClose, onRowClick }: any) => {
      const objectId = row?.original;
      return (
        <>
          <span
            onClick={() => {
              onRowClick(row?.original);
            }}
            style={{ cursor: "pointer", color: "#0e26a3" }}
          >
            View
          </span>
        </>
      );
    },
  },
  {
    Header: "COPAY %",
    accessor: "coPay",
  },
  {
    Header: "NOTES",
    accessor: "notes",
  },
];

// patient EMR: searchModalHeaderData
export const searchModalHeaderData: any = [
  {
    Header: "FILE NO.",
    accessor: "emr_no", //file_no
    Cell: ({ row, onPopClose, onRowClick, invoiceFlag }: any) => {
      const objectId = row?.original;
      const emrIsActive = row?.original?.is_active;
      return (
        // <span
        //   onClick={() => {
        //     onRowClick(row?.original);
        //   }}
        //   style={{ cursor: 'pointer', color: '#0e26a3' }}
        // >
        //   {objectId?.emr_no}
        // </span>
        <p
          className={
            emrIsActive === false
              ? styles.emrFileNoInactive
              : styles.emrFileNoActive
          }
          onClick={() => {
            onRowClick(row?.original);
          }}
        >
          {objectId?.emr_no}
        </p>
      );
    },
  },
  {
    Header: "PATIENT NAME",
    accessor: "patient_name",
    Cell: ({ row }: any) => {
      const objectId = row?.original;
      const emrIsActive = row?.original?.is_active;
      return (
        <p className={emrIsActive === false ? styles.inactive : styles.active}>
          {objectId?.patient_name}
        </p>
      );
    },
  },

  {
    Header: "NATIONAL ID",
    accessor: "national_id",
    Cell: ({ row }: any) => {
      const objectId = row?.original;
      const emrIsActive = row?.original?.is_active;
      return (
        <p className={emrIsActive === false ? styles.inactive : styles.active}>
          {objectId?.national_id}
        </p>
      );
    },
  },
  {
    Header: "MOBILE",
    accessor: "phone",
    Cell: ({ row }: any) => {
      const objectId = row?.original;
      const emrIsActive = row?.original?.is_active;
      return (
        <p className={emrIsActive === false ? styles.inactive : styles.active}>
          {objectId?.phone}
        </p>
      );
    },
  },
];

// invoice: doctorModalHeaderData
export const doctorModalHeaderData: any = [
  {
    Header: "DOCTOR NAME",
    Cell: ({ row, onPopClose, onRowClick, invoiceFlag }: any) => {
      const objectId = row?.original;
      // const dispatch = useAppDispatch();
      // onRowClick = (item: any) => {
      //   console.log("item,", item);
      //   let dataPayload = {
      //     id: item,
      //   };
      //   dispatch(getDoctorById(requestGenerator(dataPayload))).then((e) => {
      //     if (e.type === "receptionist/getAllDoctorListById/fulfilled") {
      //       onPopClose(false);
      //     }
      //   });
      // };
      return (
        <span
          onClick={() => {
            onRowClick(row?.original);
          }}
          style={{ cursor: "pointer", color: "#0e26a3" }}
        >
          {objectId?.doctor_name}
        </span>
      );
    },
  },

  {
    Header: "MOBILE",
    accessor: "doctor_phone",
  },
];

//LabInvoice : PaymentTable
export const invoicePaymentHeaderData: any = [
  {
    Header: "PAYMENT MODE",
    accessor: "payment_mode",
  },

  {
    Header: "AMOUNT (E)",
    Cell: ({ row }: any) => {
      const _id = row?.original?._id;
      const dispatch = useAppDispatch();
      const { paymentModeData } = useAppSelector((state) => state.invoice);
      const [error, setError] = useState("");
      // const handleKeyDown = (e: any) => {
      //   if (e.target.value.length >= 2 && e.key !== "Backspace") {
      //     e.preventDefault();
      //   }
      // };

      // const handleWheel = (e: any) => {
      //   e.preventDefault();
      // };

      const validateInput = (inputValue: any) => {
        const pattern = /^\d{1,6}(?:\.\d{1,3})?$/;
        return pattern.test(inputValue);
      };

      const handleAmountChange = (event: any) => {
        const amount = event.target.value;
        const isValid = validateInput(amount);

        if (isValid === false) {
          setError("Please enter valid discount");
        }
        if (isValid === true) {
          setError("");
        }

        const updatedData = paymentModeData.map((item: any) => {
          console.log("item==", item);
          if (item?._id === row?.original?._id) {
            return {
              ...item,
              amount: parseInt(amount),
            };
          }
          return item;
        });

        dispatch(updatedNewPaymentAmountArray(updatedData));
      };

      useEffect(() => {
        disableScroll();
      }, []);

      return (
        <>
          <input
            className={styles.inputFieldServiceTable}
            value={row?.original?.amount}
            type="number"
            key={row.original._id}
            onChange={handleAmountChange}
            onKeyDown={(e: any) => disableArrowKey(e)}
            onWheel={(e: any) => {
              e.target.blur();
            }}
          />
          <p className="dashboardFormError">{error}</p>
        </>
      );
    },
  },

  {
    Header: "APPROVAL NO.",
    accessor: "approval_no",
  },
];

// Services Tests
export const LabTestsHeaderData: any = [
  {
    Header: "TEST Id",
    accessor: "test_no",
  },

  {
    Header: "TEST NAME",
    accessor: "test_name",
  },

  {
    Header: "QTY",
    accessor: "quantity",
  },

  {
    Header: "PRICE",
    accessor: "price",
  },
];

export const settledInvoiceHeaderDataV1: any = [
  {
    Header: "PATIENT NAME",
    Cell: ({ row, onPopClose, onRowClick }: any) => {
      return (
        <>{row?.original?.patient_name ? row?.original?.patient_name : "-"}</>
      );
    },
  },

  {
    Header: "INVOICE NO.",
    accessor: "invoice_no",
    Cell: ({ row }: any) => {
      return (
        <>
          {row?.original?.invoice_no
            ? String(row?.original?.invoice_no).padStart(6, "0")
            : "-"}
        </>
      );
    },
  },

  {
    Header: "INVOICE DATE",
    Cell: ({ row }: any) => {
      const originalDate = row?.original?.createdAt;
      const formattedDate = originalDate
        ? moment(originalDate).format("DD MMM YYYY")
        : "-";
      return <>{formattedDate}</>;
    },
  },
  {
    Header: "INVOICE AMOUNT",
    Cell: ({ row }: any) => {
      const objectPaidAmount = allowedNumberOfDigitsAfterDecimal(
        row?.original?.paid_amount,
        3
      );
      return (
        <>
          <span style={{ cursor: "pointer", color: "#0e26a3" }}>
            {objectPaidAmount ? objectPaidAmount : "0.000"}
          </span>
        </>
      );
    },
  },
  {
    Header: "AMOUNT RECEIVED",
    Cell: ({ row }: any) => {
      const objectReceivedAmount = allowedNumberOfDigitsAfterDecimal(
        row?.original?.paid_amount,
        3
      );
      return (
        <>
          <span style={{ cursor: "pointer", color: "#0e26a3" }}>
            {objectReceivedAmount ? objectReceivedAmount : "0.000"}
          </span>
        </>
      );
    },
  },
  {
    Header: "SETTLED INVOICES",
    Cell: ({ row, onPopClose, onRowClick }: any) => {
      return (
        <>
          <span
            // onClick={() => {
            //   onRowClick(row?.original);
            // }}
            style={{ cursor: "pointer", color: "#0e26a3" }}
          >
            View
          </span>
        </>
      );
    },
  },
];
