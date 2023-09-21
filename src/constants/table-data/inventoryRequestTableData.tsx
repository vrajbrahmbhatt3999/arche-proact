import { CrossIcon2 } from '../../components/common/svg-components';
import { colors } from '../color';
import styles from '../table-data/tableData.module.scss';

export const inventoryRequestTableHeaderData: any = [
  {
    Header: 'ITEM CODE',
    Cell: ({ row }: any) => {
      return <p>{row.original?.id?.no}</p>;
    },
  },
  {
    Header: 'ITEM NAME',
    accessor: 'requested_item',
    Cell: ({ row }: any) => {
      return <p>{row.original?.id?.name}</p>;
    },
  },
  {
    Header: 'REQ.STOCK QTY.',
    accessor: 'requested_qty',
  },

  {
    Header: 'UNIT TYPE',
    accessor: 'qty_type',
  },

  {
    Header: 'REQUEST STATUS',
    Cell: ({ row }: any) => {
      return <p className={styles.PENDING}>Initiated</p>;
    },
  },
  {
    Header: 'AUTHORIZED STATUS',
    Cell: ({ row }: any) => {
      return <p className={styles.GENERATED}>Entered</p>;
    },
  },
  ,
  {
    Header: ' ',
    Cell: (props: any) => {
      return (
        <>
          <div>
            <CrossIcon2
              fillColor1={colors.red1}
              handleClick={() => {
                props?.onRowClick(props?.row?.original?.id?.id);
              }}
            />
          </div>
        </>
      );
    },
  },
];
