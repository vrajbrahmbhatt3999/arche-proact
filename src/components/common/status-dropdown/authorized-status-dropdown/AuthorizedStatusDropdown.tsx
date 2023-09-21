import { FC, useState, useRef, useEffect } from 'react';
import styles from './authorizedStatusDropdown.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { DropDownIcon } from '../../svg-components';
import { requestGenerator } from '../../../../utils/payloadGenerator';
import {
  getAllInventoryRequest,
  markInventoryReqsAuthorize,
} from '../../../../redux/features/inventory-request/inventoryRequestAsyncActions';

interface IAuthorizedStatusDropdown {
  appointmentStatus?: any;
  appointment_id?: any;
  customClass?: any;
  handleStatusClick?: any;
  setShowOption?: any;
  showOption?: any;
}

const AuthorizedStatusDropdown: FC<IAuthorizedStatusDropdown> = ({
  appointmentStatus,
  appointment_id,
  customClass,
  handleStatusClick,
  setShowOption,
  showOption,
}) => {
  // const [showOption, setShowOption] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [statusValue, setStatusValue] = useState<any>();
  const statusRef = useRef<any>();
  const { inventoryRequestDataInfo } = useAppSelector(
    (state) => state.inventoryRequest
  );

  useEffect(() => {
    setStatusValue({
      value: appointmentStatus && appointmentStatus,
      class:
        appointmentStatus === 'Entered'
          ? 'pending'
          : appointmentStatus === 'Rejected'
          ? 'cancelled'
          : 'green',
    });
  }, [appointmentStatus]);

  // function for close dropdown
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        showOption &&
        statusRef.current &&
        !statusRef.current.contains(e.target)
      ) {
        setShowOption(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [showOption]);

  let optionData = [
    {
      value: 'Entered',
      class: 'pending',
      enum: 'ENTERED',
    },
    {
      value: 'Approved',
      class: 'green',
      enum: 'APPROVED',
    },
    {
      value: 'Rejected',
      class: 'cancelled',
      enum: 'REJECTED',
    },
  ];

  const handleStatus = (item: any) => {
    setStatusValue(item);
    setShowOption(!showOption);
    dispatch(
      markInventoryReqsAuthorize(
        requestGenerator({
          request_id: appointment_id,
          authorization_status: item?.enum,
        })
      )
    ).then((e) => {
      if (e.type === 'inventory/markRequestAuthorize/fulfilled') {
        dispatch(
          getAllInventoryRequest(
            requestGenerator({
              page: inventoryRequestDataInfo?.currentPage,
              pageSize: inventoryRequestDataInfo?.perPage,
              view_self: true,
            })
          )
        );
      }
    });
  };

  return (
    <div className={styles.dropdownContainer} ref={statusRef}>
      <div
        className={styles[`${statusValue?.class}`]}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100px',
          margin: 'auto',
          justifyContent: 'space-around',
        }}
      >
        <p>{statusValue?.value}</p>
        {statusValue?.value === 'Entered' && (
          <DropDownIcon
            fillColor={'#e49e00'}
            handleClick={() => setShowOption(!showOption)}
            customClass={styles.iconStyle}
          />
        )}
      </div>
      {showOption && (
        <div
          className={[styles.optionContainer, customClass].join(' ')}
          // style={{ left: '28px', width: '100px', padding: '0 3px 0 7px' }}
        >
          {optionData?.map((item: any) => {
            if (item?.value !== statusValue?.value) {
              return (
                <div
                  onClick={() =>
                    handleStatusClick
                      ? handleStatusClick(item)
                      : handleStatus(item)
                  }
                >
                  <p className={styles[`${item.class}`]}>{item.value}</p>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default AuthorizedStatusDropdown;
