import { FC, useState, useEffect } from 'react';
import styles from './insuranceMaster.module.scss';
import { trimValue } from '../../utils/utils';
import {
  AddButtonIcon,
  SearchButton,
} from '../../components/common/svg-components';
import TableV2 from '../../components/common/table/tableV2/TableV2';
import { inusranceMasterHeaderData } from '../../constants/table-data/insuranceMasterData';
import Select from 'react-select';
import { colors } from '../../constants/color';
import Popup from '../../components/common/popup/Popup';
import AddMarketPlacePopup from '../../components/common/modal/add-market-place-popup/AddMarketPlacePopup';
import AddInsuranceCompanyPopup from '../../components/common/modal/add-insurance-company-popup/AddInsuranceCompanyPopup';
import AddInsurancePlan from '../../components/common/modal/add-insurance-plan/AddInsurancePlan';
import DepartmentServicesPopup from '../../components/common/modal/department-services-popup/DepartmentServicesPopup';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  allInsuarncePlan,
  getAllInsuarnceCompany,
  getAllInsuarncePlan,
  getAllmarketplace,
  getInsuranceCompany,
  getInsurancePlan,
  getMarketplace,
} from '../../redux/features/insurance/insuranceAsyncActions';
import { requestGenerator } from '../../utils/payloadGenerator';
import PrescriptionPopup from '../../components/common/modal/prescription-popup/PrescriptionPopup';
import ViewDocumentPopup from '../../components/common/modal/view-document-popup/ViewDocumentPopup';
import DepartmentInsuranceConfig from '../../components/common/modal/department-insurance-config/DepartmentInsuranceConfig';
import Pagination from '../../components/common/pagination/Pagination';
import Loader from '../../components/common/spinner/Loader';
import Button from '../../components/common/button/Button';
import {
  clearDepartmentService,
  clearDepartmentServiceData,
  clearDeptServiceData,
  clearInsuranceCompanyData,
  clearInsuranceCompanyDetail,
  clearMarketplaceDetail,
  clearPlanDepartment,
  clearInsurancePlanDetail,
} from '../../redux/features/insurance/insuranceSlice';
import DepartmentListEditPopup from '../../components/common/modal/department-list-edit-popup/DepartmentListEditPopup';
import DeleteMedicationPopup from '../../components/common/modal/delete-medication-popup/DeleteMedicationPopup';
import { getAllDepartment } from '../../redux/features/department/departmentAsyncActions';
import { setMessage } from '../../redux/features/toast/toastSlice';
import { failure } from '../../constants/data';

interface IInsuranceMaster {}

const InsuranceMaster: FC<IInsuranceMaster> = () => {
  const dispatch = useAppDispatch();
  const [showMarket, setShowMarket] = useState(false);
  const [showInsurance, setShowInsurance] = useState(false);
  const [showPlan, setShowPlan] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showRemarks, setShowRemarks] = useState(false);
  const [showDocument, setShowDocument] = useState(false);
  const [showRemarksData, setShowRemarkData] = useState({});
  const [marketplaceId, setMarketplaceId] = useState('');
  const [insuranceCompanyId, setInsuranceCompanyId] = useState('');
  const [insurancePlanId, setInsurancePlanId] = useState('');
  const [selectInsurance, setSelectInsurance] = useState(null);
  const [selectPlan, setSelectPlan] = useState(null);
  const [selectMarket, setSelectMarket] = useState(null);
  const [plan, setPlan] = useState('');
  const [showDepartmentConfig, setShowDepartmentConfig] = useState(false);
  const [departmentVal, setDepartmentVal] = useState();
  const [departmentConfigData, setDepartmentConfigData] = useState([] as any);
  const [departmentIds, setDepartmentIds] = useState([] as any);
  const [departmentIdData, setDepartmentIdData] = useState([] as any);
  const [serviceData, setServiceData] = useState([] as any);
  const [documentData, setDocumentData] = useState();
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [showDepartmentEdit, setShowDepartmentEdit] = useState(false);
  const [departmentListData, setDepartmentListData] = useState<any>();
  const [deleteDepartment, setDeleteDepartment] = useState(false);
  const [deleteDept, setDeleteDept] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [planId, setPlanId] = useState('');
  const { palnDepartmentList, insurancePlanDetail } = useAppSelector(
    (state) => state.insurance
  );

  const {
    isLoading,
    marketplaceData,
    insuranceCompanyData,
    insurancePlanData,
    allInsurancePlan,
    loading,
  } = useAppSelector((state) => state.insurance);

  let dataObject = {
    departments: departmentConfigData,
    services: serviceData,
  };

  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };

  const pageIndexOptions = pageIndexArray();

  useEffect(() => {
    dispatch(getAllmarketplace(requestGenerator({})));
  }, []);

  useEffect(() => {
    if (plan === '') {
      let reqData = {
        plan_name: insurancePlanId,
        company_id: insuranceCompanyId,
        company_name: '',
        marketplace_id: marketplaceId,
        marketplace_name: '',
        page: pageIndex,
        pageSize: dataPerPage,
      };
      dispatch(allInsuarncePlan(requestGenerator(reqData))).then((result) => {
        setTotalPage(result.payload.lastPage);
      });
    }
  }, [pageIndex, dataPerPage]);

  useEffect(() => {
    if (
      insurancePlanId !== '' ||
      insuranceCompanyId !== '' ||
      marketplaceId !== ''
    ) {
      let reqData = {
        plan_name: insurancePlanId,
        company_id: insuranceCompanyId,
        company_name: '',
        marketplace_id: marketplaceId,
        marketplace_name: '',
        page: pageIndex,
        pageSize: dataPerPage,
      };
      if (!edit) {
        dispatch(allInsuarncePlan(requestGenerator(reqData))).then((result) => {
          setTotalPage(result.payload.lastPage);
        });
      }
    }
  }, [
    marketplaceId,
    insuranceCompanyId,
    insurancePlanId,
    pageIndex,
    dataPerPage,
  ]);

  useEffect(() => {
    let reqData = {
      plan_name: '',
      company_id: '',
      company_name: '',
      marketplace_id: '',
      marketplace_name: '',
      page: pageIndex,
      pageSize: dataPerPage,
    };
    if (edit) {
      dispatch(allInsuarncePlan(requestGenerator(reqData))).then((result) => {
        setTotalPage(result.payload.lastPage);
      });
    }
  }, [edit]);

  useEffect(() => {
    if (marketplaceId !== '') {
      let payloadData = {
        marketplace_id: marketplaceId,
      };
      dispatch(getAllInsuarnceCompany(requestGenerator(payloadData)));
    }
  }, [marketplaceId]);

  useEffect(() => {
    if (marketplaceId !== '') {
      let payloadData = {
        marketplace_id: marketplaceId,
      };
      if (edit) {
        dispatch(getMarketplace(requestGenerator(payloadData)));
      }
    }
  }, [marketplaceId, edit]);

  useEffect(() => {
    if (marketplaceId !== '') {
      setInsurancePlanId('');
      setInsuranceCompanyId('');
    }
  }, [marketplaceId]);

  useEffect(() => {
    if (insuranceCompanyId !== '') {
      let payloadData = {
        plan_name: '',
        company_id: insuranceCompanyId,
        company_name: '',
        marketplace_id: marketplaceId,
        marketplace_name: '',
        page: pageIndex,
        pageSize: dataPerPage,
      };
      dispatch(getAllInsuarncePlan(requestGenerator(payloadData)));
    }
  }, [insuranceCompanyId, pageIndex, dataPerPage]);

  useEffect(() => {
    if (insuranceCompanyId !== '') {
      if (edit) {
        dispatch(
          getInsuranceCompany(
            requestGenerator({ company_id: insuranceCompanyId })
          )
        );
      }
    }
  }, [insuranceCompanyId, edit]);

  const handleRemarks = (data: any) => {
    setShowRemarks(!showRemarks);
    setShowRemarkData(data);
  };

  const handleDepartmentEdit = (data: any) => {
    setShowDepartmentEdit(!showDepartmentEdit);
    setDepartmentListData(data);
  };

  const handleDocument = (data: any) => {
    dispatch(getInsurancePlan(requestGenerator({ plan_id: data }))).then(
      (e) => {
        if (e.type === 'insurance/getInsurancePlan/fulfilled') {
          setShowDocument(!showDocument);
        }
      }
    );
  };

  const handleSearch = () => {
    let reqData = {
      plan_name: plan,
      company_id: insuranceCompanyId,
      company_name: '',
      marketplace_id: marketplaceId,
      marketplace_name: '',
      page: 1,
      pageSize: 10,
    };
    setPageIndex(1);
    dispatch(allInsuarncePlan(requestGenerator(reqData))).then((result) => {
      setTotalPage(result.payload.lastPage);
    });
  };

  const handleClear = () => {
    setSelectMarket(null);
    setSelectInsurance(null);
    setSelectPlan(null);
    setMarketplaceId('');
    setInsuranceCompanyId('');
    setPlan('');
    let reqData = {
      plan_name: '',
      company_id: '',
      company_name: '',
      marketplace_id: '',
      marketplace_name: '',
      page: 1,
      pageSize: 10,
    };
    setPageIndex(1);
    if (edit === false) {
      dispatch(allInsuarncePlan(requestGenerator(reqData))).then((result) => {
        setTotalPage(result.payload.lastPage);
      });
    }
    dispatch(clearInsuranceCompanyData());
    dispatch(clearDepartmentServiceData());
    clearAllInsuranceInfo();
    setPlanId('');
    setEdit(false);
  };

  useEffect(() => {
    if (showPlan === false) {
      handleClear();
      setServiceData([]);
      setDepartmentIds([]);
      dispatch(clearPlanDepartment());
      dispatch(clearDepartmentService());
      setInsurancePlanId('');
      dispatch(clearInsurancePlanDetail());
    }
  }, [showPlan]);

  useEffect(() => {
    if (showDepartmentEdit === false) {
      setDepartmentListData({});
    }
  }, [showDepartmentEdit]);

  useEffect(() => {
    if (showServices === false) {
      dispatch(clearDeptServiceData());
    }
  }, [showServices]);

  const clearAllInsuranceInfo = () => {
    dispatch(clearMarketplaceDetail());
    dispatch(clearInsuranceCompanyDetail());
    dispatch(clearInsurancePlanDetail());
  };

  useEffect(() => {
    if (edit === false) {
      clearAllInsuranceInfo();
    }
  }, [edit]);

  const clearAllState = () => {
    clearAllInsuranceInfo();
    setSelectMarket(null);
    setSelectInsurance(null);
    setSelectPlan(null);
    setMarketplaceId('');
    setInsuranceCompanyId('');
    setPlan('');
  };

  useEffect(() => {
    if (edit === true && showMarket === false) {
      clearAllState();
    }
  }, [showMarket]);

  useEffect(() => {
    if (edit === true && showInsurance === false) {
      clearAllState();
    }
  }, [showInsurance]);

  useEffect(() => {
    if (edit === true && showPlan === false) {
      clearAllState();
    }
  }, [showPlan]);

  useEffect(() => {
    if (edit) {
      dispatch(getInsurancePlan(requestGenerator({ plan_id: planId })));
    }
  }, [planId, edit]);

  useEffect(() => {
    let data = {
      search: '',
      page: '',
      pageSize: 10000,
    };
    dispatch(getAllDepartment(requestGenerator(data)));
  }, []);

  useEffect(() => {
    if (showDocument === false) {
      dispatch(clearInsurancePlanDetail());
    }
  }, [showDocument]);

  // useEffect(() => {
  //   if (edit === true && selectMarket !== null) {
  //     setSelectMarket(null);
  //   }
  // }, [edit]);

  return (
    <>
      {isLoading && <Loader />}
      {loading && <Loader />}

      {showMarket && (
        <Popup
          Children={AddMarketPlacePopup}
          handleClose={() => setShowMarket(false)}
          setModelOpenClose={setShowMarket}
        />
      )}
      {showInsurance && (
        <Popup
          Children={AddInsuranceCompanyPopup}
          handleClose={() => setShowInsurance(false)}
          setModelOpenClose={setShowInsurance}
          popData={selectMarket}
        />
      )}
      {showPlan && (
        <Popup
          Children={AddInsurancePlan}
          handleClose={() => {
            setShowPlan(false);
            setServiceData([]);
            // handleClear();
          }}
          setModelOpenClose={setShowPlan}
          handleDepartment={() => {
            if (
              palnDepartmentList?.length > 0 ||
              insurancePlanDetail?.departments?.length > 0
            ) {
              setShowServices(!showServices);
            } else {
              let toastData = {
                message: 'Please select department first',
                type: failure,
              };
              dispatch(setMessage(toastData));
            }
          }}
          handleDepartmentServiceConfig={() => {
            setShowDepartmentEdit(true);
            // setDepartmentVal(item?.option?.value);
            // if (item?.option && item?.action !== 'remove-value') {
            //   setShowDepartmentConfig(!showDepartmentConfig);
            // } else if (item?.action === 'clear') {
            //   setDepartmentIds([]);
            // }
          }}
          popData={dataObject}
          headerData={departmentIds}
          branchId={selectInsurance}
        />
      )}

      {showDepartmentConfig && (
        <Popup
          Children={DepartmentInsuranceConfig}
          handleClose={() => setShowDepartmentConfig(false)}
          setModelOpenClose={setShowDepartmentConfig}
          popData={departmentVal}
          handleSubmitData={(item: any) => {
            setDepartmentConfigData((prevDataArray: any) => {
              if (!prevDataArray.includes(item)) {
                return [...prevDataArray, item];
              }
              return prevDataArray;
            });
            setDepartmentIds((prevDataArray: any) => {
              if (!prevDataArray.includes(item)) {
                return [...prevDataArray, item];
              }
              return prevDataArray;
            });
          }}
        />
      )}

      {showServices && (
        <Popup
          Children={DepartmentServicesPopup}
          handleClose={() => {
            setShowServices(false);
            dispatch(clearDepartmentServiceData());
          }}
          setModelOpenClose={setShowServices}
          popData={departmentIdData}
          handleSubmitData={(data: any) => setServiceData(data)}
        />
      )}

      {showRemarks && (
        <Popup
          Children={PrescriptionPopup}
          handleClose={() => setShowRemarks(false)}
          popData={showRemarksData}
        />
      )}

      {showDepartmentEdit && (
        <Popup
          Children={DepartmentListEditPopup}
          handleClose={() => setShowDepartmentEdit(false)}
          setModelOpenClose={setShowDepartmentEdit}
          popData={departmentListData}
          deleteDepartment={deleteDepartment}
          setDeleteDepartment={setDeleteDepartment}
          deleteFlag={deleteFlag}
          setDeleteFlag={setDeleteFlag}
          headerData={{
            plan_name: insurancePlanId,
            company_id: insuranceCompanyId,
            company_name: '',
            marketplace_id: marketplaceId,
            marketplace_name: '',
            page: pageIndex,
            pageSize: dataPerPage,
          }}
        />
      )}

      {deleteDepartment && (
        <Popup
          Children={DeleteMedicationPopup}
          handleClose={() => {
            setDeleteDepartment(false);
            setDeleteFlag(false);
          }}
          handleNo={() => {
            setDeleteDepartment(false);
            setDeleteFlag(false);
          }}
          handleYes={() => {
            setDeleteDept(true);
            setDeleteDepartment(false);
            setDeleteFlag(true);
          }}
        />
      )}

      {showDocument && (
        <Popup
          Children={ViewDocumentPopup}
          handleClose={() => setShowDocument(false)}
        />
      )}

      <div className={styles.mainContainer}>
        <div className={styles.filterContainer}>
          <div className={styles.companyFilter}>
            <div className={styles.filterLable}>
              <label className={styles.labelText}>Marketplace Company</label>
              <Select
                className={styles.select}
                placeholder="Marketplace Company"
                closeMenuOnSelect={true}
                isSearchable={true}
                options={marketplaceData?.map((item: any) => ({
                  label: item?.marketplace_name,
                  value: item?._id,
                }))}
                onChange={(e: any) => {
                  setMarketplaceId(e?.value);
                  setSelectInsurance(null);
                  setSelectPlan(null);
                  setSelectMarket(e);
                  setPlan('');
                }}
                value={selectMarket}
                maxMenuHeight={200}
              />
              <AddButtonIcon
                fillColor={colors.green1}
                handleClick={() => {
                  if (
                    (edit === true && selectMarket !== null) ||
                    edit === false
                  ) {
                    setShowMarket(true);
                  }
                }}
                customClass={styles.iconStyle}
              />
            </div>
            <div className={styles.filterLable}>
              <label className={styles.labelText}>Insurance Company</label>
              <Select
                className={styles.select}
                placeholder="Insurance Company"
                closeMenuOnSelect={true}
                isSearchable={true}
                options={insuranceCompanyData?.data?.map((item: any) => ({
                  label: item?.insurance_company_name,
                  value: item?._id,
                }))}
                value={selectInsurance}
                onChange={(e: any) => {
                  setInsuranceCompanyId(e?.value);
                  setSelectInsurance(e);
                  setSelectPlan(null);
                }}
                isDisabled={marketplaceId?.length > 0 ? false : true}
                maxMenuHeight={200}
              />
              <AddButtonIcon
                fillColor={colors.green1}
                handleClick={() => {
                  // selectMarket !== null && setShowInsurance(!showInsurance);
                  if (
                    (edit === true && selectInsurance !== null) ||
                    (edit === false && selectMarket !== null)
                  ) {
                    setShowInsurance(true);
                  }
                }}
              />
            </div>
          </div>
          <div className={styles.filterLable}>
            <label className={styles.labelText}>Insurance Plan</label>
            <Select
              className={styles.select}
              placeholder="Insurance Plan"
              closeMenuOnSelect={true}
              isSearchable={true}
              options={insurancePlanData?.map((item: any) => ({
                label: item?.insurance_plan,
                value: item?._id,
              }))}
              value={selectPlan}
              onChange={(e: any) => {
                setSelectPlan(e);
                setInsurancePlanId(e.label);
                setPlanId(e.value);
              }}
              isDisabled={insuranceCompanyId.length > 0 ? false : true}
              maxMenuHeight={200}
            />
            <AddButtonIcon
              fillColor={colors.green1}
              handleClick={() => {
                if (
                  (edit === true && selectPlan !== null) ||
                  (edit === false && selectInsurance !== null)
                ) {
                  setShowPlan(true);
                }
              }}
            />
            <Button
              title="Reset"
              handleClick={handleClear}
              customClass={styles.btnStyle}
            />
            <Button
              title={edit ? 'Edit On' : 'Edit Off'}
              handleClick={() => setEdit(!edit)}
              customClass={styles.btnStyle}
            />
          </div>
        </div>
        <div className={styles.inputFieldContainer}>
          <input
            type="text"
            className={styles.inputSearchContainer}
            placeholder="Search by plan name"
            value={plan}
            onChange={(e) => {
              trimValue(e);
              setPlan(e.target.value);
              if (e.target.value === '') {
                let reqData = {
                  plan_name: '',
                  company_id: insuranceCompanyId,
                  company_name: '',
                  marketplace_id: marketplaceId,
                  marketplace_name: '',
                  page: pageIndex,
                  pageSize: dataPerPage,
                };
                dispatch(allInsuarncePlan(requestGenerator(reqData))).then(
                  (result) => {
                    setTotalPage(result.payload.lastPage);
                  }
                );
                setSelectPlan(null);
                setInsurancePlanId('');
              }
            }}
          />
          <SearchButton
            handleClick={() => handleSearch()}
            customClass={styles.inputSearchButton}
          />
        </div>
        <div className={styles.tableConatiner}>
          <TableV2
            tableHeaderData={inusranceMasterHeaderData}
            tableRowData={allInsurancePlan}
            handleClick={handleRemarks}
            setModelOpenClose={handleDocument}
            active={false}
            handleRowClick={handleDepartmentEdit}
          />
          <Pagination
            setDataPerPage={setDataPerPage}
            pageIndexOptions={pageIndexOptions}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
          />
        </div>
      </div>
    </>
  );
};

export default InsuranceMaster;
