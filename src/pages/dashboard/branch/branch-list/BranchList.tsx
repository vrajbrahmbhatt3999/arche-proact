import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Select from 'react-select';
import ButtonGroups from '../../../../components/common/button-group/ButtonGroups';
import StatusConfirmationPopup from '../../../../components/common/modal/status-confirmation-popup/StatusConfirmationPopup';
import UserLicensePopup from '../../../../components/common/modal/user-license-popup/UserLicensePopup';
import Pagination from '../../../../components/common/pagination/Pagination';
import Popup from '../../../../components/common/popup/Popup';
import Loader from '../../../../components/common/spinner/Loader';
import {
  InfoIcon,
  SearchButton,
} from '../../../../components/common/svg-components';
import Table from '../../../../components/common/table/Table';
import { colors } from '../../../../constants/color';
import { medicalCenterBranchTableHeader } from '../../../../constants/data';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  getAllBranch,
  getAllBranchDropDownData,
} from '../../../../redux/features/branch/branchAsyncActions';
import { requestGenerator } from '../../../../utils/payloadGenerator';
import makeAnimated from 'react-select/animated';
import styles from './branchList.module.scss';
import {
  clearBranchInfo,
  clearBranchData,
} from '../../../../redux/features/branch/branchSlice';
import DefaultBranchPopup from '../../../../components/common/modal/default-branch-popup/DefaultBranchPopup';
import { getPatientBranchList } from '../../../../redux/features/patient-emr/patient/patientAsyncAction';
import { trimValue } from '../../../../utils/utils';

interface IBranchList {}

const BranchList: FC<IBranchList> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, branchData, allBranchDropDownData } = useAppSelector(
    (state) => state.branch
  );

  const [showUserLicense, setShowUserLicense] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const [toggleValue, setToggleValue] = useState();
  const [toggleData, setToggleData] = useState({});
  const [confirm, setConfirm] = useState<boolean>(false);
  const [searchBranch, setSearchBranch] = useState<string>('');
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const animatedComponents = makeAnimated();
  const [isDefaultN, setIsDefault] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [showDefault, setShowDefault] = useState<boolean>(false);
  const [defaultData, setDefaultData] = useState({ label: '', value: '' });
  const [isBranchDefault, setIsBranchDefault] = useState<boolean>(false);
  const { patientBranchList } = useAppSelector((state) => state.patient);

  let filterData = branchData.filter((item: any) => item.is_active === true);

  const branchListData = filterData.map((item: any) => {
    if (item.is_active == true) {
      return { name: item?.name, id: item?._id };
    }
  });

  useEffect(() => {
    let data = {
      // search: searchBranch,
      page: 1,
      pageSize: 1000,
      order_by: { is_default: -1 },
    };
    dispatch(getAllBranchDropDownData(requestGenerator(data)));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPatientBranchList(requestGenerator({})));
  }, [dispatch]);

  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };

  const pageIndexOptions = pageIndexArray();

  useEffect(() => {
    let data = {
      search: searchBranch,
      page: pageIndex,
      pageSize: dataPerPage,
      order_by: { is_default: -1 },
    };
    dispatch(getAllBranch(requestGenerator(data))).then((result) =>
      setTotalPage(result.payload.lastPage)
    );
    setIsBranchDefault(branchData[0]?.is_default);
    return () => {
      dispatch(clearBranchData());
    };
  }, [dispatch, pageIndex, dataPerPage]);

  useEffect(() => {
    if (searchBranch === '') {
      let data = {
        search: '',
        page: pageIndex,
        pageSize: dataPerPage,
        order_by: { is_default: -1 },
      };
      dispatch(getAllBranch(requestGenerator(data))).then((result) =>
        setTotalPage(result.payload.lastPage)
      );
      setIsBranchDefault(branchData[0]?.is_default);
    }
  }, [dispatch, searchBranch]);

  const handleSearch = () => {
    setPageIndex(1);
    let data = {
      search: searchBranch,
      page: pageIndex,
      pageSize: dataPerPage,
      order_by: { is_default: -1 },
    };
    dispatch(getAllBranch(requestGenerator(data))).then((result) =>
      setTotalPage(result.payload.lastPage)
    );
    setIsBranchDefault(branchData[0]?.is_default);
  };

  const handleEdit = (item: any) => {
    navigate('managebranch', {
      state: { id: item?._id },
    });
  };

  const handleActiveBranch = (item: any) => {
    console.log('first');
    setConfirm(!confirm);
    setToggleData(item);
    setToggle(item.is_active);
    setToggleValue(item?._id);
  };

  const handleUserLicense = () => {
    setShowUserLicense(!showUserLicense);
  };

  const handleDefaultBranch = (item: any) => {
    setShowDefault(!showDefault);
    setDefaultData(item);
    setSearchBranch('');
  };

  const customStyles = {
    option: (provided: any) => ({
      ...provided,
      padding: '10px',
    }),
    optionHover: (provided: any) => ({
      ...provided,
      margin: '0px !important',
    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      cursor: 'pointer',
    }),
  };

  useEffect(() => {
    if (confirm === false) {
      setSearchBranch('');
      setDataPerPage(10);
      setPageIndex(1);
    }
  }, [confirm]);

  return (
    <>
      {isLoading && <Loader />}
      {showUserLicense && (
        <Popup
          Children={UserLicensePopup}
          handleClose={() => setShowUserLicense(!showUserLicense)}
        />
      )}
      {confirm && (
        <Popup
          popData={toggleData}
          Children={StatusConfirmationPopup}
          handleClose={() => {
            setConfirm(false);
            setSearchBranch('');
          }}
        />
      )}
      {showDefault && (
        <Popup
          popData={defaultData}
          Children={DefaultBranchPopup}
          handleClose={() => {
            setShowDefault(false);
          }}
          handleNo={() => {
            setDefaultData({ label: '', value: '' });
          }}
          isDefault={isDefaultN}
          setIsDefault={setIsDefault}
        />
      )}

      <div className={styles.branchListContainer}>
        <div className={styles.searchFilter}>
          <div className={styles.searchContainer}>
            <div className={styles.inputFieldContainer}>
              <input
                type="text"
                className={styles.inputSearchContainer}
                placeholder="Search by branch name"
                onChange={(e) => {
                  trimValue(e);
                  setSearchBranch(e.target.value);
                }}
                value={searchBranch}
              />
              <SearchButton
                handleClick={() => handleSearch()}
                customClass={styles.inputSearchButton}
              />
            </div>
          </div>
          <div className={styles.dropDownContainer}>
            <p className={styles.dropDownTitle}>Default Branch</p>
            {patientBranchList?.defaultBranch?.name === undefined ? (
              <>
                <Select
                  options={allBranchDropDownData?.map((item: any) => ({
                    label: item?.name,
                    value: item?._id,
                  }))}
                  value={defaultData.label !== '' ? [defaultData] : []}
                  className={styles.selectInputField}
                  isSearchable={true}
                  placeholder="Select"
                  components={animatedComponents}
                  onChange={handleDefaultBranch}
                  onFocus={() => {
                    if (searchBranch.length > 0) {
                      setSearchBranch('');
                    }
                  }}
                  isDisabled={isDefaultN}
                  maxMenuHeight={200}
                  styles={customStyles}
                />
                <div className={styles.infoContainer}>
                  <InfoIcon
                    fillColor={colors.grey2}
                    mouseEnter={() => setShowInfo(true)}
                    mouseLeave={() => setShowInfo(false)}
                    customClass={styles.iconStyle}
                  />
                  {showInfo && (
                    <p className={styles.infoText}>
                      Selecting default branch would enable the medical center
                      to follow File no. sequence of the respective branch
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                <p className={styles.defaultBranch}>
                  {patientBranchList?.defaultBranch?.name}
                </p>
                <div className={styles.infoContainer}>
                  <InfoIcon
                    fillColor={colors.grey2}
                    mouseEnter={() => setShowInfo(true)}
                    mouseLeave={() => setShowInfo(false)}
                    customClass={styles.iconStyle}
                  />
                  {showInfo && (
                    <p className={styles.infoText}>
                      Selecting default branch would enable the medical center
                      to follow File no. sequence of the respective branch
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          <ButtonGroups
            titleOne="Add Branch"
            titleTwo="User License"
            handleClickOne={() => {
              navigate('managebranch');
              dispatch(clearBranchInfo());
            }}
            handleClickTwo={() => handleUserLicense()}
          />
        </div>
        <Table
          tableHeaderData={medicalCenterBranchTableHeader}
          tableRowData={branchData}
          handleAction={handleEdit}
          handleActiveMC={handleActiveBranch}
          toogleValue={toggleValue}
        />

        <Pagination
          setDataPerPage={setDataPerPage}
          pageIndexOptions={pageIndexOptions}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
        />
      </div>
    </>
  );
};

export default BranchList;
