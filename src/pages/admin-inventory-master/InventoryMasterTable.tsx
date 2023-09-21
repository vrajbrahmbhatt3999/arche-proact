import { FC, useCallback, useEffect, useState } from 'react';
import styles from './inventoryMasterTable.module.scss';
import { trimValue } from '../../utils/utils';
import { SearchButton } from '../../components/common/svg-components';
import Pagination from '../../components/common/pagination/Pagination';
import Popup from '../../components/common/popup/Popup';
import StatusConfirmationPopup from '../../components/common/modal/status-confirmation-popup/StatusConfirmationPopup';
import Loader from '../../components/common/spinner/Loader';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { debounce } from 'lodash';
import Button from '../../components/common/button/Button';
import TableV2 from '../../components/common/table/tableV2/TableV2';
import { inventoryMasterTableHeaderData } from '../../constants/table-data/inventoryMasterTableData';
import { getInventoryMasterList } from '../../redux/features/inventory-master/inventoryMasterAsyncActions';
import { requestGenerator } from '../../utils/payloadGenerator';
import DescriptionModal from '../../components/common/modal/description-modal/DescriptionModal';
import ViewDocumentPopup from '../../components/common/modal/view-document-popup/ViewDocumentPopup';
import InsurancePlanViewDocumentPopup from '../../components/common/modal/insurance-plan-view-document-popup/InsurancePlanViewDocumentPopup';

interface IinventoryMasterTable {}

const InventoryMasterTable: FC<IinventoryMasterTable> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, inventoryDataList } = useAppSelector(
    (state) => state.inventoryMaster
  );
  const [searchMedicalCenter, setSearchMedicalCenter] = useState<any>('');
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [toggleData, setToggleData] = useState({});
  const [confirm, setConfirm] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState('');
  const [notesPopData, setNotesPopData] = useState({});
  const [showNotesModal, setShowNotesModal] = useState<boolean>(false);
  const [showAttachmentModal, setShowAttachmentModal] =
    useState<boolean>(false);
  const [attachmentsModalData, setAttachmentsModalData] = useState<any>();

  // function for creating Page Index Array
  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };
  const pageIndexOptions = pageIndexArray();

  // getInventoryMasterList Api
  useEffect(() => {
    let payloadData = {
      page: pageIndex,
      pageSize: dataPerPage,
      name: searchValue,
      is_active: '',
    };
    dispatch(getInventoryMasterList(requestGenerator(payloadData))).then(
      (result) => setTotalPage(result.payload.lastPage)
    );
  }, [dispatch, dataPerPage, pageIndex]);

  // search functionality

  // Debounce Search String
  const searchText = useCallback(
    debounce(
      (text: string): void =>
        setSearchMedicalCenter && setSearchMedicalCenter(text),
      500
    ),
    [setSearchMedicalCenter]
  );

  const handleInputSearch = () => {
    setPageIndex(1);
    const requestData = {
      page: pageIndex,
      pageSize: dataPerPage,
      name: searchValue,
      is_active: '',
    };
    dispatch(getInventoryMasterList(requestGenerator(requestData))).then(
      (result) => setTotalPage(result?.payload?.lastPage)
    );
  };

  useEffect(() => {
    if (searchValue === '') {
      const requestData = {
        page: pageIndex,
        pageSize: dataPerPage,
        name: searchValue,
        is_active: '',
      };
      dispatch(getInventoryMasterList(requestGenerator(requestData))).then(
        (result) => setTotalPage(result?.payload?.lastPage)
      );
    }
  }, [dispatch, searchValue, dataPerPage, pageIndex]);

  const handleNotesCloseModal = () => {
    setShowNotesModal((prevState) => !prevState);
  };

  const handleNotesModal = (notesObject: {}) => {
    setShowNotesModal((prevState) => !prevState);
    setNotesPopData(notesObject);
    setSearchValue('');
  };

  // attachment view modal close
  const handleViewAttachmentCloseModal = () => {
    setShowAttachmentModal((prevState) => !prevState);
    setAttachmentsModalData({});
    setSearchValue('');
  };
  // handleAttachmentModal
  const handleViewAttachment = (item: any) => {
    let attachmentData = item?.map((attachItem: any) => {
      return attachItem?.base64_data_uri;
    });
    console.log('attachmentData??>>', attachmentData);
    setShowAttachmentModal((prevState) => !prevState);
    setAttachmentsModalData(attachmentData);
  };

  return (
    <>
      {isLoading && <Loader />}

      {showNotesModal && (
        <Popup
          Children={DescriptionModal}
          handleClose={handleNotesCloseModal}
          heading={'Notes'}
          popData={notesPopData}
        />
      )}

      {showAttachmentModal && (
        <Popup
          Children={InsurancePlanViewDocumentPopup}
          handleClose={handleViewAttachmentCloseModal}
          popData={attachmentsModalData}
        />
      )}

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
              title="Add New Supplier"
              handleClick={() =>
                navigate('/inventorymastertable/addnewsuplier')
              }
            />
          </div>
        </div>

        <div className={styles.tableContainer}>
          <TableV2
            tableHeaderData={inventoryMasterTableHeaderData}
            tableRowData={inventoryDataList}
            active={false}
            handleClick={handleNotesModal}
            setModelOpenClose={handleViewAttachment}
          />
        </div>

        {inventoryDataList && inventoryDataList?.length !== 0 ? (
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

export default InventoryMasterTable;
