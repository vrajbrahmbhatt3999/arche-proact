import { FC, useEffect, useState } from "react";
import styles from "./ManageAppoinmentStatus.module.scss";
import Table from "../../../components/common/table/Table";
import { masterTableNewHeaderData } from "../../../constants/data";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import Button from "../../../components/common/button/Button";
import { useLocation } from "react-router-dom";
import { IMasterValueData } from "../../../interfaces/interfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  APPOINTMENT_COLOR,
  APPOINTMENT_STATUS,
} from "../../../constants/constant";
import { masterValueVadidator } from "../../../form-validators/masterValueValidator";
import { trimValue } from "../../../utils/utils";
import {
  addAllMasterValue,
  getAllMasterValue,
  updatMasterValue,
  updateStatusValue,
} from "../../../redux/features/master-value/MasterValueAsyncActions";
import { requestGenerator } from "../../../utils/payloadGenerator";
import TableV2 from "../../../components/common/table/tableV2/TableV2";
import Loader from "../../../components/common/spinner/Loader";
import { clearState } from "../../../redux/features/master-value/MasterValueSlice";
import Pagination from "../../../components/common/pagination/Pagination";

interface IManageAppoinmentStatus {}

const ManageAppoinmentStatus: FC<IManageAppoinmentStatus> = ({}) => {
  // use state
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [searchValue, setSearchValue] = useState("");
  // use location
  const location = useLocation();

  // use dispatch
  const dispatch = useAppDispatch();

  // use selector
  const { isLoading, getAllMasterValueData, getAllMasterValueDataReducer } =
    useAppSelector((state) => state.masterValue);

  // handle reset
  const handleReset = () => {
    setValue(APPOINTMENT_STATUS, "");
    setValue(APPOINTMENT_COLOR, "");
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
      setTotalPage(result.payload.lastPage)
    );
    handleReset();
  }, [dispatch, dataPerPage, pageIndex]);

  // use form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IMasterValueData>({});

  const onSubmit: SubmitHandler<IMasterValueData> = (data) => {
    if (getAllMasterValueDataReducer?._id) {
      const masterInit = {
        id: getAllMasterValueDataReducer?._id,
        data: {
          category_id: getAllMasterValueDataReducer?.category_id?._id,
          value: data?.value,
          metadata: {
            color_code: data?.color_code,
          },
        },
      };
      dispatch(updatMasterValue(requestGenerator(masterInit))).then((e) => {
        if (e.type === "masterValueSlice/updatMasterValue/fulfilled") {
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
          color_code: data.color_code,
        },
      };
      dispatch(addAllMasterValue(requestGenerator(masterInit))).then((e) => {
        if (e.type === "masterValueSlice/addAllMasterValue/fulfilled") {
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
        handleReset();
      } else {
      }
    });
  };

  // update value when click on edit button
  useEffect(() => {
    setValue(APPOINTMENT_STATUS, getAllMasterValueDataReducer?.value);
    setValue(
      APPOINTMENT_COLOR,
      getAllMasterValueDataReducer?.metadata?.color_code
    );
  }, [getAllMasterValueDataReducer]);

  // clear state while we can move on another page
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  // function for creating Page Index Array
  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };
  const pageIndexOptions = pageIndexArray();
  return (
    <>
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.mainContainer}>
          <div className={styles.appointmentStatusInputMain}>
            <div className={styles.appointmanetInput}>
              <label htmlFor="" className={styles.appointmentLable}>
                Appointment Status
              </label>
              <input
                type="text"
                className={styles.inputSearchContainer}
                {...register(
                  APPOINTMENT_STATUS,
                  masterValueVadidator[APPOINTMENT_STATUS]
                )}
                placeholder="Enter appointment status"
                onChange={(e) => trimValue(e)}
              />
              <div className={styles.errorContainer}>
                <span className={styles.extraSpan}></span>
                {errors[APPOINTMENT_STATUS] && (
                  <p className="dashboardFormError">
                    {errors[APPOINTMENT_STATUS].message}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.appointmanetInputs}>
              <label htmlFor="" className={styles.appointmentColorLable}>
                Color
              </label>
              <input
                type="color"
                className={styles.appointmentColorInput}
                {...register(
                  APPOINTMENT_COLOR,
                  masterValueVadidator[APPOINTMENT_COLOR]
                )}
                onChange={(e) => trimValue(e)}
              />
              <div className={styles.errorContainers}>
                <span className={styles.extraSpan}></span>
                {errors[APPOINTMENT_COLOR] && (
                  <p className="dashboardFormError">
                    {errors[APPOINTMENT_COLOR].message}
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
              {getAllMasterValueData.length > 0 ? (
                <TableV2
                  tableHeaderData={masterTableNewHeaderData}
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
export default ManageAppoinmentStatus;
