import { FC, useState, useEffect } from 'react'
import styles from './radiologyAddServiceModal.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { useNavigate } from 'react-router-dom'
import Loader from '../../spinner/Loader'
import { CloseIcon, SearchButton } from '../../svg-components'
import Divider from '../../divider/Divider'
import { trimValue } from '../../../../utils/utils'
import Button from '../../button/Button'
import TableV2 from '../../table/tableV2/TableV2'

import Select from 'react-select'
import { radiologyAddServiceHeaderData } from '../../../../constants/table-data/addNewServices'
import { colors } from '../../../../constants/color'
import { requestGenerator } from '../../../../utils/payloadGenerator'
import {
  getAllRadiologyCategory,
  getAllRadiologyTest,
} from '../../../../redux/features/radiology/radiologyAsyncActions'
import Pagination from '../../pagination/Pagination'
import {
  addSelectedServices,
  concatPreNewServiceArray,
} from '../../../../redux/features/radiology/radiologySlice'

interface IRadiologyAddServiceModal {
  handleClose?: any
  handleOpen?: any
  setModelOpenClose?: any
}

const RadiologyAddServiceModal: FC<IRadiologyAddServiceModal> = ({
  handleClose,
  handleOpen,
  setModelOpenClose,
}) => {

  const { departmentData } = useAppSelector((state) => state.department)
  const [searchValue, setSearchValue] = useState<string>('')
  const [dataPerPage, setDataPerPage] = useState<number>(10)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [departmentFilter, setDepartmentFilter] = useState<any>({})

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    isLoading,
    radiologyCategoryDataList,
    radiologyTestDataList,
    radiologyTestDataListObject,
    selectedServiceList,
  } = useAppSelector((state) => state.radiology)
  console.log('selectedServiceList', selectedServiceList)

  const handleChangeDropdownStatus = (department: string) => {
    console.log('department', department)
    setDepartmentFilter(department)
  }
  const [selectedValues, setSelectedValues] = useState<any>([])

  const [active, setActive] = useState<boolean>(false)
  const [id, setId] = useState()
  const [value, setValue] = useState()

  // pagination function
  const pageIndexArray = () => {
    let pageIndexOptions = []
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i)
    }
    return pageIndexOptions
  }
  const pageIndexOptions = pageIndexArray()

  useEffect(() => {
    let payload = {
      search: '',
      page: 0,
      pageSize: 0,
      order_by: { name: 1 },
    }
    dispatch(getAllRadiologyCategory(requestGenerator(payload)))
  }, [])

  useEffect(() => {
    let payload = {
      search: '',
      page: pageIndex,
      pageSize: dataPerPage,
      order_by: { name: 1 },
    }
    dispatch(getAllRadiologyTest(requestGenerator(payload))).then(
      (result) => setTotalPage(result.payload.lastPage)
    )
  }, [pageIndex, dataPerPage])


  //   useEffect(() => {
  //     let payloadData = {
  //       page: 1,
  //       pageSize: 10,
  //       search: "",
  //       is_active: true,
  //       department_ids: selectedValues,
  //     };
  //     dispatch(getAllTreatmentServices(requestGenerator(payloadData))).then(
  //       (result) => {
  //         setTotalPage(result.payload.lastPage);
  //       }
  //     );
  //   }, [dispatch, pageIndex, dataPerPage, selectedValues]);

  const handleInputSearch = () => {
    const requestData = {
      search: searchValue,
      page: 1,
      pageSize: 10,
    }
    dispatch(getAllRadiologyTest(requestGenerator(requestData))).then(
      (result) => setTotalPage(result.payload.lastPage)
    )
  }

  //   useEffect(() => {
  //     if (searchValue === "") {
  //       const requestData = {
  //         search: searchValue,
  //         page: pageIndex,
  //         pageSize: dataPerPage,
  //       };
  //       dispatch(getAllTreatmentServices(requestGenerator(requestData))).then(
  //         (result) => setTotalPage(result.payload.lastPage)
  //       );
  //     }
  //   }, [dispatch, searchValue, dataPerPage, pageIndex]);

  const handleRow = (id: any) => {
    setId(id)
    setValue(id)
    if (value === id) {
      setActive(true)
    } else {
      setActive(false)
    }
  }

  const handleAddServices = () => {
    let serviceAddedData = radiologyTestDataList?.filter(
      (item: any) => item.is_active === false
    )
    let tmpArray: any = []
    serviceAddedData?.map((x: any) => {
      let json = {
        _id: x?._id,
        quantity: x?.quantity ?? 1,
        test_name: x?.name,
        unitPrice: x?.sell_price,
        is_active: x?.is_active,
        is_profile: false,
        billable: 'Yes',
      }
      tmpArray.push(json)
    })
    dispatch(addSelectedServices(serviceAddedData))
    dispatch(concatPreNewServiceArray(tmpArray))
    setModelOpenClose(false)
  }

  return (
    <>
      {isLoading && <Loader />}
      <div
        className={styles.mainContainer}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className={styles.closeIconContainer}>
          <CloseIcon
            customClass={styles.closeIconStyle}
            fillColor={colors.green1}
            handleClick={() => handleClose()}
          />
        </div>
        <p className={styles.title}>Add New Services</p>
        <Divider customClass={styles.dividerStyle} />
        <div className={styles.filterSearchFieldContainer}>
          <Select
            className={styles.select}
            placeholder="Select category"
            closeMenuOnSelect={true}
            isSearchable={true}
            isMulti
            options={radiologyCategoryDataList?.map((item: any) => ({
              label: item?.name,
              value: item?._id,
            }))}
            defaultValue={selectedValues}
            onChange={(selectedOptions: any) => {
              const selectedValues1 = selectedOptions.map(
                (option: any) => option.value
              )
              setSelectedValues(selectedValues1)
            }}
            maxMenuHeight={200}
            isDisabled
          />

          <div className={styles.searchContainer}>
            <input
              type="text"
              className={
                // selectedValues?.length === 0
                // ? styles.disableInputSearchContainer
                styles.inputSearchContainer
              }
              placeholder="Search by service"
              onChange={(e) => {
                trimValue(e)
                setSearchValue(e.target.value)
                if (e.target.value === '') {
                  const requestData = {
                    search: '',
                    page: pageIndex,
                    pageSize: dataPerPage,
                  }
                  dispatch(
                    getAllRadiologyTest(requestGenerator(requestData))
                  ).then((result) => setTotalPage(result.payload.lastPage))
                }
              }}
            // disabled={selectedValues?.length === 0 ? true : false}
            />
            <SearchButton
              handleClick={() => {
                handleInputSearch()
                // if (!!searchValue) {
                //   handleInputSearch();
                // }
              }}
              customClass={styles.inputSearchButton}
            />
            {/* <Button
              title="Treatment Billing"
              customClass={styles.treatmentButtonstyle}
            /> */}
          </div>
        </div>
        {/* table container */}
        <div className={styles.tableContainer}>
          <TableV2
            tableHeaderData={radiologyAddServiceHeaderData}
            tableRowData={radiologyTestDataList}
            handleClick={handleOpen}
            handleRow={handleRow}
            setActive={setValue}
            active={false}
          />
          {/* {radiologyTestDataList?.length < 9 &&
          radiologyTestDataListObject?.lastPage === 1 &&
          radiologyTestDataListObject?.nextPage === 0 &&
          radiologyTestDataListObject?.previousPage === 0 ? (
            ' '
          ) : (
            <Pagination
              setDataPerPage={setDataPerPage}
              pageIndexOptions={pageIndexOptions}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
            />
          )} */}

          {radiologyTestDataList?.length !== 0 && (
            <Pagination
              setDataPerPage={setDataPerPage}
              pageIndexOptions={pageIndexOptions}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
            />
          )}
        </div>

        {/* Button */}
        <Button
          title="Add"
          customClass={styles.addbuttonStyle}
          type="submit"
          handleClick={handleAddServices}
        />
      </div>
    </>
  )
}

export default RadiologyAddServiceModal
