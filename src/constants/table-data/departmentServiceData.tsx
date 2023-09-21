import { CheckIcon, UncheckIcon } from '../../components/common/svg-components';
import { colors } from '../color';
import {
  handleActive,
  handleAddToNewArray,
  handleDeactive,
} from '../../redux/features/insurance/insuranceSlice';
import { useAppDispatch } from '../../hooks';

export const departmentServiceHeaderData: any = [
  {
    Header: 'SERVICE ID',
    accessor: 'service_no',
    Cell: ({ row }: any) => {
      return (
        <p>
          {row?.original?.service_no
            ? row?.original?.service_no
            : row?.original?.test_no}
        </p>
      );
    },
  },
  {
    Header: 'SERVICE NAME',
    accessor: 'name',
  },
  {
    Header: 'PRICE',
    accessor: 'cost',
    Cell: ({ row }: any) => {
      return (
        <p>
          {row?.original?.cost
            ? row?.original?.cost
            : row?.original?.sell_price}
        </p>
      );
    },
  },
  // {
  //   Header: 'DISC%',
  //   Cell: ({ row }: any) => {
  //     return <p>{row?.original?.discount}%</p>;
  //   },
  // },
  {
    Header: 'DISCOUNTED PRICE',
    accessor: 'disounted_price',
    // Cell: ({ row }: any) => {
    //   let discounte_price =
    //     row?.original?.price -
    //     (row?.original?.price * row?.original?.discount) / 100;
    //   return (
    //     <p>{discounte_price ? discounte_price : row?.original?.sell_price}</p>
    //   );
    // },
  },
  {
    Header: 'SELECT',
    Cell: ({ row }: any) => {
      const dispatch = useAppDispatch();

      const handleCheck = (id: any, type: any) => {
        dispatch(handleActive(id));
        let data: any = {
          event: type,
          item: id,
        };
        dispatch(handleAddToNewArray(data));
      };

      const handleUncheck = (id: any) => {
        // dispatch(handleDeactive(id));
        dispatch(handleActive(id));
        let data: any = {
          event: false,
          action: id,
        };
        dispatch(handleAddToNewArray(data));
      };

      return (
        <>
          {row?.original?.checked ? (
            <CheckIcon
              fillColor={colors.green1}
              handleClick={() =>
                handleCheck(row?.original, row.original.checked)
              }
            />
          ) : (
            <UncheckIcon
              fillColor={colors.grey1}
              handleClick={() =>
                handleCheck(row?.original, row.original.checked)
              }
            />
          )}
        </>
      );
    },
  },
];
