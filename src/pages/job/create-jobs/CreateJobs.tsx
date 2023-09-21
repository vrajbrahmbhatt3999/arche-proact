import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import Button from "../../../components/common/button/Button";
import Popup from "../../../components/common/popup/Popup";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import { EyeIcon, InfoIcon } from "../../../components/common/svg-components";
import { colors } from "../../../constants/color";
import {
  AGE,
  FILE_NO,
  GENDER,
  LOCATION_ID,
  MOBILE_NO,
  NAME,
  PATIENT,
} from "../../../constants/createJobConstants";
import { ICreateJobForm } from "../../../interfaces/interfaces";
import AddTestPopup from "./add-test-popup/AddTestPopup";
import styles from "./createJobs.module.scss";
import { trimValue } from "../../../utils/utils";
import { createJobsValidators } from "./createJobValidator";
import { createJobsHeaderData } from "./createJobTableData";
import { Label } from "../../../components/common/label";
import SearchModal from "../../../components/common/modal/search-modal/SearchModal";
import { Input } from "../../../components/common/input/input";
import { CustomRadio } from "../../../components/common/custom-radio";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  createJobsAsyncData,
} from "../../../redux/features/jobs/jobsAsyncActions";
import { emptyAllTestData } from "../../../redux/features/jobs/jobsSlice";
import { requestGenerator } from "../../../utils/payloadGenerator";
import TableV3 from "../../../components/common/table/tableV3/TableV3";
import SmartSearch from "../../../components/common/smart-search/SmartSearch";
import { getPatientEmrById } from "../../../redux/features/patient-emr/patient/patientAsyncAction";
import moment from "moment";
import GlobalPatientInfoModal from "../../../components/common/patient-info-modal/PatientInfoModal";
import { useNavigate } from "react-router-dom";
import { CustomModal } from "../../../components/common/custom-modal/modal";

export const patientData = ["Paid", "Unpaid"];

const CreateJobs = () => {
  const [patient, setPatient] = useState<string>("REGULAR");
  const [searchModalData, setSearchModalData] = useState({});
  const { branchData } = useAppSelector((state) => state.login);
  let branche = branchData?.branches;
  let branch_id = branche && branche.length > 0 && branche[0]?._id;
  const [branch, setBranch] = useState(branch_id);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const ref = useRef<any>();
  const [patientInfooModal, setPatientInfoModal] = useState(false);
  const [testModal, setTestModal] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    trigger,
    watch,
  } = useForm<ICreateJobForm>({});

  const { patientDataObjectById } = useAppSelector((state) => state.patient);
  const createFileNoInitials = patientDataObjectById?.emr_no
    ?.split("")
    ?.slice(0, 2)
    ?.join("");

  const watchGender = watch(GENDER);
  const [createInitials, setCreateInitials] = useState("");

  const createAge: any = moment(patientDataObjectById?.dob).format("YYYY");
  const currentData: any = new Date().getFullYear();
  const getAge = currentData - createAge;

  const navigate = useNavigate();

  const sliceFileNo = patientDataObjectById?.emr_no
    ?.split("")
    ?.splice(2, patientDataObjectById?.emr_no?.length)
    ?.join("");

  useEffect(() => {
    if (Object.keys(patientDataObjectById)?.length > 0) {
      setValue(NAME, patientDataObjectById?.name ?? "");
      setValue(MOBILE_NO, patientDataObjectById?.phone ?? "");
      setValue(FILE_NO, sliceFileNo ?? "");
      setValue("patientId", patientDataObjectById?._id ?? "");
      setValue(AGE, getAge ?? "");
      setValue(GENDER, patientDataObjectById?.gender ?? "");
      setCreateInitials(createFileNoInitials ?? "");
    }
  }, [
    createFileNoInitials,
    getAge,
    patientDataObjectById,
    setValue,
    sliceFileNo,
  ]);

  useEffect(() => {
    setValue(NAME, "");
    setValue(MOBILE_NO, "");
    setValue(FILE_NO, "");
    setValue("patientId", "");
    setValue(AGE, "");
    setValue(GENDER, "");
    setCreateInitials("");
  }, [setValue]);

  const dispatch = useAppDispatch();

  const { allTestData } = useAppSelector(
    (state) => state.labsJob
  );
  const filterTestData = allTestData?.filter((s: any) => !!s?.test_id);

  const filterProfileData = allTestData?.filter(
    (s: any) => !!s?.profile_test_id
  );

  const onSubmit: SubmitHandler<ICreateJobForm> = (item: any) => {
    let data: any = {
      branch_id: item.location,
      patient_id: patient === "REGULAR" ? item.patientId : undefined,
      name: item.patient_name,
      mc_name: branchData?.mc_name,
      job_type: "LABORATORY",
      phone: item.patient_phone,
      age: item.age,
      gender: item.gender,
      is_regular: item.patient === "REGULAR" ? true : false,
      tests_list: filterTestData?.map((s: any) => {
        const filterActiveComponentIds = s.components_ids.filter(
          (itemObj: any) => itemObj.is_active === true
        );
        return {
          test_name_id: s?._id,
          test_name: s?.test_name,
          test_no: s?.test_no,
          price: s?.sell_price,
          category: s?.name,
          quantity: s?.quantity ?? 1,
          priority: "HIGH",
          is_billable: true,
          components: filterActiveComponentIds.map((y: any) => {
            const genderData = y?.ranges?.filter(
              (items: any) =>
                items.gender?.toLowerCase() === item?.gender.toLowerCase()
            );

            const findAge = genderData?.find((itemAge: any) => {
              let userAge = 0;
              const createAge: any = moment(
                patientDataObjectById?.dob
              )
              const currentData: any = moment()
              
              if (itemAge.age_type === "DAY") {
                userAge = currentData.diff(createAge, "days");
              }
              if (itemAge.age_type === "YEAR") {
                userAge = currentData.diff(createAge, "year");
              }
              return itemAge.age_from <= userAge && itemAge.age_to >= userAge;
            });
            return {
              _id: y._id,
              name: y.name,
              range: {
                from: findAge?.range_from,
                to: findAge?.range_to,
              },
            };
          }),
        };
      }),
      tests_profile_list: filterProfileData?.map((s: any) => {
        return {
          isProfile: s?.profile_test_id ? true : false,
          profile_id: s?._id,
          profile_name: s?.profile_test_name,
          is_billable: true,
          tests: s?.labtest_ids?.map((x: any) => {
            const filterActiveComponentIds = x.components_ids.filter(
              (itemObj: any) => itemObj.is_active === true
            );
            return {
              test_name_id: x?._id,
              test_no: x?.test_no,
              test_name: x?.name,
              price: x?.sell_price,
              is_billable: true,
              priority: "HIGH",

              components: filterActiveComponentIds.map((y: any) => {
                const genderProfileData = y?.ranges?.filter(
                  (items: any) =>
                    items.gender?.toLowerCase() === item?.gender.toLowerCase()
                );
                const findProfileAge = genderProfileData?.find((itemAge: any) => {
                  let userAge = 0;
                  const createAge: any = moment(
                    patientDataObjectById?.dob
                  )
                  const currentData: any = moment()
                  
                  if (itemAge.age_type === "DAY") {
                    userAge = currentData.diff(createAge, "days");
                  }
                  if (itemAge.age_type === "YEAR") {
                    userAge = currentData.diff(createAge, "year");
                  }
                  return itemAge.age_from <= userAge && itemAge.age_to >= userAge;
                });
                // const findProfileAge = genderProfileData?.find(
                //   (itemAge: any) =>
                //     itemAge.age_from <= item.age && itemAge.age_to >= item.age
                // );
                return {
                  _id: y._id,
                  name: y.name,
                  range: {
                    from: findProfileAge?.range_from,
                    to: findProfileAge?.range_to,
                  },
                };
              }),
            };
          }),
          quantity: s?.quantity ?? 1,
          total_amount: s?.total_amount,
          package_amount: s?.package_amount,
        };
      }),
    };

    dispatch(createJobsAsyncData(requestGenerator(data))).then((e) => {
      if (e.type === "jobs/createJobsAsyncData/fulfilled") {
        dispatch(emptyAllTestData());
        navigate("/job/viewJobs");
      }
    });
  };

  const data: any = allTestData;
  const columns: any = createJobsHeaderData;
  const options: any = {
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

  // search modal close
  const handleSearchModalClose = () => {
    setShowSearchModal(!showSearchModal);
    setSearchModalData({});
  };

  const getAllPtientDetails = (item: any) => {
    let invoiceDataPayload = {
      id: item?._id,
    };

    dispatch(getPatientEmrById(requestGenerator(invoiceDataPayload))).then(
      (e) => {
        if (e.type === "patient/getPatientEmrById/fulfilled") {
          setShowSearchModal(false);
        }
      }
    );
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (patientInfooModal && ref.current && !ref.current.contains(e.target)) {
        setPatientInfoModal(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [patientInfooModal, setPatientInfoModal]);

  const watchName = watch(NAME);

  const openPatienModal = () => {
    if (watchName?.length) {
      setPatientInfoModal((s) => !s);
    } else {
      return undefined;
    }
  };

  const handlePtientChange = () => {
    setPatient("PATIENT");
    setValue(NAME, "");
    setValue(MOBILE_NO, "");
    setValue(FILE_NO, "");
    setValue("patientId", "");
    setValue(AGE, "");
    setValue(GENDER, "");
    setCreateInitials("");
  };

  const handleRegularChange = () => {
    setPatient("REGULAR");
    setValue(NAME, "");
    setValue(MOBILE_NO, "");
    setValue(FILE_NO, "");
    setValue("patientId", "");
    setValue(AGE, "");
    setValue(GENDER, "");
    setCreateInitials("");
  };

  const checkErrors =
    (errors?.[NAME]?.type || errors?.[FILE_NO]?.type) === "required";

  const checkAgeErrors =
    (errors?.[AGE]?.type || errors?.[MOBILE_NO]?.type) === "required";

  return (
    <>
      {showSearchModal && (
        <Popup
          Children={SearchModal}
          popData={searchModalData}
          handleClose={() => handleSearchModalClose()}
          setModelOpenClose={setShowSearchModal}
          handleRowClick={getAllPtientDetails}
          invoiceFlag={false}
        />
      )}
      <CustomModal
        title="Add Test"
        showModal={testModal}
        closeModal={() => setTestModal(false)}
        width="80%"
        height="600px"
        zIndex="21"
      >
        <AddTestPopup handleClose={() => setTestModal(false)} />
      </CustomModal>
      {/* Form Container */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.createJobContainer}>
          <div className={styles.pageWrapper}>
            <div className={styles.createJobForm}>
              <div className={styles.branchNameWrapper}>
                <Label htmlFor="" labelText="Branch" requiredField={true} />
                <select
                  className={styles.selectContainer}
                  value={branch}
                  {...register(LOCATION_ID)}
                  onChange={(e) => {
                    setBranch(e.target.value);
                  }}
                >
                  {branche?.length &&
                    branche?.map((item: any, i: number) => {
                      return (
                        <option value={item?._id} key={i}>
                          {item?.name}
                        </option>
                      );
                    })}
                </select>
                <input
                  type="text"
                  {...register("patientId")}
                  style={{ display: "none" }}
                />
              </div>
              <div className={styles.formFieldRow}>
                {patient === "REGULAR" ? (
                  <>
                    <div className={styles.formFieldContainer}>
                      <Input
                        type="text"
                        placeholder="Search Patient Name"
                        {...register(NAME, createJobsValidators[NAME])}
                        onChange={(e) => trimValue(e)}
                        htmlFor={NAME}
                        labelText="Patient Name"
                        requiredField={true}
                        showIcon={true}
                        showErrors={errors?.[NAME]}
                        errorMessage="Please search patient name"
                        handleIconClick={() => setShowSearchModal(true)}
                        autoComplete="off"
                        disabled={true}
                        inlineClass={styles.disabledFields}
                      />
                    </div>
                    <div className={styles.formFieldContainer}>
                      <Input
                        type="text"
                        placeholder="Search File No"
                        inlineClass={[
                          createInitials?.length > 0 && styles.pd_0,
                          styles.disabledFields,
                        ]?.join(" ")}
                        {...register(FILE_NO, createJobsValidators[FILE_NO])}
                        onChange={(e) => trimValue(e)}
                        htmlFor={FILE_NO}
                        labelText="File No"
                        requiredField={true}
                        showIcon={true}
                        showErrors={errors[FILE_NO]}
                        errorMessage={errors?.[FILE_NO]?.message}
                        handleIconClick={() => setShowSearchModal(true)}
                        staticText={
                          createInitials?.length > 0 ? createInitials : ""
                        }
                        autoComplete="off"
                        disabled={true}
                      >
                        <div className={styles.eyeIcon} ref={ref}>
                          <EyeIcon
                            fillColor="#02BF90"
                            customClass={styles.eyeIconStyle}
                            handleClick={openPatienModal}
                          />
                          {patientInfooModal && (
                            <GlobalPatientInfoModal
                              nationalId={
                                patientDataObjectById?.national_id ?? ""
                              }
                              mobileNo={patientDataObjectById?.phone ?? ""}
                              patientImage={patientDataObjectById?.patient_pic}
                            />
                          )}
                        </div>
                      </Input>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.formFieldContainer}>
                      <Input
                        type="text"
                        placeholder="Enter Patient Name"
                        {...register(NAME, createJobsValidators[NAME])}
                        onChange={(e) => trimValue(e)}
                        htmlFor={NAME}
                        labelText="Patient Name"
                        requiredField={true}
                        errorMessage={errors?.[NAME]?.message}
                        showErrors={errors?.[NAME]}
                      />
                    </div>
                    <div
                      className={[
                        styles.formFieldContainer,
                        checkErrors ? styles.mt_0 : "",
                      ]?.join(" ")}
                    >
                      <Input
                        type="text"
                        placeholder="xxxx"
                        {...register("out_patient_file_no")}
                        onChange={(e) => trimValue(e)}
                        htmlFor={"out_patient_file_no"}
                        labelText="Fixed File No"
                        disabled={true}
                        inlineClass={styles.disabledFields}
                      />
                    </div>
                  </>
                )}
                <div
                  className={[
                    styles.formFieldContainer,
                    checkErrors ? styles.mt_0 : "",
                  ]?.join(" ")}
                  style={{ flexDirection: "row" }}
                >
                  <span className={styles.radioFieldName}>Patient :</span>
                  <CustomRadio
                    value="REGULAR"
                    label="Regular"
                    checked={patient === "REGULAR"}
                    {...register(PATIENT, createJobsValidators[PATIENT])}
                    name="patient"
                    // onClick={() => setPatient("REGULAR")}
                    onClick={handleRegularChange}
                    customLabel={styles.customRadioLabel}
                  />
                  <CustomRadio
                    value="PATIENT"
                    label="Out Patient"
                    {...register(PATIENT, createJobsValidators[PATIENT])}
                    name="patient"
                    onClick={handlePtientChange}
                    // onClick={() => setPatient("PATIENT")}
                    customLabel={styles.customRadioLabel}
                    disabled
                  />
                </div>
                <div className={styles.formFieldContainer}>
                  <div className={styles.inputFieldContainer}>
                    <Label
                      htmlFor={MOBILE_NO}
                      labelText="Mobile"
                      requiredField={true}
                      customClass={styles.customLabel}
                    />
                    <PhoneInput
                      country={"kw"}
                      {...register(MOBILE_NO, createJobsValidators[MOBILE_NO])}
                      value={getValues(MOBILE_NO)}
                      placeholder="Enter Mobile No."
                      onChange={(phone) => {
                        //  trimValue(e)
                        const formattedPhone = phone && `+${phone}`;
                        setValue(MOBILE_NO, formattedPhone);
                        trigger(MOBILE_NO);
                      }}
                      inputClass={[
                        patient === "REGULAR" && styles.disabledFields,
                        styles.phoneNumberInput,
                      ]?.join(" ")}
                      containerStyle={{ flexBasis: "70%" }}
                      disabled={patient === "REGULAR"}
                    />
                  </div>
                  {patient !== "REGULAR" && errors[MOBILE_NO] && (
                    <div className={styles.errorContainer}>
                      <span className={styles.extraSpan} />
                      <p className="dashboardFormError">
                        {errors[MOBILE_NO].message}
                      </p>
                    </div>
                  )}
                </div>
                <div className={styles.formFieldContainer}>
                  <Input
                    type="number"
                    placeholder="Age"
                    {...register(AGE, createJobsValidators[AGE])}
                    onChange={(e) => trimValue(e)}
                    htmlFor={AGE}
                    labelText="Age"
                    requiredField={true}
                    errorMessage={errors?.[AGE]?.message}
                    showErrors={patient !== "REGULAR" && errors?.[AGE]}
                    disabled={patient === "REGULAR"}
                    inlineClass={
                      patient === "REGULAR" ? styles.disabledFields : ""
                    }
                  >
                    <div className={styles.infoContainer}>
                      <InfoIcon
                        fillColor={colors?.grey2}
                        customClass={styles.infoIcon}
                      />
                    </div>
                  </Input>
                </div>
                <div
                  className={[
                    styles.formFieldContainer,
                    patient !== "REGULAR" && checkAgeErrors ? styles.mt_0 : "",
                  ]?.join(" ")}
                >
                  <div className={styles.radioFieldGenderContainer}>
                    <span className={styles.radioFieldName}>Gender :</span>
                    <CustomRadio
                      label="Male"
                      {...register(GENDER)}
                      name="gender"
                      value="Male"
                      // onClick={() => setGender("Male")}
                      // checked={gender === "Male"}
                      checked={
                        watchGender === ""
                          ? false
                          : patientDataObjectById?.gender === "MALE"
                      }
                      customLabel={styles.customRadioLabel}
                    />
                    <CustomRadio
                      label="Female"
                      {...register(GENDER)}
                      name="gender"
                      value="Female"
                      // onClick={() => setGender("Female")}
                      checked={
                        watchGender === ""
                          ? false
                          : patientDataObjectById?.gender === "FEMALE"
                      }
                      // checked={gender === "Female"}
                      customLabel={styles.customRadioLabel}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.formButtonContainer}>
                <Button
                  title="Add Test"
                  type="button"
                  handleClick={() => setTestModal(true)}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Search Container */}
        <div className={styles.searchContainer}>
          <SmartSearch
            placeHolder="Search by Name"
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            isDisable={!options?.data?.length}
            customClass={styles.smartSearchInput}
          />
        </div>
        {/* Table Container*/}
        <div className={styles.TableMainContainer}>
          <div className={styles.tableContainer}>
            <TableV3
              getTableProps={getTableProps}
              getTableBodyProps={getTableBodyProps}
              headerGroups={headerGroups}
              rows={rows}
              prepareRow={prepareRow}
            />
          </div>
          {/* Button  */}
          <div className={styles.createJobBtnContainer}>
            <Button
              title="Create Job"
              type="submit"
              disable={!allTestData?.length}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateJobs;
