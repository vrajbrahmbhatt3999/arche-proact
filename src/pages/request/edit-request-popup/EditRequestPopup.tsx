import { FC, useState, useEffect } from 'react';
import styles from './editrequestpopup.module.scss';
import {
  CloseIcon,
  CrossIcon,
} from '../../../components/common/svg-components';
import { colors } from '../../../constants/color';
import Divider from '../../../components/common/divider/Divider';
import Select from 'react-select';
import TableV2 from '../../../components/common/table/tableV2/TableV2';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import Button from '../../../components/common/button/Button';
import {
  REQUEST_SOURCE,
  SOURCE_BRANCH,
  SOURCE_DEPT,
  SOURCE_ROOM,
  STORE,
} from '../../../constants/constant';
import { useForm } from 'react-hook-form';
import { IInventoryRequestForm } from '../../../interfaces/interfaces';
import {
  editInventoryReqsItem,
  editInventoryRequest,
  getAllInventoryRequest,
  getInventoryStore,
} from '../../../redux/features/inventory-request/inventoryRequestAsyncActions';
import { requestGenerator } from '../../../utils/payloadGenerator';
import { sourceDestinationdata } from '../../../constants/data';
import { disableArrowKey } from '../../../utils/utils';

interface IEditRequestPopup {
  handleClose?: any;
}

const EditRequestPopup: FC<IEditRequestPopup> = ({ handleClose }) => {
  const [itemData, setItemData] = useState<any>([]);
  const [focus, setFocus] = useState();
  const { requestDetail, inventoryStoreData, inventoryRequestDataInfo } =
    useAppSelector((state) => state.inventoryRequest);
  const { branchData, userData } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setItemData(requestDetail?.reqItemObjs);
  }, [requestDetail]);

  useEffect(() => {
    dispatch(getInventoryStore(requestGenerator({})));
  }, []);

  const blockInvalidChar = (e: any) =>
    ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();

  const handleKeyDown = (e: any) => {
    blockInvalidChar(e);
    if (e.target.value.length >= 3 && e.key !== 'Backspace') {
      e.preventDefault(); // Prevent further input when the limit is reached
    }
    disableArrowKey(e);
  };

  const handleFocus = (id: any) => {
    setFocus(id);
  };

  const handleChange = (e: any, _id: any) => {
    let newId = _id;
    let newData = itemData?.map((item: any) => {
      if (item?._id === newId) {
        let updateData = { ...item, requested_qty: e.target.value };
        return updateData;
      } else {
        return item;
      }
    });
    setItemData(newData);
  };

  const editRequestTableHeaderData: any = [
    {
      Header: 'ITEM',
      accessor: 'item_name',
    },
    {
      Header: 'QTY.',
      Cell: ({ row }: any) => {
        const _id = row?.original?._id;
        console.log(
          'row?.original?.requested_qty',
          row?.original?.requested_qty?.length
        );
        let qtyVal = Number(row?.original?.requested_qty);
        return (
          <>
            <input
              className={styles.textField}
              value={row?.original?.requested_qty}
              type="number"
              onChange={(e) => handleChange(e, _id)}
              onKeyDown={handleKeyDown}
              onFocus={() => handleFocus(_id)}
              autoFocus={focus === _id}
              onWheel={(e: any) => {
                e.target.blur();
              }}
            />
            {qtyVal < 0 && (
              <p className="errorText" style={{ textAlign: 'center' }}>
                Enter positive value
              </p>
            )}
            {row?.original?.requested_qty?.length > 0 && qtyVal === 0 && (
              <p className="errorText" style={{ textAlign: 'center' }}>
                Enter value greater than 0
              </p>
            )}
            {row?.original?.requested_qty?.length === 0 && (
              <p className="errorText" style={{ textAlign: 'center' }}>
                Please enter value
              </p>
            )}
          </>
        );
      },
    },
    {
      Header: 'ACTION',
      accessor: '_action',
      Cell: ({ row }: any) => {
        const _id = row?.original?._id;
        let requested_qty = row?.original?.requested_qty;
        return (
          <>
            <div className={styles.btnContainer}>
              <button
                className={styles.btn}
                onClick={() => updateItem(_id, requested_qty)}
              >
                Update
              </button>
            </div>
          </>
        );
      },
    },
  ];

  const updateItem = (_id: any, requested_qty: any) => {
    dispatch(
      editInventoryReqsItem(
        requestGenerator({
          qty: Number(requested_qty),
          request_id: requestDetail?.reqObjs?._id,
          item_request_id: _id,
        })
      )
    );
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<IInventoryRequestForm>();

  const capitalizeFirstLetter = (str: any) => {
    const capitalized =
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    return capitalized;
  };

  const removeUnderscore = (str: any) => {
    const arr = str.replace('_', ' ').toLowerCase().split(' ');

    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }

    return arr.join(' ');
  };

  useEffect(() => {
    if (requestDetail?.reqObjs?.request_source_type === 'BRANCH_STORE') {
      setValue(REQUEST_SOURCE, {
        label: removeUnderscore(requestDetail?.reqObjs?.request_source_type),
        value: requestDetail?.reqObjs?.request_source_type,
      });
    } else {
      setValue(REQUEST_SOURCE, {
        label: capitalizeFirstLetter(
          requestDetail?.reqObjs?.request_source_type
        ),
        value: requestDetail?.reqObjs?.request_source_type,
      });
    }
  }, [requestDetail]);

  useEffect(() => {
    if (requestDetail?.reqObjs?.request_source_type === 'DEPARTMENT') {
      setValue(SOURCE_DEPT, {
        label: requestDetail?.reqObjs?.request_source,
        value: requestDetail?.reqObjs?.request_source,
      });
    }
  }, [requestDetail]);

  useEffect(() => {
    if (requestDetail?.reqObjs?.request_source_type === 'ROOM') {
      setValue(SOURCE_ROOM, {
        label: requestDetail?.reqObjs?.request_source,
        value: requestDetail?.reqObjs?.request_source,
      });
    }
  }, [requestDetail]);

  useEffect(() => {
    if (requestDetail?.reqObjs?.request_source_type === 'BRANCH_STORE') {
      setValue(SOURCE_BRANCH, {
        label: requestDetail?.reqObjs?.request_source,
        value: requestDetail?.reqObjs?.source_id,
      });
    }
  }, [requestDetail]);

  useEffect(() => {
    setValue(STORE, {
      label: requestDetail?.reqObjs?.store_id?.name,
      value: requestDetail?.reqObjs?.store_id?._id,
    });
  }, [requestDetail]);

  console.log(
    'requestDetail?.reqObjs?.request_destination',
    requestDetail?.reqObjs
  );

  let formData = watch();

  useEffect(() => {
    if (formData[REQUEST_SOURCE]?.label === 'Branch Store') {
      let storeData = {
        label: 'Main Store',
        value: {
          _id: '64c24e87cc8abfbfe53e3a8b',
          type: 'MAIN_STORE',
          name: 'Main Store',
        },
      };
      setValue(STORE, storeData);
    }
    return () => {
      if (formData[REQUEST_SOURCE]?.value === 'ROOM') {
        setValue(SOURCE_ROOM, null);
      }
      if (formData[REQUEST_SOURCE]?.value === 'DEPARTMENT') {
        setValue(SOURCE_DEPT, null);
      }
    };
  }, [formData[REQUEST_SOURCE]]);

  const onSubmit = async (data: IInventoryRequestForm) => {
    console.log('first', data);
    let reqData = {
      request_source:
        data?.request_source_type?.label === 'Individual'
          ? 'Individual'
          : data?.request_source_type?.label === 'Branch Store'
          ? data?.request_source_branch?.label
          : data?.request_source?.label,
      request_source_type: data?.request_source_type?.value,
      // request_destination: (data?.request_destination?.label)
      //   .toUpperCase()
      //   .replace(' ', '_'),
      request_id: requestDetail?.reqObjs?._id,
      source_id: data?.request_source_branch?.value,
      store_id: data?.request_destination?.value?._id,
    };
    dispatch(editInventoryRequest(requestGenerator(reqData))).then((e) => {
      if (e.type === 'inventory/updateRequest/fulfilled') {
        handleClose();
        let data = {
          page: inventoryRequestDataInfo?.currentPage,
          pageSize: inventoryRequestDataInfo?.perPage,
          view_self: true,
        };
        dispatch(getAllInventoryRequest(requestGenerator(data)));
      }
    });
  };

  const roomData: any = [
    {
      value: '101',
    },
    {
      value: '102',
    },
    {
      value: '103',
    },
  ];

  return (
    <>
      <div
        className={styles.raiseRequestPopupMainContaier}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => handleClose()}
        />
        <form
          className={styles.uploadContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className={styles.title}>Edit Request</p>
          <Divider customClass={styles.dividerStyle} />
          <div className={styles.dropDownMainContainer}>
            <div className={styles.dropDownContainer}>
              <span className={styles.dropDownLabel}> Source</span>
              <Select
                className={styles.select}
                placeholder="Select Source"
                closeMenuOnSelect={true}
                isSearchable={true}
                options={sourceDestinationdata?.map((item: any) => ({
                  label: item?.lable,
                  value: item?.value,
                }))}
                value={watch(REQUEST_SOURCE)}
                {...register(REQUEST_SOURCE)}
                onChange={(e: any) => {
                  setValue(REQUEST_SOURCE, e);
                  trigger(REQUEST_SOURCE);
                }}
                maxMenuHeight={200}
                isDisabled={
                  userData?.role === 'BRANCH_STORE_KEEPER' ? true : false
                }
              />
            </div>

            {formData[REQUEST_SOURCE]?.value === 'DEPARTMENT' && (
              <div className={styles.dropDownContainer}>
                <span className={styles.dropDownLabel}>Department</span>
                <Select
                  className={styles.select}
                  placeholder="Select Department"
                  closeMenuOnSelect={true}
                  isSearchable={true}
                  options={branchData?.departments?.map((item: any) => ({
                    label: item?.name,
                    value: item?._id,
                  }))}
                  value={watch(SOURCE_DEPT)}
                  {...register(SOURCE_DEPT)}
                  onChange={(e: any) => {
                    setValue(SOURCE_DEPT, e);
                    trigger(SOURCE_DEPT);
                  }}
                  maxMenuHeight={200}
                />
              </div>
            )}
            {formData[REQUEST_SOURCE]?.value === 'ROOM' && (
              <div className={styles.dropDownContainer}>
                <span className={styles.dropDownLabel}>Room</span>
                <Select
                  className={styles.select}
                  placeholder="Select Room"
                  closeMenuOnSelect={true}
                  isSearchable={true}
                  value={watch(SOURCE_ROOM)}
                  {...register(SOURCE_ROOM)}
                  onChange={(e: any) => {
                    setValue(SOURCE_ROOM, e);
                    trigger(SOURCE_ROOM);
                  }}
                  options={roomData?.map((item: any) => ({
                    label: item?.value,
                    value: item?.value,
                  }))}
                />
              </div>
            )}
            {formData[REQUEST_SOURCE]?.value === 'BRANCH_STORE' && (
              <div className={styles.dropDownContainer}>
                <span className={styles.dropDownLabel}>Branch</span>
                <Select
                  className={styles.select}
                  placeholder="Select Branch"
                  closeMenuOnSelect={true}
                  isSearchable={true}
                  value={watch(SOURCE_BRANCH)}
                  {...register(SOURCE_BRANCH)}
                  onChange={(e: any) => {
                    setValue(SOURCE_BRANCH, e);
                    trigger(SOURCE_BRANCH);
                  }}
                  options={branchData?.branches?.map((item: any) => ({
                    label: item?.name,
                    value: item?._id,
                  }))}
                />
              </div>
            )}

            <div className={styles.dropDownContainer}>
              <span className={styles.dropDownLabel}>Store</span>
              <Select
                className={styles.select}
                placeholder="Branch Store"
                closeMenuOnSelect={true}
                isSearchable={true}
                options={inventoryStoreData?.map((item: any) => ({
                  label: item?.name,
                  value: item,
                }))}
                value={watch(STORE)}
                {...register(STORE)}
                onChange={(e: any) => {
                  setValue(STORE, e);
                  trigger(STORE);
                }}
                maxMenuHeight={200}
                isDisabled={
                  formData[REQUEST_SOURCE]?.label === 'Branch Store'
                    ? true
                    : false
                }
              />
            </div>
          </div>
          <div className={styles.tableContainer}>
            <TableV2
              tableHeaderData={editRequestTableHeaderData}
              tableRowData={itemData}
              active={false}
            />
          </div>
          <div className={styles.buttonContainer}>
            <Button title="Update" type="submit" />
          </div>
        </form>
      </div>
    </>
  );
};
export default EditRequestPopup;
