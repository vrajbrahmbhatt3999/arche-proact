import React, { FC, useState, useEffect } from 'react'
import styles from './configuration.module.scss'
import Button from '../../components/common/button/Button'
import { trimValue } from '../../utils/utils'
import {
  EditIcon,
  InfoIcon,
  SearchButton,
} from '../../components/common/svg-components'
import Select from 'react-select'
import { colors } from '../../constants/color'
import Popup from '../../components/common/popup/Popup'
import ViewTestProfilePopup from '../../components/common/modal/view-test-profile-popup/ViewTestProfilePopup'
import CreateTestProfilePopup from '../../components/common/modal/create-test-profile-popup/CreateTestProfilePopup'
import CobfigurePricePopup from '../../components/common/modal/configure-price-popup/ConfigurePricePopup'
import TableV2 from '../../components/common/table/tableV2/TableV2'
import MoreDetailsPopup from '../../components/common/modal/more-details-popup/MoreDetailsPopup'
import ConfigurationEditPopup from '../../components/common/modal/configuration-edit-popup/ConfigurationEditPopup'
import PrescriptionPopup from '../../components/common/modal/prescription-popup/PrescriptionPopup'
import { requestGenerator } from '../../utils/payloadGenerator'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
  getAllLabTest,
  getLabCategory,
  getLabTest,
  getLabTestProfile,
} from '../../redux/features/lab/labAsyncActions'
import { invoiceFormActionData } from '../../constants/data'
import CreateTestPopup from '../../components/common/modal/create-test-popup/CreateTestPopup'
import RangePopup from '../../components/common/modal/range-popup/RangePopup'
import Loader from '../../components/common/spinner/Loader'
import Pagination from '../../components/common/pagination/Pagination'
import {
  clearComponentData,
  clearLabTestData,
  clearNewTestData,
  clearProfileData,
  clearRangeData,
  cleartestData,
  updateprofileData,
} from '../../redux/features/lab/labSlice'
import TestListPopup from '../../components/common/modal/test-list-popup/TestListPopup'
import { configurationHeaderData } from '../../constants/table-data/configurationTableData'
import LabTestListPopup from '../../components/common/modal/lab-test-list-popup/LabTestListPopup'
import LabComponentPopup from '../../components/common/modal/lab-component-popup/LabComponentPopup'

const Configuration: FC = () => {
  const [showText, setShowText] = useState(false)
  const [showTestProfile, setShowTestProfile] = useState(false)
  const [showCreateTestProfile, setShowCreateTestProfile] = useState(false)
  const [showConfigurePrice, setShowConfigurePrice] = useState(false)
  const [configurationEdit, setConfigurationEdit] = useState(false)
  const [remarks, setRemarks] = useState(false)
  const [moreDetail, setMoreDetail] = useState(false)
  const [tat, setTat] = useState(false)
  const [test, setTest] = useState(false)
  const [range, setRange] = useState(false)
  const [rangeData, setRangeData] = useState()
  const [dataPerPage, setDataPerPage] = useState<number>(10)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [searchTest, setSearchTest] = useState('')
  const [showTest, setShowTest] = useState(false)
  const [testListData, setTestListData] = useState()
  const [testProfileData, setTestProfileData] = useState()
  const [category, setCategory] = useState('')
  const [editId, setEditId] = useState()
  const [selectCategory, setSelectCategory] = useState(null)
  const [showLabTestList, setShowLabTestList] = useState(false)
  const [value, setValue] = useState()
  const [id, setId] = useState()
  const [active, setActive] = useState<boolean>(false)
  const [component, setComponent] = useState(false)
  const [showRangeData, setShowRangeData] = useState<any>()

  const dispatch = useAppDispatch()
  const { isLoading, categoryData, labTestData, componentData, componentInfo } =
    useAppSelector((state) => state.lab)

  const pageIndexArray = () => {
    let pageIndexOptions = []
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i)
    }
    return pageIndexOptions
  }

  const pageIndexOptions = pageIndexArray()

  useEffect(() => {
    dispatch(getLabCategory(requestGenerator({})))
  }, [])

  useEffect(() => {
    let requestData = {
      search: searchTest,
      filters: category === '' ? {} : { category_id: category },
      page: pageIndex,
      pageSize: dataPerPage,
      order_by: { name: 1 },
    }
    dispatch(getAllLabTest(requestGenerator(requestData))).then((result) => {
      setTotalPage(result.payload.lastPage)
    })
  }, [pageIndex, dataPerPage])

  useEffect(() => {
    let requestData = {
      search: searchTest,
      filters: category === '' ? {} : { category_id: category },
      page: 1,
      pageSize: 10,
      order_by: { name: 1 },
    }
    dispatch(getAllLabTest(requestGenerator(requestData))).then((result) => {
      setTotalPage(result.payload.lastPage)
    })
  }, [category])

  const handleEdit = (row: any, e: any) => {
    // e.stopPropagation()
    setEditId(row)
    setTest(true)
  }

  useEffect(() => {
    if (editId !== undefined) {
      dispatch(getLabTest(requestGenerator({ id: editId })))
    }
    return () => {
      dispatch(cleartestData())
    }
  }, [editId])

  useEffect(() => {
    if (test === false) {
      setEditId(undefined)
    }
  }, [test])

  const handleSearch = () => {
    let requestData = {
      search: searchTest,
      filters: category === '' ? {} : { category_id: category },
      page: 1,
      pageSize: 10,
      order_by: { name: 1 },
    }
    setPageIndex(1)
    dispatch(getAllLabTest(requestGenerator(requestData))).then((result) => {
      setTotalPage(result.payload.lastPage)
    })
  }

  const handleAddTest = () => {
    setTest(true)
    dispatch(cleartestData())
  }

  const handleClear = () => {
    setSearchTest('')
    setSelectCategory(null)
    setCategory('')
    let requestData = {
      search: '',
      filters: {},
      page: pageIndex,
      pageSize: dataPerPage,
      order_by: { name: 1 },
    }
    setPageIndex(1)
    dispatch(getAllLabTest(requestGenerator(requestData))).then((result) => {
      setTotalPage(result.payload.lastPage)
    })
  }

  useEffect(() => {
    if (showCreateTestProfile === false || test === false) {
      setCategory('')
      setSearchTest('')
      setSelectCategory(null)
      dispatch(clearNewTestData())
    }
  }, [showCreateTestProfile, test])

  useEffect(() => {
    if (test === false) {
      dispatch(clearRangeData())
      setValue(undefined)
      setActive(false)
    }
  }, [test])

  useEffect(() => {
    if (showLabTestList === false) {
      dispatch(clearNewTestData())
    }
  }, [showLabTestList])

  const handleRow = (id: any) => {
    setValue(id)
    if (value === id) {
      setActive(true)
    } else {
      setActive(false)
    }
  }

  useEffect(() => {
    if (value !== undefined) {
      dispatch(getLabTest(requestGenerator({ id: value })))
    }
  }, [value])

  useEffect(() => {
    if (range === false) {
      setShowRangeData(undefined)
      // dispatch(clearComponentData());
    }
  }, [range])

  useEffect(() => {
    if (component === false) {
      setValue(undefined)
      setActive(false)
      dispatch(clearComponentData())
      dispatch(clearRangeData())
    }
  }, [component])

  useEffect(() => {
    if (componentInfo?._id !== undefined) {
      setRangeData(undefined)
      setShowRangeData(undefined)
      dispatch(clearComponentData())
    }
  }, [componentInfo?._id])

  return (
    <>
      {showTestProfile && (
        <Popup
          Children={ViewTestProfilePopup}
          handleClose={() => {
            setShowTestProfile(false)
            setTestProfileData(undefined)
            setSelectCategory(null)
            setCategory('')
            setSearchTest('')
          }}
          handleOpen={(item: any) => {
            setShowTest(true)
            setTestListData(item)
          }}
          handleRowClick={(itemData: any) => {
            let data = { id: itemData }
            dispatch(getLabTestProfile(requestGenerator(data)))
            dispatch(updateprofileData())
            setShowCreateTestProfile(true)
          }}
          headerData={showCreateTestProfile}
          customClassPopup={styles.viewTestProfileStyle}
        />
      )}
      {showTest && (
        <Popup
          Children={TestListPopup}
          handleClose={() => setShowTest(false)}
          popData={testListData}
        />
      )}
      {showCreateTestProfile && (
        <Popup
          Children={CreateTestProfilePopup}
          handleClose={() => {
            setShowCreateTestProfile(false)
            setTestProfileData(undefined)
            dispatch(clearProfileData())
            setSelectCategory(null)
            setCategory('')
            setSearchTest('')
            let requestData = {
              search: searchTest,
              filters: {},
              page: pageIndex,
              pageSize: dataPerPage,
              order_by: { name: 1 },
            }
            dispatch(getAllLabTest(requestGenerator(requestData))).then(
              (result) => {
                setTotalPage(result.payload.lastPage)
              }
            )
          }}
          setModelOpenClose={setShowCreateTestProfile}
          popData={testProfileData}
          headerData={{
            search: searchTest,
            filters: category === '' ? {} : { category_id: category },
            page: pageIndex,
            pageSize: dataPerPage,
            order_by: { name: 1 },
          }}
          handleChildClick={() => {
            setShowLabTestList(true)
          }}
          customClassPopup={styles.viewTestProfileStyle}
        />
      )}
      {showConfigurePrice && (
        <Popup
          Children={CobfigurePricePopup}
          handleClose={() => setShowConfigurePrice(false)}
        />
      )}
      {showLabTestList && (
        <Popup
          Children={LabTestListPopup}
          handleClose={() => setShowLabTestList(false)}
          setModelOpenClose={setShowLabTestList}
        />
      )}
      {/* {configurationEdit && (
        <Popup
          Children={ConfigurationEditPopup}
          handleClose={() => setConfigurationEdit(false)}
          handleOpen={() => setRemarks(true)}
          handleChildClick={() => setMoreDetail(true)}
        />
      )}
      {remarks && (
        <Popup
          Children={PrescriptionPopup}
          handleClose={() => setRemarks(false)}
        />
      )}
      {moreDetail && (
        <Popup
          Children={MoreDetailsPopup}
          handleClose={() => setMoreDetail(false)}
        />
      )} */}
      {test && (
        <Popup
          Children={CreateTestPopup}
          handleClose={() => {
            setTest(false)
          }}
          setModelOpenClose={setTest}
          // popData={rangeData}
        />
      )}

      {component && (
        <Popup
          Children={LabComponentPopup}
          handleClose={() => setComponent(false)}
          handleDepartment={() => setRange(true)}
          setModelOpenClose={setComponent}
          popData={rangeData}
          branchId={value}
          handleDepartmentServiceConfig={(item: any) => {
            if (item?.length > 0) {
              setShowRangeData(item)
            } else {
              setShowRangeData('1')
            }
            setRange(true)
          }}
        />
      )}
      {range && (
        <Popup
          Children={RangePopup}
          handleClose={() => setRange(false)}
          setModelOpenClose={setRange}
          handleSubmitData={(item: any) => setRangeData(item)}
          popData={showRangeData}
        />
      )}

      {isLoading && <Loader />}
      <div className={styles.configurationContainer}>
        <div className={styles.mainContainer}>
          <div className={styles.searchBtnContainer}>
            <div className={styles.dropdownContainer}>
              <label htmlFor="category" className={styles.labelText}>
                Category
              </label>
              <Select
                className={styles.select}
                placeholder="Select Category"
                closeMenuOnSelect={true}
                isSearchable={true}
                value={selectCategory}
                options={categoryData?.map((item: any) => ({
                  label: item?.name,
                  value: item?._id,
                }))}
                onChange={(e: any) => {
                  setCategory(e.value)
                  setSelectCategory(e)
                }}
                maxMenuHeight={200}
              />
            </div>
            <Button
              title="Create Test Profile"
              customClass={styles.btnStyle}
              handleClick={() => setShowCreateTestProfile(true)}
            />
            <Button
              title="View Test  Profile"
              handleClick={() => setShowTestProfile(true)}
            />
          </div>
          <div className={styles.inputFieldContainer}>
            <input
              type="text"
              className={styles.inputSearchContainer}
              placeholder="Search by test name"
              value={searchTest}
              onChange={(e) => {
                trimValue(e)
                setSearchTest(e.target.value)
                if (e.target.value === '') {
                  let requestData = {
                    search: '',
                    filters: category === '' ? {} : { category_id: category },
                    page: pageIndex,
                    pageSize: dataPerPage,
                    order_by: { name: 1 },
                  }
                  dispatch(getAllLabTest(requestGenerator(requestData))).then(
                    (result) => {
                      setTotalPage(result.payload.lastPage)
                    }
                  )
                }
              }}
            />
            <SearchButton
              handleClick={() => handleSearch()}
              customClass={styles.inputSearchButton}
            />
            <div className={styles.iconStyle}>
              <InfoIcon
                fillColor={colors.grey2}
                mouseEnter={() => setShowText(true)}
                mouseLeave={() => setShowText(false)}
              />
              {showText && <p className={styles.infoText}>Search with test</p>}
            </div>
            <Button
              title="Configure Price"
              handleClick={() => setShowConfigurePrice(true)}
              disable={true}
            />
            <Button
              title="Reset"
              handleClick={handleClear}
              customClass={styles.btnStyle}
            />
            <Button
              title="Component"
              handleClick={() => setComponent(true)}
              disable={value !== undefined ? false : true}
            />
          </div>
          <TableV2
            tableHeaderData={configurationHeaderData}
            tableRowData={labTestData}
            handleClick={handleEdit}
            handleRow={handleRow}
            setActive={setValue}
            active={value}
          />
          <Pagination
            setDataPerPage={setDataPerPage}
            pageIndexOptions={pageIndexOptions}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
          />
        </div>
        <div className={styles.mainContainerFormActionSidebar}>
          <div className={styles.sidebarData}>
            {invoiceFormActionData?.map((item: any, index: any) => {
              return (
                <React.Fragment key={index}>
                  <div
                    className={styles.iconStyleContainer}
                    key={index}
                    onClick={() =>
                      item.id === 0 &&
                      item.handleOnClick === true &&
                      handleAddTest()
                    }
                  >
                    <item.icon
                      customClass={styles.iconStyle}
                      fillColor="#CDD4D8"
                    />
                    <p className={styles.tooltiptext}>{item.name}</p>
                  </div>
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Configuration
