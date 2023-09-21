import { FC, useState, useEffect } from "react";
import Button from "../../../../components/common/button/Button";
import {
  CloseIcon,
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
import { requestGenerator } from "../../../../utils/payloadGenerator";
import Pagination from "../../../../components/common/pagination/Pagination";
import Loader from "../../../../components/common/spinner/Loader";
import { CustomRadio } from "../../../../components/common/custom-radio";
import { getAllRadiologyCategory, getAllRadiologyTest, getAllRadiologyTestProfile } from "../../../../redux/features/radiology/radiologyAsyncActions";
import { setDefaultTest } from "../../../../redux/features/radiology-jobs/jobsSlice";

export const categoryOptions = ["Anatomic Pathology", "Clinical Pathology"];
export const departentOptions = ["Hematology", "Immunology", "Microbiology"];
interface IAddTestPopupProps {
  handleClose: (e?: React.MouseEvent<HTMLElement>) => void;
  isEditing?: boolean;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpen: any;
}

const AddTestPopup: FC<IAddTestPopupProps> = ({
  handleClose,
  setIsEditing,
  handleOpen,
}) => {
  const [totalPage, setTotalPage] = useState<number>(0);
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [profileDataPerPage, setProfileDataPerPage] = useState(10);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [profileIndex, setProfileIndex] = useState<number>(1);
  const [searchTest, setSearchTest] = useState("");
  const [profileSearch, setProfileSearch] = useState("");

  const { isLoading, radiologyTestData, radiologyTestProfileData } = useAppSelector(
    (state) => state.radiology
  );

  const { defaultTest } = useAppSelector((state) => state.radiologyJobs);
  const dispatch = useAppDispatch();
  useEffect(() => {
    let requestData = {
      search: defaultTest === "Test" ? searchTest : profileSearch,
      page: defaultTest === "Test" ? pageIndex : profileIndex,
      pageSize: defaultTest === "Test" ? dataPerPage : profileDataPerPage,
      order_by: { name: 1 },
    };
    dispatch(getAllRadiologyTest(requestGenerator(requestData))).then((result) => {
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
      (defaultTest === "Test" ? getAllRadiologyTest : getAllRadiologyTestProfile)(
        requestGenerator(requestData)
      )
    ).then((result) => {
      setTotalPage(
        result.payload.total /
          (defaultTest === "Test" ? dataPerPage : profileDataPerPage)
      );
    });
  };

  useEffect(() => {
    dispatch(getAllRadiologyCategory(requestGenerator({})));
  }, [dispatch]);

  useEffect(() => {
    let requestData = {
      search: defaultTest === "Test" ? searchTest : profileSearch,
      page: defaultTest === "Test" ? pageIndex : profileIndex,
      pageSize: defaultTest === "Test" ? dataPerPage : profileDataPerPage,
      order_by: { name: 1 },
    };
    dispatch(getAllRadiologyTestProfile(requestGenerator(requestData))).then(
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

  return (
    <>
      {isLoading && <Loader />}
      <div
        className={styles.addTestPopupContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => {
            handleClose();
            setIsEditing && setIsEditing(false);
          }}
        />
        <div className={styles.addTestContainer}>
          <div className={styles.titleContainer}>
            <h2 className={styles.addTestHeading}>Add Test</h2>
            <span className={styles.textUnderline} />
          </div>
          <div className={styles.addTestDropDownContainer}></div>
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
                        defaultTest === "Test"
                          ? dataPerPage
                          : profileDataPerPage,
                      order_by: { name: 1 },
                    };
                    dispatch(
                      (defaultTest === "Test"
                        ? getAllRadiologyTest
                        : getAllRadiologyTestProfile)(requestGenerator(requestData))
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
              <div
                className={styles.searchButton}
                onClick={() => handleSearch()}
              >
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
                onClick={() =>
                  searchTest?.length > 0 ? setSearchTest("") : ""
                }
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
                tableRowData={radiologyTestData}
                setModelOpenClose={handleOpen}
                active={false}
              />
              {/* {!!labTestData?.length && ( */}
              {radiologyTestData?.length < 9 &&
              radiologyTestData?.lastPage === 1 &&
              radiologyTestData?.nextPage === 0 &&
              radiologyTestData?.previousPage === 0 ? (
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
                tableRowData={radiologyTestProfileData}
                setModelOpenClose={handleOpen}
                active={false}
                // handleClick={(e: any) => getViewData(e)}
              />
              {radiologyTestProfileData?.length < 9 &&
              radiologyTestProfileData?.lastPage === 1 &&
              radiologyTestProfileData?.nextPage === 0 &&
              radiologyTestProfileData?.previousPage === 0 ? (
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
              handleClick={handleClose}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default AddTestPopup;
