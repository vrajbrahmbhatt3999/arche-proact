import { FC, useState, useEffect } from "react";
import Button from "../../../../components/common/button/Button";
import {
  SearchIcon,
} from "../../../../components/common//svg-components";
import { colors } from "../../../../constants/color";
import styles from "./addTestPopup.module.scss";
import {
  addProfileTableHeaderData,
  addTestPopupTableHeaderData,
} from "./addTestTableData";
import { trimValue } from "../../../../utils/utils";
import TableV2 from "../../../../components/common/table/tableV2/TableV2";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
  getAllLabTest,
  getAllLabTestProfile,
  getLabCategory,
} from "../../../../redux/features/lab/labAsyncActions";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import Pagination from "../../../../components/common/pagination/Pagination";
import Loader from "../../../../components/common/spinner/Loader";
import { CustomRadio } from "../../../../components/common/custom-radio";
import { setDefaultTest } from "../../../../redux/features/jobs/jobsSlice";
import { CustomModal } from "../../../../components/common/custom-modal/modal";
import ProfileTestModal from "../profile-test-popup/ProfileTestModal";

export const categoryOptions = ["Anatomic Pathology", "Clinical Pathology"];
export const departentOptions = ["Hematology", "Immunology", "Microbiology"];

const ProfileTestNameHeadersData = [
  {
    Header: "TEST ID",
    accessor: "test_no",
  },
  {
    Header: "TEST NAME",
    accessor: "name",
  },
];
interface IAddTestPopupProps {
  handleClose: (e?: React.MouseEvent<HTMLElement>) => void;
}

const AddTestPopup: FC<IAddTestPopupProps> = ({ handleClose }) => {
  const [totalPage, setTotalPage] = useState<number>(0);
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [profileDataPerPage, setProfileDataPerPage] = useState(10);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [profileIndex, setProfileIndex] = useState<number>(1);
  const [searchTest, setSearchTest] = useState("");
  const [profileSearch, setProfileSearch] = useState("");
  const [profileData, setProfileData] = useState<any>([]);
  const [profileModal, setProfileModal] = useState(false);

  const { isLoading, labTestData, testProfileData } = useAppSelector(
    (state) => state.lab
  );

  const { defaultTest } = useAppSelector((state) => state.labsJob);
  const dispatch = useAppDispatch();
  useEffect(() => {
    let requestData = {
      search: defaultTest === "Test" ? searchTest : profileSearch,
      page: defaultTest === "Test" ? pageIndex : profileIndex,
      pageSize: defaultTest === "Test" ? dataPerPage : profileDataPerPage,
      order_by: { name: 1 },
    };
    dispatch(getAllLabTest(requestGenerator(requestData))).then((result) => {
      setTotalPage(
        result.payload.total /
          (defaultTest === "Test" ? dataPerPage : profileDataPerPage)
      );
    });
  }, [
    dispatch,
    pageIndex,
    dataPerPage,
    profileIndex,
    defaultTest,
    profileDataPerPage,
  ]);

  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= Math.ceil(totalPage); i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };
  const pageIndexOptions = pageIndexArray();

  const handleSearch = () => {
    defaultTest === "Test" ? setPageIndex(1) : setProfileIndex(1);
    let requestData = {
      search: defaultTest === "Test" ? searchTest : profileSearch,
      page: defaultTest === "Test" ? pageIndex : profileIndex,
      pageSize: defaultTest === "Test" ? dataPerPage : profileDataPerPage,
      order_by: { name: 1 },
    };
    dispatch(
      (defaultTest === "Test" ? getAllLabTest : getAllLabTestProfile)(
        requestGenerator(requestData)
      )
    ).then((result) => {
      // setTotalPage(result.payload.lastPage);
      setTotalPage(
        result.payload.total /
          (defaultTest === "Test" ? dataPerPage : profileDataPerPage)
      );
    });
  };

  useEffect(() => {
    dispatch(getLabCategory(requestGenerator({})));
  }, [dispatch]);

  useEffect(() => {
    let requestData = {
      search: defaultTest === "Test" ? searchTest : profileSearch,
      page: defaultTest === "Test" ? pageIndex : profileIndex,
      pageSize: defaultTest === "Test" ? dataPerPage : profileDataPerPage,
      order_by: { name: 1 },
    };
    dispatch(getAllLabTestProfile(requestGenerator(requestData))).then(
      (result) =>
        setTotalPage(
          result.payload.total /
            (defaultTest === "Test" ? dataPerPage : profileDataPerPage)
        )
    );
  }, [
    pageIndex,
    dataPerPage,
    profileIndex,
    dispatch,
    defaultTest,
    profileDataPerPage,
  ]);

  const handleOpen = (e: any) => {
    setProfileData([...e]);
    setProfileModal((prev) => !prev);
  };

  return (
    <>
      {isLoading && <Loader />}
      <CustomModal
        title="Profile Test Name"
        showModal={profileModal}
        closeModal={() => setProfileModal(false)}
        width="40%"
        height="350px"
        zIndex="23"
        overlayzIndex="22"
      >
        <ProfileTestModal
          headerData={ProfileTestNameHeadersData}
          popData={profileData}
        />
      </CustomModal>
      <div className={styles.searchContainer}>
        <div className={styles.search}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search"
            value={defaultTest === "Test" ? searchTest : profileSearch}
            onChange={(e) => {
              trimValue(e);
              defaultTest === "Test"
                ? setSearchTest(e.target.value)
                : setProfileSearch(e.target.value);
              if (e.target.value === "") {
                let requestData = {
                  search: "",
                  page: defaultTest === "Test" ? pageIndex : profileIndex,
                  pageSize:
                    defaultTest === "Test" ? dataPerPage : profileDataPerPage,
                  order_by: { name: 1 },
                };
                dispatch(
                  (defaultTest === "Test"
                    ? getAllLabTest
                    : getAllLabTestProfile)(requestGenerator(requestData))
                ).then((result) => {
                  // setTotalPage(result.payload.lastPage);
                  setTotalPage(
                    result.payload.total /
                      (defaultTest === "Test"
                        ? dataPerPage
                        : profileDataPerPage)
                  );
                });
              }
            }}
          />
          <div className={styles.searchButton} onClick={() => handleSearch()}>
            <SearchIcon fillColor={colors.white1} />
          </div>
        </div>
      </div>
      <div className={styles.formFieldContainer}>
        <div className={styles.radioFieldGenderContainer}>
          <CustomRadio
            label="Test"
            name="gender"
            value="Male"
            onChange={() => dispatch(setDefaultTest("Test"))}
            onClick={() => (searchTest?.length > 0 ? setSearchTest("") : "")}
            checked={defaultTest === "Test"}
            customLabel={styles.customRadioLabel}
          />
          <CustomRadio
            label="Profile"
            name="gender"
            value="Female"
            onChange={() => dispatch(setDefaultTest("Profile"))}
            onClick={() =>
              profileSearch?.length > 0 ? setProfileSearch("") : null
            }
            checked={defaultTest === "Profile"}
            customLabel={styles.customRadioLabel}
          />
        </div>
      </div>
      {defaultTest === "Test" ? (
        <div className={styles.tableContainer}>
          <TableV2
            tableHeaderData={addTestPopupTableHeaderData}
            tableRowData={labTestData}
            // setModelOpenClose={handleOpen}
            active={false}
          />
          {/* {!!labTestData?.length && ( */}
          {labTestData?.length < 9 &&
          labTestData?.lastPage === 1 &&
          labTestData?.nextPage === 0 &&
          labTestData?.previousPage === 0 ? (
            " "
          ) : (
            <Pagination
              setDataPerPage={setDataPerPage}
              pageIndexOptions={pageIndexOptions}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
            />
          )}
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <TableV2
            tableHeaderData={addProfileTableHeaderData}
            tableRowData={testProfileData}
            setModelOpenClose={(item: any) => handleOpen(item)}
            active={false}
            // handleClick={(e: any) => getViewData(e)}
          />
          {/* {!!labTestData?.length && ( */}
          {testProfileData?.length < 9 &&
          testProfileData?.lastPage === 1 &&
          testProfileData?.nextPage === 0 &&
          testProfileData?.previousPage === 0 ? (
            " "
          ) : (
            <Pagination
              setDataPerPage={setProfileDataPerPage}
              pageIndexOptions={pageIndexOptions}
              pageIndex={profileIndex}
              setPageIndex={setProfileIndex}
            />
          )}
        </div>
      )}

      <div className={styles.addButtonContainer}>
        <Button
          title="Add"
          customClass={styles.addButton}
          handleClick={() => handleClose()}
          type="button"
        />
      </div>
    </>
  );
};
export default AddTestPopup;
