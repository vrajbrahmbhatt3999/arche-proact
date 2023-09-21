import { FC, useState, useEffect } from "react";
import styles from "./InsuranceModal.module.scss";
import { CloseIcon, SearchButton } from "../../svg-components";
import { colors } from "../../../../constants/color";
import Divider from "../../divider/Divider";

import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import Pagination from "../../pagination/Pagination";
import Loader from "../../spinner/Loader";
import TableV3 from "../../table/tableV3/TableV3";
import {
  Column,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from "react-table";
import { Cols } from "../../../../interfaces/interfaces";
import {
  addInsuranceHeaderData,
} from "../../../../constants/table-data/labInvoiceTabledata";
import { trimValue } from "../../../../utils/utils";
import Button from "../../button/Button";
import Popup from "../../popup/Popup";
import ApprovalNummodal from "../approval-no-modal/ApprovalNummodal";
import { getAllPatientInsurance } from "../../../../redux/features/lab-invoice/labInvoiceAsyncActions";
import { patientInsurance } from "../../../../redux/features/lab-invoice/labInvoiceSlice";
import DescriptionModal from "../description-modal/DescriptionModal";

interface IAddInsuranceModal {
  setModelOpenClose?: any;
  handleRowClick?: any;
  handleClose?: any;
  popData?: any;
}
const InsuranceModal: FC<IAddInsuranceModal> = ({
  setModelOpenClose,
  handleRowClick,
  handleClose,
  popData
}) => {

  const { patientListData, patientListDataObject } = useAppSelector(
    (state) => state.patient
  );
  const { isLoading, PatientInsuranceList, insurancePlanIds } = useAppSelector(
    (state) => state.labInvoice
  );

  const dispatch = useAppDispatch();

  // React Table define
  const data: Cols[] = PatientInsuranceList;
  const columns: Column<Cols>[] = addInsuranceHeaderData;
  const options: TableOptions<Cols> = {
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
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);

  // function for creating Page Index Array
  const pageIndexArray = () => {

    let pageIndexOptions = [];
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;

  };

  const pageIndexOptions = pageIndexArray();

  const [searchValue, setSearchValue] = useState<string>("");
  const [activateSmartSearch, setActivateSmartSearch] =
    useState<boolean>(false);
  const [approvalNumModal, setapprovalNumModal] = useState(false);
  const [insuranceData, setinsuranceData] = useState("");
  const [active, setactive] = useState(false);
  const [viewDiscription, setviewDiscription] = useState<boolean>(false);
  const [insuranceDetails, setinsuranceDetails] = useState<any>("");


  const handleInputSearch = () => {
    setActivateSmartSearch(true);
    const requestData = {
      search: searchValue,
      page: pageIndex,
      pageSize: dataPerPage,
    };
    dispatch(getAllPatientInsurance(requestGenerator(requestData))).then((result) =>
      setTotalPage(result.payload.lastPage)
    );
  };

  // ...........................................................

  useEffect(() => {

    if (searchValue === "") {
      setActivateSmartSearch(false);
      setGlobalFilter("");
      const requestData = {
        patient_id: popData,
        plan_ids: insurancePlanIds,
        search: searchValue,
        page: pageIndex,
        pageSize: dataPerPage
      };
      dispatch(getAllPatientInsurance(requestGenerator(requestData))).then((result: any) =>
        setTotalPage(result.payload.lastPage)
      );
    }

  }, [searchValue, dataPerPage, pageIndex]);

  const handleApprovalNumModalClose = () => {
    if (active) {
      dispatch(patientInsurance(insuranceData))
      setapprovalNumModal(!approvalNumModal)
    }
  }

  const handleRow = (item: any) => {
    setactive(item._id)
    setinsuranceData(item)
  }

  const handleInsurance = (item: any) => {
    setviewDiscription(!viewDiscription)
    setinsuranceDetails(item?.details)
  }

  const discriptionModalClose = () => {
    setviewDiscription(!viewDiscription)
  }

  return (
    <>
      {isLoading && <Loader />}

      {
        viewDiscription &&
        <Popup
          Children={DescriptionModal}
          heading="Discription"
          message={insuranceDetails}
          handleClose={discriptionModalClose}
        />
      }

      {
        approvalNumModal && (
          <Popup
            Children={ApprovalNummodal}
            popData={insuranceData}
            handleClose={() => handleApprovalNumModalClose()}
            setModelOpenClose={setapprovalNumModal}
            handleChildClick={handleClose}
          />
        )}


      <div
        className={styles.mainContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.closeIconContainer}>
          <CloseIcon
            customClass={styles.closeIconStyle}
            fillColor={colors.green1}
            handleClick={() => handleClose()}
          />
        </div>

        <p className={styles.title}>Add Insurance</p>
        <Divider customClass={styles.dividerStyle} />
        <div className={styles.searchFieldContainer}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "25px",
            }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <input
                type="text"
                className={styles.inputSearchContainer}
                placeholder="Search"
                onChange={(e) => {
                  trimValue(e);
                  setSearchValue(e.target.value);
                  setGlobalFilter("");
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

            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                marginLeft: "18px",
              }}
            >
              <input
                type="text"
                className={
                  !activateSmartSearch
                    ? styles.inputSmartSearchContainer
                    : styles.inputSearchContainer
                }
                placeholder="Smart Search"
                disabled={!activateSmartSearch}
                onChange={(e) => {
                  trimValue(e);
                  setGlobalFilter(e.target.value);
                }}
                value={searchValue === "" ? searchValue : globalFilter}
              />
            </div>
          </div>

          <Divider customClass={styles.dividerStyling} />
          <div className={styles.tableContainer}>
            <TableV3
              handleRowClick={(item: any) =>
                handleRowClick ? handleRowClick(item) : handleInsurance(item)
              }
              getTableProps={getTableProps}
              getTableBodyProps={getTableBodyProps}
              headerGroups={headerGroups}
              rows={rows}
              prepareRow={prepareRow}
              setModelOpenClose={setModelOpenClose}
              active={active}
              handleRow={handleRow}
            />
          </div>

          {patientListData?.length < 9 &&
            patientListDataObject?.lastPage === 1 &&
            patientListDataObject?.nextPage === 0 &&
            patientListDataObject?.previousPage === 0 ? (
            " "
          ) : (
            <Pagination
              setDataPerPage={setDataPerPage}
              pageIndexOptions={pageIndexOptions}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
            />
          )}

          <div className={styles.submitButtonContainer}>
            <Button
              title="Submit"
              type="submit"
              handleClick={handleApprovalNumModalClose}
              customClass={styles.addInsuranceBtn}
            />
          </div>

        </div>

      </div>
    </>
  );
};

export default InsuranceModal;
