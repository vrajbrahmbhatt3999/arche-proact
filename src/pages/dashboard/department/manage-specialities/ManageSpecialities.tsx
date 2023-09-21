import React, { FC, useEffect, useState } from "react";
import styles from "./manageSpecialities.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../../components/common/button/Button";
import Select from "react-select";
import { manageSpecialitiesTableHeaderData } from "../../../../constants/data";
import Table from "../../../../components/common/table/Table";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  DEPT,
  SPECIALITY,
  SPECIALITY_IMG,
} from "../../../../constants/constant";
import { specialityValidators } from "../../../../form-validators/specialityValidators";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import { ADD_SPECIALITIES } from "../../../../config/config";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import Loader from "../../../../components/common/spinner/Loader";
import Popup from "../../../../components/common/popup/Popup";
import {
  addSpeciality,
  editSpeciality,
  getAllSpeciality,
  getSpecialityById,
} from "../../../../redux/features/specialities/specialitiesAsyncActions";
import StatusConfirmationPopup from "../../../../components/common/modal/status-confirmation-popup/StatusConfirmationPopup";
import { clearSpecialityInfo } from "../../../../redux/features/specialities/specialitiesSlice";
import makeAnimated from "react-select/animated";
import Pagination from "../../../../components/common/pagination/Pagination";
import AttachFiles from "../../../../components/common/attach-files/single-file/AttachSingleFile";
import { dataURI } from "../../../../utils/utils";
import { getAllDepartment, getAllDepartmentDropdownData } from "../../../../redux/features/department/departmentAsyncActions";
import { trimValue } from "../../../../utils/utils";

interface IManageSpecialities {
  name?: string;
  img_url?: string;
  department_id?: any;
  isEditing?: boolean;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
  editAppointmentData?: any;
}

interface FileList {
  name: string;
  data_uri: any;
}

const ManageSpecialities: FC<IManageSpecialities> = ({
  isEditing,
  setIsEditing,
  editAppointmentData,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [toggle, setToggle] = useState<boolean>(false);
  const [toggleValue, setToggleValue] = useState();
  const [toggleData, setToggleData] = useState({});
  const [confirm, setConfirm] = useState<boolean>(false);
  const { isLoading, specialityData, specialityInfo } = useAppSelector(
    (state) => state.speciality
  );
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [setId, setSetId] = useState("");
  const animatedComponents = makeAnimated();
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [selectedValue, setSelectedValue] = useState(
    specialityInfo?.department_id?.name
  );
  const { departmentData ,departmentDropdownData} = useAppSelector((state) => state.department);

  let values = specialityInfo;
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    watch,
    formState: { errors },
  } = useForm<IManageSpecialities>({
    defaultValues: {
      name: specialityInfo?.name,
      department_id: specialityInfo?.department_id?._id,
    },
    values,
  });

  // console.log("specialityInfo>>>>>>>>>>", specialityInfo);

  const selectIconData = watch(SPECIALITY_IMG);
  const fileName = selectIconData?.[0];

  // console.log("selectedIcondata>>>");

  const [iconFiles, setIconFiles] = useState({ name: "", data_uri: "" });

  let deptData = departmentDropdownData?.map((item: any) => {
    return {
      name: item?.name,
      dept_id: item?._id,
    };
  });


  useEffect(()=>{
    let reqData = {
      // is_active: "true",
      page: 1,
      pageSize: 1000,
    };
    dispatch(getAllDepartmentDropdownData(requestGenerator(reqData)))
  },[dispatch])


  let newDept = deptData?.map((item: any) => {
    return { label: item?.name, value: item?.dept_id };
  });

  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };

  const pageIndexOptions = pageIndexArray();

  useEffect(() => {
    if (!isEditing) {
      // console.log("trueee");
      setIconFiles({
        name: "",
        data_uri: editAppointmentData?.icon_img,
      });
      reset(editAppointmentData);
    }

    // } else {
    //   console.log("false");
    // setIconFiles({ name: '', data_uri: specialityInfo?.specialty_img })
    // }
  }, [dispatch, isEdit]);

  useEffect(() => {
    const fileList: FileList = { name: "", data_uri: "" };
    const getDataURI = async (fileName: File | any) => {
      try {
        const result = await dataURI(fileName);
        fileList.data_uri = result;
        fileList.name = fileName.name;
        setIconFiles(fileList);
      } catch (error) {
        console.log({ error });
      }
    };
    if (fileName) {
      getDataURI(fileName);
    }
  }, [fileName, setValue]);

  // const defaultValue = {
  //   label: specialityInfo?.department_id?.name,
  //   value: specialityInfo?.department_id?._id,
  // };

  // const [d, setd] = useState({ value: "asa", label: "asasa" });

  let dfVal = {
    name: specialityInfo.department_id?.name,
    _id: specialityInfo.department_id?._id,
  };
  // console.log("dfvVal>>>", dfVal);
  // let dfVal = { name: "tfwwde", _id: "2361723617" };
  const defaultValue = {
    value: dfVal?._id,
    label: dfVal?.name,
    // value: "6426cab50a1fabbc227924c1",
    // label: "HR NRI 2.00",
  };
  // console.log(defaultValue, "defaultValue");
  // console.log(specialityInfo, "specialityInfo");

  const [selectedOption, setSelectedOption] = useState<any>({
    value: "",
    label: "",
  });

  console.log("selectedOption", selectedOption?.value);
  const [err, setErr] = useState<boolean>(false);

  // const handleChange = (e: any) => {
  //   console.log("first");
  //   // setSelectedOption(e.target.value);
  // };

  let dummy = [
    { name: "Hr", dept_id: 1 },
    { name: "Account", dept_id: 2 },
  ];

  useEffect(() => {
    setSelectedOption({
      value: specialityInfo?.department_id?._id,
      label: specialityInfo?.department_id?.name,
    });
  }, [specialityInfo?.department_id?._id]);

  const handleEdit = (item: any) => {
    let data = {
      id: item?._id,
    };
    setSelectedValue(specialityInfo?.department_id?._id);
    dispatch(getSpecialityById(requestGenerator(data))).then((e) => {
      if (e.type === "specialities/getSpecialitiesById/fulfilled") {
        // console.log("eeee>>>>", e);
        // setd({
        //   value: e?.payload?.department_id?._id,
        //   label: e?.payload?.department_id?.name,
        // });
        setIconFiles({ name: "", data_uri: e?.payload?.specialty_img });
      }
    });
    setIsEdit(true);
    setSetId(item?._id);
  };

  // console.log("dddd", d);

  // console.log("spf>>>>", specialityInfo);

  const onSubmit: SubmitHandler<IManageSpecialities> = (data: any) => {
    // let { name, department_id, file, ...rest } = data;

    let file = {
      name: iconFiles?.name,
      // data_uri: specialityInfo
      //   ? specialityInfo?.specialty_img
      //   : iconFiles?.data_uri,
      data_uri: iconFiles?.data_uri,
    };

    // let { name, data_uri, ...rest } = file;

    // console.log("file>>>", file);
    data.file = file;
    data.department_id = selectedOption?.value;
    // console.log("data  >>>>", data);
    let reqPayload = {
      search: "",
      page: 0,
      pageSize: 10,
    };

    const { img_url, ...newObject } = data;

    // console.log("new obj>>>", newObject);

    if (selectedOption == undefined) {
      setErr(true);
    }

    if (isEdit) {
      // console.log("trur truee");
      let id = setId;
      // const payload = {
      //   id: id,
      //   data: {
      //     ...rest,
      //     file: file,
      //   },
      // };
      // console.log("idd>>>>", id);
      dispatch(editSpeciality(requestGenerator({ id, data }))).then((e) => {
        if (e.type === "specialities/editSpecialities/fulfilled") {
          dispatch(getAllSpeciality(requestGenerator(reqPayload)));
          dispatch(clearSpecialityInfo());
          setIsEdit(false);
          reset();
          setValue(SPECIALITY, "");
          setIconFiles({ name: "", data_uri: "" });
          setValue(DEPT, {
            value: "",
            label: "",
          });
        }
      });
    } else {
      dispatch(addSpeciality(requestGenerator(data))).then((e) => {
        if (e.type === "specialities/addSpecialities/fulfilled") {
          dispatch(getAllSpeciality(requestGenerator(reqPayload))).then((e) => {
            if (e.type === "specialities/getAllSpecialities/fulfilled") {
              dispatch(clearSpecialityInfo());
              setIconFiles({ name: "", data_uri: "" });
              reset();
              setValue(SPECIALITY, "");
              setSelectedOption({
                value: "",
                label: "",
              });
              setValue(DEPT, {
                value: "",
                label: "",
              });
              navigate("");
            }
          });
        }
      });
    }
  };

  let newDefault = {};

  // console.log("vaaa", selectedOption);

  // useEffect(() => {
  //   // setSelectedOption({
  //   //   value: "",
  //   //   label: "",
  //   // });
  //   setValue(DEPT, {
  //     value: "",
  //     label: "",
  //   });
  // }, []);

  useEffect(() => {
    let data = {
      search: "",
      page: pageIndex,
      pageSize: dataPerPage,
    };
    let reqData = {
      is_active: "true",
    };
    dispatch(getAllSpeciality(requestGenerator(data))).then((result) =>
      setTotalPage(result.payload.lastPage)
    );
    dispatch(getAllDepartment(requestGenerator(reqData))).then((result) => {
      newDefault = {
        value: specialityInfo.department_id?.name,
        label: specialityInfo.department_id?._id,
      };
      // newDefault = {
      //   value: dfVal._id,
      //   label: dfVal.name,
      // };

      setTotalPage(result.payload.lastPage);
    });
  }, [dispatch, pageIndex, dataPerPage]);

  useEffect(() => {
    if (specialityInfo) {
      reset(specialityInfo);
      setIconFiles({ name: "", data_uri: "" });
    }
  }, [reset, specialityInfo]);

  const handleActiveSpecialities = (item: any) => {
    setConfirm(!confirm);
    setToggleData(item);
    setToggle(item.is_active);
    setToggleValue(item?._id);
  };

  const handleSelectChange = (option: any) => {
    // console.log("option>>>>>", option);
    setSelectedOption(option);
    // console.log("eeee", option);
    setValue(
      DEPT,
      // option?.value
      { label: option?.label, value: option?.value }
      // e.map((item: any) => {
      //   return item.value;
      // })
    );
    trigger(DEPT);
  };

  // console.log("selectedOption>>>>>>", selectedOption.value?.length);

  const selectedSlots = watch(DEPT);

  return (
    <>
      {/* {/ {isLoading && <Loader />} /} */}
      {confirm && (
        <Popup
          popData={toggleData}
          Children={StatusConfirmationPopup}
          handleClose={() => setConfirm(false)}
        />
      )}
      <div className={styles.manageSpecialitiesContainer}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.labelField}>
            <label className={styles.labelText}>
              Dept <span className="asterick">*</span>
            </label>
            <div className={styles.fieldErrorContainer}>
              {selectedOption.value === undefined ||
              selectedOption.value?.length === 0 ? (
                <Select
                  placeholder="Enter department"
                  className={styles.selectInputField}
                  {...register(DEPT, specialityValidators[DEPT])}
                  isSearchable={true}
                  // isClearable={true}
                  options={deptData?.map((item: any) => ({
                    label: item?.name,
                    value: item?.dept_id,
                  }))}
                  // options={newDept}
                  components={animatedComponents}
                  // closeMenuOnSelect={false}
                  // placeholder="Select"
                  value={[]}
                  // defaultValue={selectedOption}
                  // value={defaultValue}
                  onChange={handleSelectChange}
                  // onChange={(e) => {
                  //   console.log("eeee", e);
                  //   setValue(
                  //     DEPT,
                  //     { label: e?.label, value: e?.value }
                  //     // e.map((item: any) => {
                  //     //   return item.value;
                  //     // })
                  //   );
                  //   trigger(DEPT);
                  // }}
                  // onChange={(option) => {
                  //   setSelectedOption(option);
                  //   trigger(DEPT);
                  // }}
                  // onChange={(e: any) => {
                  //   console.log("option>>>", e);
                  //   // console.log("selectedOption>>>>", selectedOption);
                  //   setSelectedOption(selectedOption);
                  //   // setValue(DEPT, e?.value);
                  //   // setValue(
                  //   //   DEPT,
                  //   //   // e.map((item: any) => {
                  //   //   //   return item.value;
                  //   //   // })
                  //   // );
                  //   trigger(DEPT);
                  // }}
                />
              ) : (
                <Select
                  placeholder="Enter department"
                  className={styles.selectInputField}
                  {...register(DEPT, specialityValidators[DEPT])}
                  isSearchable={true}
                  // isClearable={true}
                  options={deptData?.map((item: any) => ({
                    label: item?.name,
                    value: item?.dept_id,
                  }))}
                  // options={deptData}
                  components={animatedComponents}
                  // closeMenuOnSelect={false}
                  // placeholder="Select"
                  value={selectedOption}
                  defaultValue={selectedOption}
                  // value={defaultValue}
                  onChange={handleSelectChange}
                  // onChange={(e) => {
                  //   console.log("eeee", e);
                  //   setValue(
                  //     DEPT,
                  //     { label: e?.label, value: e?.value }
                  //     // e.map((item: any) => {
                  //     //   return item.value;
                  //     // })
                  //   );
                  //   trigger(DEPT);
                  // }}
                  // onChange={(option) => {
                  //   setSelectedOption(option);
                  //   trigger(DEPT);
                  // }}
                  // onChange={(e: any) => {
                  //   console.log("option>>>", e);
                  //   // console.log("selectedOption>>>>", selectedOption);
                  //   setSelectedOption(selectedOption);
                  //   // setValue(DEPT, e?.value);
                  //   // setValue(
                  //   //   DEPT,
                  //   //   // e.map((item: any) => {
                  //   //   //   return item.value;
                  //   //   // })
                  //   // );
                  //   trigger(DEPT);
                  // }}
                />
              )}

              {/* <Select
                placeholder="Enter department"
                className={styles.selectInputField}
                {...register(DEPT, specialityValidators[DEPT])}
                isSearchable={true}
                // isClearable={true}
                options={deptData?.map((item: any) => ({
                  label: item?.name,
                  value: item?.dept_id,
                }))}
                components={animatedComponents}
                // closeMenuOnSelect={false}
                // placeholder="Select"
                // value={
                //   isEdit
                //     ? {
                //         value: specialityInfo?.department_id?._id,
                //         label: specialityInfo?.department_id?.name,
                //       }
                //     : errors[DEPT] && (
                //         <p className="dashboardFormError">
                //           {errors[DEPT].message as any}
                //         </p>
                //       )
                // }
                // defaultValue={selectedOption}
                // defaultValue={deptData?.map((item: any) => ({
                //   label: item?.name,
                //   value: item?.dept_id,
                // }))}
                value={deptData?.map((item: any) => ({
                  label: item?.name,
                  value: item?.dept_id,
                }))}
                // value={defaultValue}
                // onChange={handleSelectChange}
                onChange={(e: any) => {
                  console.log("eee", e);
                  setValue(DEPT, e.value);
                  trigger(DEPT);
                }}
              /> */}

              {/* <select
                className={styles.selectInputField}
                {...register(DEPT, specialityValidators[DEPT])}
                defaultValue={specialityInfo?.department_id?._id}
              >
                <option value="">Select</option>
                {deptData?.map((item: any, i: number) => (
                  <React.Fragment>
                    <option key={i} value={item?.dept_id}>
                      {item?.name}
                    </option>
                  </React.Fragment>
                ))}
              </select> */}

              {/* <select
                className={styles.inputField}
                {...register(DEPT, specialityValidators[DEPT])}
                onChange={(e) => handleChange(e)}
                // value={selectedOption}
              >
                <option value="">Select</option>
                {deptData &&
                  deptData?.map((item: any, i: number) => {
                    // console.log("it>>>>", selectedOption);
                    // console.log("spl>>>", specialityInfo?.department_id?._id);
                    return (
                      <React.Fragment key={i}>
                        <option
                          value={item?.dept_id}
                          // value={selectedOption}
                          // selected={item?.dept_id === d.label ? true : false}
                          // selected={item?.dept_id === deptData?.dept_id}
                          // defaultValue="{specialityInfo?.department_id?.name}"
                          // defaultValue={specialityInfo?.department_id?.name}
                          // selected={true}
                        >
                          {item?.name}
                        </option>
                      </React.Fragment>
                    );
                  })}
              </select> */}
              {/* <DropdownSearch
                options={deptData}
                onChange={() => console.log("first data")}
              /> */}
              {/* {!selectedOption?.label && errors[DEPT] && (
                <p className="errorText">{errors[DEPT].message as any}</p>
              )} */}
              {/* {err ? (
                <p className="errorText">Please select Department</p>
              ) : (
                <p></p>
              )} */}
              {errors[DEPT] && (
                <p className="dashboardFormError">
                  {errors[DEPT].message as any}
                </p>
              )}
              {/* <>
                {isEdit && specialityInfo?.department_id?._id === undefined && (
                  <p className="dashboardFormError">Please select department</p>
                )}
              </> */}
            </div>
          </div>
          <div className={styles.labelField}>
            <label className={styles.labelText}>
              Specialty Name <span className="asterick">*</span>
            </label>
            <div className={styles.fieldErrorContainer}>
              <input
                type="text"
                placeholder="Enter Specialty"
                className={styles.inputField}
                {...register(SPECIALITY, specialityValidators[SPECIALITY])}
                onChange={(e) => trimValue(e)}
              />
              {errors[SPECIALITY] && (
                <p className="errorText">{errors[SPECIALITY].message}</p>
              )}
            </div>
          </div>
          <div className={styles.labelField}>
            <label className={styles.labelText} htmlFor={SPECIALITY_IMG}>
              Specialty Photo <span className="asterick">*</span>
            </label>
            <div className={styles.fieldErrorContainer}>
              <AttachFiles
                fileKey={SPECIALITY_IMG}
                id={SPECIALITY_IMG}
                register={register}
                fileList={iconFiles}
                validation={
                  iconFiles?.data_uri?.length > 0
                    ? {}
                    : specialityValidators[SPECIALITY_IMG]
                }
                isName={false}
              />
              {/* {/ iconFiles?.data_uri?.length === 0 && /} */}
              {errors[SPECIALITY_IMG] && (
                <p className="errorText">{errors[SPECIALITY_IMG].message}</p>
              )}
            </div>
          </div>
          <div className={styles.btnContainer}>
            <Button title="Submit" type="submit" />
            <Button
              title="Reset"
              type="reset"
              customClass={styles.backBtn}
              handleClick={() => {
                // reset();
                // setIconFiles({ name: "", data_uri: "" });
                setValue(DEPT, "");
                //  setValue(DEPT, "");
                dispatch(clearSpecialityInfo());
                reset();
                setValue(SPECIALITY, "");
                setIconFiles({ name: "", data_uri: "" });
                setValue(DEPT, {
                  value: undefined,
                  label: undefined,
                });
              }}
            />
            <Button
              title="Back"
              type="button"
              customClass={styles.backBtn}
              handleClick={() => {
                navigate("/medicalcenter/department");
                // dispatch(clearSpecialityInfo());
                reset();
                setIconFiles({ name: "", data_uri: "" });
              }}
            />
          </div>
          <div>
            {isLoading && <Loader />}
            <Table
              tableHeaderData={manageSpecialitiesTableHeaderData}
              tableRowData={specialityData}
              handleAction={handleEdit}
              handleActiveMC={handleActiveSpecialities}
              showSpeciality={false}
            />
          </div>
          {specialityData?.length > 0 && (
            <Pagination
              setDataPerPage={setDataPerPage}
              pageIndexOptions={pageIndexOptions}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
            />
          )}
        </form>
      </div>
    </>
  );
};

export default ManageSpecialities;
