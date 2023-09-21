import { FC, useEffect, useState } from 'react';
import styles from './raiserequestpopup.module.scss';
import {
  CloseIcon,
  SearchIcon,
} from '../../../components/common/svg-components';
import { colors } from '../../../constants/color';
import Divider from '../../../components/common/divider/Divider';
import Select, { components } from 'react-select';
import Button from '../../../components/common/button/Button';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { requestGenerator } from '../../../utils/payloadGenerator';
import {
  getAllInventoryItem,
  getInventoryStore,
} from '../../../redux/features/inventory-request/inventoryRequestAsyncActions';
import {
  blockInvalidCharacter,
  disableArrowKey,
  trimValue,
} from '../../../utils/utils';
import { useForm } from 'react-hook-form';
import { IInventoryRequestForm } from '../../../interfaces/interfaces';
import { addInventoryRequestValidators } from '../../../form-validators/addInventoryRequestValidators';
import {
  ITEM_NAME,
  ITEM_QTY,
  REQUEST_SOURCE,
  SOURCE_BRANCH,
  SOURCE_DEPT,
  SOURCE_ROOM,
  STORE,
  UNIT_TYPE,
} from '../../../constants/constant';
import {
  getInventoryReqSource,
  getInventoryReqSourceBranch,
  getInventoryReqSourceDept,
  getInventoryReqSourceRoom,
  getInventoryReqStore,
} from '../../../redux/features/inventory-request/inventoryRequestSlice';
import { sourceDestinationdata } from '../../../constants/data';
interface IRaiseRequestPopup {
  handleClose?: any;
  handleSubmitData?: any;
}

const RaiseRequestPopup: FC<IRaiseRequestPopup> = ({
  handleClose,
  handleSubmitData,
}) => {
  const [val, setval] = useState<any>();
  const [unitTypeData, setUnitTypeData] = useState<any>();
  const [selectedItem, setSelectedItem] = useState<any>();
  const dispatch = useAppDispatch();
  const {
    inventoryItemData,
    inventoryStoreData,
    inventoryReqSource,
    inventoryReqStore,
    inventoryReqSourceDept,
    inventoryReqSourceRoom,
    inventoryReqSourceBranch,
  } = useAppSelector((state) => state.inventoryRequest);
  const { branchData, masterValueData, userData } = useAppSelector(
    (state) => state.login
  );

  console.log('branchData', branchData);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<IInventoryRequestForm>();

  useEffect(() => {
    let data = {
      page: '1',
      pageSize: 10000,
    };
    dispatch(getAllInventoryItem(requestGenerator(data)));
    dispatch(getInventoryStore(requestGenerator({})));
  }, []);

  useEffect(() => {
    if (inventoryReqSource.length > 0) {
      if (inventoryReqSource === 'BRANCH_STORE') {
        setValue(REQUEST_SOURCE, {
          label: 'Branch Store',
          value: inventoryReqSource,
        });
      } else if (inventoryReqSource === 'INDIVIDUAL') {
        setValue(REQUEST_SOURCE, {
          label: 'Individual',
          value: inventoryReqSource,
        });
      } else if (inventoryReqSource === 'ROOM') {
        setValue(REQUEST_SOURCE, {
          label: 'Room',
          value: inventoryReqSource,
        });
      } else if (inventoryReqSource === 'DEPARTMENT') {
        setValue(REQUEST_SOURCE, {
          label: 'Department',
          value: inventoryReqSource,
        });
      }
    }
    if (inventoryReqSource === 'BRANCH_STORE') {
      setval('Branch Store');
    }
  }, [inventoryReqSource]);

  useEffect(() => {
    if (inventoryReqStore.name !== undefined) {
      setValue(STORE, {
        label: inventoryReqStore?.name,
        value: inventoryReqStore,
      });
    }
  }, [inventoryReqStore]);

  useEffect(() => {
    if (inventoryReqSourceDept?.length > 0) {
      setValue(SOURCE_DEPT, {
        label: inventoryReqSourceDept,
        value: inventoryReqSourceDept,
      });
    }
  }, [inventoryReqSourceDept]);

  useEffect(() => {
    if (inventoryReqSourceRoom?.length > 0) {
      setValue(SOURCE_ROOM, {
        label: inventoryReqSourceRoom,
        value: inventoryReqSourceRoom,
      });
    }
  }, [inventoryReqSourceRoom]);

  useEffect(() => {
    if (inventoryReqSourceBranch?.label !== undefined) {
      setValue(SOURCE_BRANCH, inventoryReqSourceBranch);
    }
  }, [inventoryReqSourceBranch]);

  let formData = watch();

  useEffect(() => {
    if (selectedItem !== undefined) {
      let filterData = inventoryItemData?.filter(
        (item: any) => item?._id === selectedItem
      );
      setUnitTypeData(filterData);
    }
  }, [selectedItem]);

  const onSubmit = async (data: IInventoryRequestForm) => {
    let reqData: any = {
      ...data,
      [REQUEST_SOURCE]: formData[REQUEST_SOURCE]?.value || '',
      [STORE]: formData[STORE]?.value || '',
      [SOURCE_DEPT]: formData[SOURCE_DEPT]?.label || '',
      qty_type: data?.qty_type?.label,
      req_unit_type_id: data?.qty_type?.value,
    };
    let newData = {
      itemData: {
        id: reqData.id,
        qty_type: reqData.qty_type,
        req_unit_type_id: reqData.req_unit_type_id,
        requested_qty: reqData.requested_qty,
        requested_item: reqData.id?.name,
        base_unit_type_id: reqData.id?.unit_type,
      },
    };
    dispatch(getInventoryReqSource(reqData.request_source_type));
    dispatch(getInventoryReqStore(reqData.request_destination));
    dispatch(getInventoryReqSourceDept(reqData.request_source));
    dispatch(getInventoryReqSourceRoom(reqData.request_source));
    dispatch(getInventoryReqSourceBranch(formData[SOURCE_BRANCH]));
    handleSubmitData(newData);
    handleClose();
  };

  const DropdownIndicator = (props: any) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <SearchIcon fillColor={colors.grey2} />
        </components.DropdownIndicator>
      )
    );
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

  useEffect(() => {
    if (inventoryReqStore.name === undefined) {
      if (val === 'Branch Store') {
        let storeData = {
          label: 'Main Store',
          value: {
            _id: '64c24e87cc8abfbfe53e3a8b',
            type: 'MAIN_STORE',
            name: 'Main Store',
          },
        };
        setValue(STORE, storeData);
      } else {
        setValue(STORE, null);
      }
    }
  }, [val]);

  useEffect(() => {
    if (val === 'Individual') {
      setValue(SOURCE_DEPT, { value: 'INDIVIDUAL', label: 'Individual' });
    }
  }, [val]);

  useEffect(() => {
    if (val === 'Department') {
      setValue(SOURCE_ROOM, null);
    } else if (val === 'Room') {
      setValue(SOURCE_DEPT, null);
    } else if (val === 'Branch Store') {
      if (inventoryReqSourceBranch?.label === undefined) {
        setValue(SOURCE_BRANCH, null);
      } else {
        setValue(SOURCE_BRANCH, inventoryReqSourceBranch);
      }
    }
  }, [val]);

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
        <div className={styles.uploadContainer}>
          <p className={styles.title}>Raise Request</p>
          <Divider customClass={styles.dividerStyle} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.searchMainContainer}>
              <div className={styles.inputFieldContainer}>
                <label className={styles.label}>
                  Source <span className="asterick">*</span>
                </label>
                <div className={styles.fieldErrorContainer}>
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
                    {...register(
                      REQUEST_SOURCE,
                      addInventoryRequestValidators[REQUEST_SOURCE]
                    )}
                    onChange={(e: any) => {
                      setValue(REQUEST_SOURCE, e);
                      trigger(REQUEST_SOURCE);
                      setval(e.label);
                    }}
                    maxMenuHeight={200}
                    isDisabled={inventoryReqSource?.length > 0 ? true : false}
                  />
                  {errors[REQUEST_SOURCE] && (
                    <p className="errorText">
                      {errors[REQUEST_SOURCE].message as any}
                    </p>
                  )}
                </div>
              </div>
              {(val === 'Department' ||
                inventoryReqSource === 'DEPARTMENT') && (
                <div className={styles.inputFieldContainer}>
                  <span className={styles.label}>
                    {' '}
                    Department <span className="asterick">*</span>
                  </span>
                  <div className={styles.fieldErrorContainer}>
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
                      {...register(
                        SOURCE_DEPT,
                        addInventoryRequestValidators[SOURCE_DEPT]
                      )}
                      onChange={(e: any) => {
                        setValue(SOURCE_DEPT, e);
                        trigger(SOURCE_DEPT);
                      }}
                      isDisabled={
                        inventoryReqSourceDept?.length > 0 ? true : false
                      }
                      maxMenuHeight={200}
                    />
                    {errors[SOURCE_DEPT] && (
                      <p className="errorText">
                        {(errors[SOURCE_DEPT].message as any) + ' department'}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {(val === 'Room' || inventoryReqSource === 'ROOM') && (
                <div className={styles.inputFieldContainer}>
                  <span className={styles.label}>
                    Room <span className="asterick">*</span>
                  </span>
                  <div className={styles.fieldErrorContainer}>
                    <Select
                      className={styles.select}
                      placeholder="Select Room"
                      closeMenuOnSelect={true}
                      isSearchable={true}
                      options={roomData?.map((item: any) => ({
                        label: item?.value,
                        value: item?.value,
                      }))}
                      value={watch(SOURCE_ROOM)}
                      {...register(
                        SOURCE_ROOM,
                        addInventoryRequestValidators[SOURCE_ROOM]
                      )}
                      onChange={(e: any) => {
                        setValue(SOURCE_ROOM, e);
                        trigger(SOURCE_ROOM);
                      }}
                      maxMenuHeight={200}
                      isDisabled={
                        inventoryReqSourceRoom?.length > 0 ? true : false
                      }
                    />
                    {errors[SOURCE_ROOM] && (
                      <p className="errorText">
                        {(errors[SOURCE_ROOM].message as any) + ' room'}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {(val === 'Branch Store' ||
                inventoryReqSource === 'BRANCH_STORE') && (
                <div className={styles.inputFieldContainer}>
                  <span className={styles.label}>
                    Branch <span className="asterick">*</span>
                  </span>
                  <div className={styles.fieldErrorContainer}>
                    <Select
                      className={styles.select}
                      placeholder="Select Branch"
                      closeMenuOnSelect={true}
                      isSearchable={true}
                      options={branchData?.branches?.map((item: any) => ({
                        label: item?.name,
                        value: item?._id,
                      }))}
                      value={watch(SOURCE_BRANCH)}
                      {...register(
                        SOURCE_BRANCH,
                        addInventoryRequestValidators[SOURCE_BRANCH]
                      )}
                      onChange={(e: any) => {
                        setValue(SOURCE_BRANCH, e);
                        trigger(SOURCE_BRANCH);
                      }}
                      maxMenuHeight={200}
                      isDisabled={
                        inventoryReqSourceBranch?.label !== undefined
                          ? true
                          : false
                      }
                    />
                    {errors[SOURCE_BRANCH] && (
                      <p className="errorText">
                        {errors[SOURCE_BRANCH].message as any}
                      </p>
                    )}
                  </div>
                </div>
              )}
              <div className={styles.inputFieldContainer}>
                <span className={styles.label}>
                  Store <span className="asterick">*</span>
                </span>
                <div className={styles.fieldErrorContainer}>
                  <Select
                    className={styles.select}
                    placeholder="Select Store"
                    closeMenuOnSelect={true}
                    isSearchable={true}
                    options={
                      userData?.role === 'BRANCH_STORE_KEEPER'
                        ? branchData?.main_store?.map((item: any) => ({
                            label: item?.name,
                            value: {
                              _id: item?._id,
                              name: item?.name,
                              type: item?.type,
                            },
                          }))
                        : branchData?.branch_store?.map((item: any) => ({
                            label: item?.name,
                            value: {
                              _id: item?._id,
                              name: item?.name,
                              type: item?.type,
                            },
                          }))
                    }
                    value={watch(STORE)}
                    {...register(STORE, addInventoryRequestValidators[STORE])}
                    onChange={(e: any) => {
                      setValue(STORE, e);
                      trigger(STORE);
                    }}
                    maxMenuHeight={200}
                    isDisabled={
                      inventoryReqStore?.name !== undefined ||
                      val === 'Branch Store'
                        ? true
                        : false
                    }
                  />
                  {errors[STORE] && (
                    <p className="errorText">{errors[STORE].message as any}</p>
                  )}
                </div>
              </div>
              <div className={styles.inputFieldContainer}>
                <label className={styles.label}>
                  Item Name <span className="asterick">*</span>
                </label>
                <div className={styles.fieldErrorContainer}>
                  <Select
                    className={styles.select}
                    placeholder="Select Item"
                    closeMenuOnSelect={true}
                    isSearchable={true}
                    options={inventoryItemData?.map((item: any) => ({
                      label: item?.name,
                      value: {
                        id: item?._id,
                        name: item?.name,
                        no: item?.item_no,
                        unit_type: item?.unit_type,
                      },
                    }))}
                    {...register(
                      ITEM_NAME,
                      addInventoryRequestValidators[ITEM_NAME]
                    )}
                    onChange={(e: any) => {
                      setValue(ITEM_NAME, e.value);
                      trigger(ITEM_NAME);
                      setSelectedItem(e.value?.id);
                      setValue(UNIT_TYPE, null);
                    }}
                    maxMenuHeight={200}
                    // components={<SearchIcon fillColor={colors.white1} />}
                    components={{ DropdownIndicator }}
                  />
                  {errors[ITEM_NAME] && (
                    <p className="errorText">
                      {errors[ITEM_NAME].message as any}
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.inputFieldContainer}>
                <label className={styles.label}>
                  QTY <span className="asterick">*</span>
                </label>
                <div className={styles.fieldErrorContainer}>
                  <input
                    type="text"
                    className={styles.inputField}
                    placeholder="Enter Oty."
                    {...register(
                      ITEM_QTY,
                      addInventoryRequestValidators[ITEM_QTY]
                    )}
                    onChange={(e) => trimValue(e)}
                    onKeyDown={(e: any) => {
                      disableArrowKey(e);
                      blockInvalidCharacter(e);
                    }}
                    onWheel={(e: any) => {
                      e.target.blur();
                    }}
                  />
                  {errors[ITEM_QTY] && (
                    <p className="errorText">
                      {errors[ITEM_QTY].message as any}
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.inputFieldContainer}>
                <label className={styles.label}>
                  Unit <span className="asterick">*</span>
                </label>
                <div className={styles.fieldErrorContainer}>
                  <Select
                    className={styles.select}
                    placeholder="Select Unit"
                    closeMenuOnSelect={true}
                    isSearchable={true}
                    value={watch(UNIT_TYPE)}
                    options={
                      unitTypeData?.length > 0
                        ? unitTypeData[0]?.unites?.map((item: any) => ({
                            label: item?.value,
                            value: item?._id,
                          }))
                        : []
                    }
                    {...register(
                      UNIT_TYPE,
                      addInventoryRequestValidators[UNIT_TYPE]
                    )}
                    onChange={(e: any) => {
                      setValue(UNIT_TYPE, { label: e.label, value: e.value });
                      trigger(UNIT_TYPE);
                    }}
                    maxMenuHeight={200}
                    isDisabled={
                      formData[ITEM_NAME] === undefined ? true : false
                    }
                  />
                  {errors[UNIT_TYPE] && (
                    <p className="errorText">
                      {errors[UNIT_TYPE].message as any}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* DO NOT REMOVE BELOW COMMENTED CODE */}

            {/* {val === "Department" && (
              <>
                <div className={styles.searchMainContainer}>
                  <div className={styles.inputFieldContainer}>
                    <span className={styles.label}> Department</span>
                    <div className={styles.fieldErrorContainer}>
                      <Select
                        className={styles.select}
                        placeholder=" Select Department"
                        closeMenuOnSelect={true}
                        isSearchable={true}
                        options={sourceDestinationdata?.map((item: any) => ({
                          label: item?.value,
                          value: item?.value,
                        }))}
                        maxMenuHeight={200}
                      />
                    </div>
                  </div>
                  <div className={styles.inputFieldContainer}>
                    <span className={styles.label}> Store</span>
                    <div className={styles.fieldErrorContainer}>
                      <Select
                        className={styles.select}
                        placeholder="Branch Store"
                        closeMenuOnSelect={true}
                        isSearchable={true}
                        options={inventoryStoreData?.map((item: any) => ({
                          label: item?.name,
                          value: item,
                        }))}
                        {...register(
                          STORE,
                          addInventoryRequestValidators[STORE]
                        )}
                        onChange={(e: any) => {
                          setValue(STORE, e.value);
                          trigger(STORE);
                        }}
                        maxMenuHeight={200}
                      />
                      {errors[STORE] && (
                        <p className="errorText">
                          {errors[STORE].message as any}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )} */}

            {/* {val === "Room" && (
              <div className={styles.searchMainContainer}>
                <div className={styles.inputFieldContainer}>
                  <span className={styles.label}> Room</span>
                  <div className={styles.fieldErrorContainer}>
                    <Select
                      className={styles.select}
                      placeholder=" Select Room"
                      closeMenuOnSelect={true}
                      isSearchable={true}
                      options={sourceDestinationdata?.map((item: any) => ({
                        label: item?.value,
                        value: item?.value,
                      }))}
                      maxMenuHeight={200}
                    />
                  </div>
                </div>
                <div className={styles.inputFieldContainer}>
                  <span className={styles.label}> Store</span>
                  <div className={styles.fieldErrorContainer}>
                    <Select
                      className={styles.select}
                      placeholder="Branch Store"
                      closeMenuOnSelect={true}
                      isSearchable={true}
                      options={branchStoredata?.map((item: any) => ({
                        label: item?.value,
                        value: item?.value,
                      }))}
                      maxMenuHeight={200}
                    />
                  </div>
                </div>
              </div>
            )} */}

            {/* {val == "Individual" && (
              <div className={styles.searchMainContainer}>
                <div className={styles.inputFieldContainer}>
                  <span className={styles.label}> Store</span>
                  <div className={styles.fieldErrorContainer}>
                    <Select
                      className={styles.select}
                      placeholder="Branch Store"
                      closeMenuOnSelect={true}
                      isSearchable={true}
                      options={branchStoredata?.map((item: any) => ({
                        label: item?.value,
                        value: item?.value,
                      }))}
                      maxMenuHeight={200}
                    />
                  </div>
                </div>
              </div>
            )}
            {val == "Sub Store" && (
              <div className={styles.searchMainContainer}>
                <div className={styles.inputFieldContainer}>
                  <span className={styles.label}>Store</span>
                  <div className={styles.fieldErrorContainer}>
                    <Select
                      className={styles.select}
                      placeholder="Branch Store"
                      closeMenuOnSelect={true}
                      isSearchable={true}
                      options={branchStoredata?.map((item: any) => ({
                        label: item?.value,
                        value: item?.value,
                      }))}
                      maxMenuHeight={200}
                    />
                  </div>
                </div>
              </div>
            )} */}

            <div className={styles.buttonContainer}>
              <Button title="Request" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default RaiseRequestPopup;
