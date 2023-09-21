import { useNavigate } from 'react-router';
import ToggleSwitchV2 from '../../components/common/toggle-switch/ToggleSwitchV2';
import { useAppDispatch } from '../../hooks';
import { requestGenerator } from '../../utils/payloadGenerator';
import styles from './tableData.module.scss';
import { EditIcon } from '../../components/common/svg-components';
import { colors } from '../color';
import { utcToDate } from '../../utils/utils';
import {
  getInventoryItemList,
  updateStatusInventoryItem,
} from '../../redux/features/inventory-item/inventoryItemAsyncActions';

export const inventoryItemTableHeaderData: any = [
  {
    Header: 'NAME',
    accessor: 'name'
  },
  {
    Header: 'ITEM CODE',
    accessor: 'item_code'
  },
  {
    Header: 'ITEM NO',
    accessor: 'item_no'
  },
  {
    Header: 'UNIT TYPE',
    accessor: 'base_unit_type.value'
  },
  {
    Header: 'GROUP',
    accessor: 'group'
  },
  {
    Header: 'QUANTITY',
    accessor: 'quantity'
  },
  {
    Header: 'CHARGABLE',
    accessor: 'chargable'
  },
  {
    Header: 'COST PRICE',
    accessor: 'cost_price'
  },
  {
    Header: 'SELL PRICE',
    accessor: 'sell_price'
  },
  {
    Header: 'EXPIRY DAYS',
    accessor: 'expiry_days'
  },
  {
    Header: 'STATUS',
    Cell: ({ row }: any) => {
      const dispatch = useAppDispatch();
      const is_active = row?.original?.is_active;
      const handleToggle = (item: any) => {
        const payload = {
          id: item._id,
          is_active: !item.is_active,
        };
        dispatch(updateStatusInventoryItem(requestGenerator(payload))).then((e) => {
          
        });
      };
      return (
        <ToggleSwitchV2
          isToggled={is_active}
          handleToggle={() => handleToggle(row?.original)}
        />
      );
    },
  },
  {
    Header: 'ACTIONS',
    Cell: ({ row }: any) => {
      const editable = row?.original?.is_active;
      const navigate = useNavigate();
      const handleEdit = (item: any) => {
        console.log('item??>>>', item);
        navigate('/inventoryitemtable/addnewitem', {
          state: { itemDetailData: item }
        });
      };
      return (
        <EditIcon
          fillColor={colors.grey4}
          handleClick={() =>
            handleEdit(row?.original)
          }
          customClass={editable ? styles.cursorPointor : styles.cursorDefault}
        />
      );
    },
  },
];
