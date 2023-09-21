import { useNavigate } from 'react-router';
import ToggleSwitchV2 from '../../components/common/toggle-switch/ToggleSwitchV2';
import { useAppDispatch } from '../../hooks';
import { requestGenerator } from '../../utils/payloadGenerator';
import styles from './tableData.module.scss';
import { EditIcon } from '../../components/common/svg-components';
import { colors } from '../color';
import { utcToDate } from '../../utils/utils';
import {
  getInventoryMasterList,
  updateInventoryMaster,
} from '../../redux/features/inventory-master/inventoryMasterAsyncActions';
export const inventoryMasterTableHeaderData: any = [
  {
    Header: 'NAME',
    accessor: 'name',
  },
  {
    Header: 'CONTACT PERSON',
    accessor: 'contact_name',
  },
  {
    Header: 'CONTACT NO.',
    accessor: 'phone',
  },

  {
    Header: 'ATTACHMENTS',
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.attachments?.length > 0 ? (
            <span
              className={styles.blueLinkText}
              onClick={() => {
                props?.onPopClose(props?.row?.original?.attachments);
              }}
            >
              View
            </span>
          ) : (
            '-'
          )}
        </>
      );
    },
  },
  {
    Header: 'NOTES',
    accessor: 'notes',
    Cell: (props: any) => {
      const notesObject = {
        noteDetail: props?.row?.original?.notes,
        lastUpdateDate: utcToDate(props?.row?.original?.updatedAt),
      };

      return (
        <>
          {notesObject?.noteDetail ? (
            <span
              className={styles.view}
              onClick={() => props.onClick(notesObject)}
            >
              View
            </span>
          ) : (
            '-'
          )}
        </>
      );
    },
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
        dispatch(updateInventoryMaster(requestGenerator(payload))).then((e) => {
          if (e.type === 'inventoryMaster/updateInventoryMaster/fulfilled') {
            dispatch(getInventoryMasterList(requestGenerator({})));
          }
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
    // accessor: '',
    Cell: ({ row }: any) => {
      const editable = row?.original?.is_active;
      const navigate = useNavigate();
      const handleEdit = (item: any) => {
        console.log('item??>>>', item);
        navigate('/inventorymastertable/addnewsuplier', {
          state: { supplierDetailData: item },
        });
      };
      return (
        <EditIcon
          fillColor={colors.grey4}
          handleClick={() =>
            row?.original?.is_active && handleEdit(row?.original)
          }
          customClass={editable ? styles.cursorPointor : styles.cursorDefault}
          // handleClick={() => handleEdit(row?.original)}
        />
      );
    },
  },
];
