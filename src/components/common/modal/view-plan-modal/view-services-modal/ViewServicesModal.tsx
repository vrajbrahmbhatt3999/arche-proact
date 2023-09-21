import { FC, useState, useEffect } from 'react'
import styles from './viewservicesmodal.module.scss'
import { CloseIcon, SearchIcon } from '../../../svg-components'
import { colors } from '../../../../../constants/color'
import TableV3 from '../../../table/tableV3/TableV3'
import SmartSearch from '../../../smart-search/SmartSearch'
import {
  Column,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from 'react-table'
import { Cols } from '../../../../../interfaces/interfaces'
import { viewServiceModalHeaderData } from '../../../../../constants/table-data/viewServiceModalPopupData'
import { getAllTreatmentPlans } from '../../../../../redux/features/treatmentPlans/treatmentPlansAsyncActions'
import { requestGenerator } from '../../../../../utils/payloadGenerator'
import { useAppDispatch } from '../../../../../hooks'

interface IDescriptionModalProps {
  heading?: string
  message?: string
  handleClose?: (e?: React.MouseEvent<HTMLElement>) => void
  popData?: string | any
}

const ViewServiceModal: FC<IDescriptionModalProps> = ({
  heading,
  message,
  handleClose,
  popData,
}) => {
  const [deptList, setDeptList] = useState<any>([])
  const [dataPerPage, setDataPerPage] = useState<number>(10)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [pageIndex, setPageIndex] = useState<number>(1)
  const dispatch = useAppDispatch()

  const data: Cols[] = deptList
  const columns: Column<Cols>[] = viewServiceModalHeaderData
  const options: TableOptions<Cols> = {
    data,
    columns,
  }

  const {
    state,
    // @ts-ignore
    setGlobalFilter,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(options, useGlobalFilter, useSortBy)
  // @ts-ignore
  const { globalFilter } = state
  const pageIndexArray = () => {
    let pageIndexOptions = []
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i)
    }
    return pageIndexOptions
  }
  const pageIndexOptions = pageIndexArray()
  useEffect(() => {
    if (popData && popData.service_ids) {
      setDeptList(popData?.service_ids)
    }
  }, [popData])
  useEffect(() => {
    let requestData = {
      page: pageIndex,
      pageSize: dataPerPage,
    }
    dispatch(getAllTreatmentPlans(requestGenerator(requestData))).then(
      (result) => setTotalPage(result.payload.lastPage)
    )
  }, [pageIndex, dataPerPage])
  console.log('popData>>>>>>>>>', popData)
  return (
    <div
      className={styles.descrtiptionModalContainer}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <CloseIcon
        customClass={styles.closeIconStyle}
        fillColor={colors.green1}
        handleClick={() => {
          handleClose && handleClose()
        }}
      />
      <h1 className={styles.descriptionModalHeading}>View Services</h1>
      <hr className={styles.descriptionDivider} />
      <div className={styles.searchButton}>
        <SearchIcon fillColor={colors.white1} />
      </div>
      <SmartSearch
        placeHolder={'Smart Search'}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        // isDisable={isSmartSearchDisable}
        customClassInput={styles.smartSearchInput}
      />
      <div className={styles.tableContainer}>
        <TableV3
          getTableProps={getTableProps}
          getTableBodyProps={getTableBodyProps}
          headerGroups={headerGroups}
          rows={rows}
          prepareRow={prepareRow}
          //    handleOpen={handleOpen}
        />
      </div>
    </div>
  )
}

export default ViewServiceModal
