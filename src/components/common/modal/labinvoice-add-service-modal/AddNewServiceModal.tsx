import React, { FC, useState, useEffect } from 'react'
import styles from './AddNewServiceModal.module.scss'
import Button from '../../button/Button'
import Pagination from '../../pagination/Pagination'
import TableV2 from '../../table/tableV2/TableV2'
import { CloseIcon, SearchButton, SearchIcon } from '../../svg-components'
import Select from 'react-select'
import Divider from '../../divider/Divider'
import { colors } from '../../../../constants/color'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { trimValue } from '../../../../utils/utils'
import { labInvoiceNewServiceHeaderData } from '../../../../constants/table-data/labNewServices'
import { getAllTreatmentServices } from '../../../../redux/features/treatmentPlans/treatmentPlansAsyncActions'
import { requestGenerator } from '../../../../utils/payloadGenerator'
import { getAllDepartment } from '../../../../redux/features/department/departmentAsyncActions'
import { addSelectedServices } from '../../../../redux/features/lab-invoice/labInvoiceSlice'
import { getAllLabTests } from '../../../../redux/features/lab-invoice/labInvoiceAsyncActions'
import Loader from '../../spinner/Loader'
import { searchModalHeaderData } from '../../../../constants/data'

interface IAddNewServiceModal {
  handleClose?: any
  handleOpen?: any
  setModelOpenClose?: any
}

const AddNewServiceModal: FC<IAddNewServiceModal> = ({
  handleClose,
  handleOpen,
  setModelOpenClose,
}) => {
  const [selectedValues, setSelectedValues] = useState<any>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [dataPerPage, setDataPerPage] = useState<number>(10)
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [value, setValue] = useState()

  const { departmentData } = useAppSelector((state) => state.department)
  const { labServicesList,isLoading } = useAppSelector(
    (state) => state.labInvoice
  )

  const dispatch = useAppDispatch()

  const pageIndexArray = () => {
    let pageIndexOptions = []
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i)
    }
    return pageIndexOptions
  }
  const pageIndexOptions = pageIndexArray()

  // get All Lab Tests
  useEffect(() => {
    let requestData = {
      page: pageIndex,
      pageSize: dataPerPage,
    }
    dispatch(getAllLabTests(requestGenerator(requestData))).then((result) => {
      setTotalPage(result.payload.lastPage)
    })
  }, [dispatch, pageIndex, dataPerPage, selectedValues])

  // 
  const handleInputSearch = () => {
    const requestData = {
      search: searchValue,
      page: 1,
      pageSize: 10,
    }
    dispatch(getAllLabTests(requestGenerator(requestData))).then((result) =>
      setTotalPage(result.payload.lastPage)
    )
  }

  useEffect(() => {
    dispatch(getAllDepartment(requestGenerator({})))
  }, [])

  const handleAddServices = () => {
    dispatch(addSelectedServices())
    setModelOpenClose(false)
  }
  useEffect(() => {
    const requestData = {
      search: searchValue,
      page: 1,
      pageSize: 10,
    }
    if (searchValue === '') {
      dispatch(getAllLabTests(requestGenerator(requestData))).then((result) =>
        setTotalPage(result.payload.lastPage)
      )
    }
  }, [searchValue])


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
          <div className={styles.departmentContainer}>
            <label className={styles.labelText}>Dept:</label>
            <Select
              className={styles.select}
              placeholder="Select departments"
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
              maxMenuHeight={250}
            />
          </div>

          <div className={styles.searchContainer}>
            <div className={styles.search}>
              <input
                type="text"
                className={styles.inputSearchContainer}
                placeholder="Search by service name"
                onChange={(e) => {
                  trimValue(e)
                  setSearchValue(e.target.value)
                }}
              />
              {/* <SearchIcon
                fillColor="#797979"
                customClass={styles.searchIconStyle}
                // handleClick={handleDoctorPopup}
              /> */}
            </div>

            <SearchButton
              handleClick={() => {
                if (!!searchValue) {
                  handleInputSearch();
                }
              }}
              customClass={styles.inputSearchButton}
            />
            <Button
              title="Treatment Billing"
              customClass={styles.treatmentButtonstyle}
            />
          </div>
        </div>
        {/* table container */}
        <div className={styles.tableContainer}>
          <TableV2
            // handleRowClick={(item: any) => handleL(item)}
            tableHeaderData={labInvoiceNewServiceHeaderData}
            tableRowData={labServicesList}
            handleClick={handleOpen}
            setActive={setValue}
            active={value}
          />
          {labServicesList?.length !== 0 && (
            <Pagination
              setDataPerPage={setDataPerPage}
              pageIndexOptions={pageIndexOptions}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
            />
          )}

        </div>
        {/* table container */}


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

export default AddNewServiceModal
