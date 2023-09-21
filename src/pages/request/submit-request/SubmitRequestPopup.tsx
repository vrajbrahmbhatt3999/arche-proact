import { FC, useEffect, useState } from 'react';
import styles from './submitrequestpopup.module.scss';
import {
  CloseIcon,
  SearchButton,
  SearchIcon,
} from '../../../components/common/svg-components';
import { colors } from '../../../constants/color';
import Divider from '../../../components/common/divider/Divider';
import Search from '../../../components/common/search/Search';
import { submitRequestPopupHeaderData } from '../../../constants/table-data/submitRequestPopupTableData';
import TableV3 from '../../../components/common/table/tableV3/TableV3';
import SmartSearch from '../../../components/common/smart-search/SmartSearch';
import {
  Column,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from 'react-table';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { requestGenerator } from '../../../utils/payloadGenerator';
import {
  deleteInventoryRequest,
  getAllInventoryRequest,
  getInventoryReqsById,
  getInventoryReqsPdf,
} from '../../../redux/features/inventory-request/inventoryRequestAsyncActions';
import Loader from '../../../components/common/spinner/Loader';
import jsPDF from 'jspdf';
import Pagination from '../../../components/common/pagination/Pagination';
import Select from 'react-select';
import Popup from '../../../components/common/popup/Popup';
import DeleteMedicationPopup from '../../../components/common/modal/delete-medication-popup/DeleteMedicationPopup';
interface ISubmitPopup {
  handleClose?: any;
  handleChildClick?: any;
}

const SubmitRequestPopup: FC<ISubmitPopup> = ({
  handleClose,
  handleChildClick,
}) => {
  const dispatch = useAppDispatch();
  const { isLoading, inventoryRequestData, requestPdfData } = useAppSelector(
    (state) => state.inventoryRequest
  );
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [searchDate, setSearchDate] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [dynamicKey, setDynamicKey] = useState<any>();
  const [showDelete, setShowDelete] = useState(false);
  const [deletedId, setDeletedId] = useState('');

  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };

  const pageIndexOptions = pageIndexArray();

  const data: any = inventoryRequestData ?? [];
  const columns: Column<any>[] = submitRequestPopupHeaderData ?? [];
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

  let payloadData = {
    page: pageIndex,
    pageSize: dataPerPage,
    request_date: searchDate,
    view_self: true,
  };

  let reqData = {
    ...payloadData,
    ...dynamicKey,
  };

  useEffect(() => {
    dispatch(getAllInventoryRequest(requestGenerator(reqData))).then(
      (result) => {
        setTotalPage(result.payload.lastPage);
      }
    );
  }, [pageIndex, dataPerPage]);

  const handleDelete = () => {
    dispatch(
      deleteInventoryRequest(requestGenerator({ request_id: deletedId }))
    ).then((e) => {
      if (e.type === 'inventory/deleteRequest/fulfilled') {
        dispatch(getAllInventoryRequest(requestGenerator(reqData))).then(
          (result) => {
            setTotalPage(result.payload.lastPage);
          }
        );
        setShowDelete(false);
        setDeletedId('');
      }
    });
  };

  const handleEdit = (id: any) => {
    dispatch(getInventoryReqsById(requestGenerator({ request_id: id }))).then(
      (e) => {
        if (e.type === 'inventory/getRequest/fulfilled') {
          setSearchDate('');
          setSearchValue('');
          handleChildClick();
        }
      }
    );
  };

  const handleOpen = (id: any) => {
    dispatch(getInventoryReqsPdf(requestGenerator({ request_id: id }))).then(
      (e) => {
        if (e.type === 'inventory/getRequestPdf/fulfilled') {
          // Create a new PDF document
          const doc = new jsPDF();
          let data = e?.payload?.items;
          // Set the document font size
          doc.setFontSize(12);
          // Loop through the data array and add each question and answer to the PDF document
          data?.forEach((item: any, index: number) => {
            const { item_name, qty_type } = item;
            // Add question to the PDF document
            // doc.text(`${index + 1}`, 10, 20 + index * 30);
            doc.text(`Quantity Type : ${qty_type}`, 10, 20 + index * 30);
            // Add answer to the PDF document
            doc.text(`Item Name: ${item_name}`, 10, 30 + index * 30);
          });
          // Save the PDF document and open it in a new tab
          doc.save('document.pdf');
          window.open(doc.output('bloburl'), '_blank');
        }
      }
    );
  };

  const handleSearch = () => {
    dispatch(
      getAllInventoryRequest(
        requestGenerator({ ...reqData, page: 1, pageSize: 10 })
      )
    ).then((result) => {
      setTotalPage(result.payload.lastPage);
    });
  };

  const searchFilterData: any = [
    {
      lable: 'Source',
      value: 'request_source_type',
    },
    {
      lable: 'Doc. ID',
      value: 'document_id',
    },
    {
      lable: 'Destination',
      value: 'request_destination',
    },
    {
      lable: 'Sub Source',
      value: 'request_source',
    },
  ];

  useEffect(() => {
    if (dynamicKey !== undefined) {
      setDynamicKey({ [searchKey]: searchValue });
    }
  }, [searchValue, searchKey]);

  useEffect(() => {
    if (searchValue === '') {
      if (searchKey === 'document_id') {
        dispatch(
          getAllInventoryRequest(
            requestGenerator({
              ...reqData,
              document_id: '',
              page: 1,
              pageSize: 10,
            })
          )
        ).then((result) => {
          setTotalPage(result.payload.lastPage);
        });
      } else if (searchKey === 'request_source_type') {
        dispatch(
          getAllInventoryRequest(
            requestGenerator({ ...reqData, request_source_type: '' })
          )
        ).then((result) => {
          setTotalPage(result.payload.lastPage);
        });
      } else if (searchKey === 'request_source') {
        dispatch(
          getAllInventoryRequest(
            requestGenerator({ ...reqData, request_source: '' })
          )
        ).then((result) => {
          setTotalPage(result.payload.lastPage);
        });
      } else if (searchKey === 'request_destination') {
        dispatch(
          getAllInventoryRequest(
            requestGenerator({ ...reqData, request_destination: '' })
          )
        ).then((result) => {
          setTotalPage(result.payload.lastPage);
        });
      }
    }
  }, [searchValue]);

  return (
    <>
      {isLoading && <Loader />}
      {showDelete && (
        <Popup
          Children={DeleteMedicationPopup}
          handleClose={() => setShowDelete(false)}
          handleNo={() => setShowDelete(false)}
          handleYes={() => handleDelete()}
        />
      )}
      <div
        className={styles.submitRequestPopupMainContaier}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => handleClose()}
        />
        <div className={styles.uploadContainer}>
          <p className={styles.title}>Submitted Requests</p>
          <Divider customClass={styles.dividerStyle} />

          {/* <div className={styles.searchContainer}>
            <span className={styles.search}>
              <Search
                placeHolder="Search"
                customClassInput={styles.inputSearch}
              />
            </span>
            <div className={styles.searchButton}>
              <SearchIcon fillColor={colors.white1} />
            </div>
            <SmartSearch
              placeHolder={'Smart Search'}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              // isDisable={isSmartSearchDisable}
              customClassInput={styles.inputSearch}
            />
          </div> */}
          <div className={styles.searchContainer}>
            <Select
              className={styles.select}
              placeholder=" Select "
              closeMenuOnSelect={true}
              isSearchable={true}
              options={searchFilterData?.map((item: any) => ({
                label: item?.lable,
                value: item?.value,
              }))}
              onChange={(e: any) => {
                setSearchKey(e.value);
                setDynamicKey({ [e.value]: searchValue });
                setSearchValue('');
              }}
              maxMenuHeight={200}
            />
            <input
              type="text"
              className={styles.inputField}
              // placeholder={`Search by ${searchKey}`}
              placeholder="Search"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                // if (e.target.value === '') {
                //   dispatch(getAllInventoryRequest(requestGenerator(reqData)));
                // }
              }}
            />
            <input
              type="date"
              className={styles.DateinputField}
              value={searchDate}
              onChange={(e) => {
                setSearchDate(e.target.value);
                if (e.target.value === '') {
                  dispatch(
                    getAllInventoryRequest(
                      requestGenerator({ ...reqData, request_date: '' })
                    )
                  );
                }
              }}
            />
            <SearchButton
              handleClick={() => handleSearch()}
              width={40}
              height={40}
            />
          </div>
          <div className={styles.tableContainer}>
            <TableV3
              getTableProps={getTableProps}
              getTableBodyProps={getTableBodyProps}
              headerGroups={headerGroups}
              rows={rows}
              prepareRow={prepareRow}
              handleOpen={handleOpen}
              setModelOpenClose={(id: any) => {
                setShowDelete(!showDelete);
                setDeletedId(id);
              }}
              handleRowClick={handleEdit}
            />
          </div>
          <Pagination
            setDataPerPage={setDataPerPage}
            pageIndexOptions={pageIndexOptions}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
          />
        </div>
      </div>
    </>
  );
};
export default SubmitRequestPopup;
