import { FC, useState, useEffect } from 'react';
import styles from './departmentListEditPopup.module.scss';
import { CloseIcon, DeleteIcon } from '../../svg-components';
import { colors } from '../../../../constants/color';
import Divider from '../../divider/Divider';
import TableV2 from '../../table/tableV2/TableV2';
import Select from 'react-select';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { requestGenerator } from '../../../../utils/payloadGenerator';
import Button from '../../button/Button';
import { failure } from '../../../../constants/data';
import { setMessage } from '../../../../redux/features/toast/toastSlice';
import {
  allInsuarncePlan,
  updateInsurancePlanDepartment,
} from '../../../../redux/features/insurance/insuranceAsyncActions';
import Loader from '../../spinner/Loader';
import { addPlanDepartment } from '../../../../redux/features/insurance/insuranceSlice';
import {
  blockInvalidCharacter,
  disableArrowKey,
} from '../../../../utils/utils';

interface IDepartentListEditPopup {
  popData?: any;
  handleClose?: any;
  deleteDepartment?: boolean;
  setDeleteDepartment?: any;
  deleteFlag?: boolean;
  setDeleteFlag?: any;
  setModelOpenClose?: any;
  headerData?: any;
  handleSubmitData?: any;
}

const DepartmentListEditPopup: FC<IDepartentListEditPopup> = ({
  popData,
  handleClose,
  setModelOpenClose,
  setDeleteDepartment,
  deleteFlag,
  setDeleteFlag,
  headerData,
}) => {
  const { isLoading, palnDepartmentList } = useAppSelector(
    (state) => state.insurance
  );
  const dispatch = useAppDispatch();
  const [deptList, setDeptList] = useState<any>(palnDepartmentList);
  const [dept, setDept] = useState('');
  const [deptId, setDeptId] = useState('');
  const [selectDept, setSelectDept] = useState(null);
  const [focusCopay, setFocusCopay] = useState('');
  const [focusDiscount, setFocusDiscount] = useState('');
  const [deletedId, setDeletedId] = useState('');
  const { departmentData } = useAppSelector((state) => state.department);
  const [error, setError] = useState(false);
  const [copayErr, setCopayErr] = useState(false);

  useEffect(() => {
    if (popData?.departments !== undefined) {
      setDeptList(popData?.departments);
    }
  }, [popData]);

  useEffect(() => {
    if (deleteFlag) {
      setDeleteDepartment(false);
      handleDeleteDepartment(deletedId);
    }
  }, [deleteFlag, deletedId]);

  const newDepartment = {
    department_name: dept,
    discount: '0',
    coPay: '0',
    department_id: deptId,
  };

  const handleCopay = (e: any, _id: any) => {
    let newId = _id;
    let newData = deptList?.map((item: any) => {
      if (item?.department_id === newId) {
        let updateData = { ...item, coPay: e.target.value };
        return updateData;
      } else {
        return item;
      }
    });
    setDeptList(newData);
  };

  const handleDiscount = (e: any, _id: any) => {
    let newId = _id;
    let newData = deptList?.map((item: any) => {
      if (item?.department_id === newId) {
        let updateData = { ...item, discount: e.target.value };
        return updateData;
      } else {
        return item;
      }
    });
    setDeptList(newData);
  };

  const handleKeyDown = (e: any) => {
    if (e.target.value.length >= 2 && e.key !== 'Backspace') {
      e.preventDefault(); // Prevent further input when the limit is reached
    }
    disableArrowKey(e);
    blockInvalidCharacter(e);
  };

  const handleFocusCopay = (_id: any) => {
    setFocusCopay(_id);
    setFocusDiscount('');
  };

  const handleDiscountFocus = (_id: any) => {
    setFocusCopay('');
    setFocusDiscount(_id);
  };

  const handleDeleteDepartment = (_id: any) => {
    const deletedRow = deptList.findIndex(
      (obj: any) => obj.department_id === _id
    );

    const updatedMedicineRow = [
      ...deptList.slice(0, deletedRow),
      ...deptList.slice(deletedRow + 1),
    ];

    const updatedMedicineRowWithIds = updatedMedicineRow.map((obj: any) => ({
      ...obj,
    }));

    setDeptList(updatedMedicineRowWithIds);
    setDeleteFlag(false);
    return deptList;
  };

  const tableHeaderData: any = [
    {
      Header: 'DEPARTMENT',
      accessor: 'department_name',
    },
    {
      Header: 'CO-PAY',
      Cell: ({ row }: any) => {
        const _id = row?.original?.department_id;
        let copayVal = Number(row?.original?.coPay);
        let isCopay = row?.original?.coPay?.length;
        if (copayVal < 0) {
          setCopayErr(true);
        } else {
          setCopayErr(false);
        }
        return (
          <>
            <input
              className={styles.inputField}
              value={row?.original?.coPay}
              type="number"
              onChange={(e) => handleCopay(e, _id)}
              onKeyDown={handleKeyDown}
              onFocus={() => handleFocusCopay(_id)}
              autoFocus={focusCopay === _id}
              onWheel={(e: any) => {
                e.target.blur();
              }}
            />
            {copayVal < 0 && (
              <p className={styles.errorText}>Enter positive value</p>
            )}
            {isCopay === 0 && (
              <p className={styles.errorText}>Enter co-pay value</p>
            )}
          </>
        );
      },
    },
    {
      Header: 'DISCOUNT',
      Cell: ({ row }: any) => {
        const _id = row?.original?.department_id;
        let isDiscount = row?.original?.discount?.length;
        console.log('isDiscount', isDiscount);
        let discountVal = Number(row?.original?.discount);
        if (discountVal < 0) {
          setError(true);
        } else {
          setError(false);
        }
        return (
          <>
            <input
              className={styles.inputField}
              value={row?.original?.discount}
              type="number"
              onChange={(e) => handleDiscount(e, _id)}
              onKeyDown={handleKeyDown}
              onFocus={() => handleDiscountFocus(_id)}
              autoFocus={focusDiscount === _id}
              onWheel={(e: any) => {
                e.target.blur();
              }}
            />
            {discountVal < 0 && (
              <p className={styles.errorText}>Enter positive value</p>
            )}
            {isDiscount === 0 && (
              <p className={styles.errorText}>Enter discount value</p>
            )}
          </>
        );
      },
    },
    {
      Header: 'ACTIONS',
      Cell: ({ row }: any) => {
        const _id = row?.original?.department_id;
        return (
          <DeleteIcon
            fillColor={colors.grey4}
            customClass={styles.iconStyle}
            handleClick={() => {
              setDeleteDepartment(true);
              setDeletedId(_id);
            }}
          />
        );
      },
    },
  ];

  const tableHeaderDataView: any = [
    {
      Header: 'DEPARTMENT',
      accessor: 'department_name',
    },
    {
      Header: 'CO-PAY',
      accessor: 'coPay',
    },
    {
      Header: 'DISCOUNT',
      accessor: 'discount',
    },
  ];

  const handleAdd = () => {
    const updatedRow = {
      ...newDepartment,
    };

    let departmentExist =
      deptList?.length > 0 &&
      deptList.some(
        (item: any) => item.department_name === updatedRow?.department_name
      );
    if (departmentExist) {
      let toastData = {
        message: 'Department with the same name cannot be added',
        type: failure,
      };
      dispatch(setMessage(toastData));
    } else {
      setDeptList((prevTableData: any) => [...prevTableData, updatedRow]);
      setSelectDept(null);
      setDept('');
      setDeptId('');
    }
  };

  const handleSubmit = () => {
    if (copayErr === false && error === false) {
      let payload = {
        plan_id: popData?._id,
        departments: deptList,
      };
      if (popData?._id !== undefined) {
        dispatch(updateInsurancePlanDepartment(requestGenerator(payload))).then(
          (e) => {
            if (
              e?.type === 'insurance/updateInsurancePlanDepartment/fulfilled'
            ) {
              dispatch(allInsuarncePlan(requestGenerator(headerData)));
              setTimeout(() => {
                setModelOpenClose(false);
              }, 2000);
            }
          }
        );
      } else {
        dispatch(addPlanDepartment(deptList));
        setModelOpenClose(false);
      }
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div
        className={styles.notesPopupContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={handleClose}
        />
        <div className={styles.notesContainer}>
          <p className={styles.title}>Departments</p>
          <Divider customClass={styles.dividerStyle} />
          <div className={styles.mainContainer}>
            {popData?._id === undefined && (
              <div className={styles.dropdownBtn}>
                <label htmlFor="" className={styles.lableText}>
                  Department
                </label>
                <Select
                  className={styles.select}
                  placeholder="Select Department"
                  closeMenuOnSelect={true}
                  isSearchable={true}
                  options={departmentData?.map((item: any) => ({
                    label: item.name,
                    value: item._id,
                  }))}
                  value={selectDept}
                  onChange={(e: any) => {
                    setSelectDept(e);
                    setDept(e.label);
                    setDeptId(e.value);
                  }}
                  maxMenuHeight={200}
                />
                <Button
                  title="Add"
                  customClass={styles.btnStyle}
                  handleClick={handleAdd}
                  disable={dept?.length > 0 ? false : true}
                />
              </div>
            )}
            <div className={styles.table}>
              <TableV2
                tableHeaderData={
                  popData?._id === undefined
                    ? tableHeaderData
                    : tableHeaderDataView
                }
                tableRowData={deptList}
                active={false}
              />
            </div>
            {popData?._id === undefined && (
              <div className={styles.btnContainer}>
                <Button title="Submit" handleClick={handleSubmit} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DepartmentListEditPopup;
