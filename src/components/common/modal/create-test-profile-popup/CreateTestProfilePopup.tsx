import { FC, useState, useEffect } from "react";
import styles from "./createTestProfilePopup.module.scss";
import { CloseIcon, SearchButton } from "../../svg-components";
import { colors } from "../../../../constants/color";
import Divider from "../../divider/Divider";
import { handleKeyDown, trimValue } from "../../../../utils/utils";
import TableV2 from "../../table/tableV2/TableV2";
import {
  createTestProfileHeaderData,
} from "../../../../constants/table-data/createTestProfilePopupData";
import Button from "../../button/Button";
import { useForm } from "react-hook-form";
import { Cols, ICreateTestProfile } from "../../../../interfaces/interfaces";
import { createTestProfileValidators } from "../../../../form-validators/createTestProfileValidators";
import {
  PACKAGE_AMOUNT,
  TEST_PROFILE_NAME,
  TOTAL_AMOUNT,
} from "../../../../constants/constant";
import { failure, success } from "../../../../constants/data";
import { setMessage } from "../../../../redux/features/toast/toastSlice";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
  createLabTestProfile,
  editLabTestProfile,
  getAllLabTest,
  getAllLabTestProfile,
} from "../../../../redux/features/lab/labAsyncActions";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import Pagination from "../../pagination/Pagination";
import { clearProfileData, updateTestData, updateprofileData } from "../../../../redux/features/lab/labSlice";
import TableV3 from "../../table/tableV3/TableV3";
import { Column, TableOptions, useGlobalFilter, useSortBy, useTable } from "react-table";

interface IViewTestProfile {
  handleClose?: any;
  setModelOpenClose?: any;
  handleOpen?: any;
  handleRowClick?: any;
  headerData?: any
  handleChildClick?: any
}

const CreateTestProfilePopup: FC<IViewTestProfile> = ({
  handleClose,
  setModelOpenClose,
  handleOpen,
  handleRowClick,
  headerData,
  handleChildClick,
}) => {
  const dispatch = useAppDispatch();
  const { isLoading, labTestData, profileData, updatedProfileData, newTestData } = useAppSelector((state) => state.lab);
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [searchTest, setSearchTest] = useState("");
  const [arrData, setArrData] = useState<any>([])
  const [priceArr, setPriceArr] = useState<any>([])
  const [arrInfo, setArrInfo] = useState<any>([])


  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };
  const pageIndexOptions = pageIndexArray();

  useEffect(() => {
    const newState = newTestData;

    if (newState.flag) {
      setArrData((prevTableData: any) => [...prevTableData, newTestData.id])
      setPriceArr((prevTableData: any) => [...prevTableData, newTestData.price])
      setArrInfo((prevTableData: any) => [...prevTableData, newTestData.testInfo])
    } else {
      var oldData = arrData?.filter((item: any) => item !== newTestData.id);
      var oldPrice = priceArr?.filter((item: any) => item !== newTestData.price);
      var oldInfo = arrInfo.filter((item: any) => item?._id !== newTestData.testInfo?._id);
      setArrData(oldData)
      setPriceArr(oldPrice)
      setArrInfo(oldInfo)
    }
  }, [newTestData])



  useEffect(() => {
    if (profileData?._id === undefined) {
      let requestData = {
        search: searchTest,
        page: pageIndex,
        pageSize: dataPerPage,
        order_by: { name: 1 },
      };
      dispatch(getAllLabTest(requestGenerator(requestData))).then((result) => {
        setTotalPage(result.payload.lastPage);
        const updatedArray = result.payload?.data?.map((object: any) => {
          if (arrData.includes(object._id)) {
            return {
              ...object,
              is_active: false
            };
          }
          return object;
        });
        dispatch(updateTestData(updatedArray))
      });
    }
  }, [pageIndex, dataPerPage]);

  useEffect(() => {
    if (searchTest === "" && pageIndex === 1 && dataPerPage === 10) {
      setArrData([])
      setPriceArr([])
    }
  }, [])


  useEffect(() => {
    dispatch(updateprofileData(profileData?._id))
  }, [])


  const data: Cols[] = updatedProfileData
  const columns: Column<Cols>[] = createTestProfileHeaderData;
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


  const values = profileData;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ICreateTestProfile>({
    defaultValues: {
      name: profileData?.name,
      package_amount: profileData?.package_amount,
      total_amount: profileData?.total_amount
    }, values,
  });


  let arrayData = [] as any;
  labTestData?.map((item: any) => {
    if (item?.is_active === false) {
      arrayData.push(item);
    }
  });


  labTestData?.map((item: any) => {
    if (item?.is_active === false) {
      arrayData.push(item);
    }
  });

  let totalSellPrice = 0;

  // priceArr.forEach((item: any) => {
  //   totalSellPrice += item;
  // });

  arrInfo?.forEach((item: any) => {
    totalSellPrice += item?.sell_price;
  });

  let arrayDataNew = [] as any;
  updatedProfileData?.map((item: any) => {
    if (item?.is_active === false) {
      arrayDataNew.push(item);
    }
  });


  let newPrice = 0;

  arrayDataNew.forEach((item: any) => {
    newPrice += item.sell_price;
  })


  let newSellPrice = 0;

  profileData?.labtest_ids?.forEach((item: any) => {
    newSellPrice += item.sell_price;
  });



  let labtest_ids = arrayData.map((item: any) => {
    return item._id;
  });

  let updated_labtest_ids = arrayDataNew.map((item: any) => {
    return item._id;
  });


  const onSubmit = async (data: ICreateTestProfile) => {
    data.labtest_ids = arrData;
    console.log("first", data);
    if (profileData?._id !== undefined) {
      data.labtest_ids = updated_labtest_ids;
      data.total_amount = newPrice
      data.total_amount = Number(data.total_amount)
      data.package_amount = Number(data.package_amount)
      let reqData = {
        id: profileData?._id,
        data: data,
      };
      if (updated_labtest_ids?.length === 0) {
        let toastData = {
          message: "Please select at least one test",
          type: success,
        };
        dispatch(setMessage(toastData));
      }
      else {
        if (data.total_amount >= data.package_amount) {
          dispatch(editLabTestProfile(requestGenerator(reqData))).then((e) => {
            if (e.type === "lab/editLabTestProfile/fulfilled") {
              console.log("e", e);
              // setTimeout(() => {
              setModelOpenClose(false);
              // }, 200);
              dispatch(clearProfileData())
              dispatch(getAllLabTestProfile(requestGenerator({})));
            }
          })
        }
        else {
          let toastData = {
            message: "Package amount should be less than or equal to total amount",
            type: failure,
          };
          dispatch(setMessage(toastData));
        }
      }
    } else {
      console.log("data.labtest_ids", data.labtest_ids)
      if (data.labtest_ids?.length === 0) {
        let toastData = {
          message: "Please select at least one test",
          type: success,
        };
        dispatch(setMessage(toastData));
      } else {
        console.log("first");
        data.total_amount = totalSellPrice
        if (data.total_amount >= data.package_amount) {
          dispatch(createLabTestProfile(requestGenerator(data))).then((e) => {
            if (e.type === "lab/createLabTestProfile/fulfilled") {
              console.log("e", e);
              // setTimeout(() => {
              setModelOpenClose(false);
              // }, 200);

            }
          });
        }
        else {
          let toastData = {
            message: "Package amount should be less than or equal to total amount",
            type: failure,
          };
          dispatch(setMessage(toastData));
        }
      }
    }
  };

  const handleSearch = () => {
    let requestData = {
      search: searchTest,
      page: 1,
      pageSize: 10,
      order_by: { name: 1 },
    };
    setPageIndex(1)
    dispatch(getAllLabTest(requestGenerator(requestData))).then((result) => {
      setTotalPage(result.payload.lastPage);
      const updatedArray = result.payload?.data?.map((object: any) => {
        if (arrData.includes(object._id)) {
          return {
            ...object,
            is_active: false
          };
        }
        return object;
      });
      dispatch(updateTestData(updatedArray))
    });
  };


  useEffect(() => {
    return () => {
      setValue(PACKAGE_AMOUNT, "")
    }
  }, [newPrice, totalSellPrice])


  return (
    <>
      {/* {isLoading && <Loader />} */}
      <div
        className={styles.notesPopupContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => handleClose()}
        />
        <div className={styles.notesContainer}>
          <p className={styles.title}>
            {profileData?._id === undefined ? "Create" : "Edit"} Test Profile
          </p>
          <Divider customClass={styles.dividerStyle} />
          <div className={styles.inputFieldContainer}>
            {profileData?._id === undefined ?
              <input
                type="text"
                className={styles.inputSearchContainer}
                placeholder="Search by test name"
                value={searchTest}
                onChange={(e) => {
                  trimValue(e);
                  setSearchTest(e.target.value);
                  if (e.target.value === "") {
                    let requestData = {
                      search: "",
                      page: pageIndex,
                      pageSize: dataPerPage,
                      order_by: { name: 1 },
                    };
                    dispatch(getAllLabTest(requestGenerator(requestData))).then(
                      (result) => {
                        setTotalPage(result.payload.lastPage);
                        const updatedArray = result.payload?.data?.map((object: any) => {
                          if (arrData.includes(object._id)) {
                            return {
                              ...object,
                              is_active: false
                            };
                          }
                          return object;
                        });
                        dispatch(updateTestData(updatedArray))
                      }
                    );
                  }
                }}
              /> :
              <>
                <input
                  type="text"
                  className={styles.inputSearchContainer}
                  placeholder="Search by test name"
                  onChange={(e) => {
                    trimValue(e);
                    setGlobalFilter(e.target.value);
                  }}
                  style={{ border: "1px solid grey" }}
                  value={globalFilter}
                />
                <Button title="Add Test" customClass={styles.addTestBtn} handleClick={handleChildClick} />
              </>
            }
            {profileData?._id === undefined &&
              <SearchButton
                handleClick={() => handleSearch()}
                customClass={styles.inputSearchButton}
              />}
          </div>
          <div className={styles.mainContainer}>
            <div className={styles.tableContainer}>
              {
                profileData?._id === undefined ?
                  <TableV2
                    tableHeaderData={createTestProfileHeaderData}
                    tableRowData={labTestData}
                    active={false}
                  />
                  :
                  <TableV3
                    getTableProps={getTableProps}
                    getTableBodyProps={getTableBodyProps}
                    headerGroups={headerGroups}
                    rows={rows}
                    prepareRow={prepareRow}
                    handleOpen={handleOpen}
                    handleRowClick={handleRowClick}
                  />}
            </div>
            {profileData?._id === undefined && labTestData?.length !== 0 &&
              <Pagination
                setDataPerPage={setDataPerPage}
                pageIndexOptions={pageIndexOptions}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
              />}
            <Divider customClass={styles.greyDivider} />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.fieldContainer}>
                <div className={styles.labelField}>
                  <label className={styles.labelText}>Total Amount</label>
                  <input
                    type="text"
                    className={styles.inputStyleDisable}
                    value={
                      profileData?._id === undefined
                        ? totalSellPrice
                        : newPrice
                    }
                    {...register(TOTAL_AMOUNT)}
                    disabled={true}
                  />
                </div>
                <div className={styles.labelField}>
                  <label className={styles.labelText}>Package Amount<span className="asterick">*</span></label>
                  <div>
                    <input
                      type="text"
                      className={styles.inputStyle}
                      {...register(
                        PACKAGE_AMOUNT,
                        createTestProfileValidators[PACKAGE_AMOUNT]
                      )}
                      onChange={(e) => { trimValue(e) }}
                      onKeyDown={handleKeyDown}
                    />
                    {errors[PACKAGE_AMOUNT] && (
                      <p className="errorText" style={{ marginLeft: "10px" }}>
                        {errors[PACKAGE_AMOUNT].message as any}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.labelField}>
                <label className={styles.labelText}>Test Profile Name<span className="asterick">*</span></label>
                <div>
                  <input
                    type="text"
                    className={styles.inputStyle}
                    {...register(
                      TEST_PROFILE_NAME,
                      createTestProfileValidators[TEST_PROFILE_NAME]
                    )}
                    onChange={(e) => trimValue(e)}
                  />
                  {errors[TEST_PROFILE_NAME] && (
                    <p className="errorText" style={{ marginLeft: "10px" }}>
                      {errors[TEST_PROFILE_NAME].message}
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.btnStyle}>
                <Button title="Save" type="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTestProfilePopup;
