import moment from "moment";
import { CheckIcon, UncheckIcon } from "../../components/common/svg-components";
import { colors } from "../../constants/color";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  addIssueData,
  updateIssueData,
  removeIssueData,
  addMainStoreData,
  updateMainStoreData,
  removeMainStoreData,
  updateBranchStoreData,
} from "../../redux/features/branch-store/branchStoreSlice";
import { setMessage } from "../../redux/features/toast/toastSlice";
import { disableArrowKey } from "../../utils/utils";
import { failure } from "../../constants/data";
import styles from "../../pages/branchstore/branchstore-request-popup/branchstorerequestpopup.module.scss";

export const branchstoreRequestPopupHeaderData: any = [
  {
    Header: "DATE",
    accessor: (row: any) => {
      return moment(row?.date).format("DD MMM YYYY");
    },
    Cell: (props: any) => {
      const convertDate = moment(props?.row?.original?.date).format(
        "DD MMM YYYY"
      );
      return (
        <>{props?.row?.original?.date ? <span>{convertDate}</span> : "-"}</>
      );
    },
  },
  {
    Header: "REQ ID",
    accessor: (row: any) => {
      return row?.req_no?.toString().padStart(6, "0");
    },
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.req_no ? (
            <span>
              {props?.row?.original?.req_no?.toString().padStart(6, "0")}
            </span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "SOURCE",
    accessor: "request_source_type",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.request_source_type ? (
            <span>
              {props?.row?.original?.request_source_type?.toLowerCase()}
            </span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "SUB SOURCE",
    accessor: "request_source",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.request_source ? (
            <span>{props?.row?.original?.request_source}</span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "ITEM NAME",
    accessor: "item_name",
  },
  {
    Header: "MIN BALANCE",
    accessor: "qty_to_maintain",
  },
  {
    Header: "UNIT TYPE",
    accessor: "req_unit_type.value",
  },
  {
    Header: "AVAL.QTY",
    accessor: "available_qty",
  },
  {
    Header: "REQ.QTY",
    accessor: "pending_qty",
  },
  // {
  //   Header: "REQ QTY (MAIN STORE)(E).",
  //   disableSortBy: true,
  //   Cell: (props: any) => {
  //     const dispatch = useAppDispatch();
  //     const { brachStoreRequestData } = useAppSelector(
  //       (state) => state.branchStore
  //     );
  //     const validateMainStoreQty = (mainStoreQty: string, item: any) => {
  //       if (Number(mainStoreQty) === 0 || Number(mainStoreQty) === undefined) {
  //         dispatch(
  //           setMessage({
  //             message: "Please enter valid main store quantity",
  //             type: failure,
  //           })
  //         );
  //         dispatch(
  //           updateMainStoreData({
  //             ...item,
  //             main_store_qty: mainStoreQty,
  //           })
  //         );
  //         return {
  //           ...item,
  //           main_store_qty: mainStoreQty,
  //         };
  //       } else if (Number(mainStoreQty) < 0) {
  //         dispatch(
  //           setMessage({
  //             message: "Please enter valid main store quantity",
  //             type: failure,
  //           })
  //         );
  //         return item;
  //       } else {
  //         dispatch(
  //           updateMainStoreData({
  //             ...item,
  //             main_store_qty: mainStoreQty,
  //           })
  //         );
  //         return {
  //           ...item,
  //           main_store_qty: mainStoreQty,
  //         };
  //       }
  //     };
  //     const handleChange = (e: any) => {
  //       const mainStoreQty = e.target.value;
  //       let tempArr: any = [];
  //       tempArr = brachStoreRequestData?.map((item: any, index: number) => {
  //         if (item?._id === props?.row?.original?._id) {
  //           return validateMainStoreQty(mainStoreQty, item);
  //         } else {
  //           return item;
  //         }
  //       });
  //       dispatch(updateBranchStoreData(tempArr));
  //     };
  //     return (
  //       <input
  //         type="number"
  //         value={brachStoreRequestData[props.row.index]?.main_store_qty || ""}
  //         placeholder="Text"
  //         className={styles.branchStoreQtyField}
  //         onChange={handleChange}
  //         onKeyDown={(e: any) => disableArrowKey(e)}
  //         onWheel={(e: any) => {
  //           e.target.blur();
  //         }}
  //       />
  //     );
  //   },
  // },
  {
    Header: "REQUEST TO MAIN STORE",
    disableSortBy: true,
    Cell: (props: any) => {
      const dispatch = useAppDispatch();
      const { selectedMainStoreData } = useAppSelector(
        (state) => state.branchStore
      );
      const handleMainStoreCheck = (checkType: string) => {
        if (checkType === "REMOVE") {
          dispatch(removeMainStoreData(props?.row?.original));
        } else if (checkType === "ADD") {
          dispatch(addMainStoreData(props?.row?.original));
        }
      };
      // console.log("selectedMainStoreData :>> ", selectedMainStoreData);
      return (
        <>
          {selectedMainStoreData?.some(
            (item: any) => item?._id === props.row.original._id
          ) ? (
            <CheckIcon
              fillColor={colors.green1}
              handleClick={() => handleMainStoreCheck("REMOVE")}
            />
          ) : (
            <UncheckIcon
              fillColor={colors.grey1}
              handleClick={() => handleMainStoreCheck("ADD")}
            />
          )}
        </>
      );
    },
  },
  {
    Header: "ISSUE",
    disableSortBy: true,
    Cell: (props: any) => {
      const dispatch = useAppDispatch();
      const { selectedIssueData } = useAppSelector(
        (state) => state.branchStore
      );
      const handleIssueCheck = (checkType: string) => {
        if (checkType === "REMOVE") {
          dispatch(removeIssueData(props?.row?.original));
        } else if (checkType === "ADD") {
          dispatch(addIssueData(props?.row?.original));
        }
      };
      // console.log("selectedIssueData :>> ", selectedIssueData);
      return (
        <>
          {selectedIssueData?.some(
            (item: any) => item?._id === props.row.original._id
          ) ? (
            <CheckIcon
              fillColor={colors.green1}
              handleClick={() => handleIssueCheck("REMOVE")}
            />
          ) : (
            <UncheckIcon
              fillColor={colors.grey1}
              handleClick={() => handleIssueCheck("ADD")}
            />
          )}
        </>
      );
    },
  },
  // {
  //   Header: "ISSUE QTY(E).",
  //   disableSortBy: true,
  //   Cell: (props: any) => {
  //     const dispatch = useAppDispatch();
  //     const { brachStoreRequestData } = useAppSelector(
  //       (state) => state.branchStore
  //     );

  //     const validateIssueQty = (issueQty: string, item: any) => {
  //       if (Number(issueQty) === 0 || Number(issueQty) === undefined) {
  //         dispatch(
  //           setMessage({
  //             message: "Please enter valid issue quantity",
  //             type: failure,
  //           })
  //         );
  //         dispatch(
  //           updateIssueData({
  //             ...item,
  //             issue_qty: issueQty,
  //           })
  //         );
  //         return {
  //           ...item,
  //           issue_qty: issueQty,
  //         };
  //       } else if (Number(issueQty) < 0) {
  //         dispatch(
  //           setMessage({
  //             message: "Please enter valid issue quantity",
  //             type: failure,
  //           })
  //         );
  //         return item;
  //       } else if (
  //         Number(issueQty) > Number(props?.row?.original?.available_qty)
  //       ) {
  //         dispatch(
  //           setMessage({
  //             message:
  //               "Please enter issue quantity less than available quantity",
  //             type: failure,
  //           })
  //         );
  //         return item;
  //       } else {
  //         dispatch(
  //           updateIssueData({
  //             ...item,
  //             issue_qty: issueQty,
  //           })
  //         );
  //         return {
  //           ...item,
  //           issue_qty: issueQty,
  //         };
  //       }
  //     };
  //     const handleChange = (e: any) => {
  //       const issueQty = e.target.value;
  //       console.log("issueQty :>> ", issueQty);
  //       let tempArr: any = [];
  //       tempArr = brachStoreRequestData?.map((item: any, index: number) => {
  //         if (item?._id === props?.row?.original?._id) {
  //           return validateIssueQty(issueQty, item);
  //         } else {
  //           return item;
  //         }
  //       });
  //       dispatch(updateBranchStoreData(tempArr));
  //     };
  //     return (
  //       <input
  //         type="number"
  //         value={brachStoreRequestData[props.row.index]?.issue_qty || ""}
  //         placeholder="Text"
  //         className={styles.branchStoreQtyField}
  //         onChange={handleChange}
  //         onKeyDown={(e: any) => disableArrowKey(e)}
  //         onWheel={(e: any) => {
  //           e.target.blur();
  //         }}
  //       />
  //     );
  //   },
  // },
];

export const branchstoreRequestPopupData: any = [
  {
    _date: "10 jan 2023",
    req_id: "#1234",
    _src: "Cleaning Kit",
    it_name: "400",
    min_bal: "$300",
    unit_type: "300",
    avl_qty: "600",
    issue_: "",
    // issue_qty: "300",
    req_qty: "700",
    req_qty_main_store: "200",
    req_mainstore: "",
    _id: "a1",
  },
  {
    _date: "10 jan 2023",
    req_id: "#1234",
    _src: "Cleaning Kit",
    it_name: "400",
    min_bal: "$300",
    unit_type: "300",
    avl_qty: "600",
    issue_: "",
    // issue_qty: "300",
    req_qty: "700",
    req_qty_main_store: "200",
    req_mainstore: "",
    _id: "a2",
  },
  {
    _date: "10 jan 2023",
    req_id: "#1234",
    _src: "Cleaning Kit",
    it_name: "400",
    min_bal: "$300",
    unit_type: "300",
    avl_qty: "600",
    issue_: "",
    // issue_qty: "300",
    req_qty: "700",
    req_qty_main_store: "200",
    req_mainstore: "",
    _id: "a3",
  },
  {
    _date: "10 jan 2023",
    req_id: "#1234",
    _src: "Cleaning Kit",
    it_name: "400",
    min_bal: "$300",
    unit_type: "300",
    avl_qty: "600",
    issue_: "",
    // issue_qty: "300",
    req_qty: "700",
    req_qty_main_store: "200",
    req_mainstore: "",
    _id: "a4",
  },
  {
    _date: "10 jan 2023",
    req_id: "#1234",
    _src: "Cleaning Kit",
    it_name: "400",
    min_bal: "$300",
    unit_type: "300",
    avl_qty: "600",
    issue_: "",
    // issue_qty: "300",
    req_qty: "700",
    req_qty_main_store: "200",
    req_mainstore: "",
    _id: "a5",
  },
];
