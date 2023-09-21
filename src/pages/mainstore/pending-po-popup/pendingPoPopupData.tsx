import {
  CheckIcon,
  UncheckIcon,
} from "../../../components/common/svg-components";
import { colors } from "../../../constants/color";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../hooks";
import {
  removeFromIPurchaseOrderList,
  setPurchaseOrderList,
  setAddText,
  updatePendingPoData,
  updategetAllInventoryPoData,
} from "../../../redux/features/inventory-request/inventoryRequestSlice";
import { blockInvalidCharacter, disableArrowKey } from "../../../utils/utils";

export const pendingPoPopupHeaderData: any = [
  {
    Header: "PO NO.",
    accessor: "po_no",
  },
  {
    Header: "ITEMS NAME",
    accessor: "name",
  },

  {
    Header: "REQUESTED QTY",
    accessor: "requested_qty",
  },

  {
    Header: "DELIVERED QTY",
    Cell: (props: any) => {
      const dispatch = useDispatch();
      const {
        getAllInventoryPurchaseOrderData,
        selectedPurchaseOrderList,
        addTestText,
      } = useAppSelector((state) => state.inventoryRequest);
      const updateQuantity = (event: any) => {
        let data = selectedPurchaseOrderList?.map((s: any) => {
          if (s.po_item_id === props.row.original.po_item_id) {
            return {
              ...s,
              delievered_qty: parseInt(event.target.value),
            };
          } else {
            return s;
          }
        });
        dispatch(updatePendingPoData(data));

        let data2 = getAllInventoryPurchaseOrderData?.map((s: any) => {
          if (s.po_item_id === props.row.original.po_item_id) {
            return {
              ...s,
              delievered_qty: parseInt(event.target.value),
            };
          } else {
            return s;
          }
        });
        dispatch(updategetAllInventoryPoData(data2));
      };

      const findIndex = selectedPurchaseOrderList?.find(
        (s: any) => s.po_item_id === props.row.original.po_item_id
      );
      return (
        <input
          type="number"
          style={{
            border: "1px solid #CDD4D8",
            width: "88px",
            height: "33px",
            borderRadius: "6px",
            textAlign: "center",
          }}
          value={findIndex?.delievered_qty}
          onChange={updateQuantity}
          disabled={!addTestText.includes(props.row.original?.po_item_id)}
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
  {
    Header: "SELECT",
    Cell: (props: any) => {
      const dispatch = useDispatch();
      const { addTestText } = useAppSelector((state) => state.inventoryRequest);
      const handleImageSelection = () => {
        dispatch(setPurchaseOrderList(props?.row?.original));
      };
      const handleAdd = () => {
        dispatch(setAddText(props?.row.original?.po_item_id));
      };

      const handleRemovce = () => {
        dispatch(removeFromIPurchaseOrderList(props?.row.original?.po_item_id));
      };

      return (
        <div onClick={handleAdd}>
          {!addTestText.includes(props.row.original?.po_item_id) ? (
            <UncheckIcon
              fillColor={colors.grey1}
              handleClick={() => handleImageSelection()}
            />
          ) : (
            <CheckIcon
              fillColor={colors.green1}
              handleClick={() => handleRemovce()}
            />
          )}
        </div>
      );
    },
  },
];
