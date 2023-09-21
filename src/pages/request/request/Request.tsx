import { FC, useEffect, useState } from 'react';
import styles from './request.module.scss';
import Button from '../../../components/common/button/Button';
import SubmitRequestPopup from '../submit-request/SubmitRequestPopup';
import Popup from '../../../components/common/popup/Popup';
import RaiseRequestPopup from '../raise-request-popup/RaiseRequestPopup';
import SubmitAllTablePopup from '../submitAllPopup/submitPopup';
import TableV3 from '../../../components/common/table/tableV3/TableV3';
import SmartSearch from '../../../components/common/smart-search/SmartSearch';
import { SearchIcon } from '../../../components/common/svg-components';
import { colors } from '../../../constants/color';
import {
  Column,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from 'react-table';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { requestGenerator } from '../../../utils/payloadGenerator';
import { createInventoryRequest } from '../../../redux/features/inventory-request/inventoryRequestAsyncActions';
import Loader from '../../../components/common/spinner/Loader';
import {
  clearInventoryReqSource,
  clearInventoryReqSourceBranch,
  clearInventoryReqSourceDept,
  clearInventoryReqSourceRoom,
  clearInventoryReqStore,
  getInventoryReqSource,
} from '../../../redux/features/inventory-request/inventoryRequestSlice';
import EditRequestPopup from '../edit-request-popup/EditRequestPopup';
import { setMessage } from '../../../redux/features/toast/toastSlice';
import { failure } from '../../../constants/data';
import { inventoryRequestTableHeaderData } from '../../../constants/table-data/inventoryRequestTableData';
import { useLocation, useNavigate } from 'react-router-dom';
interface IRequestLayout {}

const InventoryRequest: FC<IRequestLayout> = () => {
  const [submitRequestPopup, setSubmitRequestPopup] = useState(false);
  const [raiseRequestPopup, setRaiseRequestPopup] = useState(false);
  const [SubmitAllPopup, setSubmitAllPopup] = useState(false);
  const [itemsArray, setItemsArray] = useState<any>([]);
  const [showEdit, setShowEdit] = useState(false);
  const [resData, setResData] = useState('');
  const dispatch = useAppDispatch();
  const {
    isLoading,
    inventoryReqSource,
    inventoryReqStore,
    inventoryReqSourceDept,
    inventoryReqSourceRoom,
    inventoryReqSourceBranch,
  } = useAppSelector((state) => state.inventoryRequest);
  const { branchData, userData } = useAppSelector((state) => state.login);
  const location = useLocation().pathname;
  const navigate = useNavigate();

  console.log('inventoryReqStore', inventoryReqStore);

  useEffect(() => {
    if (location === '/request') {
      navigate('/request');
    }
  }, [location]);

  const data: any = itemsArray ?? [];
  const columns: Column<any>[] = inventoryRequestTableHeaderData ?? [];
  const options: TableOptions<any> = {
    data,
    columns,
  };

  const {
    state,
    // @ts-ignore
    setGlobalFilter,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(options, useGlobalFilter, useSortBy);
  // @ts-ignore
  const { globalFilter } = state;

  const handleModalClose = () => {
    setSubmitRequestPopup(!submitRequestPopup);
  };
  const handleModalClose1 = () => {
    setRaiseRequestPopup(!raiseRequestPopup);
  };
  const requestPopup = () => {
    setRaiseRequestPopup(!raiseRequestPopup);
  };
  const submitPopup = () => {
    setSubmitRequestPopup(!submitRequestPopup);
  };

  let itemData = itemsArray?.map((item: any) => {
    return {
      id: item.id.id,
      requested_qty: item?.requested_qty,
      qty_type: item?.qty_type,
      req_unit_type_id: item?.req_unit_type_id,
      base_unit_type_id: item?.base_unit_type_id,
    };
  });

  const submitallPopupOpen = () => {
    let data = {
      request_source:
        inventoryReqSourceDept?.length > 0
          ? inventoryReqSourceDept
          : inventoryReqSource === 'BRANCH_STORE'
          ? inventoryReqSourceBranch?.label
          : inventoryReqSource,
      request_destination: inventoryReqStore?.type,
      store_id: inventoryReqStore?._id,
      request_source_type: inventoryReqSource,
      items: itemData,
      source_id: inventoryReqSourceBranch?.value,
    };
    dispatch(createInventoryRequest(requestGenerator(data))).then((e) => {
      if (e.type === 'inventory/createRequest/fulfilled') {
        setResData(e.payload);
        setSubmitAllPopup(true);
        setItemsArray([]);
        dispatch(clearInventoryReqSourceDept());
        dispatch(clearInventoryReqSourceRoom());
        dispatch(clearInventoryReqSourceBranch());
        if (userData?.role !== 'BRANCH_STORE_KEEPER') {
          dispatch(clearInventoryReqSource());
          dispatch(clearInventoryReqStore());
        }
      }
    });
  };

  const handleDelete = (id: any) => {
    let filterData = itemsArray?.filter((item: any) => item.id.id !== id);
    setItemsArray(filterData);
  };

  useEffect(() => {
    if (itemsArray?.length === 0) {
      dispatch(clearInventoryReqStore());
      dispatch(clearInventoryReqSourceDept());
      dispatch(clearInventoryReqSourceRoom());
      dispatch(clearInventoryReqSourceBranch());
      if (userData?.role !== 'BRANCH_STORE_KEEPER') {
        dispatch(clearInventoryReqSource());
      }
    }
  }, [itemsArray]);

  useEffect(() => {
    if (userData?.role === 'BRANCH_STORE_KEEPER') {
      dispatch(getInventoryReqSource('BRANCH_STORE'));
    }
  }, [dispatch, userData?.role]);

  return (
    <>
      {isLoading && <Loader />}
      {submitRequestPopup && (
        <Popup
          Children={SubmitRequestPopup}
          handleClose={() => handleModalClose()}
          handleChildClick={() => setShowEdit(true)}
        />
      )}
      {showEdit && (
        <Popup
          Children={EditRequestPopup}
          handleClose={() => setShowEdit(false)}
        />
      )}

      {raiseRequestPopup && (
        <Popup
          Children={RaiseRequestPopup}
          handleClose={() => handleModalClose1()}
          handleSubmitData={(item: any) => {
            const isItemExist =
              itemsArray?.length > 0 &&
              itemsArray.some(
                (itemObj: any) => itemObj?.id?.id === item?.itemData?.id?.id
              );
            if (isItemExist) {
              let toastData = {
                message: 'Item already exist',
                type: failure,
              };
              dispatch(setMessage(toastData));
            } else {
              setItemsArray((prevData: any) => [...prevData, item?.itemData]);
            }
          }}
        />
      )}

      {SubmitAllPopup && (
        <Popup
          Children={SubmitAllTablePopup}
          handleClose={() => setSubmitAllPopup(false)}
          popData={resData}
        />
      )}
      <div className={styles.requestMainContainer}>
        <div className={styles.requestDataContainer}>
          <div className={styles.requestContainer}>
            <div className={styles.userIdContainer}>
              <span className={styles.idText}>User ID:</span>
              <p className={styles.text}>{branchData?.user_no}</p>
              {/* <p className={styles.text}>1365896</p> */}
            </div>
            <div className={styles.userIdContainer}>
              <span className={styles.idText}> User Name</span>
              <p className={styles.text}>{branchData?.name}</p>
            </div>
            {/* <div className={styles.userIdContainer}>
              <span className={styles.idText}>Date</span>
              <p className={styles.text}>23 Jan 2023</p>
            </div>
            <div className={styles.userIdContainer}>
              <span className={styles.idText}> Doc ID</span>
              <p className={styles.text}>SS_IS_DT_TIME</p>
            </div> */}
          </div>
          <div className={styles.buttonContainer}>
            <Button
              title="New Request"
              customClass={styles.submitRequestButon}
              handleClick={requestPopup}
            />
            <Button
              title="Submitted Requests"
              customClass={styles.submitRequestButon}
              handleClick={submitPopup}
            />
          </div>
        </div>
      </div>
      <div className={styles.tableMainContainer}>
        <div className={styles.searchContainer}>
          <div className={styles.searchButton}>
            <SearchIcon fillColor={colors.white1} />
          </div>
          <SmartSearch
            placeHolder="Search by item name"
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            customClassInput={styles.inputSearch}
          />
        </div>
        <div className={styles.tableContainer}>
          <TableV3
            getTableProps={getTableProps}
            getTableBodyProps={getTableBodyProps}
            headerGroups={headerGroups}
            rows={rows}
            prepareRow={prepareRow}
            handleRowClick={handleDelete}
            active={false}
          />
        </div>
        <div className={styles.submitbtn}>
          <Button
            title="Submit All"
            type="submit"
            customClass={styles.reqSubmit}
            handleClick={() => submitallPopupOpen()}
            disable={itemsArray?.length > 0 ? false : true}
          />
        </div>
      </div>
    </>
  );
};
export default InventoryRequest;
