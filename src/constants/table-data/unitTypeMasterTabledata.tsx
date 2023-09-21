import { CrossIcon, EditIcon } from "../../components/common/svg-components";
import ToggleSwitchV2 from "../../components/common/toggle-switch/ToggleSwitchV2";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setMessage } from "../../redux/features/toast/toastSlice";
import { setChangeStatus } from "../../redux/features/unit-type/unitTypeSlice";
import { deleteInventoryUnits, editInventoryUnits, getInventoryItemUnits } from "../../redux/features/unit-type/unittypeAsyncActions";
import { requestGenerator } from "../../utils/payloadGenerator";
import { DELETE_INVENTORY_ITEM_UNIT, EDIT_INVENTORY_ITEM_UNIT } from "../asyncActionsType";
import { colors } from "../color";
import { success } from "../data";

export const unitTypeTableHeaderData: any = [
  {
    Header: "Base Unit",
    Cell: ({ row, index }: any) => {

      return (
        <>
          <span>
            {row?.original?.base_unit_type_id?.value}
          </span>
        </>
      );
    },

  },
  {
    Header: "Conv Unit",
    Cell: ({ row, index }: any) => {

      return (
        <>
          <span>
            {row?.original?.mapped_unit_type_id?.value}
          </span>
        </>
      );
    },

  },

  {
    Header: "Qty",
    accessor: 'qty',

  },

  // {
  //   Header: "Delete",
  //   Cell: ({ row }: any) => {

  //     const dispatch = useAppDispatch();

  //     const handleDeleteItem = () => {

  //       const requestedPayload = {
  //         id: row?.original?._id
  //       }
  //       dispatch(deleteInventoryUnits(requestGenerator(requestedPayload))).then((e) => {
  //         if (e.type === `${DELETE_INVENTORY_ITEM_UNIT}/fulfilled`) {
  //           dispatch(getInventoryItemUnits(requestGenerator({})))
  //         }
  //       });
  //     }
  //     return (
  //       <>
  //         <div>
  //           <CrossIcon
  //             width={25}
  //             height={25}
  //             fillColor={colors.white1}
  //             fillColor1={colors.grey4}
  //             handleClick={handleDeleteItem}
  //           />
  //         </div>
  //       </>
  //     );
  //   },
  // },

  {
    Header: "Status",
    Cell: ({ row, onRowClick }: any) => {
      const dispatch = useAppDispatch();
      const is_active = row?.original?.is_active

      // const handleStatus = (itemRow: any) => {
      //   const changeStatus = addedUnitList?.map((item: any) => {
      //     if (item?._id === itemRow?._id) {
      //       return { ...item, is_active: !item?.is_active }
      //     }
      //     return item
      //   })
      //   dispatch(setChangeStatus(changeStatus));
      // }

      const handleStatus = (itemRow: any) => {
        dispatch(editInventoryUnits(requestGenerator({
          id: itemRow?._id, is_active: !itemRow?.is_active
        }))).then((e) => {
          if (e.type === `${EDIT_INVENTORY_ITEM_UNIT}/fulfilled`) {
            dispatch(getInventoryItemUnits(requestGenerator({})))
            dispatch(
              setMessage({
                message: 'Status Updated Successfully',
                type: success,
              })
            )
          }
        });
      }



      return (
        <>
          <div>
            <ToggleSwitchV2
              isToggled={is_active}
              handleToggle={() => handleStatus(row?.original)}
            />
          </div>
        </>
      );
    },
  },

  {
    Header: "Edit",
    Cell: ({ row, onRowClick }: any) => {
      return (
        <>
          <div>
            <EditIcon handleClick={() => onRowClick(row?.original)} />
          </div>
        </>
      );
    },
  },
];



