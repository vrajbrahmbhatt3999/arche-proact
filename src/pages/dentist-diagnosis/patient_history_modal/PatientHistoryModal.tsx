import { FC, useState, useEffect } from 'react'
import TableV2 from '../../../components/common/table/tableV2/TableV2'
import Pagination from '../../../components/common/pagination/Pagination'
import {
  CloseIcon,
  PrintIcon,
  ExportIcon,
} from '../../../components/common/svg-components'
import Loader from '../../../components/common/spinner/Loader'
import { getPatientHistoryById } from '../../../redux/features/patient-history/patientHistoryAsyncActions'
import { patientHistoryHeaderData } from '../../../constants/table-data/patientHistoryTableData'
import { colors } from '../../../constants/color'
import { requestGenerator } from '../../../utils/payloadGenerator'
import { useAppDispatch, useAppSelector } from '../../../hooks/index'
import { formatDate, trimValue } from '../../../utils/utils'
import styles from './patientHistoryModal.module.scss'
import Popup from '../../../components/common/popup/Popup'
import CompareModal from '../../../components/common/modal/compare-modal/CompareModal'

interface IPatientHistoryModal {
  handleClose: (e?: React.MouseEvent<HTMLElement>) => void
  handleOpen: any
  popData?: any
}

const PatientHistoryModal: FC<IPatientHistoryModal> = ({
  handleClose,
  handleOpen,
  popData,
}) => {
  const dispatch = useAppDispatch()
  const { isLoading, patientFormData, patientHistoryData } = useAppSelector(
    (state) => state.patientHistory
  )
  // console.log("patientFormData :>> ", patientFormData?.patient_id);
  // console.log("patientHistoryData :>> ", patientHistoryData);
  // Define state variables
  const [patientHistoryDate, setPatientHistoryDate] = useState<string>('')
  const [dataPerPage, setDataPerPage] = useState<number>(10)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [pageIndex, setPageIndex] = useState<number>(1)

  // console.log("popData", popData);

  // function for creating Page Index Array
  const pageIndexArray = () => {
    let pageIndexOptions = []
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i)
    }
    return pageIndexOptions
  }
  const pageIndexOptions = pageIndexArray()

  // API call for patient history modal
  useEffect(() => {
    let payloadData = {
      page: pageIndex,
      pageSize: dataPerPage,
      search: popData?.createdAt
        ? formatDate(popData?.createdAt)
        : patientHistoryDate,
      patient_id: popData
        ? popData?.patient_id
          ? popData?.patient_id
          : popData
        : patientFormData?.patient_id,
    }
    if (patientFormData?.patient_id || popData) {
      dispatch(getPatientHistoryById(requestGenerator(payloadData))).then(
        (result) => setTotalPage(result.payload.lastPage)
      )
    }
  }, [
    dispatch,
    patientHistoryDate,
    patientFormData?.patient_id,
    dataPerPage,
    pageIndex,
    popData,
  ])

  return (
    <>
      {isLoading && <Loader />}

      <div
        className={styles.patientHistoryModalContainer}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => {
            handleClose()
          }}
        />
        <h1 className={styles.patientHistoryModalHeading}>Patient History</h1>
        <hr className={styles.patientHistoryModalDivider} />
        <div className={styles.patientHistoryContainer}>
          <div className={styles.searchIconContainer}>
            <div className={styles.searchFieldContainer}>
              <label htmlFor={'date'} className={styles.searchLabel}>
                Date
              </label>
              <input
                className={styles.searchInput}
                type="date"
                max={new Date().toISOString().split('T')[0]}
                value={patientHistoryDate}
                onChange={(e) => {
                  setPatientHistoryDate(e.target.value)
                }}
                // disabled={popData?.createdAt ? true : false}
              />
            </div>
            <PrintIcon customClass={styles.stylePrint} />
            <ExportIcon customClass={styles.styleExport} />
          </div>
          <div className={styles.tableContainer}>
            <TableV2
              tableHeaderData={patientHistoryHeaderData}
              tableRowData={patientHistoryData}
              active={false}
              customClassForTh={styles.tableHeaderText}
              handleClick={handleOpen}
            />
          </div>
          {patientHistoryData?.length > 0 && (
            <Pagination
              setDataPerPage={setDataPerPage}
              pageIndexOptions={pageIndexOptions}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default PatientHistoryModal
