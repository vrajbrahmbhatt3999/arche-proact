import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ButtonGroups from '../../../../components/common/button-group/ButtonGroups';
import NotesPopup from '../../../../components/common/modal/notes-popup/NotesPopup';
import StatusConfirmationPopup from '../../../../components/common/modal/status-confirmation-popup/StatusConfirmationPopup';
import ViewSpecialitiesPopup from '../../../../components/common/modal/view-specialities-popup/ViewSpecialitiesPopup';
import Pagination from '../../../../components/common/pagination/Pagination';
import Popup from '../../../../components/common/popup/Popup';
import Loader from '../../../../components/common/spinner/Loader';
import Table from '../../../../components/common/table/Table';
import { medicalCenterDepartmentTableHeader } from '../../../../constants/data';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { getAllDepartment } from '../../../../redux/features/department/departmentAsyncActions';
import { clearDepartmentInfo } from '../../../../redux/features/department/departmentSlice';
import { clearSpecialityInfo } from '../../../../redux/features/specialities/specialitiesSlice';
import { requestGenerator } from '../../../../utils/payloadGenerator';
import styles from './departmentList.module.scss';
import { trimValue } from '../../../../utils/utils';
import { SearchButton } from '../../../../components/common/svg-components';

interface IAppProps {}

const DepartmentList: FC<IAppProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [toggle, setToggle] = useState<boolean>(false);
  const [toggleValue, setToggleValue] = useState();
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const [notesData, setNotesData] = useState({});
  const [toggleData, setToggleData] = useState({});
  const [confirm, setConfirm] = useState<boolean>(false);
  const [showSpecialities, setShowSpecialities] = useState<boolean>(false);
  const [specialityData, setSpecialityData] = useState({});
  const [searchDepartment, setSearchDepartment] = useState<string>('');
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const { isLoading, departmentData, departmentlistInfo } = useAppSelector(
    (state) => state.department
  );

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
      search: searchDepartment,
      page: pageIndex,
      pageSize: dataPerPage,
    };
    dispatch(getAllDepartment(requestGenerator(data))).then((result) =>
      setTotalPage(result.payload.lastPage)
    );
  }, [dispatch, pageIndex, dataPerPage]);

  useEffect(() => {
    if (searchDepartment === '') {
      let data = {
        search: '',
        page: pageIndex,
        pageSize: dataPerPage,
        order_by: { is_default: -1 },
      };
      dispatch(getAllDepartment(requestGenerator(data))).then((result) =>
        setTotalPage(result.payload.lastPage)
      );
    }
  }, [dispatch, searchDepartment]);

  const handleSearch = () => {
    setPageIndex(1);
    let data = {
      search: searchDepartment,
      page: pageIndex,
      pageSize: dataPerPage,
    };
    dispatch(getAllDepartment(requestGenerator(data))).then((result) =>
      setTotalPage(result.payload.lastPage)
    );
  };

  // const handleNotes = (item: any) => {
  //   setShowNotes(!showNotes);
  //   setNotesData(item);
  // };
  const handleNotes = (item: any) => {
    const notes = item.notes;
    if (notes && notes !== '-') {
      setShowNotes(!showNotes);
      setNotesData(item);
    }
  };

  const handleEdit = (item: any) => {
    navigate('managedepartment', {
      state: { id: item?._id },
    });
  };

  const handleSpecialities = (item: any) => {
    setShowSpecialities(!showSpecialities);
    setSpecialityData(item);
  };

  const handleActiveDepartment = (item: any) => {
    setToggle(!toggle);
    setConfirm(!confirm);
    setToggleData(item);
    setToggleValue(item?._id);
  };

  // useEffect(() => {
  //   if (confirm === false) {
  //     setSearchDepartment('');
  //     setDataPerPage(10);
  //     setPageIndex(1);
  //   }
  // }, [confirm]);

  return (
    <>
      {isLoading && <Loader />}
      {showSpecialities && (
        <Popup
          Children={ViewSpecialitiesPopup}
          popData={specialityData}
          handleClose={() => setShowSpecialities(false)}
        />
      )}
      {showNotes && (
        <Popup
          Children={NotesPopup}
          popData={notesData}
          handleClose={() => setShowNotes(false)}
        />
      )}
      {confirm && (
        <Popup
          popData={toggleData}
          Children={StatusConfirmationPopup}
          handleClose={() => setConfirm(false)}
        />
      )}
      <div className={styles.medicalCenterDepartmentContainer}>
        <div className={styles.searchFilter}>
          <div className={styles.searchContainer}>
            <div className={styles.inputFieldContainer}>
              <input
                type="text"
                className={styles.inputSearchContainer}
                placeholder="Search by department name"
                onChange={(e) => {
                  trimValue(e);
                  setSearchDepartment(e.target.value);
                }}
              />
              <SearchButton
                handleClick={() => handleSearch()}
                customClass={styles.inputSearchButton}
              />
            </div>
          </div>
          <ButtonGroups
            titleOne="Add Department"
            titleTwo="Manage Specialties"
            btnOneCustomClass={styles.btnOneCustomClass}
            btnTwoCustomClass={styles.btnTwoCustomClass}
            handleClickOne={() => {
              navigate('managedepartment');
              dispatch(clearDepartmentInfo());
            }}
            handleClickTwo={() => {
              navigate('managespecialities');
              dispatch(clearSpecialityInfo());
            }}
          />
        </div>
        <Table
          tableHeaderData={medicalCenterDepartmentTableHeader}
          tableRowData={departmentData}
          toogleValue={toggleValue}
          handleAction={handleEdit}
          handleNotes={handleNotes}
          handleSpecialities={handleSpecialities}
          handleActiveMC={handleActiveDepartment}
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

export default DepartmentList;
