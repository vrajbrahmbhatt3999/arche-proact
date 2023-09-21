import { CheckIcon, UncheckIcon } from "../../components/common/svg-components";
import { useAppDispatch } from "../../hooks";
import { colors } from "../color";
import {
  handleDeSelectTest,
  handleSelectTest,
} from "../../redux/features/lab/labSlice";
import { handleDeSelectRadiologyTest, handleSelectRadiologyTest } from "../../redux/features/radiology/radiologySlice";

export const radiologyCreateTestProfileHeaderData: any = [
  {
    Header: "SELECT",
    Cell: ({ row }: any) => {
      const dispatch = useAppDispatch();

      const handleCheck = (id: any) => {
        dispatch(handleSelectRadiologyTest(id));
      };

      const handleUncheck = (id: any) => {
        dispatch(handleDeSelectRadiologyTest(id));
      };

      return (
        <>
          {!row?.original?.is_active ? (
            <CheckIcon
              fillColor={colors.green1}
              handleClick={() => handleCheck(row?.original)}
            />
          ) : (
            <UncheckIcon
              fillColor={colors.grey1}
              handleClick={() => handleUncheck(row?.original)}
            />
          )}
        </>
      );
    },
  },
  {
    Header: "TEST NAME",
    accessor: "name",
  },
  {
    Header: "AMOUNT",
    accessor: "sell_price",
    Cell: ({ row }: any) => {
      return <p style={{ color: "#ffa009" }}>{row?.original?.sell_price}</p>
    }
  },
];


