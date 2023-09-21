import { FC, useEffect, useState } from "react";
import Table from "../../../components/common/table/Table";
import Button from "../../../components/common/button/Button";
import styles from "./ManageAssignTag.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { assignTagData } from "../../../constants/data";
import { requestGenerator } from "../../../utils/payloadGenerator";
import {
  addAllMasterValue,
  getAllMasterValue,
  updatMasterValue,
  updateStatusValue,
} from "../../../redux/features/master-value/MasterValueAsyncActions";
import { useLocation } from "react-router-dom";
import AttachFiles from "../../../components/common/attach-files/single-file/AttachSingleFile";
import { assigntagValidators } from "../../../form-validators/assignTagValidators";
import { ASSIGN_TAG, ASSIGN_TAG_NAME } from "../../../constants/constant";
import { IAssignValue } from "../../../interfaces/interfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import { dataURI, trimValue } from "../../../utils/utils";
import Popup from "../../../components/common/popup/Popup";
import AssignTagModal from "../../../components/common/modal/assign-tag-modal/AssignTagModal";
import ManageAssignTagModal from "../../../components/common/modal/manage-assigntag-modal/ManageAssignTagModal";
import TableV2 from "../../../components/common/table/tableV2/TableV2";
import Loader from "../../../components/common/spinner/Loader";
import { clearState } from "../../../redux/features/master-value/MasterValueSlice";
import Pagination from "../../../components/common/pagination/Pagination";
interface IManageAssignTag { }

const ManageAssignTag: FC<IManageAssignTag> = () => {
  // use state
  const [iconFiles, setIconFiles] = useState({ name: "", data_uri: "" });
  const [toggleData, setToggleData] = useState({});
  const [confirm, setConfirm] = useState<boolean>(false);
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [searchValue, setSearchValue] = useState("");


  console.log(iconFiles, "iconFiles")
  // use location
  const location = useLocation();

  // use dispatch
  const dispatch = useAppDispatch();

  // use selector
  const { isLoading, getAllMasterValueData, getAllMasterValueDataReducer } =
    useAppSelector((state) => state.masterValue);


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

  // handle reset
  const handleReset = () => {
    setValue(ASSIGN_TAG_NAME, "");
    setValue(ASSIGN_TAG, "");
    dispatch(clearState());
  };

  // use form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IAssignValue>({});

  const onSubmit: SubmitHandler<IAssignValue> = (data) => {
    if (getAllMasterValueDataReducer._id) {
      const masterInit = {
        id: getAllMasterValueDataReducer?._id,
        data: {
          category_id: getAllMasterValueDataReducer?.category_id?._id,
          value: data.name,
          metadata: {
            icon: iconFiles.data_uri,
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
        value: data.name,
        metadata: {
          icon: iconFiles.data_uri,
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
  const selectIconData = watch(ASSIGN_TAG);
  console.log(selectIconData, "selectIconData");

  const fileName = selectIconData?.[0];

  // convert file object to data_uri
  useEffect(() => {

    let fileList: any = { name: "", data_uri: "" };

    const getDataURI = async (fileName: File) => {
      try {
        const result = await dataURI(fileName);
        fileList.name = fileName.name;
        fileList.data_uri = result;
        setIconFiles(fileList);
      } catch (error) {
        console.log({ error });
      }
    };
    if (fileName) {
      getDataURI(fileName);

    }

  }, [fileName, selectIconData?.length]);

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
    setValue(ASSIGN_TAG_NAME, getAllMasterValueDataReducer?.value);
    setIconFiles({
      name: "abc.png",
      data_uri: getAllMasterValueDataReducer?.metadata?.icon,
    });
    // setValue(ASSIGN_TAG, getAllMasterValueDataReducer?.metadata?.icon);

  }, [getAllMasterValueDataReducer, setValue]);

  // clear state while we can move on another page
  // useEffect(() => {
  //   return () => {
  //     dispatch(clearState());
  //   };
  // }, []);

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
      {confirm && (
        <Popup
          popData={toggleData}
          Children={ManageAssignTagModal}
          handleClose={() => setConfirm(false)}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.mainContainer}>
          <div className={styles.appointmentStatusInputMain}>
            <div className={styles.appointmanetInput}>
              <label htmlFor="" className={styles.appointmentLable}>
                Name
              </label>
              <input
                type="text"
                className={styles.inputSearchContainer}
                {...register(
                  ASSIGN_TAG_NAME,
                  assigntagValidators[ASSIGN_TAG_NAME]
                )}
                placeholder="Enter name"
                onChange={(e) => trimValue(e)}
              />
              <div className={styles.errorContainer}>
                <span className={styles.extraSpan}></span>
                {errors[ASSIGN_TAG_NAME] && (
                  <p className="dashboardFormError">
                    {errors[ASSIGN_TAG_NAME].message}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.appointmanetInput}>
              <div className={styles.inputAttechments}>
                <label htmlFor="" className={styles.appointmentLables}>
                  Icon
                </label>
                <AttachFiles
                  attachmentContainerCustomClass={
                    styles.attachmentContainerCustomClass
                  }
                  register={register}
                  fileKey={ASSIGN_TAG}
                  id={ASSIGN_TAG}
                  fileList={iconFiles}
                  validation={
                    { required: iconFiles?.data_uri?.length > 0 ? false : true }
                  }
                />
              </div>
              <div className={styles.errorContainers}>
                <span className={styles.extraSpan}></span>
                {errors?.[ASSIGN_TAG]?.type === 'required' && (
                  <p className="dashboardFormError">
                    Please Select Icon
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
                  tableHeaderData={assignTagData}
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

export default ManageAssignTag;
