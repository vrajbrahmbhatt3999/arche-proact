import { FC, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import Button from "../../../components/common/button/Button";
import Popup from "../../../components/common/popup/Popup";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import { EyeIcon, InfoIcon } from "../../../components/common/svg-components";
import { colors } from "../../../constants/color";
import {
  RADILOGYPATIENT,
  RADIOLOGYAGE,
  RADIOLOGYFILE_NO,
  RADIOLOGYGENDER,
  RADIOLOGYLOCATION_ID,
  RADIOLOGYMOBILE_NO,
  RADIOLOGYNAME,
} from "../../../constants/createJobConstants";
import { ICreateJobRadiologyForm } from "../../../interfaces/interfaces";
import AddTestPopup from "./add-test-popup/AddTestPopup";
import styles from "./createJobs.module.scss";
import { trimValue } from "../../../utils/utils";
import Pagination from "../../../components/common/pagination/Pagination";
import { createJobsValidators } from "./createJobValidator";
import { createJobsHeaderData } from "./createJobTableData";
import { Label } from "../../../components/common/label";
import SearchModal from "../../../components/common/modal/search-modal/SearchModal";
import { Input } from "../../../components/common/input/input";
import { CustomRadio } from "../../../components/common/custom-radio";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { requestGenerator } from "../../../utils/payloadGenerator";
import TableV3 from "../../../components/common/table/tableV3/TableV3";
import SmartSearch from "../../../components/common/smart-search/SmartSearch";
import ProfileTestModal from "./profile-test-popup/ProfileTestModal";
import { getPatientEmrById } from "../../../redux/features/patient-emr/patient/patientAsyncAction";
import moment from "moment";
import GlobalPatientInfoModal from "../../../components/common/patient-info-modal/PatientInfoModal";
import { useNavigate } from "react-router-dom";
import {
  createJobsAsyncData,
} from "../../../redux/features/radiology-jobs/jobsAsyncActions";
import { emptyAllTestData } from "../../../redux/features/radiology-jobs/jobsSlice";

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
export const patientData = ["Paid", "Unpaid"];
interface ICreateJobs {}

const CreateJobs: FC<ICreateJobs> = () => {
  const [patient, setPatient] = useState<string>("REGULAR");
  // const [gender, setGender] = useState<string>("Male");
  const [showAddTestPopup, setShowAddTestPopup] = useState<boolean>(false);
  const [searchModalData, setSearchModalData] = useState({});
  const { branchData } = useAppSelector((state) => state.login);
  let branche = branchData?.branches;
  let branch_id = branche && branche.length > 0 && branche[0]?._id;
  const [branch, setBranch] = useState(branch_id);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [showProfileTestPopup, setShowProfileTestPopup] = useState(false);
  const [profileData, setProfileData] = useState<any>([]);
  const [patientInfooModal, setPatientInfoModal] = useState(false);

  const ref = useRef<any>();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    trigger,
    watch,
  } = useForm<ICreateJobRadiologyForm>({});

  const { patientDataObjectById } = useAppSelector((state) => state.patient);
  const createAge: any = moment(patientDataObjectById?.dob).format("YYYY");
  const currentData: any = new Date().getFullYear();
  const getAge = currentData - createAge;

  const navigate = useNavigate();

  const createFileNoInitials = patientDataObjectById?.emr_no
    ?.split("")
    ?.slice(0, 2)
    ?.join("");

  const [createInitials, setCreateInitials] = useState("");

  const sliceFileNo = patientDataObjectById?.emr_no
    ?.split("")
    ?.splice(2, patientDataObjectById?.emr_no?.length)
    ?.join("");

  useEffect(() => {
    if (Object.keys(patientDataObjectById)?.length > 0) {
      setValue(RADIOLOGYNAME, patientDataObjectById?.name ?? "");
      setValue(RADIOLOGYMOBILE_NO, patientDataObjectById?.phone ?? "");
      setValue(RADIOLOGYFILE_NO, sliceFileNo ?? "");
      setValue("patientId", patientDataObjectById?._id ?? "");
      setValue(RADIOLOGYAGE, getAge ?? "");
      setValue(RADIOLOGYGENDER, patientDataObjectById?.gender ?? "");
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
    setValue(RADIOLOGYNAME, "");
    setValue(RADIOLOGYMOBILE_NO, "");
    setValue(RADIOLOGYFILE_NO, "");
    setValue("patientId", "");
    setValue(RADIOLOGYAGE, "");
    setValue(RADIOLOGYGENDER, "");
    setCreateInitials("");
  }, [setValue]);

  const dispatch = useAppDispatch();
  const watchGender = watch(RADIOLOGYGENDER);
  const { allTestData } = useAppSelector((state) => state.radiologyJobs);
  const filterTestData = allTestData?.filter((s: any) => !!s?.test_id);
  const filterProfileData = allTestData?.filter(
    (s: any) => !!s?.profile_test_id
  );


  const onSubmit: SubmitHandler<ICreateJobRadiologyForm> = (item: any) => {
    let data: any = {
      branch_id: item.radiology_location,
      patient_id: patient === "REGULAR" ? item.patientId : undefined,
      name: item.radiology_patient_name,
      mc_name: branchData?.mc_name,
      job_type: "RADIOLOGY",
      phone: item.radiology_patient_phone,
      age: item.radiology_age,
      gender: item.radiology_gender,
      is_regular: item.radiology_patient === "REGULAR" ? true : false,
      tests_list: filterTestData?.map((s: any) => {
        const genderData = s?.ranges?.filter(
          (y: any) => y.gender?.toLowerCase() === item?.gender.toLowerCase()
        );
        const findAge = genderData?.find(
          (x: any) => x.age_from <= item.age && x.age_to >= item.age
        );
        return {
          test_name_id: s?._id,
          test_name: s?.test_name,
          test_no: s?.test_no,
          price: s?.sell_price,
          category: s?.name,
          range: `${findAge?.range_from ?? ""} - ${findAge?.range_to ?? ""}`,
          quantity: s?.quantity ?? 1,
          priority: "HIGH",
          is_billable: true,
        };
      }),
      tests_profile_list: filterProfileData?.map((s: any) => {
        const genderProfileData = s?.ranges?.filter(
          (y: any) => y.gender?.toLowerCase() === item?.gender.toLowerCase()
        );
        const findProfileAge = genderProfileData?.find(
          (x: any) => x.age_from <= item.age && x.age_to >= item.age
        );
        return {
          isProfile: s?.profile_test_id ? true : false,
          profile_id: s?._id,
          profile_name: s?.profile_test_name,
          is_billable: true,
          tests: s?.radiologytest_ids?.map((x: any) => ({
            test_name_id: x?._id,
            test_no: x?.test_no,
            test_name: x?.name,
            price: x?.sell_price,
            is_billable: true,
            priority: "HIGH",
            range: `${findProfileAge?.range_from ?? ""} - ${
              findProfileAge?.range_to ?? ""
            }`,
          })),
          quantity: s?.quantity ?? 1,
          total_amount: s?.total_amount,
          package_amount: s?.package_amount,
        };
      }),
    };
    dispatch(createJobsAsyncData(requestGenerator(data))).then((e) => {
      if (e.type === "jobs/createJobsAsyncData/fulfilled") {
        dispatch(emptyAllTestData());
        navigate("/radiology-job/viewJobs");
        // let reqPayload = {
        //   page: 10,
        //   pageSize: 10,
        //   job_type: "LABORATORY",
        //   is_internal: true,
        // };
        // dispatch(ViewJobsAsyncData(requestGenerator(reqPayload)));
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
  const handleAddTestPopup = () => {
    setShowAddTestPopup((prevState) => !prevState);
  };

  // function for creating Page Index Array
  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };
  const pageIndexOptions = pageIndexArray();
  // search modal close
  const handleSearchModalClose = () => {
    setShowSearchModal(!showSearchModal);
    setSearchModalData({});
  };

  const handleViewPopup = (e: any) => {
    setProfileData([...e]);
    setShowProfileTestPopup((prevState) => !prevState);
  };
  const closePopup = (e: any) => {
    e?.stopPropagation();
    setProfileData([]);
    setShowProfileTestPopup((prevState) => !prevState);
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

  const watchName = watch(RADIOLOGYNAME);

  const openPatienModal = () => {
    if (watchName?.length) {
      setPatientInfoModal((s) => !s);
    } else {
      return undefined;
    }
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

  const handlePtientChange = () => {
    setPatient("PATIENT");
    setValue(RADIOLOGYNAME, "");
    setValue(RADIOLOGYMOBILE_NO, "");
    setValue(RADIOLOGYFILE_NO, "");
    setValue("patientId", "");
    setValue(RADIOLOGYAGE, "");
    setCreateInitials("");
  };

  const handleRegularChange = () => {
    setPatient("REGULAR");
    setValue(RADIOLOGYNAME, "");
    setValue(RADIOLOGYMOBILE_NO, "");
    setValue(RADIOLOGYFILE_NO, "");
    setValue("patientId", "");
    setValue(RADIOLOGYAGE, "");
    setCreateInitials("");
  };

  const checkErrors =
    (errors?.[RADIOLOGYNAME]?.type || errors?.[RADIOLOGYFILE_NO]?.type) ===
    "required";

  const checkAgeErrors =
    (errors?.[RADIOLOGYAGE]?.type || errors?.[RADIOLOGYMOBILE_NO]?.type) ===
    "required";

  return (
    <>
      {/* Add Test Popup */}
      {showAddTestPopup && (
        <Popup
          Children={AddTestPopup}
          handleClose={() => handleAddTestPopup()}
          handleOpen={handleViewPopup}
        />
      )}
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

      {showProfileTestPopup && (
        <Popup
          Children={ProfileTestModal}
          handleClose={closePopup}
          heading="Profile Test Name"
          headerData={ProfileTestNameHeadersData}
          popData={profileData}
        />
      )}
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
                  {...register(RADIOLOGYLOCATION_ID)}
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
                        {...register(
                          RADIOLOGYNAME,
                          createJobsValidators[RADIOLOGYNAME]
                        )}
                        onChange={(e) => trimValue(e)}
                        htmlFor={RADIOLOGYNAME}
                        labelText="Patient Name"
                        requiredField={true}
                        showIcon={true}
                        showErrors={errors?.[RADIOLOGYNAME]}
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
                        {...register(
                          RADIOLOGYFILE_NO,
                          createJobsValidators[RADIOLOGYFILE_NO]
                        )}
                        onChange={(e) => trimValue(e)}
                        htmlFor={RADIOLOGYFILE_NO}
                        labelText="File No"
                        requiredField={true}
                        showIcon={true}
                        showErrors={errors[RADIOLOGYFILE_NO]}
                        errorMessage={errors?.[RADIOLOGYFILE_NO]?.message}
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
                        {...register(
                          RADIOLOGYNAME,
                          createJobsValidators[RADIOLOGYNAME]
                        )}
                        onChange={(e) => trimValue(e)}
                        htmlFor={RADIOLOGYNAME}
                        labelText="Patient Name"
                        requiredField={true}
                        errorMessage={errors?.[RADIOLOGYNAME]?.message}
                        showErrors={errors?.[RADIOLOGYNAME]}
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
                    {...register(
                      RADILOGYPATIENT,
                      createJobsValidators[RADILOGYPATIENT]
                    )}
                    name="patient"
                    onClick={handleRegularChange}
                    customLabel={styles.customRadioLabel}
                  />
                  <CustomRadio
                    value="PATIENT"
                    label="Out Patient"
                    {...register(
                      RADILOGYPATIENT,
                      createJobsValidators[RADILOGYPATIENT]
                    )}
                    name="patient"
                    onClick={handlePtientChange}
                    customLabel={styles.customRadioLabel}
                    disabled
                  />
                </div>
                <div className={styles.formFieldContainer}>
                  <div className={styles.inputFieldContainer}>
                    <Label
                      htmlFor={RADIOLOGYMOBILE_NO}
                      labelText="Mobile"
                      requiredField={true}
                      customClass={styles.customLabel}
                    />
                    <PhoneInput
                      country={"kw"}
                      {...register(
                        RADIOLOGYMOBILE_NO,
                        createJobsValidators[RADIOLOGYMOBILE_NO]
                      )}
                      value={getValues(RADIOLOGYMOBILE_NO)}
                      placeholder="Enter Mobile No."
                      onChange={(phone) => {
                        //  trimValue(e)
                        const formattedPhone = phone && `+${phone}`;
                        setValue(RADIOLOGYMOBILE_NO, formattedPhone);
                        trigger(RADIOLOGYMOBILE_NO);
                      }}
                      inputClass={[
                        patient === "REGULAR" && styles.disabledFields,
                        styles.phoneNumberInput,
                      ]?.join(" ")}
                      containerStyle={{ flexBasis: "70%" }}
                      disabled={patient === "REGULAR"}
                    />
                  </div>
                  {patient !== "REGULAR" && errors[RADIOLOGYMOBILE_NO] && (
                    <div className={styles.errorContainer}>
                      <span className={styles.extraSpan} />
                      <p className="dashboardFormError">
                        {errors[RADIOLOGYMOBILE_NO].message}
                      </p>
                    </div>
                  )}
                </div>
                <div className={styles.formFieldContainer}>
                  <Input
                    type="number"
                    placeholder="Age"
                    {...register(
                      RADIOLOGYAGE,
                      createJobsValidators[RADIOLOGYAGE]
                    )}
                    disabled={patient === "REGULAR"}
                    onChange={(e) => trimValue(e)}
                    htmlFor={RADIOLOGYAGE}
                    labelText="Age"
                    requiredField={true}
                    errorMessage={errors?.[RADIOLOGYAGE]?.message}
                    showErrors={patient !== "REGULAR" && errors?.[RADIOLOGYAGE]}
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
                      {...register(RADIOLOGYGENDER)}
                      name="gender"
                      value="Male"
                      // onClick={() => setGender("Male")}
                      // checked={gender === "Male"}
                      checked={watchGender === '' ? false :  patientDataObjectById?.gender === "MALE"}
                      customLabel={styles.customRadioLabel}
                    />
                    <CustomRadio
                      label="Female"
                      {...register(RADIOLOGYGENDER)}
                      name="gender"
                      value="Female"
                      // onClick={() => setGender("Female")}
                      checked={watchGender === '' ? false : patientDataObjectById?.gender === "FEMALE"}
                      customLabel={styles.customRadioLabel}
                    />
                  </div>
                </div>
              </div>
              <div
                className={styles.formButtonContainer}
                // onClick={handleAddTestPopup}
              >
                <Button
                  title="Add Test"
                  type="button"
                  handleClick={() => setShowAddTestPopup(true)}
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
            customClassInput={styles.smartSearchInput}
          />
          {/* <label className={styles.checkboxContainer}>
            <input
              type="checkbox"
              className={styles.checkboxField}
              // {...register(VISIBILITY)}
              // checked={false}
            />
            <span className={styles.checkboxLabel} />
            Show All
          </label> */}
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
          {/* Pagination */}
          {allTestData && allTestData.length !== 0 ? (
            <Pagination
              setDataPerPage={setDataPerPage}
              pageIndexOptions={pageIndexOptions}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
            />
          ) : (
            ""
          )}
          {/* Button  */}
          <div className={styles.createJobBtnContainer}>
            <Button
              title="Create Job"
              type="submit"
              disable={!allTestData?.length}
              // handleClick={handleAddTest}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateJobs;
