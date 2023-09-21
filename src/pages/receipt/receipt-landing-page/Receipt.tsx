import { FC, useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import { DropdownIndicator } from "../../../components/common/dropdown-indicator/DropdownIndicator";
import moment from "moment";
import TableV2 from "../../../components/common/table/tableV2/TableV2";
import Button from "../../../components/common/button/Button";
import SearchModalV2 from "../../../components/common/modal/search-modal/SearchModalV2";
import OutstandingModal from "../../../components/common/modal/receipt-outstanding-modal/OutstandingModal";
import ReturnInvoiceModal from "../return-invoice-modal/ReturnInvoiceModal";
import DeleteMedicationPopup from "../../../components/common/modal/delete-medication-popup/DeleteMedicationPopup";
import ReceiptPaymentModal from "../receipt-payment-modal/ReceiptPaymentModal";
import AddPaymentModeModal from "../../../components/common/modal/receipt-add-payment-mode-modal/AddPaymentModeModal";
import PaymentLinkModal from "../../../components/common/modal/payment-link-modal/payment-link/PaymentLinkModal";
import ReceiptPayOnlineModal from "../receipt-pay-online-modal/ReceiptPayOnlineModal";
import { SearchIcon } from "../../../components/common/svg-components";
import { receiptOutstandingHeaderData } from "../../../constants/table-data/receiptOutstandingHeaderData";
import FloatingBar from "../../../components/common/floatingbar/FloatingBar";
import { receiptFloatingBarData } from "../../../constants/data";
import { requestGenerator } from "../../../utils/payloadGenerator";
import { useAppDispatch, useAppSelector } from "../../../hooks/index";
import {
  getPatientAdvanceInoviceList,
  getPatientRefundInoviceList,
  // addReceiptRefund,
  entryReceiptRefund,
  // addReceiptAdvance,
  entryReceiptAdvance,
  // addReceiptOutStanding,
  entryReceiptOutStanding,
  getReceiptPatientOutstandingList,
  getOutstandingInoviceList,
  deleteOutstandingInovice,
} from "../../../redux/features/receipt/receiptAsyncActions";
import { getOnlinePayment } from "../../../redux/features/invoice-module/invoiceAsynActions";
import {
  // CREATE_RECEIPT_REFUND_TYPE,
  UPDATE_RECEIPT_REFUND_TYPE,
  // CREATE_RECEIPT_ADVANCE_TYPE,
  UPDATE_RECEIPT_ADVANCE_TYPE,
  // CREATE_RECEIPT_OUTSTANDING_TYPE,
  UPDATE_RECEIPT_OUTSTANDING_TYPE,
  DELETE_OUTSTANDING_INVOICE_TYPE,
} from "../../../constants/asyncActionsType";
import { GET_iNVOICE_ONLINE_PAYMENT } from "../../../constants/asyncActionsType";
import {
  clearSelectedInvoiceData,
  clearPatientsInvoiceData,
  clerReceiptPaymentModeData,
  setSelectedInvoicesData,
  addReceiptPaymentModeData,
  addReceiptUpayModeData,
  updateTotalOutstandingAmount,
  updateTotalAdvanceAndRefundAmount,
  clearCreateReceiptRefundAndAdvanceData,
  addUpayAmount,
  addOutstaningReceiptData,
  clearUpaylinkData,
  clearSelectedReturnInvoiceData,
  getReturnInvoiceData,
  // addExistingReceiptNoOutstanding,
} from "../../../redux/features/receipt/receiptSlice";
import {
  RECEIPT_TYPE,
  BRANCH_TYPE,
  PATIENT_NAME,
  FILE_NO,
  MOBILE_NO,
  REFERENCE_RECEIPT_NO,
  RECEIPT_DATE,
} from "../../../constants/receiptConstants";
import { setMessage } from "../../../redux/features/toast/toastSlice";
import { failure } from "../../../constants/data";
import { IReceiptForm } from "../../../interfaces/receiptInterfaces";
import { receiptValidators } from "../../../form-validators/receiptValidators";
import Loader from "../../../components/common/spinner/Loader";
import Popup from "../../../components/common/popup/Popup";
import {
  receiptOutstandingPaymentModeData,
  receiptAdvancePaymentModeData,
} from "../../../constants/data";
import styles from "./receipt.module.scss";
interface IReceipt {}

const Receipt: FC<IReceipt> = () => {
  const dispatch = useAppDispatch();
  const { userData, branchData } = useAppSelector((state) => state.login);
  const {
    isLoading,
    selectedInvoiceData,
    patientInvoiceData,
    receiptPaymentModeData,
    getOutstandingInoviceListPayload,
    returnInvoiceData,
    selectedReturnInvoiceData,
    // createReceiptRefundData,
    // createReceiptAdvanceData,
    // createReceiptOutStandingData,
    // entryReceiptAdvanceUpayData,
  } = useAppSelector((state) => state.receipt);
  // console.log("selectedInvoiceData :>> ", selectedInvoiceData);
  const today_date_formated = moment().format("DD MMM YYYY");
  const receipt_date_formated = moment().format("YYYY-MM-DD");
  const defaultBranch = {
    label: branchData?.branches?.[0]?.name,
    value: branchData?.branches?.[0]?._id,
  };

  //Define State Variables
  const [showPatientSearchModal, setShowPatientSearchModal] =
    useState<boolean>(false);
  const [patientData, setPatientData] = useState<any>({});
  const [receiptFormData, setReceiptFormData] = useState<any>({});
  const [showOutstandingModal, setShowOutstandingModal] =
    useState<boolean>(false);
  const [showDeleteOutstandingModal, setShowDeleteOutstandingModal] =
    useState<boolean>(false);
  const [DeleteOutstandingPopupData, setDeleteOutstandingPopupdata] =
    useState<any>({});
  // const [showOutstandingDeleteModal, setShowOutstandingDeleteModal] =
  //   useState<boolean>(false);
  // const [outstandingDeleteModalPopupData, setOutstandingDeleteModalPopupData] =
  //   useState<any>({});
  const [showReturnInvoiceModal, setShowReturnInvoiceModal] =
    useState<boolean>(false);
  // const [returnInvoiceModalPopupData, setReturnInvoiceModalPopupData] =
  //   useState<any>({});
  const [showPaymentReceiptModal, setShowPaymentReceiptModal] =
    useState<boolean>(false);
  const [showPaymentModeModal, setShowPaymentModeModal] =
    useState<boolean>(false);
  const [showUpayPaymentModal, setShowUpayPaymentModal] =
    useState<boolean>(false);
  const [upayPaymentModalPopupData, setUpayPaymentModalPopupData] =
    useState<any>({});
  const [showReceiptPayOnlineModal, setShowReceiptPayOnlineModal] =
    useState<boolean>(false);
  const [branchDropDownData, setBranchDropDownData] = useState([]);
  const [prefixValue, setPrefixValue] = useState<string>("");
  const [suffixValue, setSuffixValue] = useState<string>("");
  const [referenceNoList, setReferenceNoList] = useState<any>([]);
  const [invoiceDropDownData, setInvoiceDropDownData] = useState([]);
  const [totalSelectedOutstanding, setTotalSelectedOutstanding] =
    useState<number>(0);
  // console.log("returnInvoiceModalPopupData :>> ", returnInvoiceModalPopupData);
  // React Hook form for the form handling
  const {
    register,
    reset,
    handleSubmit,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<IReceiptForm>({});

  const receipt_type = watch(RECEIPT_TYPE);
  const branch_id = watch(BRANCH_TYPE);
  const selectedInvoice = watch(REFERENCE_RECEIPT_NO);
  // const data = watch();

  // useEffect for branch dropdown data
  useEffect(() => {
    if (branchData?.branches && branchData?.branches?.length > 0) {
      const branchesArray = branchData?.branches?.map((item: any) => {
        return {
          label: item?.name,
          value: item?._id,
        };
      });
      setBranchDropDownData(branchesArray);
    } else {
      setBranchDropDownData([]);
    }
  }, [branchData?.branches]);

  // API call for patient invoices data
  useEffect(() => {
    if (patientData?.patient_id && receipt_type === "ADVANCE") {
      let payloadData = {
        patient_id: patientData?.patient_id,
      };
      dispatch(getPatientAdvanceInoviceList(requestGenerator(payloadData)));
    } else if (patientData?.patient_id && receipt_type === "REFUND") {
      let payloadData = {
        patient_id: patientData?.patient_id,
      };
      dispatch(getPatientRefundInoviceList(requestGenerator(payloadData)));
    } else if (patientData?.patient_id && receipt_type === "OUTSTANDING") {
      let payloadData = {
        patient_id: patientData?.patient_id,
      };
      dispatch(getReceiptPatientOutstandingList(requestGenerator(payloadData)));
    }
  }, [dispatch, receipt_type, patientData?.patient_id]);

  // useEffect for invoice dropdown data
  useEffect(() => {
    if (patientInvoiceData?.length > 0) {
      const inovicesArray = patientInvoiceData?.map((item: any) => {
        return {
          label: item?.invoice_no?.toString().padStart(6, "0"),
          value: item?._id,
          ...item,
        };
      });
      setInvoiceDropDownData(inovicesArray);
    } else {
      setInvoiceDropDownData([]);
    }
  }, [patientInvoiceData]);

  // Function for set intial value in form.
  useEffect(() => {
    setValue(RECEIPT_TYPE, "OUTSTANDING");
    setValue(RECEIPT_DATE, receipt_date_formated);
    setValue(BRANCH_TYPE, defaultBranch?.value);
  }, []);

  // Function for reset form data on branch change
  // useEffect(() => {
  //   setValue(PATIENT_NAME, "");
  //   setValue(FILE_NO, "");
  //   setValue(MOBILE_NO, "");
  //   setValue(REFERENCE_RECEIPT_NO, []);
  //   setValue(RECEIPT_DATE, receipt_date_formated);
  //   setPrefixValue("");
  //   setSuffixValue("");
  //   setPatientData({});
  //   setReferenceNoList([]);
  //   dispatch(clearSelectedInvoiceData());
  //   setInvoiceDropDownData([]);
  // }, [dispatch, branch_id, setValue, receipt_date_formated]);

  const onSubmit: SubmitHandler<IReceiptForm> = (data) => {
    data.selectedInvoiceData = selectedInvoiceData;
    receiptPaymentModalOpen(data);
  };

  // Function for finding the outstanding sum
  useEffect(() => {
    let selectedInvoiceSum = 0;
    if (selectedInvoiceData.length > 0) {
      for (let i = 0; i < selectedInvoiceData.length; i++) {
        selectedInvoiceSum += selectedInvoiceData[i]?.outstanding_amount;
      }
      let selectedInvoiceSumToFixed = Number(selectedInvoiceSum.toFixed(3));
      setTotalSelectedOutstanding(selectedInvoiceSumToFixed);
      dispatch(updateTotalOutstandingAmount(selectedInvoiceSumToFixed));
    }
  }, [dispatch, selectedInvoiceData]);

  // Function for creating selected reference receipt no array
  useEffect(() => {
    let referenceReceiptList = [];
    if (selectedInvoiceData?.length > 0) {
      referenceReceiptList = selectedInvoiceData?.map((item: any) => {
        return {
          label: item?.invoice_no?.toString().padStart(6, "0"),
          value: item?._id,
        };
      });
      setValue(REFERENCE_RECEIPT_NO, referenceReceiptList);
      setReferenceNoList(referenceReceiptList);
    } else {
      setValue(REFERENCE_RECEIPT_NO, []);
      setReferenceNoList([]);
    }
  }, [setValue, selectedInvoiceData]);

  // Function for clear reference no list and clear selected invoice data
  useEffect(() => {
    setValue(REFERENCE_RECEIPT_NO, []);
    setReferenceNoList([]);
    dispatch(clearSelectedInvoiceData());
    dispatch(updateTotalOutstandingAmount(undefined));
    dispatch(clearPatientsInvoiceData());
  }, [dispatch, setValue, receipt_type]);

  // funtion for handling patient search modal
  const handlePatientSearchModal = () => {
    setPatientData({});
    setValue(REFERENCE_RECEIPT_NO, []);
    setReferenceNoList([]);
    dispatch(clearSelectedInvoiceData());
    setShowPatientSearchModal((prevState) => !prevState);
  };

  const handleReceiptFormDatra = (item: any) => {
    setPatientData(item);
    const rowData = { ...item, receipt_type, branch_type: branch_id };
    reset(rowData);
    setPrefixValue(rowData?.emr_no?.substring(0, 2));
    setSuffixValue(rowData?.emr_no?.slice(2));
    setShowPatientSearchModal((prevState) => !prevState);
  };

  // function for handling outstanding modal
  const handleOutstandingModal = () => {
    setValue(REFERENCE_RECEIPT_NO, []);
    setReferenceNoList([]);
    dispatch(clearSelectedInvoiceData());
    setShowOutstandingModal((prevState) => !prevState);
  };

  const handleAddOutstandingList = () => {
    setShowOutstandingModal((prevState) => !prevState);
  };

  // function for handling delete outstanding modal
  const handleDeleteOutstandingModalOpen = (rowData: any) => {
    setDeleteOutstandingPopupdata(rowData);
    setShowDeleteOutstandingModal((prevState) => !prevState);
  };

  const handleDeleteOutstandingModalClose = () => {
    setDeleteOutstandingPopupdata("");
    setShowDeleteOutstandingModal((prevState) => !prevState);
  };

  const handleDeleteOutstanding = () => {
    const deletedInvoices = selectedInvoiceData?.filter(
      (item: any) => DeleteOutstandingPopupData?._id !== item?._id
    );
    dispatch(setSelectedInvoicesData(deletedInvoices));
    setShowDeleteOutstandingModal((prevState) => !prevState);
  };

  // function for handling delete modal for outstanding modal
  // const handleOutstandingDeleteModalOpen = (rowData: any) => {
  //   setOutstandingDeleteModalPopupData(rowData);
  //   setShowOutstandingDeleteModal((prevState) => !prevState);
  // };

  // const handleOutstandingDeleteModalClose = () => {
  //   setOutstandingDeleteModalPopupData("");
  //   setShowOutstandingDeleteModal((prevState) => !prevState);
  // };

  // const handleOutstandingModalDelete = () => {
  //   const payloadData = { _id: outstandingDeleteModalPopupData?._id };
  //   dispatch(deleteOutstandingInovice(requestGenerator(payloadData))).then(
  //     (e) => {
  //       if (e.type === `${DELETE_OUTSTANDING_INVOICE_TYPE}/fulfilled`) {
  //         dispatch(
  //           getOutstandingInoviceList(
  //             requestGenerator(getOutstandingInoviceListPayload)
  //           )
  //         );
  //         setShowOutstandingDeleteModal((prevState) => !prevState);
  //       }
  //     }
  //   );
  //   const isInvoiceExist = selectedInvoiceData?.some(
  //     (item: any) => item?._id === outstandingDeleteModalPopupData?._id
  //   );
  //   if (isInvoiceExist) {
  //     const deletedInvoices = selectedInvoiceData?.filter(
  //       (item: any) => outstandingDeleteModalPopupData?._id !== item?._id
  //     );
  //     dispatch(setSelectedInvoicesData(deletedInvoices));
  //   }
  // };

  // funtion for generating new array with unique id
  const generateUniqueIdArray = (items: any) => {
    return items?.map((item: any, index: number) => {
      return {
        ...item,
        return_invoice_id: index,
      };
    });
  };
  // function for handling invoice return modal
  const handleOutstandingInvoiceReturnModal = (rowData: any) => {
    // console.log("rowData :>> ", rowData);
    if (rowData?.type === "RADIOLOGY") {
      const radiologyTestsUniqueId = generateUniqueIdArray(
        rowData?.radiology_tests
      );
      const convertReturnInvoiceData = {
        patient_name: patientData?.patient_name,
        invoice_no: rowData?.invoice_no,
        type: rowData?.type,
        return_invoice_data: radiologyTestsUniqueId,
        invoice_id: rowData?._id,
        paid_amount: rowData?.paid_amount,
      };
      // setReturnInvoiceModalPopupData(convertReturnInvoiceData);
      dispatch(getReturnInvoiceData(convertReturnInvoiceData));
    } else if (rowData?.type === "LABORATORY") {
      const laboratoryTestsUniqueId = generateUniqueIdArray(rowData?.lab_tests);
      const convertReturnInvoiceData = {
        patient_name: patientData?.patient_name,
        invoice_no: rowData?.invoice_no,
        type: rowData?.type,
        return_invoice_data: laboratoryTestsUniqueId,
        invoice_id: rowData?._id,
        paid_amount: rowData?.paid_amount,
      };
      // setReturnInvoiceModalPopupData(convertReturnInvoiceData);
      dispatch(getReturnInvoiceData(convertReturnInvoiceData));
    } else if (rowData?.type === "DIAGNOSIS") {
      const diagnosisServicesUniqueId = generateUniqueIdArray(
        rowData?.diagnosis_services
      );
      const convertReturnInvoiceData = {
        patient_name: patientData?.patient_name,
        invoice_no: rowData?.invoice_no,
        type: rowData?.type,
        return_invoice_data: diagnosisServicesUniqueId,
        invoice_id: rowData?._id,
        paid_amount: rowData?.paid_amount,
      };
      // setReturnInvoiceModalPopupData(convertReturnInvoiceData);
      dispatch(getReturnInvoiceData(convertReturnInvoiceData));
    } else {
      // setReturnInvoiceModalPopupData({});
      dispatch(getReturnInvoiceData({}));
    }
    dispatch(clearSelectedReturnInvoiceData());
    setShowReturnInvoiceModal((prevState) => !prevState);
  };

  // Function for hadling return invoice popup
  const handleRefundReturnInvoiceModal = (selectedRefundInvoice: any) => {
    if (receipt_type === "REFUND") {
      // console.log("selectedRefundInvoice :>> ", selectedRefundInvoice);
      if (selectedRefundInvoice?.type === "RADIOLOGY") {
        const radiologyTestsUniqueId = generateUniqueIdArray(
          selectedRefundInvoice?.radiology_tests
        );
        const convertReturnInvoiceData = {
          patient_name: patientData?.patient_name,
          invoice_no: selectedRefundInvoice?.invoice_no,
          type: selectedRefundInvoice?.type,
          return_invoice_data: radiologyTestsUniqueId,
          invoice_id: selectedRefundInvoice?._id,
          paid_amount: selectedRefundInvoice?.paid_amount,
          outstanding_amount: selectedRefundInvoice?.outstanding_amount,
        };
        // setReturnInvoiceModalPopupData(convertReturnInvoiceData);
        dispatch(getReturnInvoiceData(convertReturnInvoiceData));
        // setShowReturnInvoiceModal((prevState) => !prevState);
      } else if (selectedRefundInvoice?.type === "LABORATORY") {
        const laboratoryTestsUniqueId = generateUniqueIdArray(
          selectedRefundInvoice?.lab_tests
        );
        const convertReturnInvoiceData = {
          patient_name: patientData?.patient_name,
          invoice_no: selectedRefundInvoice?.invoice_no,
          type: selectedRefundInvoice?.type,
          return_invoice_data: laboratoryTestsUniqueId,
          invoice_id: selectedRefundInvoice?._id,
          paid_amount: selectedRefundInvoice?.paid_amount,
          outstanding_amount: selectedRefundInvoice?.outstanding_amount,
        };
        // setReturnInvoiceModalPopupData(convertReturnInvoiceData);
        dispatch(getReturnInvoiceData(convertReturnInvoiceData));
      } else if (selectedRefundInvoice?.type === "DIAGNOSIS") {
        const diagnosisServicesUniqueId = generateUniqueIdArray(
          selectedRefundInvoice?.diagnosis_services
        );
        const convertReturnInvoiceData = {
          patient_name: patientData?.patient_name,
          invoice_no: selectedRefundInvoice?.invoice_no,
          type: selectedRefundInvoice?.type,
          return_invoice_data: diagnosisServicesUniqueId,
          invoice_id: selectedRefundInvoice?._id,
          paid_amount: selectedRefundInvoice?.paid_amount,
          outstanding_amount: selectedRefundInvoice?.outstanding_amount,
        };
        // setReturnInvoiceModalPopupData(convertReturnInvoiceData);
        dispatch(getReturnInvoiceData(convertReturnInvoiceData));
      } else {
        // setReturnInvoiceModalPopupData({});
        dispatch(getReturnInvoiceData({}));
      }
      dispatch(clearSelectedReturnInvoiceData());
      setShowReturnInvoiceModal((prevState) => !prevState);
    }
  };

  const handleOutstandingInvoiceReturn = (returnInvoiceType: string) => {
    const selectedReturnInvoiceValidation =
      returnInvoiceData?.return_invoice_data?.some(
        (item: any) => Number(item?.refund_amt) < 0
      );
    // console.log("returnInvoiceData :>> ", returnInvoiceData);
    let totalRefundAmount = 0;
    returnInvoiceData?.return_invoice_data?.forEach((item: any) => {
      if (item?.refund_amt === undefined) {
        return (totalRefundAmount += 0);
      } else {
        return (totalRefundAmount += Number(item?.refund_amt));
      }
    });
    // console.log("totalRefundAmount :>> ", totalRefundAmount);
    if (returnInvoiceType === "SUBMIT") {
      if (selectedReturnInvoiceValidation) {
        dispatch(
          setMessage({
            message: "Please enter valid refund amount",
            type: failure,
          })
        );
      } else if (totalRefundAmount > Number(returnInvoiceData?.paid_amount)) {
        dispatch(
          setMessage({
            message: "Please enter refund amount less than paid amount",
            type: failure,
          })
        );
      } else {
        const genrateArrayForPayload =
          returnInvoiceData?.return_invoice_data?.map((item: any) => {
            const isInvoiceSelected = selectedReturnInvoiceData?.some(
              (selectedInvoice: any) =>
                selectedInvoice?.return_invoice_id === item?.return_invoice_id
            );
            const { refund_amount, ...rest } = item;
            return {
              ...rest,
              refund_amount: Number(item?.refund_amt) || refund_amount,
              is_return: isInvoiceSelected,
            };
          });
        const payloadData = {
          _id: returnInvoiceData?.invoice_id,
          service_array: genrateArrayForPayload,
        };
        // console.log("genrateArrayForPayload :>> ", payloadData);
        dispatch(deleteOutstandingInovice(requestGenerator(payloadData))).then(
          (e) => {
            if (e.type === `${DELETE_OUTSTANDING_INVOICE_TYPE}/fulfilled`) {
              dispatch(clearSelectedInvoiceData());
              if (receipt_type === "OUTSTANDING") {
                dispatch(
                  getOutstandingInoviceList(
                    requestGenerator(getOutstandingInoviceListPayload)
                  )
                );
              } else if (receipt_type === "REFUND") {
                let payloadData = {
                  patient_id: patientData?.patient_id,
                };
                dispatch(
                  getPatientRefundInoviceList(requestGenerator(payloadData))
                );
              }
              setShowReturnInvoiceModal((prevState) => !prevState);
            }
          }
        );
      }
    } else {
      const payloadData = {
        _id: returnInvoiceData?.invoice_id,
      };
      // console.log("genrateArrayForPayload :>> ", payloadData);
      dispatch(deleteOutstandingInovice(requestGenerator(payloadData))).then(
        (e) => {
          if (e.type === `${DELETE_OUTSTANDING_INVOICE_TYPE}/fulfilled`) {
            dispatch(clearSelectedInvoiceData());
            if (receipt_type === "OUTSTANDING") {
              dispatch(
                getOutstandingInoviceList(
                  requestGenerator(getOutstandingInoviceListPayload)
                )
              );
            } else if (receipt_type === "REFUND") {
              let payloadData = {
                patient_id: patientData?.patient_id,
              };
              dispatch(
                getPatientRefundInoviceList(requestGenerator(payloadData))
              );
            }
            setShowReturnInvoiceModal((prevState) => !prevState);
          }
        }
      );
    }
  };
  // function for handling receipt payment modal
  const receiptPaymentModalOpen = (formData: any) => {
    setReceiptFormData(formData);
    dispatch(clerReceiptPaymentModeData());
    dispatch(updateTotalAdvanceAndRefundAmount(0));
    setShowPaymentReceiptModal((prevState) => !prevState);
    // if (formData?.receipt_type === "OUTSTANDING") {
    //   const invoiceNoArray = selectedInvoiceData?.map((item: any) => item?._id);
    //   const payloadData = {
    //     // change the payload in array form
    //     invoice_ids: invoiceNoArray,
    //     patient_id: formData?.patient_id,
    //   };
    //   dispatch(addReceiptOutStanding(requestGenerator(payloadData))).then(
    //     (e) => {
    //       if (e.type === `${CREATE_RECEIPT_OUTSTANDING_TYPE}/fulfilled`) {
    //         setShowPaymentReceiptModal((prevState) => !prevState);
    //       }
    //     }
    //   );
    // } else if (formData?.receipt_type === "ADVANCE") {
    //   const payloadData = {
    //     invoice_ids: formData?.reference_receipt_no?.value && [
    //       formData?.reference_receipt_no?.value,
    //     ],
    //     patient_id: formData?.patient_id,
    //   };
    //   dispatch(addReceiptAdvance(requestGenerator(payloadData))).then((e) => {
    //     if (e.type === `${CREATE_RECEIPT_ADVANCE_TYPE}/fulfilled`) {
    //       setShowPaymentReceiptModal((prevState) => !prevState);
    //     }
    //   });
    // } else if (formData?.receipt_type === "REFUND") {
    //   const payloadData = {
    //     invoice_ids: [formData?.reference_receipt_no?.value],
    //     patient_id: formData?.patient_id,
    //   };
    //   dispatch(addReceiptRefund(requestGenerator(payloadData))).then((e) => {
    //     if (e.type === `${CREATE_RECEIPT_REFUND_TYPE}/fulfilled`) {
    //       setShowPaymentReceiptModal((prevState) => !prevState);
    //     }
    //   });
    // }
  };

  const receiptPaymentModalClose = () => {
    setValue(PATIENT_NAME, "");
    setValue(FILE_NO, "");
    setValue(MOBILE_NO, "");
    setValue(REFERENCE_RECEIPT_NO, []);
    setValue(RECEIPT_DATE, receipt_date_formated);
    setPrefixValue("");
    setSuffixValue("");
    setPatientData({});
    setReferenceNoList([]);
    dispatch(clearSelectedInvoiceData());
    setReceiptFormData({});
    setUpayPaymentModalPopupData({});
    dispatch(clearCreateReceiptRefundAndAdvanceData());
    dispatch(addUpayAmount(undefined));
    dispatch(addOutstaningReceiptData([]));
    setInvoiceDropDownData([]);
    setShowPaymentReceiptModal((prevState) => !prevState);
  };

  const handleUpdateReceiptPayment = () => {
    const convertPayload = receiptPaymentModeData?.map((item: any) => {
      return {
        payment_mode: item?.payment_mode,
        amount: Number(item?.amount),
        _id: item?._id,
      };
    });
    // console.log("convertPayload :>> ", convertPayload);
    if (receiptFormData?.receipt_type === "OUTSTANDING") {
      const invoiceNoArray = selectedInvoiceData?.map((item: any) => item?._id);
      const payloadData = {
        // receipt_id: createReceiptOutStandingData?.receipt_id,
        invoice_ids: invoiceNoArray,
        patient_id: receiptFormData?.patient_id,
        outstanding_payment: convertPayload,
      };
      // console.log("outstaningpayloadData :>> ", payloadData);
      dispatch(entryReceiptOutStanding(requestGenerator(payloadData))).then(
        (e) => {
          if (e.type === `${UPDATE_RECEIPT_OUTSTANDING_TYPE}/fulfilled`) {
            // console.log("e :>> ", e);
            // entryReceiptAdvanceUpayData?.upay_link
            // e.payload?.upay_link
            if (e.payload?.upay_link) {
              receiptPayOnlineModalOpen();
            } else {
              // setShowPaymentReceiptModal((prevState) => !prevState);
              receiptPaymentModalClose();
            }
          }
        }
      );
    } else if (receiptFormData?.receipt_type === "ADVANCE") {
      const payloadData = {
        // receipt_id: createReceiptAdvanceData?.receipt_id,
        invoice_ids:
          receiptFormData?.reference_receipt_no?.value &&
          receiptFormData?.reference_receipt_no?.value,
        patient_id: receiptFormData?.patient_id,
        advance_payment: convertPayload,
      };
      // receiptPayOnlineModalOpen();
      // console.log("advancepayloadData :>> ", payloadData);
      dispatch(entryReceiptAdvance(requestGenerator(payloadData))).then((e) => {
        if (e.type === `${UPDATE_RECEIPT_ADVANCE_TYPE}/fulfilled`) {
          // console.log("e :>> ", e);
          // entryReceiptAdvanceUpayData?.upay_link
          // e.payload?.upay_link
          // console.log("object :>> ", e.payload);
          if (e.payload?.upay_link) {
            receiptPayOnlineModalOpen();
          } else {
            // setShowPaymentReceiptModal((prevState) => !prevState);
            receiptPaymentModalClose();
          }
        }
      });
    } else if (receiptFormData?.receipt_type === "REFUND") {
      const payloadData = {
        // receipt_id: createReceiptRefundData?.receipt_id,
        invoice_ids:
          receiptFormData?.reference_receipt_no?.value &&
          receiptFormData?.reference_receipt_no?.value,
        patient_id: receiptFormData?.patient_id,
        refund_payment: convertPayload,
      };
      // console.log("refundPayload :>> ", payloadData);
      dispatch(entryReceiptRefund(requestGenerator(payloadData))).then((e) => {
        if (e.type === `${UPDATE_RECEIPT_REFUND_TYPE}/fulfilled`) {
          // setShowPaymentReceiptModal((prevState) => !prevState);
          receiptPaymentModalClose();
        }
      });
    }
  };

  // function for handling receipt payment mode modal
  const receiptPaymentModeModalOpen = () => {
    setShowPaymentModeModal((prevState) => !prevState);
  };

  const receiptPaymentModeModalClose = () => {
    setShowPaymentModeModal((prevState) => !prevState);
  };

  const addPaymentMode = (item: any) => {
    let selectedPaymentModeData = {
      payment_mode: item?.payment_mode_name,
      payment_label: item?.payment_mode_label,
      amount: 0,
      _id: item?.payment_mode_id,
    };
    dispatch(addReceiptPaymentModeData(selectedPaymentModeData));
    setShowPaymentModeModal((prevState) => !prevState);
  };

  // function for handling upay payment mode modal
  const upayPaymentModalOpen = () => {
    if (receiptPaymentModeData?.length > 0) {
      const findUpayPayment = receiptPaymentModeData?.find(
        (item: any) => item?._id === 8
      );
      setUpayPaymentModalPopupData(findUpayPayment);
      setShowUpayPaymentModal((prevState) => !prevState);
    } else {
      setShowUpayPaymentModal((prevState) => !prevState);
    }
  };

  const upayPaymentModalClose = () => {
    setShowUpayPaymentModal((prevState) => !prevState);
  };

  const addUpayMode = (item: any) => {
    const upayModeObject = {
      _id: 8,
      payment_mode: item?.payment_mode,
      payment_label: item?.payment_label,
      amount: Number(item?.amount),
    };
    dispatch(addReceiptUpayModeData(upayModeObject));
    dispatch(addUpayAmount(Number(item?.amount)));
    setShowUpayPaymentModal((prevState) => !prevState);
    // setTimeout(() => {
    //   setShowUpayPaymentModal((prevState) => !prevState);
    // }, 1000);
  };

  // funtion for handling receipt pay online modal
  const receiptPayOnlineModalOpen = () => {
    setShowReceiptPayOnlineModal((prevState) => !prevState);
  };

  const receiptPayOnlineModalClose = () => {
    dispatch(clearUpaylinkData());
    setShowReceiptPayOnlineModal((prevState) => !prevState);
  };

  // funtion for send Upay link
  const sendUpayLink = (item: any) => {
    // console.log("item :>> ", item);
    dispatch(getOnlinePayment(requestGenerator(item))).then((e) => {
      if ((e.type = `${GET_iNVOICE_ONLINE_PAYMENT}/fulfilled`)) {
        receiptPayOnlineModalClose();
        receiptPaymentModalClose();
      }
    });
  };

  return (
    <>
      {isLoading && <Loader />}
      {showPatientSearchModal && (
        <Popup
          Children={SearchModalV2}
          handleClose={handlePatientSearchModal}
          handleRowClick={handleReceiptFormDatra}
          popData={branch_id}
        />
      )}
      {showOutstandingModal && (
        <Popup
          Children={OutstandingModal}
          popData={patientData?.patient_id}
          handleClose={handleOutstandingModal}
          handleYes={handleAddOutstandingList}
          handleOpen={handleOutstandingInvoiceReturnModal}
        />
      )}
      {showDeleteOutstandingModal && (
        <Popup
          Children={DeleteMedicationPopup}
          handleClose={handleDeleteOutstandingModalClose}
          handleNo={handleDeleteOutstandingModalClose}
          handleYes={handleDeleteOutstanding}
        />
      )}
      {showPaymentReceiptModal && (
        <Popup
          Children={ReceiptPaymentModal}
          handleClose={receiptPaymentModalClose}
          handleOpen={receiptPaymentModeModalOpen}
          handleSubmitData={upayPaymentModalOpen}
          handleYes={handleUpdateReceiptPayment}
          popData={receiptFormData}
        />
      )}
      {showPaymentModeModal && (
        <Popup
          Children={AddPaymentModeModal}
          popData={
            receipt_type === "OUTSTANDING"
              ? receiptOutstandingPaymentModeData
              : receiptAdvancePaymentModeData
          }
          handleClose={receiptPaymentModeModalClose}
          handleYes={addPaymentMode}
        />
      )}
      {showUpayPaymentModal && (
        <Popup
          Children={PaymentLinkModal}
          popData={upayPaymentModalPopupData}
          handleClose={upayPaymentModalClose}
          setModelOpenClose={addUpayMode}
        />
      )}
      {showReceiptPayOnlineModal && (
        <Popup
          Children={ReceiptPayOnlineModal}
          handleClose={receiptPayOnlineModalClose}
          handleSubmitData={sendUpayLink}
          popData={receiptFormData}
        />
      )}
      {showReturnInvoiceModal && (
        <Popup
          Children={ReturnInvoiceModal}
          // popData={returnInvoiceModalPopupData}
          handleYes={handleOutstandingInvoiceReturn}
          handleClose={() => handleOutstandingInvoiceReturnModal({})}
        />
      )}
      {/* {showOutstandingDeleteModal && (
        <Popup
          Children={DeleteMedicationPopup}
          handleClose={handleOutstandingDeleteModalClose}
          handleNo={handleOutstandingDeleteModalClose}
          handleYes={handleOutstandingModalDelete}
        />
      )} */}
      <div className={styles.requestContainer}>
        <div className={styles.pageWrapper}>
          <div className={styles.userDeatailAndFormContainer}>
            <div className={styles.userDetails}>
              <div className={styles.userDetailLabel}>
                <p className={styles.userDetailLableText}>User Name:</p>
                <p className={styles.userDetailText}>{userData?.name}</p>
              </div>
              <div className={styles.userDetailLabel}>
                <p className={styles.userDetailLableText}>Date:</p>
                <p className={styles.userDetailText}>{today_date_formated}</p>
              </div>
            </div>
            <form
              className={styles.receiptFormContainer}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={styles.radioBtnContainer}>
                <div className={styles.singlRadioBtnConatainer}>
                  <label htmlFor="outStanding" className={styles.radioLabel}>
                    <input
                      className={styles.radioInput}
                      type="radio"
                      id="outStanding"
                      value="OUTSTANDING"
                      {...register(RECEIPT_TYPE)}
                    />
                    <span className={styles.customRadio} />
                    <p className={styles.radioLabelTxt}>Outstanding</p>
                  </label>
                </div>
                <div className={styles.singlRadioBtnConatainer}>
                  <label htmlFor="advance" className={styles.radioLabel}>
                    <input
                      className={styles.radioInput}
                      type="radio"
                      id="advance"
                      value="ADVANCE"
                      {...register(RECEIPT_TYPE)}
                    />
                    <span className={styles.customRadio} />
                    <p className={styles.radioLabelTxt}>Advance</p>
                  </label>
                </div>
                <div className={styles.singlRadioBtnConatainer}>
                  <label htmlFor="refund" className={styles.radioLabel}>
                    <input
                      className={styles.radioInput}
                      type="radio"
                      id="refund"
                      value="REFUND"
                      {...register(RECEIPT_TYPE)}
                    />
                    <span className={styles.customRadio} />
                    <p className={styles.radioLabelTxt}>Refund</p>
                  </label>
                </div>
              </div>
              <div className={styles.formFieldContainer}>
                <div className={styles.inputFieldContainer}>
                  <label htmlFor={BRANCH_TYPE} className={styles.formLabel}>
                    Branch
                    <span className="asterick">*</span>
                  </label>
                  <div className={styles.fieldAndErrorTxtContainer}>
                    <Select
                      className={styles.selectInputField}
                      placeholder="Select Branch"
                      closeMenuOnSelect={true}
                      components={{ DropdownIndicator }}
                      defaultValue={defaultBranch}
                      options={branchDropDownData}
                      {...register(BRANCH_TYPE)}
                      isSearchable={false}
                      onChange={(e: any) => {
                        setValue(BRANCH_TYPE, e.value);
                        trigger(BRANCH_TYPE);
                      }}
                      maxMenuHeight={200}
                    />
                    {errors[BRANCH_TYPE] && (
                      <p className={styles.formError}>
                        {errors[BRANCH_TYPE].message}
                      </p>
                    )}
                  </div>
                </div>
                <div className={styles.inputFieldContainer}>
                  <label htmlFor={PATIENT_NAME} className={styles.formLabel}>
                    Patient Name
                    <span className="asterick">*</span>
                  </label>
                  <div className={styles.fieldAndErrorTxtContainer}>
                    <div className={styles.searchFieldContainer}>
                      <input
                        type="text"
                        placeholder={"Select Patient Name"}
                        className={styles.inputField}
                        {...register(
                          PATIENT_NAME,
                          receiptValidators[PATIENT_NAME]
                        )}
                        disabled
                      />
                      <SearchIcon
                        fillColor="#797979"
                        customClass={styles.searchIconStyle}
                        handleClick={handlePatientSearchModal}
                      />
                    </div>

                    {errors[PATIENT_NAME] && (
                      <p className={styles.formError}>
                        {errors[PATIENT_NAME].message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.formFieldContainer}>
                <div className={styles.inputFieldContainer}>
                  <label htmlFor={FILE_NO} className={styles.formLabel}>
                    File No
                    <span className="asterick">*</span>
                  </label>
                  <div className={styles.fieldAndErrorTxtContainer}>
                    <div className={styles.fileNoFieldContainer}>
                      <input
                        type="text"
                        className={styles.disableInputFieldBranchInitials}
                        disabled={true}
                        value={prefixValue}
                      />
                      <input
                        type="text"
                        className={styles.disableInputFieldFileNo}
                        disabled={true}
                        value={suffixValue}
                      />
                    </div>
                    {errors[FILE_NO] && (
                      <p className={styles.formError}>
                        {errors[FILE_NO].message}
                      </p>
                    )}
                  </div>
                </div>
                <div className={styles.inputFieldContainer}>
                  <label htmlFor={MOBILE_NO} className={styles.formLabel}>
                    Mobile No.
                    <span className="asterick">*</span>
                  </label>
                  <div className={styles.fieldAndErrorTxtContainer}>
                    <PhoneInput
                      country={"kw"}
                      {...register(MOBILE_NO, receiptValidators[MOBILE_NO])}
                      value={getValues(MOBILE_NO)}
                      onChange={(phone: any) => {
                        const formattedPhone = phone && `+${phone}`;
                        setValue(MOBILE_NO, formattedPhone);
                        trigger(MOBILE_NO);
                      }}
                      inputClass={styles.phoneNumberInput}
                    />
                    {errors[MOBILE_NO] && (
                      <p className={styles.formError}>
                        {errors[MOBILE_NO].message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.formFieldContainer}>
                <div
                  className={[
                    styles.inputFieldContainer,
                    styles.selectFieldContainer,
                  ].join(" ")}
                >
                  <label
                    htmlFor={REFERENCE_RECEIPT_NO}
                    className={styles.formLabel}
                  >
                    Reference Invoice No.
                    {/* <span className="asterick">*</span> */}
                    {receipt_type === "OUTSTANDING" ? (
                      <span className="asterick">*</span>
                    ) : (
                      ""
                    )}
                  </label>
                  <div className={styles.fieldAndErrorTxtContainer}>
                    <Select
                      className={styles.selectInputField}
                      placeholder="Select Invoice No"
                      isMulti={receipt_type === "OUTSTANDING" ? true : false}
                      isDisabled={receipt_type === "OUTSTANDING" ? true : false}
                      options={invoiceDropDownData}
                      value={
                        receipt_type === "OUTSTANDING"
                          ? referenceNoList
                          : selectedInvoice
                      }
                      closeMenuOnSelect={true}
                      components={{ DropdownIndicator }}
                      {...register(
                        REFERENCE_RECEIPT_NO,
                        receiptValidators[REFERENCE_RECEIPT_NO]
                      )}
                      isSearchable={false}
                      onChange={(e: any) => {
                        setValue(REFERENCE_RECEIPT_NO, e);
                        trigger(REFERENCE_RECEIPT_NO);
                        handleRefundReturnInvoiceModal(e);
                      }}
                      maxMenuHeight={200}
                    />
                    {errors[REFERENCE_RECEIPT_NO] && (
                      <p className={styles.formError}>
                        {errors[REFERENCE_RECEIPT_NO].message as any}
                      </p>
                    )}
                  </div>
                </div>
                <div className={styles.inputFieldContainer}>
                  <label htmlFor={RECEIPT_DATE} className={styles.formLabel}>
                    Receipt Date
                    <span className="asterick">*</span>
                  </label>
                  <div className={styles.fieldAndErrorTxtContainer}>
                    <input
                      type="date"
                      placeholder={"Enter Receipt Date"}
                      className={styles.inputField}
                      max="9999-12-31"
                      {...register(
                        RECEIPT_DATE,
                        receiptValidators[RECEIPT_DATE]
                      )}
                    />
                    {errors[RECEIPT_DATE] && (
                      <p className={styles.formError}>
                        {errors[RECEIPT_DATE].message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.receiptBtnContainer}>
                {receipt_type === "OUTSTANDING" ? (
                  <Button
                    title="Select Outstanding Bills"
                    type="button"
                    customClass={styles.outStandingBtn}
                    handleClick={handleOutstandingModal}
                    disable={patientData?.patient_id ? false : true}
                  />
                ) : (
                  <Button
                    title="Proceed To Payment"
                    type="submit"
                    customClass={styles.outStandingBtn}
                  />
                )}
              </div>
            </form>
          </div>
          {receipt_type === "OUTSTANDING" &&
            selectedInvoiceData?.length > 0 && (
              <div className={styles.outStandingContainer}>
                <TableV2
                  tableHeaderData={receiptOutstandingHeaderData}
                  tableRowData={selectedInvoiceData}
                  active={false}
                  handleClick={handleDeleteOutstandingModalOpen}
                />

                {selectedInvoiceData?.length > 0 && (
                  <div className={styles.outStandingBtnContainer}>
                    <p className={styles.totalOutstandingAmountTxt}>
                      Total Outstanding Amount: ${" "}
                      {totalSelectedOutstanding?.toFixed(3)}
                    </p>
                    <Button
                      title="Proceed To Payment"
                      type="submit"
                      handleClick={handleSubmit(onSubmit)}
                      customClass={styles.outStandingBtn}
                    />
                  </div>
                )}
              </div>
            )}
        </div>
        <div className={styles.floatingBarConatainer}>
          <FloatingBar floatingBarData={receiptFloatingBarData} />
        </div>
      </div>
    </>
  );
};

export default Receipt;
