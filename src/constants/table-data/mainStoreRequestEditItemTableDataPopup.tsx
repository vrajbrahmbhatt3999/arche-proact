import { updateMainStoreRequestData } from "../../redux/features/branch-store/branchStoreSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setMessage } from "../../redux/features/toast/toastSlice";
import { failure } from "../../constants/data";
import { disableArrowKey, blockInvalidCharacter } from "../../utils/utils";
import styles from "../../pages/branchstore/mainstore-request-edit-popup/mainStoreRequestItemEditPopup.module.scss";

export const mainstoreRequestEditHeaderData: any = [
  {
    Header: "ITEM",
    accessor: "item_name",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.item_name ? (
            <span>{props?.row?.original?.item_name}</span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "QTY.",
    Cell: (props: any) => {
      const dispatch = useAppDispatch();
      const { mainStoreRequestItemsData } = useAppSelector(
        (state) => state.branchStore
      );
      // console.log("mainStoreRequestItemsData :>> ", mainStoreRequestItemsData);
      const validateMainStoreQty = (mainStoreQty: string, item: any) => {
        if (Number(mainStoreQty) === undefined) {
          dispatch(
            setMessage({
              message: "Please enter valid main store quantity",
              type: failure,
            })
          );
          return {
            ...item,
            requested_qty: Number(mainStoreQty),
          };
        } else if (mainStoreQty === "0") {
          dispatch(
            setMessage({
              message: "Please enter valid main store quantity",
              type: failure,
            })
          );
          return item;
        } else if (Number(mainStoreQty) < 0) {
          dispatch(
            setMessage({
              message: "Please enter valid main store quantity",
              type: failure,
            })
          );
          return item;
        } else {
          return {
            ...item,
            requested_qty: Number(mainStoreQty),
          };
        }
      };
      const handleChange = (e: any) => {
        const mainStoreQty = e.target.value;
        let tempArr: any = [];
        tempArr = mainStoreRequestItemsData?.map((item: any, index: number) => {
          if (item?._id === props?.row?.original?._id) {
            return validateMainStoreQty(mainStoreQty, item);
          } else {
            return item;
          }
        });
        dispatch(updateMainStoreRequestData(tempArr));
      };
      return (
        <input
          type="number"
          value={props?.row?.original?.requested_qty || ""}
          placeholder="Text"
          className={styles.branchStoreQtyField}
          onChange={handleChange}
          onKeyDown={(e: any) => {
            disableArrowKey(e);
            blockInvalidCharacter(e);
          }}
          onWheel={(e: any) => {
            e.target.blur();
          }}
        />
      );
    },
  },
];
