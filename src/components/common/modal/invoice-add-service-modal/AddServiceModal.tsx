import { FC, useState, useEffect } from 'react'
import Divider from '../../divider/Divider'
import { CloseIcon, SearchButton } from '../../svg-components'
import styles from './addServiceModal.module.scss'
import { colors } from '../../../../constants/color'
import { trimValue } from '../../../../utils/utils'
import Button from '../../button/Button'
import TableV2 from '../../table/tableV2/TableV2'
import { invoiceAddServiceHeaderData } from '../../../../constants/table-data/addNewServices'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { getAllTreatmentServices } from '../../../../redux/features/treatmentPlans/treatmentPlansAsyncActions'
import { requestGenerator } from '../../../../utils/payloadGenerator'
import Pagination from '../../pagination/Pagination'
import Loader from '../../spinner/Loader'
import { getAllDepartment } from '../../../../redux/features/department/departmentAsyncActions'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'
import { addSelectedServices } from '../../../../redux/features/treatmentPlans/treatmentPlansSlice'
import {
  concatPreNewServiceArray,
  setPopupServiceData,
} from '../../../../redux/features/invoice-module/invoiceSlice'
interface IAddServiceModal {
  handleClose?: any
  handleOpen?: any
  setModelOpenClose?: any
}

const AddServiceModal: FC<IAddServiceModal> = ({
  handleClose,
  handleOpen,
  setModelOpenClose,
}) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isLoading, serviceListData, serviceListObject } = useAppSelector(
    (state) => state.treatmentPlans
  )
  const { popupServiceData, patientDiagnosisServiceData } = useAppSelector(
    (state) => state.invoice
  )

  console.log('patientDiagnosisServiceData', patientDiagnosisServiceData)
  console.log('popupServiceData', popupServiceData)
  const { departmentData } = useAppSelector((state) => state.department)
  const [searchValue, setSearchValue] = useState<string>('')
  const [dataPerPage, setDataPerPage] = useState<number>(10)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [pageIndex, setPageIndex] = useState<number>(1)

  const [departmentFilter, setDepartmentFilter] = useState<any>({})

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
    let payloadData = {
      page: pageIndex,
      pageSize: dataPerPage,
      search: searchValue,
      is_active: true,
      department_ids: selectedValues,
    }
    dispatch(getAllTreatmentServices(requestGenerator(payloadData))).then(
      (result) => {
        setTotalPage(result.payload.lastPage)
      }
    )
  }, [dispatch, pageIndex, dataPerPage, selectedValues])

  const handleInputSearch = () => {
    const requestData = {
      search: searchValue,
      page: 1,
      pageSize: 10,
    }
    dispatch(getAllTreatmentServices(requestGenerator(requestData))).then(
      (result) => setTotalPage(result.payload.lastPage)
    )
  }

  useEffect(() => {
    if (searchValue === '') {
      const requestData = {
        search: searchValue,
        page: pageIndex,
        pageSize: dataPerPage,
      }
      dispatch(getAllTreatmentServices(requestGenerator(requestData))).then(
        (result) => setTotalPage(result.payload.lastPage)
      )
    }
  }, [dispatch, searchValue, dataPerPage, pageIndex])

  useEffect(() => {
    const requestData = {
      search: '',
      page: 1,
      pageSize: 10000,
    }
    dispatch(getAllDepartment(requestGenerator(requestData))).then((result) =>
      setTotalPage(result.payload.lastPage)
    )
  }, [dispatch, dataPerPage, pageIndex])

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
    let serviceAddedData = serviceListData?.filter(
      (item: any) => item.is_active === false
    )
    let tmpArray: any = []
    serviceAddedData?.map((x: any) => {
      console.log(x,"xxx")
      let json = {
        _id: x?._id,
        quantity: x?.quantity ?? 1,
        name: x?.name,
        price: x?.price,
        unitPrice: x?.unitPrice ?? x?.price,
        discount: x?.discount ?? 0,
        isBillable: 'Yes',
      }
      tmpArray.push(json)
    })
    dispatch(addSelectedServices(serviceAddedData))
    console.log('new temp arr', tmpArray)
    dispatch(concatPreNewServiceArray(tmpArray))
    setModelOpenClose(false)
  }
  useEffect(() => {
    if (serviceListData && serviceListData.length > 0) {
      let tempArr: any = []
      tempArr = serviceListData?.map((item: any) => {
        const isInclude: any = patientDiagnosisServiceData?.some(
          (patientItem: any) => {
            return patientItem?._id === item?._id
          }
        )
        if (isInclude) {
          return { ...item, is_active: false }
        } else {
          return item
        }
      })
      dispatch(setPopupServiceData(tempArr))
    } else {
      let tempArr1: any = []
      dispatch(setPopupServiceData(tempArr1))
    }
  }, [serviceListData])
  
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
            placeholder="Select department"
            closeMenuOnSelect={true}
            isSearchable={true}
            isMulti
            options={departmentData?.map((item: any) => ({
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
              className={styles.inputSearchContainer}
              placeholder="Search by service name"
              onChange={(e) => {
                trimValue(e)
                setSearchValue(e.target.value)
              }}
            // disabled={selectedValues?.length === 0 ? true : false}
            />
            <SearchButton
              handleClick={() => {
                // if (!!searchValue) {
                handleInputSearch()
                // }
              }}
              customClass={styles.inputSearchButton}
            />
            <Button
              title="Treatment Billing"
              customClass={styles.treatmentButtonstyle}
              disable={true}
            />
          </div>
        </div>
        {/* table container */}
        <div className={styles.tableContainer}>
          <TableV2
            tableHeaderData={invoiceAddServiceHeaderData}
            tableRowData={popupServiceData}
            handleClick={handleOpen}
            handleRow={handleRow}
            setActive={setValue}
            active={false}
          />

          {/* {serviceListData?.length < 9 &&
          serviceListObject?.lastPage === 1 &&
          serviceListObject?.nextPage === 0 &&
          serviceListObject?.previousPage === 0 ? (
            ' '
          ) : (
            <Pagination
              setDataPerPage={setDataPerPage}
              pageIndexOptions={pageIndexOptions}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
            />
          )} */}

          {/* divyaraj  */}
          {popupServiceData && popupServiceData?.length !== 0 && (
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

export default AddServiceModal
