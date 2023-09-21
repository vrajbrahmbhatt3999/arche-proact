import { FC, useCallback, useEffect, useState } from 'react';
import styles from './inventoryItemMasterTable.module.scss';
import { trimValue } from '../../utils/utils';
import { SearchButton } from '../../components/common/svg-components';
import Pagination from '../../components/common/pagination/Pagination';
import Popup from '../../components/common/popup/Popup';
import StatusConfirmationPopup from '../../components/common/modal/status-confirmation-popup/StatusConfirmationPopup';
import Loader from '../../components/common/spinner/Loader';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Button from '../../components/common/button/Button';
import TableV2 from '../../components/common/table/tableV2/TableV2';
import { inventoryItemTableHeaderData } from '../../constants/table-data/inventoryItemTableData';
import { requestGenerator } from '../../utils/payloadGenerator';
import { getInventoryItemList } from '../../redux/features/inventory-item/inventoryItemAsyncActions';

interface IinventoryItemMasterTable {}

const InventoryItemMasterTable: FC<IinventoryItemMasterTable> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, inventoryItemList,isStatusUpdated } = useAppSelector((state) => state.inventoryItem);
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [toggleData, setToggleData] = useState({});
  const [confirm, setConfirm] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState('');
 
  //function for creating Page Index Array
  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= totalPage;i++){
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };
  const pageIndexOptions = pageIndexArray();

  //  getInventoryItemList Api
  useEffect(() => {
    let payloadData = {
      page: pageIndex,
      pageSize: dataPerPage,
      name: searchValue,
      is_active: '',
    };
    dispatch(getInventoryItemList(requestGenerator(payloadData))).then((result:any) => setTotalPage(result.payload.lastPage));
  }, [dispatch, dataPerPage, pageIndex,isStatusUpdated]);
  // search functionality

  const handleInputSearch = () => {
    setPageIndex(1);
    const requestData = {
      page: pageIndex,
      pageSize: dataPerPage,
      name: searchValue,
      is_active: '',
    };
    dispatch(getInventoryItemList(requestGenerator(requestData))).then((result:any) => setTotalPage(result?.payload?.lastPage));
  };

  useEffect(() => {
    if (searchValue === ''){
      const requestData = {
        page: pageIndex,
        pageSize: dataPerPage,
        name: searchValue,
        is_active: '',
      };
      dispatch(getInventoryItemList(requestGenerator(requestData))).then((result:any) => setTotalPage(result?.payload?.lastPage));
    }
  }, [dispatch, searchValue, dataPerPage, pageIndex]);

  
  return (
    <>
      {isLoading && <Loader />}

      {confirm && (
        <Popup
          popData={toggleData}
          Children={StatusConfirmationPopup}
          handleClose={() => setConfirm(false)}
        />
      )}

      <div className={styles.mainContainer}>
        <div className={styles.searchContainer}>
          <div className={styles.inputFieldContainer}>
            <input
              type="text"
              className={styles.inputSearchContainer}
              placeholder="Search"
              value={searchValue}
              onChange={(e) => {
                trimValue(e);
                setSearchValue(e.target.value);
              }}
            />

            <SearchButton
              handleClick={() => {
                if (!!searchValue) {
                  handleInputSearch();
                }
              }}
              customClass={styles.inputSearchButton}
            />
          </div>

          <div>
            <Button
              title="Add New Item"
              handleClick={() =>
                navigate('/inventoryitemtable/addnewitem')
              }
            />
          </div>
        </div>

        <div className={styles.tableContainer}>
          <TableV2
            tableHeaderData={inventoryItemTableHeaderData}
            tableRowData={inventoryItemList}
            active={false}
            handleClick={()=>{}}
            setModelOpenClose={()=>{}}
          />
        </div>

        {inventoryItemList && inventoryItemList?.length !== 0 ? (
          <Pagination
            setDataPerPage={setDataPerPage}
            pageIndexOptions={pageIndexOptions}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
          />
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default InventoryItemMasterTable;
