import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";
import EndDiagnosisPopup from "../../../components/common/modal/end-diagnosis-popup/EndDiagnosisPopup";
import { DropdownIndicator } from "../../../components/common/dropdown-indicator/DropdownIndicator";
import Button from "../../../components/common/button/Button";
import { diagnosisRequestHeaderData } from "../../../constants/table-data/diagnosisRequestHeaderData";
import {
  // request_table_data,
  test_type_array,
  // test_name_array,
  billable_type_array,
  priority_type_array,
} from "./requestDummyData";
import TableV2 from "../../../components/common/table/tableV2/TableV2";
import { IDiagnosisRequestForm } from "../../../interfaces/diagnosisRequestInterfaces";
import { diagnosisRequestValidators } from "../../../form-validators/diagnosisRequestValidators";
import {
  INSURANCE_TYPE,
  PATIENT_TYPE,
  TEST_TYPE,
  TEST_NAME,
  PRICE,
  BILLABLE_TYPE,
  PRIORITY,
  NOTES,
} from "../../../constants/diagnosisRequestConstant";
import Popup from "../../../components/common/popup/Popup";
// import DescriptionModal from "../../../components/common/modal/description-modal/DescriptionModal";
import PatientHistoryNotesModal from "../../../components/common/modal/patient-history-notes-modal/PatientHistoryNotesModal";
import Loader from "../../../components/common/spinner/Loader";
import DeleteMedicationPopup from "../../../components/common/modal/delete-medication-popup/DeleteMedicationPopup";
import { trimValue, uniqueID } from "../../../utils/utils";
import { requestGenerator } from "../../../utils/payloadGenerator";
import { useAppDispatch, useAppSelector } from "../../../hooks/index";
import {
  addRequest,
  deleteRequest,
  clearAddRequestData,
} from "../../../redux/features/request/requestSlice";
import {
  addPatientRequestList,
  getLabTestsList,
  getRadiologyTestsList,
  getTestsListByInsuranceNameList,
} from "../../../redux/features/request/requestAsyncActions";
import { patientInsurancePlanList } from "../../../redux/features/invoice-module/invoiceAsynActions";
import { ADD_PATIENT_REQUESTS_TYPE } from "../../../constants/asyncActionsType";
import { markStage } from "../../../redux/features/diagnosis/diagnosisAsyncActions";
import { clearDiagnosisId } from "../../../redux/features/doctor-diagnosis/doctorDiagnosisSlice";
import { disableArrowKey, disableScroll } from "../../../utils/utils";
import styles from "./request.module.scss";

const Request: FC = () => {
  // redux dipatch and store get funtionality
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userData } = useAppSelector((state) => state.login);
  const {
    isLoading: requestLoading,
    requestData,
    labTestsData,
    radiologyTestsData,
    testListByInsuranceNameData,
  } = useAppSelector((state) => state.request);
  const { isLoading: invoiceLoading, addInsurancePlanList } = useAppSelector(
    (state) => state.invoice
  );
  // console.log("testListByInsuranceNameData :>> ", testListByInsuranceNameData);
  // console.log("addInsurancePlanList :>> ", addInsurancePlanList);
  // console.log("radiologyTestsData :>> ", radiologyTestsData);
  // console.log("requestData :>> ", requestData);
  const { createdDiagnosisId } = useAppSelector(
    (state) => state.doctorDiagnosis
  );
  const { patientFormData } = useAppSelector((state) => state.patientHistory);
  // define state
  const [showNotesModal, setShowNotesModal] = useState<boolean>(false);
  const [notesPopupData, setNotesPopupData] = useState<any>({});
  const [showTestNameModal, setTestNameModal] = useState<boolean>(false);
  const [testNamePopupData, setTestNamePopupData] = useState<any>({});
  const [showDeleteRequestModal, setShowDeleteRequestModal] =
    useState<boolean>(false);
  const [deleteRequestPopupData, setDeleteRequestPopupdata] = useState<any>({});
  const [endDiagnosis, setEndDiagnosis] = useState<boolean>(false);
  // const [testNamesArray, setTestNamesArray] = useState<any>([]);
  const [labRequestsArray, setLabRequestsArray] = useState<any>([]);
  const [radiologyRequestsArray, setRadiologyRequestsArray] = useState<any>([]);
  const [patientInsurancePlanOptions, setPatientInsurancePlanOptions] =
    useState<any>([]);
  const [labTestsList, setLabTestsList] = useState<any>([]);
  const [radiologyTestsList, setRadiologyTestsList] = useState<any>([]);
  const [testNameOptions, setTestNameOptions] = useState<any>([]);

  // React Hook form for the form handling
  const {
    register,
    // reset,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<IDiagnosisRequestForm>({});

  const selectedPatientType = watch(PATIENT_TYPE);
  const selectedInsuranceType = watch(INSURANCE_TYPE);
  const selectedTestType = watch(TEST_TYPE);
  const seletedTestName = watch(TEST_NAME);
  const testPrice = watch(PRICE);

  // api call for get lab, radiology tests and insurance name
  useEffect(() => {
    const payloadForTest = {
      search: "",
      page: 0,
      pageSize: 100,
      order_by: { name: 1 },
    };
    const payloadForInsuranceList = {
      patient_id: patientFormData?.patient_id,
      search: "",
      page: 0,
      pageSize: 100,
    };
    dispatch(getLabTestsList(requestGenerator(payloadForTest)));
    dispatch(getRadiologyTestsList(requestGenerator(payloadForTest)));
    dispatch(
      patientInsurancePlanList(requestGenerator(payloadForInsuranceList))
    );
  }, []);

  // api call for test name by insurance name
  useEffect(() => {
    const payloadForTest = {
      department_name: selectedTestType?.value,
      insurance_plan_id: selectedInsuranceType?.value,
      // insurance_plan_id: "64e5ddf34b2f0b1b030cfbd5",
    };
    if (selectedTestType?.value && selectedInsuranceType?.value) {
      dispatch(
        getTestsListByInsuranceNameList(requestGenerator(payloadForTest))
      );
    }
  }, [dispatch, selectedTestType, selectedInsuranceType]);

  // function for creating insurance type list
  useEffect(() => {
    const patientInsuranceFilteredData = addInsurancePlanList?.map(
      (item: any) => {
        return {
          label: item?.insurance_plan,
          value: item?.insurance_plan_id,
        };
      }
    );
    setPatientInsurancePlanOptions(patientInsuranceFilteredData);
  }, [addInsurancePlanList]);

  // function for creating lab and radiology tests data
  useEffect(() => {
    const labTestsFilteredData = labTestsData?.map((item: any) => {
      return {
        label: item?.name,
        value: item?._id,
        test_price: item?.sell_price,
      };
    });
    setLabTestsList(labTestsFilteredData);
  }, [labTestsData]);

  useEffect(() => {
    const radiologyTestsFilteredData = radiologyTestsData?.map((item: any) => {
      return {
        label: item?.name,
        value: item?._id,
        test_price: item?.sell_price,
      };
    });
    setRadiologyTestsList(radiologyTestsFilteredData);
  }, [radiologyTestsData]);

  // funtion for set test name options
  useEffect(() => {
    if (selectedTestType?.value && selectedInsuranceType?.value) {
      const testsFilteredData = testListByInsuranceNameData?.map(
        (item: any) => {
          return {
            label: item?.name,
            value: item?._id,
            test_price: item?.sell_price,
          };
        }
      );
      setTestNameOptions(testsFilteredData);
    } else {
      if (selectedTestType?.value === "RADIOLOGY") {
        setTestNameOptions(radiologyTestsList);
      } else if (selectedTestType?.value === "LABORATORY") {
        setTestNameOptions(labTestsList);
      }
    }
    setValue(TEST_NAME, "");
    setValue(PRICE, "");
  }, [
    setValue,
    selectedInsuranceType,
    selectedTestType,
    testListByInsuranceNameData,
    labTestsList,
    radiologyTestsList,
  ]);

  //  function for set test price
  useEffect(() => {
    setValue(PRICE, seletedTestName?.test_price);
  }, [setValue, seletedTestName]);

  // useeffect for disable scroll
  useEffect(() => {
    disableScroll();
  }, []);

  // clear request data on component remove
  useEffect(() => {
    return () => {
      dispatch(clearAddRequestData());
    };
  }, []);

  // set patient type on component render
  useEffect(() => {
    setValue(PATIENT_TYPE, "true");
  }, []);

  // set billable type
  useEffect(() => {
    if (
      selectedInsuranceType?.value &&
      selectedTestType?.value &&
      seletedTestName?.value &&
      testPrice
    ) {
      setValue(BILLABLE_TYPE, billable_type_array[0]);
    }
  }, [
    setValue,
    selectedInsuranceType,
    selectedTestType,
    seletedTestName,
    testPrice,
  ]);

  // create testnames array
  // useEffect(() => {
  //   const testNameArray = selectedTestNameArray?.map(
  //     (item: any) => item?.value
  //   );
  //   setTestNamesArray(testNameArray);
  // }, [selectedTestNameArray]);

  // filter lab requests and radiology requests
  useEffect(() => {
    const labRequestArray = requestData?.filter(
      (item: any) => item?.test_type === "LABORATORY"
    );
    const radiologyRequestArray = requestData?.filter(
      (item: any) => item?.test_type === "RADIOLOGY"
    );
    setRadiologyRequestsArray(radiologyRequestArray);
    setLabRequestsArray(labRequestArray);
  }, [requestData]);

  // reset form fiel on insurance plan change
  useEffect(() => {
    setValue(PATIENT_TYPE, "true");
    setValue(TEST_TYPE, "");
    setValue(TEST_NAME, "");
    setValue(PRICE, "");
    setValue(BILLABLE_TYPE, "");
    setValue(PRIORITY, "");
    setValue(NOTES, "");
    setTestNameOptions([]);
  }, [selectedInsuranceType, setValue]);

  const onSubmit: SubmitHandler<IDiagnosisRequestForm> = (data) => {
    // console.log(data, "data");
    // console.log("request form data :>> ", data);
    const request_id = uniqueID();
    const {
      is_internal,
      insurance_type,
      test_type,
      test_name,
      is_billable,
      priority,
      ...rest
    } = data;
    const addRequestPayload = {
      ...rest,
      insurance_plan_id: insurance_type?.value,
      test_type: test_type?.value,
      test_name_id: test_name?.value,
      test_name: test_name?.label,
      is_billable: is_billable?.value,
      priority: priority?.value,
      request_id,
    };
    // console.log("addRequestPayload :>> ", addRequestPayload);
    dispatch(addRequest(addRequestPayload));
    setValue(PATIENT_TYPE, "true");
    setValue(INSURANCE_TYPE, "");
    setValue(TEST_TYPE, "");
    setValue(TEST_NAME, "");
    setValue(PRICE, "");
    setValue(BILLABLE_TYPE, "");
    setValue(PRIORITY, "");
    setValue(NOTES, "");
    setTestNameOptions([]);
  };

  // funtion for handling modal
  const handleNotesModalOpen = (notesData: any) => {
    const requestNotesData = {
      diag_note: notesData?.test_notes,
      diag_apt_date: new Date(),
    };
    setNotesPopupData(requestNotesData);
    setShowNotesModal((prevState) => !prevState);
  };

  const handleNotesModalClose = () => {
    setNotesPopupData({});
    setShowNotesModal((prevState) => !prevState);
  };

  const handleTestNameModalOpen = (testNameData: any) => {
    const testNamesData = {
      diag_note: testNameData?.test_name,
      diag_apt_date: new Date(),
    };
    setTestNamePopupData(testNamesData);
    setTestNameModal((prevState) => !prevState);
  };

  const handleTestNameModalClose = () => {
    setTestNamePopupData("");
    setTestNameModal((prevState) => !prevState);
  };

  const handleDeleteRequestModalOpen = (rowData: any) => {
    setDeleteRequestPopupdata(rowData);
    setShowDeleteRequestModal((prevState) => !prevState);
  };

  const handleDeleteRequestModalClose = () => {
    setDeleteRequestPopupdata("");
    setShowDeleteRequestModal((prevState) => !prevState);
  };

  const handleRequestDelete = () => {
    dispatch(deleteRequest(deleteRequestPopupData));
    setShowDeleteRequestModal((prevState) => !prevState);
  };

  const handleEndDiagnosisModal = () => {
    setEndDiagnosis((prevState) => !prevState);
  };

  // funtion for add all requests
  const handleAddAllRequests = () => {
    let payload = {
      appointment_id: patientFormData?.apt_id,
      mc_name: userData?.mc_name,
      is_internal: selectedPatientType,
      laboratory_tests: labRequestsArray,
      radiology_tests: radiologyRequestsArray,
    };
    dispatch(addPatientRequestList(requestGenerator(payload))).then((e) => {
      if (e.type === `${ADD_PATIENT_REQUESTS_TYPE}/fulfilled`) {
        dispatch(clearAddRequestData());
        navigate("/patientdiagnosis/referral");
      }
    });
  };

  //function for end diagnosis
  const handleEndDiagnosis = () => {
    let reqData = {
      diagnosis_id:
        createdDiagnosisId?.length > 0
          ? createdDiagnosisId
          : patientFormData?.diag_id !== null
          ? patientFormData?.diag_id
          : "",
      diagnosis_stage: "E",
    };
    dispatch(markStage(requestGenerator(reqData))).then(() => {
      navigate("/doctor");
    });
    dispatch(clearDiagnosisId());
  };
  return (
    <>
      {(requestLoading || invoiceLoading) && <Loader />}
      {showNotesModal && (
        <Popup
          Children={PatientHistoryNotesModal}
          handleClose={handleNotesModalClose}
          popData={notesPopupData}
          heading={"Notes"}
        />
      )}
      {showTestNameModal && (
        <Popup
          Children={PatientHistoryNotesModal}
          handleClose={handleTestNameModalClose}
          popData={testNamePopupData}
          heading={"Test Name"}
          // setIsDefault={true}
        />
      )}
      {showDeleteRequestModal && (
        <Popup
          Children={DeleteMedicationPopup}
          handleClose={handleDeleteRequestModalClose}
          handleNo={handleDeleteRequestModalClose}
          handleYes={handleRequestDelete}
        />
      )}
      {endDiagnosis && (
        <Popup
          Children={EndDiagnosisPopup}
          handleClose={handleEndDiagnosisModal}
          handleNo={handleEndDiagnosisModal}
          handleYes={handleEndDiagnosis}
        />
      )}
      <div className={styles.requestContainer}>
        <form
          className={styles.requestFormContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.radioBtnContainer}>
            <div className={styles.singlRadioBtnConatainer}>
              <label htmlFor="internal" className={styles.radioLabel}>
                <input
                  className={styles.radioInput}
                  type="radio"
                  id="internal"
                  value="true"
                  {...register(PATIENT_TYPE)}
                />
                <span className={styles.customRadio} />
              </label>
              <p className={styles.radioLabelTxt}>Internal</p>
            </div>
            <div className={styles.singlRadioBtnConatainer}>
              <label htmlFor="external" className={styles.radioLabel}>
                <input
                  className={styles.radioInput}
                  type="radio"
                  id="external"
                  value="false"
                  {...register(PATIENT_TYPE)}
                  disabled
                />
                <span className={styles.customRadio} />
              </label>
              <p className={styles.radioLabelTxt}>External</p>
            </div>
          </div>
          <div className={styles.formFieldContainer}>
            <div
              className={[
                styles.inputFieldContainer,
                styles.singleFieldContainer,
              ].join(" ")}
            >
              <label htmlFor={INSURANCE_TYPE} className={styles.formLabel}>
                Insurance Type
              </label>
              <div
                className={[
                  styles.fieldAndErrorTxtContainer,
                  styles.insuranceFieldAndErrorTxtContainer,
                ].join(" ")}
              >
                <Select
                  className={styles.selectInputField}
                  placeholder="Select Insurance"
                  closeMenuOnSelect={true}
                  components={{ DropdownIndicator }}
                  {...register(INSURANCE_TYPE)}
                  isSearchable={false}
                  isClearable={true}
                  value={watch(INSURANCE_TYPE) || ""}
                  options={patientInsurancePlanOptions}
                  onChange={(e: any) => {
                    setValue(INSURANCE_TYPE, e);
                    trigger(INSURANCE_TYPE);
                  }}
                  maxMenuHeight={200}
                />
              </div>
            </div>
            <div className={styles.inputFieldContainer}>
              <label htmlFor={TEST_TYPE} className={styles.formLabel}>
                Test Type
                <span className="asterick">*</span>
              </label>
              <div className={styles.fieldAndErrorTxtContainer}>
                <Select
                  className={styles.selectInputField}
                  placeholder="Select Test Type"
                  closeMenuOnSelect={true}
                  components={{ DropdownIndicator }}
                  {...register(
                    TEST_TYPE,
                    diagnosisRequestValidators[TEST_TYPE]
                  )}
                  isSearchable={false}
                  value={watch(TEST_TYPE) || ""}
                  options={test_type_array}
                  onChange={(e: any) => {
                    setValue(TEST_TYPE, e);
                    trigger(TEST_TYPE);
                  }}
                  maxMenuHeight={200}
                />
                {errors[TEST_TYPE] && (
                  <p className={styles.formError}>
                    {errors[TEST_TYPE].message as any}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.inputFieldContainer}>
              <label htmlFor={TEST_NAME} className={styles.formLabel}>
                Test Name
                <span className="asterick">*</span>
              </label>
              <div className={styles.fieldAndErrorTxtContainer}>
                <Select
                  className={styles.selectInputField}
                  placeholder="Select Test Name"
                  closeMenuOnSelect={true}
                  components={{ DropdownIndicator }}
                  {...register(
                    TEST_NAME,
                    diagnosisRequestValidators[TEST_NAME]
                  )}
                  isSearchable={true}
                  value={watch(TEST_NAME) || ""}
                  options={testNameOptions}
                  onChange={(e: any) => {
                    setValue(TEST_NAME, e);
                    trigger(TEST_NAME);
                  }}
                  maxMenuHeight={200}
                />
                {errors[TEST_NAME] && (
                  <p className={styles.formError}>
                    {errors[TEST_NAME].message as any}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.formFieldContainer}>
            <div className={styles.inputFieldContainer}>
              <label htmlFor={PRICE} className={styles.formLabel}>
                Price
                <span className="asterick">*</span>
              </label>
              <div className={styles.fieldAndErrorTxtContainer}>
                <input
                  type="number"
                  placeholder={"Enter Price"}
                  className={styles.inputField}
                  {...register(PRICE)}
                  onKeyDown={(e: any) => disableArrowKey(e)}
                  disabled
                />
                {errors[PRICE] && (
                  <p className={styles.formError}>{errors[PRICE].message}</p>
                )}
              </div>
            </div>
            <div className={styles.inputFieldContainer}>
              <label htmlFor={BILLABLE_TYPE} className={styles.formLabel}>
                Billable
                <span className="asterick">*</span>
              </label>
              <div className={styles.fieldAndErrorTxtContainer}>
                <Select
                  className={styles.selectInputField}
                  placeholder="Select Billable Type"
                  closeMenuOnSelect={true}
                  components={{ DropdownIndicator }}
                  {...register(
                    BILLABLE_TYPE,
                    diagnosisRequestValidators[BILLABLE_TYPE]
                  )}
                  isSearchable={false}
                  isDisabled={
                    selectedInsuranceType?.value &&
                    selectedTestType?.value &&
                    seletedTestName?.value &&
                    testPrice
                      ? true
                      : false
                  }
                  value={watch(BILLABLE_TYPE) || ""}
                  options={billable_type_array}
                  onChange={(e: any) => {
                    setValue(BILLABLE_TYPE, e);
                    trigger(BILLABLE_TYPE);
                  }}
                  maxMenuHeight={200}
                />
                {errors[BILLABLE_TYPE] && (
                  <p className={styles.formError}>
                    {errors[BILLABLE_TYPE].message as any}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.inputFieldContainer}>
              <label htmlFor={PRIORITY} className={styles.formLabel}>
                Priority
                <span className="asterick">*</span>
              </label>
              <div className={styles.fieldAndErrorTxtContainer}>
                <Select
                  className={styles.selectInputField}
                  placeholder="Select Priority Type"
                  closeMenuOnSelect={true}
                  components={{ DropdownIndicator }}
                  {...register(PRIORITY, diagnosisRequestValidators[PRIORITY])}
                  isSearchable={false}
                  value={watch(PRIORITY) || ""}
                  options={priority_type_array}
                  onChange={(e: any) => {
                    setValue(PRIORITY, e);
                    trigger(PRIORITY);
                  }}
                  maxMenuHeight={200}
                />
                {errors[PRIORITY] && (
                  <p className={styles.formError}>
                    {errors[PRIORITY].message as any}
                  </p>
                )}
              </div>
            </div>
            {/* <div className={styles.inputFieldContainer}>
              <label className={styles.formLabel}></label>
              <div className={styles.extraInputField}></div>
            </div> */}
          </div>
          <div className={styles.textAreaFieldContainer}>
            <label htmlFor={NOTES} className={styles.formLabel}>
              Notes
            </label>
            <textarea
              placeholder="Enter Notes"
              className={styles.textArea}
              {...register(NOTES)}
              onChange={(e) => {
                trimValue(e);
              }}
            />
          </div>
          <div className={styles.requestFormBtnContainer}>
            <Button
              title="Add"
              type="submit"
              customClass={styles.submitButton}
            />
          </div>
        </form>
        <div className={styles.requestDataContaniner}>
          <TableV2
            tableHeaderData={diagnosisRequestHeaderData}
            tableRowData={requestData}
            active={false}
            handleClick={handleNotesModalOpen}
            handleRowClick={handleTestNameModalOpen}
            setModelOpenClose={handleDeleteRequestModalOpen}
          />
          <div className={styles.requestBtnContainer}>
            <Button
              title="Send Request"
              type="button"
              customClass={styles.sendButton}
              handleClick={handleAddAllRequests}
              disable={requestData?.length === 0 ? true : false}
            />
            <Button
              title="End Diagnosis"
              type="button"
              customClass={styles.endButton}
              disable={
                createdDiagnosisId
                  ? false
                  : patientFormData?.diag_id
                  ? false
                  : true
              }
              handleClick={handleEndDiagnosisModal}
            />
            <Button
              title="Skip"
              type="button"
              customClass={styles.skipButton}
              handleClick={() => navigate("/patientdiagnosis/referral")}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Request;
