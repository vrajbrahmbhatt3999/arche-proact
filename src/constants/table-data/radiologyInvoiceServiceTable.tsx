import { useState, useEffect } from "react";
import styles from "./tableData.module.scss";
import moment from "moment";
import { updatedNewServiceArray } from "../../redux/features/radiology/radiologySlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  allowedNumberOfDigitsAfterDecimal,
  disableArrowKey,
  disableScroll,
  doPayment,
} from "../../utils/utils";
// radiology
export const radiologyServiceHeaderData: any = [
  {
    Header: "DATE",
    Cell: ({ row }: any) => {
      const originalDate = row?.original?.createdAt;
      const formattedDate = moment(originalDate).format("DD MMM YYYY");
      return <>{formattedDate}</>;
    },
  },
  // {
  //   Header: 'JOB ID',
  //   accessor: '',
  // },
  {
    Header: "REF ID",
    accessor: "ref_id",
    Cell: ({ row }: any) => {
      return <>{row?.original?.ref_id ? row?.original?.ref_id : "-"}</>;
    },
  },
  {
    Header: "CUSTOMER NAME",
    accessor: "customer_name",
    Cell: ({ row }: any) => {
      return (
        <>{row?.original?.customer_name ? row?.original?.customer_name : "-"}</>
      );
    },
  },
  {
    Header: "PROFILE",
    accessor: "profile_name",
    Cell: ({ row }: any) => {
      return (
        <>
          {row?.original?.is_profile
            ? row?.original?.profile_name
              ? row?.original?.profile_name
              : "-"
            : "-"}
        </>
      );
    },
  },
  {
    Header: "TEST NAME",
    Cell: ({ row, onPopClose, onRowClick }: any) => {
      const profileStatus = row?.original?.is_profile;
      return (
        <>
          {profileStatus ? (
            <span
              onClick={() => {
                onRowClick(row?.original);
              }}
              style={{ cursor: "pointer", color: "#0e26a3" }}
            >
              View
            </span>
          ) : (
            <span>{row?.original?.test_name}</span>
          )}
        </>
      );
    },
  },

  {
    Header: "QTY (E)",
    Cell: ({ row }: any) => {
      const _id = row?.original?._id;
      const dispatch = useAppDispatch();
      const {
        radiologyPatientDiagnosisServiceData,
        radiologyPatientInvoiceData,
      } = useAppSelector((state) => state.radiology);
      const [error, setError] = useState("");
      const validateInput = (inputValue: any) => {
        const pattern = /^(?:[1-9]|[1-9][0-9])$/;
        return pattern.test(inputValue);
      };

      const handleQuantityChange = (event: any) => {
        const quantity = event.target.value;
        // const isValid = validateInput(quantity)
        // if (isValid === false) {
        //   setError('Please enter valid discount')
        // }
        // if (isValid === true) {
        //   setError('')
        // }
        const updatedData = radiologyPatientDiagnosisServiceData?.map(
          (item: any) => {
            if (item?._id === row?.original?._id) {
              return {
                ...item,
                quantity: parseInt(quantity),
              };
            }
            return item;
          }
        );

        dispatch(updatedNewServiceArray(updatedData));
      };
      useEffect(() => {
        disableScroll();
      }, []);
      return (
        <>
          <input
            className={styles.inputFieldServiceTable}
            value={row?.original?.quantity}
            type="number"
            key={row.original._id}
            onChange={handleQuantityChange}
            onKeyDown={(e: any) => disableArrowKey(e)}
            onWheel={(e: any) => {
              e.target.blur();
            }}
            // disabled={doPayment(radiologyPatientInvoiceData) ? false : true}
            disabled={true}
          />
          <p className="dashboardFormError">{error}</p>
        </>
      );
    },
  },

  {
    Header: "PRICE (E)",
    Cell: ({ row }: any) => {
      const dispatch = useAppDispatch();
      const {
        radiologyPatientDiagnosisServiceData,
        radiologyPatientInvoiceData,
      } = useAppSelector((state) => state.radiology);
      const [error, setError] = useState("");
      const validateInput = (inputValue: any) => {
        const pattern = /^\d{1,6}(?:\.\d{1,3})?$/;
        return pattern.test(inputValue);
      };
      const handlePriceChange = (event: any) => {
        const price = event.target.value;
        const isValid = validateInput(price);
        if (isValid === false) {
          setError("Please enter valid discount");
        }
        if (isValid === true) {
          setError("");
        }
        const updatedData = radiologyPatientDiagnosisServiceData.map(
          (item: any) => {
            if (item?._id === row?.original?._id) {
              return {
                ...item,
                unitPrice: parseInt(price),
              };
            }
            return item;
          }
        );

        dispatch(updatedNewServiceArray(updatedData));
      };
      useEffect(() => {
        disableScroll();
      }, []);
      return (
        <>
          <input
            className={styles.inputFieldServiceTable}
            value={row?.original?.unitPrice}
            type="number"
            key={row.original._id}
            onChange={handlePriceChange}
            onKeyDown={(e: any) => disableArrowKey(e)}
            onWheel={(e: any) => {
              e.target.blur();
            }}
            disabled={doPayment(radiologyPatientInvoiceData) ? false : true}
          />
          <p className="dashboardFormError">{error}</p>
        </>
      );
    },
  },

  {
    Header: "AMOUNT",
    Cell: ({ row }: any) => {
      const quantity = row?.original?.quantity;
      const price = row?.original?.unitPrice;
      const amountCalculation = quantity * price;
      const amount = amountCalculation;
      const [error, setError] = useState("");
      console.log("error amount>>>>", amount);

      const validateInput = (inputValue: any) => {
        const pattern = /^\d{1,6}(?:\.\d{1,3})?$/;
        return pattern.test(inputValue);
      };
      const handleAmount: any = (amount: any) => {
        const isValid = validateInput(amount);
        if (isValid === false) {
          setError("Please enter valid discount");
        }
        if (isValid === true) {
          setError("");
        }
      };
      useEffect(() => {
        handleAmount(amount);
      }, [amount]);
      return (
        <>
          <span>{amount}</span>
          <p className="dashboardFormError">{error}</p>
        </>
      );
    },
  },
  {
    Header: "RETURN",
    // accessor: "is_return",
    Cell: (props: any) => {
      // console.log("props?.row?.original :>> ", props?.row?.original);
      const typeOfInvoice = typeof props?.row?.original?.is_return;
      const { radiologyPatientInvoiceData } = useAppSelector((state) => state.radiology);
      return (
        <>
          {
            radiologyPatientInvoiceData?.status === "DRAFT" || (radiologyPatientInvoiceData?.refund_amount == 0 && radiologyPatientInvoiceData?.is_return === false && radiologyPatientInvoiceData?.is_refund === false) ? (
              '-'
            ) : (

              typeOfInvoice === "boolean" ? (
                <span>
                  {props?.row?.original?.is_return === true ? "True" : "False"}
                </span>
              ) : (
                ''
              )

            )
          }

        </>
      );
    },
  },
  {
    Header: "BILLABLE",
    accessor: "billable",
  },
];
