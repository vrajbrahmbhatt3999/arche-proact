import { FC, useState, useEffect } from "react";
import { useLocation } from "react-router";
import styles from "./manageInventoryUnitType.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { IMaterUnitTypeValues } from "../../../interfaces/interfaces";
import { masterUnitTypeValidators } from "../../../form-validators/masterUnitTypeValidators";
import {
  MASTER_UNIT_TYPE_NAME,
  MASTER_UNIT_TYPE_QTY,
  MASTER_UNIT_TYPE_VALUE,
} from "../../../constants/constant";
import {
  disableArrowKey,
  disableScroll,
  trimValue,
} from "../../../utils/utils";
import TableV2 from "../../../components/common/table/tableV2/TableV2";
import Pagination from "../../../components/common/pagination/Pagination";
import Button from "../../../components/common/button/Button";
import {
  addAllMasterValue,
  getAllMasterValue,
  updatMasterValue,
  updateStatusValue,
} from "../../../redux/features/master-value/MasterValueAsyncActions";
import { requestGenerator } from "../../../utils/payloadGenerator";
import { masterUnitTypeData } from "../../../constants/data";
import { clearState } from "../../../redux/features/master-value/MasterValueSlice";
import Loader from "../../../components/common/spinner/Loader";

interface IManageInventoryUnitType {}

const ManageInventoryUnitType: FC = () => {
  // use state
  const [toggleData, setToggleData] = useState({});
  const [confirm, setConfirm] = useState<boolean>(false);
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [searchValue, setSearchValue] = useState("");
  const [unitTypeQty, setUnitTypeQty] = useState<any>(1);

  // use location
  const location = useLocation();

  // use dispatch
  const dispatch = useAppDispatch();

  // use selector
  const { isLoading, getAllMasterValueData, getAllMasterValueDataReducer } =
    useAppSelector((state) => state.masterValue);

  // handle reset
  const handleReset = (resetLabel?: boolean) => {
    setValue(MASTER_UNIT_TYPE_VALUE, "");
    resetLabel && setValue(MASTER_UNIT_TYPE_NAME, "");
    setValue(MASTER_UNIT_TYPE_QTY, "");
    dispatch(clearState());
  };
  // use effect
  useEffect(() => {
    const alldata = {
      category_id: location?.state?.id?._id,
      page: pageIndex,
      pageSize: dataPerPage,
      search: searchValue,
    };
    dispatch(getAllMasterValue(requestGenerator(alldata))).then((result) =>
      setTotalPage(result?.payload?.lastPage)
    );
    handleReset(false);
  }, [dispatch, dataPerPage, pageIndex]);

  const handleValuePaste = (e: any) => {
    e.preventDefault();
  };

  // use form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IMaterUnitTypeValues>({});

  const onSubmit: SubmitHandler<IMaterUnitTypeValues> = (data) => {
    if (getAllMasterValueDataReducer._id) {
      const masterInit = {
        id: getAllMasterValueDataReducer?._id,
        data: {
          category_id: getAllMasterValueDataReducer?.category_id?._id,
          value: data.value,
          metadata: {
            qty: unitTypeQty,
          },
        },
      };
      dispatch(updatMasterValue(requestGenerator(masterInit))).then((e) => {
        if (e.type === "masterValueSlice/updatMasterValue/fulfilled") {
          //   setUnitTypeQty(1);
          const alldata = {
            category_id: location?.state?.id?._id,
            page: pageIndex,
            pageSize: dataPerPage,
            search: searchValue,
          };
          dispatch(getAllMasterValue(requestGenerator(alldata))).then(
            (result) => setTotalPage(result.payload.lastPage)
          );
          handleReset();
        } else {
        }
      });
    } else {
      const masterInit = {
        category_id: location.state.id._id,
        value: data.value,
        metadata: {
          qty: unitTypeQty,
        },
      };
      dispatch(addAllMasterValue(requestGenerator(masterInit))).then((e) => {
        if (e.type === "masterValueSlice/addAllMasterValue/fulfilled") {
          //   setUnitTypeQty(1);
          const alldata = {
            category_id: location?.state?.id?._id,
            page: pageIndex,
            pageSize: dataPerPage,
            search: searchValue,
          };
          dispatch(getAllMasterValue(requestGenerator(alldata))).then(
            (result) => setTotalPage(result.payload.lastPage)
          );

          handleReset();
        } else {
        }
      });
    }
  };

  //   console.log("category", location);

  //set the category_name
  useEffect(() => {
    if (location?.state?.id?.category_name) {
      setValue(MASTER_UNIT_TYPE_NAME, location?.state?.id?.category_name);
    }
  }, [location?.state?.id?.category_name]);

  // toggle modal
  const handleDataClick = (item: any) => {
    const toggleData = {
      id: item?._id,
      data: {
        is_active: !item.is_active,
      },
    };
    dispatch(updateStatusValue(requestGenerator(toggleData))).then((e) => {
      if (e.type === "masterValueSlice/updateStatusValue/fulfilled") {
        const alldata = {
          category_id: location?.state?.id?._id,
          page: pageIndex,
          pageSize: dataPerPage,
          search: searchValue,
        };
        dispatch(getAllMasterValue(requestGenerator(alldata))).then((result) =>
          setTotalPage(result.payload.lastPage)
        );
        handleReset(false);
      } else {
      }
    });
  };

  // update value when click on edit button
  useEffect(() => {
    setValue(MASTER_UNIT_TYPE_VALUE, getAllMasterValueDataReducer?.value);
    setValue(MASTER_UNIT_TYPE_QTY, getAllMasterValueDataReducer?.metadata?.qty);
  }, [getAllMasterValueDataReducer]);

  // function for creating Page Index Array
  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };
  const pageIndexOptions = pageIndexArray();

  // function to disable the onWheel event
  useEffect(() => {
    disableScroll();
  }, []);
  // clear state while we can move on another page
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {/* {confirm && (
        <Popup
          popData={toggleData}
          Children={ManageAssignTagModal}
          handleClose={() => setConfirm(false)}
        />
      )} */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.mainContainer}>
          <div className={styles.appointmentStatusInputMain}>
            <div className={styles.appointmanetInput}>
              <label htmlFor="" className={styles.appointmentLable}>
                Category <span className="asterick">*</span>
              </label>
              <input
                type="text"
                className={styles.inputSearchContainer}
                {...register(
                  MASTER_UNIT_TYPE_NAME,
                  masterUnitTypeValidators[MASTER_UNIT_TYPE_NAME]
                )}
                placeholder="Enter Category"
                disabled
                onChange={(e) => trimValue(e)}
              />
              <div className={styles.errorContainer}>
                <span className={styles.extraSpan}></span>
                {errors[MASTER_UNIT_TYPE_NAME] && (
                  <p className="dashboardFormError">
                    {errors[MASTER_UNIT_TYPE_NAME].message as any}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.appointmanetInput}>
              <label
                htmlFor=""
                className={styles.appointmentLable}
                style={{ marginLeft: "20px" }}
              >
                Name <span className="asterick">*</span>
              </label>
              <input
                type="text"
                className={styles.inputSearchContainer}
                {...register(
                  MASTER_UNIT_TYPE_VALUE,
                  masterUnitTypeValidators[MASTER_UNIT_TYPE_VALUE]
                )}
                placeholder="Enter Value"
                onChange={(e) => trimValue(e)}
              />
              <div className={styles.errorContainer}>
                <span className={styles.extraSpan}></span>
                {errors[MASTER_UNIT_TYPE_VALUE] && (
                  <p className="dashboardFormError">
                    {errors[MASTER_UNIT_TYPE_VALUE].message as any}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.appointmanetInput}>
              <label
                htmlFor=""
                className={styles.appointmentLable}
                style={{ marginLeft: "20px" }}
              >
                QTY <span className="asterick">*</span>
              </label>
              <input
                type="number"
                className={styles.inputSearchContainer}
                {...register(
                  MASTER_UNIT_TYPE_QTY,
                  masterUnitTypeValidators[MASTER_UNIT_TYPE_QTY]
                )}
                placeholder="Enter quantity"
                onChange={(e: any) => {
                  trimValue(e);
                  setUnitTypeQty(e.target.value);
                }}
                onPaste={handleValuePaste}
                onKeyDown={(e: any) => disableArrowKey(e)}
                onWheel={(e: any) => {
                  e.target.blur();
                }}
              />
              <div className={styles.errorContainers}>
                <span className={styles.extraSpan}></span>
                {errors[MASTER_UNIT_TYPE_QTY] && (
                  <p className="dashboardFormError">
                    {errors[MASTER_UNIT_TYPE_QTY].message as any}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.buttonMainColor}>
            <Button
              title={getAllMasterValueDataReducer?._id ? "Update" : "Add"}
              type="submit"
              customClass={styles.addBUtton}
            />
          </div>
          <div className={styles.tableContainer}>
            <div className={styles.tableContainer}>
              {getAllMasterValueData?.length > 0 ? (
                <TableV2
                  tableHeaderData={masterUnitTypeData}
                  tableRowData={getAllMasterValueData}
                  handleClick={handleDataClick}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          {getAllMasterValueData && getAllMasterValueData.length !== 0 ? (
            <Pagination
              setDataPerPage={setDataPerPage}
              pageIndexOptions={pageIndexOptions}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
            />
          ) : (
            ""
          )}
        </div>
      </form>
    </>
  );
};

export default ManageInventoryUnitType;
