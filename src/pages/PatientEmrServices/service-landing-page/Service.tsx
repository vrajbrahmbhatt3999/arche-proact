import React, { FC, useState, useEffect } from 'react'
import Loader from '../../../components/common/spinner/Loader'
import styles from '../service-landing-page/patientservice.module.scss'
import Button from '../../../components/common/button/Button'
import Popup from '../../../components/common/popup/Popup'
import NewPlan from '../../../components/common/modal/new-plan-model/NewPlanPopup'
import Pagination from '../../../components/common/pagination/Pagination'
import TableV2 from '../../../components/common/table/tableV2/TableV2'
import { SearchButton } from '../../../components/common/svg-components'
import { servicesHeaderData } from '../../../constants/table-data/serviceTableData'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { requestGenerator } from '../../../utils/payloadGenerator'
import { GetAllServicesAsyncData } from '../../../redux/features/patientservices/servicesAsyncActions'
import { trimValue } from '../../../utils/utils'
import { invoiceFormActionData } from '../../../constants/data'
import AddServiceDataModal from './addServiceDataModel'
import ViewPlanModal from '../../../components/common/modal/view-plan-modal/ViewPlanModal'

interface IServices {}

const Services: FC<IServices> = () => {
  const [claimsPopup, setClaimsPopup] = useState<boolean>(false)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [dataPerPage, setDataPerPage] = useState<number>(10)
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [searchBranch, setSearchBranch] = useState<string>('')
  const [check, setCheck] = useState('SETTLED')
  const [viewPlanPopup, setViewPlanPopup] = useState<any>(false)
  const [showDescriptionModal, setShowDescriptionModal] =
    useState<boolean>(false)
  const [showAddModal, setShowAddModal] = useState<boolean>(false)
  const [addModalData, setAddModalData] = useState({})
  const [LeavePopUpData, setLeavePopUpData] = useState({})
  const [showlevel4, setshowlevel4] = useState<boolean>(false)

  const pageIndexArray = () => {
    let pageIndexOptions = []
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i)
    }
    return pageIndexOptions
  }
  const pageIndexOptions = pageIndexArray()

  const dispatch = useAppDispatch()
  const { isLoading, allServiceData, isStatusValueUpdated } = useAppSelector(
    (state) => state.services
  )

  useEffect(() => {
    let reqPayload = {
      search: searchBranch,
      page: pageIndex,
      pageSize: dataPerPage,
      // is_active:true
      // order_by: { name: "1" },
    }
    dispatch(GetAllServicesAsyncData(requestGenerator(reqPayload))).then(
      (result) => setTotalPage(result.payload.lastPage)
    )
  }, [pageIndex, dataPerPage])

  const handleSearch = () => {
    setPageIndex(1)
    let data = {
      search: searchBranch,
      page: pageIndex,
      pageSize: dataPerPage,
      order_by: { name: '1' },
    }
    dispatch(GetAllServicesAsyncData(requestGenerator(data))).then((result) =>
      setTotalPage(result.payload.lastPage)
    )
  }

  const handleLeaveModalOpen = (payload: any) => {
    setLeavePopUpData(payload.deleteAction)
    setshowlevel4(true)
  }

  const handleModalClose = () => {
    setShowAddModal(false)
    setAddModalData({})
    // setSearchValue("");
  }

  const handleServiceModalClose = (payload: any) => {
    setshowlevel4(false)
    setLeavePopUpData({})
    // dispatch(getvoucherData(requestGenerator({ is_active: true })));
  }

  const handleDeleteModalOpen = (payload: any) => {
    if (payload?.editAction) {
      setshowlevel4(true)
      setLeavePopUpData(payload?.editAction?.data)
    }
  }

  useEffect(() => {
    let requestData = {
      search: searchBranch,
      page: pageIndex,
      pageSize: dataPerPage,
    }
    if (isStatusValueUpdated === true) {
      dispatch(GetAllServicesAsyncData(requestGenerator(requestData))).then(
        (result) => setTotalPage(result.payload.lastPage)
      )
    }
  }, [isStatusValueUpdated])
  return (
    <>
      {isLoading && <Loader />}
      {claimsPopup && (
        <Popup
          Children={NewPlan}
          handleClose={() => setClaimsPopup(false)}
          setModelOpenClose={setClaimsPopup}
        />
      )}
      {viewPlanPopup && (
        <Popup
          Children={ViewPlanModal}
          handleClose={() => setViewPlanPopup(false)}
          // handleOpen={ViewServicesModal}
        />
      )}
      {/* {showDescriptionModal && (
        <Popup
          Children={ViewServicesModal}
          handleClose={handleDescriptionModal}
          heading={"View services"}
        />
      )} */}
      {showlevel4 && (
        <Popup
          Children={AddServiceDataModal}
          popData={LeavePopUpData}
          // handleClose={() => handleModalClose()}
          setModelOpenClose={setTotalPage}
          handleClose={handleServiceModalClose}
        />
      )}
      <div className={styles.servicesContainer}>
        <div className={styles.mainFormContainer}>
          <div className={styles.configurationContainer}>
            <div className={styles.mainContainer}>
              {/* <div className={styles.searchBtnContainer}>
                <div className={styles.dropdownContainer}>
                  <label htmlFor="category" className={styles.labelText}>
                    Dept. :
                  </label>
                  <Select
                    className={styles.select}
                    placeholder="Select Category"
                    closeMenuOnSelect={true}
                    isSearchable={true}
                    // value={selectCategory}
                    // options={categoryData?.map((item: any) => ({
                    //   label: item?.name,
                    //   value: item?._id,
                    // }))}
                    // onChange={(e: any) => {
                    //   setCategory(e.value);
                    //   setSelectCategory(e)
                    // }}
                    maxMenuHeight={200}
                  />
                </div>
              </div> */}
              <div className={styles.NewPlanBtn}>
                <Button
                  title="New Plan"
                  type="button"
                  customClass={styles.btnPlan}
                  handleClick={() => setClaimsPopup(!claimsPopup)}
                />
                <Button
                  title="View Plans"
                  type="button"
                  customClass={styles.viewBtn}
                  handleClick={() => setViewPlanPopup(true)}
                />
              </div>
            </div>
          </div>
          <div className={styles.searchFieldContainer}>
            <div className={styles.inputFieldContainer}>
              <input
                type="text"
                className={styles.inputSearchContainer}
                placeholder="Search by service name"
                onChange={(e) => {
                  trimValue(e)
                  setSearchBranch(e.target.value)
                  if (e.target.value === '') {
                    let data = {
                      search: '',
                      page: pageIndex,
                      pageSize: dataPerPage,
                      order_by: { name: '1' },
                    }
                    dispatch(
                      GetAllServicesAsyncData(requestGenerator(data))
                    ).then((result) => setTotalPage(result.payload.lastPage))
                  }
                }}
              />
              <SearchButton
                handleClick={() => handleSearch()}
                customClass={styles.inputSearchButton}
              />
            </div>

            {/* <div className={styles.radioFieldContainer}>
              <CustomRadio
                value="INITIATED"
                name="task"
                label="Show All"
                checked={check === 'INITIATED'}
                onChange={() => setCheck('INITIATED')}
              />
              <CustomRadio
                value="SETTLED"
                name="task"
                label="Services"
                checked={check === 'SETTLED'}
                onChange={() => setCheck('SETTLED')}
              />
              <CustomRadio
                value="REJECTED"
                name="task"
                label="Items"
                checked={check === 'REJECTED'}
                disabled
                onChange={() => setCheck('REJECTED')}
              />
            </div> */}

            <div className={styles.addServicebtn}>
              <Button
                title="Add New Service"
                type="button"
                customClass={styles.btnPlan}
                handleClick={handleLeaveModalOpen}
              />
            </div>
          </div>
          <div className={styles.TableMainContainer}>
            <div className={styles.tableContainer}>
              <TableV2
                tableHeaderData={servicesHeaderData}
                tableRowData={allServiceData}
                active={false}
                handleClick={handleDeleteModalOpen}
                setModelOpenClose={handleLeaveModalOpen}
                // handleClick={handleNotes}
              />
            </div>
            <Pagination
              setDataPerPage={setDataPerPage}
              pageIndexOptions={pageIndexOptions}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
            />
          </div>
        </div>
        <div className={styles.mainContainerFormActionSidebar}>
          <div className={styles.sidebarData}>
            {invoiceFormActionData?.map((item: any, index: any) => {
              return (
                <React.Fragment key={index}>
                  <div className={styles.iconStyleContainer} key={index}>
                    <item.icon
                      customClass={styles.iconStyle}
                      fillColor="#CDD4D8"
                      // mouseEnter={() => setFormActionValue(index)}
                      // mouseLeave={() => setFormActionValue(-1)}
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

export default Services
