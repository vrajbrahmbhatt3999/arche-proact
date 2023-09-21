import { useState, useEffect } from "react";
import { CheckIcon, UncheckIcon } from "../../components/common/svg-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { colors } from "../color";
import {
  handleDeSelectTest,
  handleSelectTest,
  updateprofileData,
} from "../../redux/features/lab/labSlice";

export const createTestProfileHeaderData: any = [
  {
    Header: "SELECT",
    Cell: ({ row }: any) => {
      const dispatch = useAppDispatch();

      const handleCheck = (id: any) => {
        dispatch(handleSelectTest(id));
      };

      const handleUncheck = (id: any) => {
        dispatch(handleDeSelectTest(id));
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


