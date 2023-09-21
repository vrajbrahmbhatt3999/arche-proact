import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Pagination from "../../../../components/common/pagination/Pagination";
import Popup from "../../../../components/common/popup/Popup";
import Loader from "../../../../components/common/spinner/Loader";
import { SearchButton } from "../../../../components/common/svg-components";
import Table from "../../../../components/common/table/Table";
import { medicalCenterBedTableHeader } from "../../../../constants/data";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import styles from "./bedList.module.scss";
import { clearBranchInfo } from "../../../../redux/features/branch/branchSlice";
import { trimValue } from "../../../../utils/utils";
import Button from "../../../../components/common/button/Button";
import StatusConfirmationPopupV2 from "../../../../components/common/modal/status-confirmation-popup/status-confirmation-popupV2/StatusConfirmationPopupV2";
import { UPDATE_BED_STATUS } from "../../../../constants/asyncActionsType";
import { CustomModal } from "../../../../components/common/custom-modal/modal";
import { getAllbed, updateBedStatus } from "../../../../redux/features/bed/bedAsyncActions";

const BedList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isLoading, bedData } = useAppSelector((state) => state.bed);
  console.log(bedData, 'roomData')
  const [toggleValue, setToggleValue] = useState();
  const [toggleData, setToggleData] = useState<any>({});
  const [confirm, setConfirm] = useState<boolean>(false);
  const [searchBranch, setSearchBranch] = useState<string>("");
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [totalData, setTotalData] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [notesData, setNotesData] = useState<any>({});
  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };

  const pageIndexOptions = pageIndexArray();

  useEffect(() => {
    let data = {
      search: searchBranch,
      page: pageIndex,
      pageSize: dataPerPage,
      order_by: { is_default: -1 },
    };
    dispatch(getAllbed(requestGenerator(data))).then((result) => {
      setTotalPage(result.payload.lastPage);
      setTotalData(result.payload.total);
    });
  }, [dataPerPage, dispatch, pageIndex]);

  let data = {
    search: searchBranch,
    page: pageIndex,
    pageSize: dataPerPage,
    order_by: { is_default: -1 },
  };

  const handleSearch = () => {
    setPageIndex(1);

    dispatch(getAllbed(requestGenerator(data))).then((result) => {
      setTotalPage(result.payload.lastPage);
      setTotalData(result.payload.total);
    });
  };

  const handleEdit = (item: any) => {
    navigate("managebed", {
      state: { id: item?._id },
    });
  };

  const handleActiveBranch = (item: any) => {
    setConfirm(!confirm);
    setToggleData(item);
    setToggleValue(item?._id);
  };

  useEffect(() => {
    if (confirm === false) {
      setSearchBranch("");
      setDataPerPage(10);
      setPageIndex(1);
    }
  }, [confirm]);

  const handleStatus = () => {
    const statusPayload = {
      id: toggleData?._id,
      data: {
        is_active: !toggleData?.is_active,
      },
    };
    dispatch(updateBedStatus(requestGenerator(statusPayload))).then((e) => {
      if ((e.type = `${UPDATE_BED_STATUS}/fulfilled`)) {
        dispatch(getAllbed(requestGenerator(data)));
        setConfirm(false);
      }
    });
  };

  const openNotes = (data: any) => {
    setNotesData(data);
    setShowNotes(true);
  };

  return (
    <>
      {isLoading && <Loader />}
      {confirm && (
        <Popup
          Children={StatusConfirmationPopupV2}
          handleClose={() => {
            setConfirm(false);
            setSearchBranch("");
          }}
          handleSubmit={() => handleStatus()}
          message="Are you sure you want to change the selected bed status?"
        />
      )}
      <CustomModal
        showModal={showNotes}
        closeModal={() => setShowNotes(false)}
        title="Notes"
        width="40%"
        height="250px"
      >
        <p style={{ marginBlock: "30px", textAlign: "center" }}>
          {notesData?.notes}
        </p>
      </CustomModal>

      <div className={styles.branchListContainer}>
        <div className={styles.searchFilter}>
          <div className={styles.searchContainer}>
            <div className={styles.inputFieldContainer}>
              <input
                type="text"
                className={styles.inputSearchContainer}
                placeholder="Search by bed name"
                onChange={(e) => {
                  trimValue(e);
                  setSearchBranch(e.target.value);
                  if (e.target.value === "") {
                    let data = {
                      search: "",
                      page: pageIndex,
                      pageSize: dataPerPage,
                      order_by: { is_default: -1 },
                    };
                    dispatch(getAllbed(requestGenerator(data))).then(
                      (result) => {
                        setTotalPage(result.payload.lastPage);
                        setTotalData(result.payload.total);
                      }
                    );
                  }
                }}
                value={searchBranch}
              />
              <SearchButton
                handleClick={() => handleSearch()}
                customClass={styles.inputSearchButton}
              />
            </div>
          </div>
          <Button
            title="Add Bed"
            handleClick={() => {
              navigate("managebed");
              dispatch(clearBranchInfo());
            }}
          />
        </div>
        <Table
          tableHeaderData={medicalCenterBedTableHeader}
          tableRowData={bedData}
          handleAction={handleEdit}
          handleActiveMC={handleActiveBranch}
          toogleValue={toggleValue}
          handleNotes={(item: any) =>
           openNotes(item)
          }
        />
        {totalData > 10 && (
          <Pagination
            setDataPerPage={setDataPerPage}
            pageIndexOptions={pageIndexOptions}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
          />
        )}
      </div>
    </>
  );
};

export default BedList;
