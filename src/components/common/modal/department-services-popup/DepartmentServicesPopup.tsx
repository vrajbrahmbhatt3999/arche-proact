import { FC, useEffect, useState } from 'react';
import styles from './departmentServicesPopup.module.scss';
import { CloseIcon, SearchButton } from '../../svg-components';
import { colors } from '../../../../constants/color';
import Divider from '../../divider/Divider';
import {
  blockInvalidCharacter,
  disableArrowKey,
  trimValue,
} from '../../../../utils/utils';
import TableV2 from '../../table/tableV2/TableV2';
import Button from '../../button/Button';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { getPlanAllService } from '../../../../redux/features/insurance/insuranceAsyncActions';
import { requestGenerator } from '../../../../utils/payloadGenerator';
import Pagination from '../../pagination/Pagination';
import Loader from '../../spinner/Loader';
import { departmentServiceHeaderData } from '../../../../constants/table-data/departmentServiceData';
import {
  addDepartmentService,
  clearDepartmentServiceData,
  updatedDeptService,
} from '../../../../redux/features/insurance/insuranceSlice';
import Select from 'react-select';
import { GET_PLAN_ALL_SERVICE } from '../../../../constants/asyncActionsType';

interface IDepartmentServices {
  handleClose?: any;
  popData?: any;
  setModelOpenClose?: any;
}

const DepartmentServicesPopup: FC<IDepartmentServices> = ({
  handleClose,
  setModelOpenClose,
}) => {
  const dispatch = useAppDispatch();
  const {
    isLoading,
    departmentServiceData,
    palnDepartmentList,
    selDeptSrv,
    selectedServiceId,
  } = useAppSelector((state) => state.insurance);
  const [service, setService] = useState('');
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [dept, setDept] = useState({
    label: palnDepartmentList[0]?.department_name,
    value: palnDepartmentList[0]?.department_id,
  });
  const [deptList, setDeptList] = useState<any>(selDeptSrv);
  const [focusDiscount, setFocusDiscount] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (selDeptSrv?.length > 0) {
      setDeptList(selDeptSrv);
    } else {
      setDeptList([]);
    }
  }, [selDeptSrv]);

  useEffect(() => {
    let filterData = selDeptSrv?.filter((obj: any) =>
      palnDepartmentList?.some(
        (item: any) => item?.department_id === obj?.department_id
      )
    );
    dispatch(addDepartmentService(filterData));
  }, [palnDepartmentList]);

  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };

  const pageIndexOptions = pageIndexArray();

  useEffect(() => {
    if (service === '') {
      let payload = {
        department_id: dept?.value,
        search: '',
        page: pageIndex,
        pageSize: dataPerPage,
      };
      dispatch(getPlanAllService(requestGenerator(payload))).then((result) => {
        if (result.type === `${GET_PLAN_ALL_SERVICE}/fulfilled`) {
          setTotalPage(result.payload.lastPage);
          let updatedArray = result?.payload?.map((object: any) => {
            if (selectedServiceId?.includes(object._id)) {
              return {
                ...object,
                checked: true,
              };
            } else {
              return object;
            }
          });
          dispatch(updatedDeptService(updatedArray));
        }
      });
    }
  }, [service, pageIndex, dataPerPage, dept]);

  const handleSearch = () => {
    let payload = {
      department_id: dept?.value,
      search: service,
      page: 1,
      pageSize: 10,
      is_active: true,
    };
    dispatch(getPlanAllService(requestGenerator(payload))).then((result) => {
      setTotalPage(result.payload.lastPage);
      const updatedArray = result?.payload?.map((object: any) => {
        if (selectedServiceId?.includes(object._id)) {
          return {
            ...object,
            checked: true,
          };
        } else {
          return object;
        }
      });
      dispatch(updatedDeptService(updatedArray));
    });
  };

  const handleSubmit = () => {
    if (error === false) {
      setTimeout(() => {
        setModelOpenClose(false);
        dispatch(clearDepartmentServiceData());
      }, 200);
      dispatch(addDepartmentService(deptList));
    }
  };

  const handleDiscount = (e: any, _id: any) => {
    let newId = _id;
    let newData = deptList?.map((item: any) => {
      if (item?._id === newId) {
        let updateData = { ...item, disounted_price: e.target.value };
        return updateData;
      } else {
        return item;
      }
    });
    setDeptList(newData);
  };

  const handleDiscountFocus = (_id: any) => {
    setFocusDiscount(_id);
  };

  const selectedServiceHeaderData: any = [
    {
      Header: 'SERVICE ID',
      accessor: 'service_no',
      Cell: ({ row }: any) => {
        return (
          <p>{row?.original?.service_no ? row?.original?.service_no : '-'}</p>
        );
      },
    },
    {
      Header: 'SERVICE NAME',
      accessor: 'name',
    },
    {
      Header: 'PRICE',
      accessor: 'sell_price',
      Cell: ({ row }: any) => {
        return <p>{row?.original?.sell_price}</p>;
      },
    },
    {
      Header: 'DISCOUNTED PRICE',
      accessor: 'disc_price',
      Cell: ({ row }: any) => {
        const _id = row?.original?._id;
        let discountVal = Number(row?.original?.disounted_price);
        if (discountVal < 0) {
          setError(true);
        } else {
          setError(false);
        }
        return (
          <>
            <input
              className={styles.inputField}
              value={row?.original?.disounted_price}
              type="number"
              onChange={(e) => handleDiscount(e, _id)}
              onFocus={() => handleDiscountFocus(_id)}
              autoFocus={focusDiscount === _id}
              onKeyDown={(e: any) => {
                disableArrowKey(e);
                blockInvalidCharacter(e);
              }}
              onWheel={(e: any) => {
                e.target.blur();
              }}
            />
            {discountVal < 0 && (
              <p className={styles.errorText}>Enter positive value</p>
            )}
          </>
        );
      },
    },
  ];

  return (
    <>
      {isLoading && <Loader />}
      <div
        className={styles.popupContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={handleClose}
        />
        <div className={styles.notesContainer}>
          <p className={styles.title}>Department Services</p>
          <Divider customClass={styles.dividerStyle} />
          <div className={styles.tableSearchContainer}>
            <div className={styles.inputFieldContainer}>
              <input
                type="text"
                className={styles.inputSearchContainer}
                placeholder="Search by service"
                onChange={(e) => {
                  trimValue(e);
                  setService(e.target.value);
                  setFocusDiscount('');
                }}
              />

              <Select
                className={styles.select}
                placeholder="Select Dept."
                closeMenuOnSelect={true}
                isSearchable={true}
                value={dept}
                maxMenuHeight={200}
                options={palnDepartmentList?.map((item: any) => ({
                  label: item.department_name,
                  value: item.department_id,
                }))}
                onChange={(e: any) => {
                  setDept(e);
                }}
              />

              <SearchButton
                handleClick={() => handleSearch()}
                customClass={styles.inputSearchButton}
                width={38}
              />
            </div>
            <div className={styles.table}>
              {}
              <TableV2
                tableHeaderData={departmentServiceHeaderData}
                tableRowData={departmentServiceData}
                active={false}
              />
            </div>
            <Pagination
              setDataPerPage={setDataPerPage}
              pageIndexOptions={pageIndexOptions}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
            />
            <div style={{ marginTop: '30px' }}>
              <TableV2
                tableHeaderData={selectedServiceHeaderData}
                tableRowData={deptList}
                active={false}
              />
            </div>
            <div style={{ margin: '20px auto', textAlign: 'center' }}>
              <Button title="Submit" handleClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DepartmentServicesPopup;
