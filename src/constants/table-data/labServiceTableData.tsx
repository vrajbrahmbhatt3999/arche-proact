import { useEffect, useState } from "react";
import styles from "./labServiceTableData.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import moment from "moment";
import {
  allowedNumberOfDigitsAfterDecimal,
  disableArrowKey,
  disableScroll,
  handlePaymentCondtions,
} from "../../utils/utils";
import { updatedNewServiceArray } from "../../redux/features/lab-invoice/labInvoiceSlice";
import { useDispatch } from "react-redux";

export const labServicesHeaderData: any = [
  {
    Header: "DATE",
    Cell: ({ row }: any) => {
      const formattedDate = moment(new Date()).format("DD MMM YYYY");
      return <>{formattedDate}</>;
    },
  },
  {
    Header: "REF ID",
    accessor: "ref_id",
    Cell: ({ row, index }: any) => {
      return (
        <>
          <span>-</span>
        </>
      );
    },
  },
  {
    Header: "CUSTOMER NAME",
    Cell: ({ row, index }: any) => {
      return (
        <>
          <span>-</span>
        </>
      );
    },
  },
  {
    Header: "Profile",
    Cell: ({ row, index }: any) => {
      console.log(row?.original);
      return (
        <>
          <span>
            {row.original.is_profile ? row?.original?.profile_name : "-"}
          </span>
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
    Header: "QTY",
    accessor: "quantity",
    Cell: ({ row }: any) => {
      const _id = row?.original?._id;
      const dispatch = useAppDispatch();
      const { patientServicesList, patientSearchObject, labInformationData } =
        useAppSelector((state) => state.labInvoice);
      const [error, setError] = useState("");

      const validateInput = (inputValue: any) => {
        const pattern = /^(?:[1-9]|[1-9][0-9])$/;
        return pattern.test(inputValue);
      };

      const handleQuantityChange = (event: any) => {
        console.log(event.target.value, 'eve')
        const quantity = event.target.value;
        const isValid = validateInput(quantity);
        if (isValid === false) {
          setError("Please enter quantity");
        }
        if (isValid === true) {
          setError("");
        }

        const updatedData = patientServicesList.map((item: any) => {
          console.log("item==", item);
          if (item?._id === row?.original?._id) {
            return {
              ...item,
              quantity: parseInt(quantity),
            };
          }
          return item;
        });

        dispatch(updatedNewServiceArray(updatedData));
      };
      // useEffect(() => {
      //   disableScroll();
      // }, []);
      return (
        <>
          <input
            className={styles.inputContainer}
            value={row?.original?.quantity}
            type="number"
            // key={row.original._id}
            onChange={handleQuantityChange}
            onKeyDown={(e: any) => disableArrowKey(e)}
            onWheel={(e: any) => {
              e.target.blur();
            }}
            // disabled={handlePaymentCondtions(labInformationData) ? false : true}
            disabled={true}
          />
          <p className="dashboardFormError">{error}</p>
        </>
      );
    },
  },
  {
    Header: "PRICE",
    accessor: "unitPrice",
    Cell: ({ row }: any) => {

      const price = allowedNumberOfDigitsAfterDecimal(row?.original?.unitPrice, 3);

      const { patientSearchObject, patientServicesList, labInformationData } =
        useAppSelector((state) => state.labInvoice);
      const [error, setError] = useState("");
      const dispatch = useAppDispatch();

      const validateInput = (inputValue: any) => {
        const pattern = /^\d{1,6}(?:\.\d{1,3})?$/;
        return pattern.test(inputValue);
      };

      const handleUnitPriceChange = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        const unitPrice = event.target.value;
        const isValid = validateInput(unitPrice);
        if (isValid === false) {
          setError("Please enter price");
        }
        if (isValid === true) {
          setError("");
        }

        const updatedData = patientServicesList.map((item: any) => {
          console.log("item==", item);
          if (item?._id === row?.original?._id) {
            return {
              ...item,
              unitPrice: parseInt(unitPrice),
            };
          }

          return item;
        });

        dispatch(updatedNewServiceArray(updatedData));
      };
      useEffect(() => {
        disableScroll();
      }, []);

      return (
        <>
          <input
            className={styles.inputContainer}
            value={price}
            type="number"
            key={row.original._id}
            onChange={handleUnitPriceChange}
            onKeyDown={(e: any) => disableArrowKey(e)}
            onWheel={(e: any) => {
              e.target.blur();
            }}
            disabled={handlePaymentCondtions(labInformationData) ? false : true}
          />
          <p className="dashboardFormError">{error}</p>
        </>
      );
    },
  },
  {
    Header: "AMOUNT",
    accessor: "totalAmount",
    Cell: ({ row }: any) => {
      const quantity = row?.original?.quantity;
      const unitPrice = row?.original?.unitPrice;
      const amountCalculation = quantity * unitPrice;
      const amount = allowedNumberOfDigitsAfterDecimal(amountCalculation, 3);
      const [error, setError] = useState("");

      const validateInput = (inputValue: any) => {
        const pattern = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
        return pattern.test(inputValue);
      };
      const handleAmount: any = (amount: any) => {
        const isValid = validateInput(amount);
        console.log("isValid", isValid);
        if (isValid === false) {
          setError("Please enter amount");
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
          {isNaN(amount) ? "-" : <span>${amount?.toLocaleString()}</span>}
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
      const { labInformationData } =
        useAppSelector((state) => state.labInvoice);
      return (
        <>
          {
            labInformationData?.status === "DRAFT" || (labInformationData?.refund_amount == 0 && labInformationData?.is_return === false && labInformationData?.is_refund === false) ? (
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
    Cell: ({ row, index }: any) => {
      return (
        <>
          <span className={styles.billableContainer}>
            {row?.original?.billable}
          </span>
        </>
      );
    },
  },
];
