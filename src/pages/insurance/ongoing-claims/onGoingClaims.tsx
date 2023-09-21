import { FC, useEffect, useState } from 'react'
import Button from '../../../components/common/button/Button'
import styles from './styles.module.scss'
import { ongoingClaimsHeaderMatch } from './onGoingClaimsTableData'
import { CustomRadio } from '../../../components/common/custom-radio'
import Popup from '../../../components/common/popup/Popup'
import AddClaimsPopup from './add-claim-popup/addClaim'
import SettledClaimPopup from './settled-claims-popup/settledClaim'
import RejectedClaimPopup from './rejected-claims-popup/rejectedClaim'
import TableV2 from '../../../components/common/table/tableV2/TableV2'
import Pagination from '../../../components/common/pagination/Pagination'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { getAllOngoingClaims } from '../../../redux/features/ongoing-claims/onGoingClaimsAsyncActions'
import { requestGenerator } from '../../../utils/payloadGenerator'
import Loader from '../../../components/common/spinner/Loader'
import DescriptionModal from '../../../components/common/modal/description-modal/DescriptionModal'

interface ICreateJobs {}

const OnGoingClaims: FC<ICreateJobs> = () => {
  // const [formActionValue, setFormActionValue] = useState(-1);
  const [dataPerPage, setDataPerPage] = useState<number>(10)
  const [claimsPopup, setClaimsPopup] = useState<boolean>(false)
  const [settledClaim, setSettledClaim] = useState<boolean>(false)
  const [rejectedClaim, setRejectedClaim] = useState<boolean>(false)
  const [check, setCheck] = useState('INITIATED')
  const [totalPage, setTotalPage] = useState<number>(0)
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [notePopup, setNotePopup] = useState({ open: false, note: {} })

  const pageIndexArray = () => {
    let pageIndexOptions = []
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i)
    }
    return pageIndexOptions
  }
  const pageIndexOptions = pageIndexArray()

  const dispatch = useAppDispatch()
  const { isLoading, onGoingClaimsData } = useAppSelector(
    (state) => state.ongoingClaims
  )
  useEffect(() => {
    let reqPayload = {
      page: pageIndex,
      pageSize: dataPerPage,
      claim_status: check,
    }
    dispatch(getAllOngoingClaims(requestGenerator(reqPayload))).then(
      (result) => {
        setTotalPage(result.payload.lastPage)
      }
    )
  }, [dispatch, pageIndex, dataPerPage, check])

  const handleNotes = (note: any) => {
    setNotePopup({ open: true, note: { noteDetail: note, lastUpdateDate: '' } })
  }
  const handleReloadPage = (setter: any) => {
    if (check === 'INITIATED' && pageIndex === 1) {
      console.log('if satisfied')
      setter(false)
      let reqPayload = {
        page: 1,
        pageSize: dataPerPage,
        claim_status: 'INITIATED',
      }
      dispatch(getAllOngoingClaims(requestGenerator(reqPayload))).then(
        (result) => {
          setTotalPage(result.payload.lastPage)
        }
      )
    } else {
      setPageIndex(1)
      setCheck('INITIATED')
      setter(false)
    }
  }
  return (
    <>
      {isLoading && <Loader />}
      {/* Add Test Popup */}
      {claimsPopup && (
        <Popup
          Children={AddClaimsPopup}
          handleClose={() => setClaimsPopup(false)}
          handleYes={() => {
            handleReloadPage(setClaimsPopup)
          }}
          setModelOpenClose={setCheck}
          heading={check}
          setIsDefault={setTotalPage}
        />
      )}
      {settledClaim && (
        <Popup
          Children={SettledClaimPopup}
          handleClose={() => setSettledClaim(false)}
          handleYes={() => {
            handleReloadPage(setSettledClaim)
          }}
          setModelOpenClose={setCheck}
          heading={check}
          setIsDefault={setTotalPage}
        />
      )}
      {rejectedClaim && (
        <Popup
          Children={RejectedClaimPopup}
          handleClose={() => setRejectedClaim(false)}
          handleYes={() => {
            handleReloadPage(setRejectedClaim)
          }}
          setModelOpenClose={setCheck}
          heading={check}
          setIsDefault={setTotalPage}
        />
      )}
      {notePopup.open && (
        <Popup
          Children={DescriptionModal}
          handleClose={() => setNotePopup({ open: false, note: {} })}
          heading={'Notes'}
          popData={notePopup.note}
        />
      )}
      {/* Table Container*/}
      <div className={styles.pageWrapper}>
        <div className={styles.claims_Wrapper}>
          <h4 style={{ fontSize: '22px', fontWeight: '600' }}>
            Ongoing Claims
          </h4>
          <div className={styles.createJobBtnContainer}>
            <Button
              title="Add Claim"
              type="button"
              handleClick={() => setClaimsPopup(true)}
            />
            <Button
              title="Add Settled Claims"
              type="button"
              handleClick={() => setSettledClaim(true)}
            />
            <Button
              title="Add Rejected Claims"
              type="button"
              handleClick={() => setRejectedClaim(true)}
            />
          </div>
        </div>
        <div className={styles.radioFieldContainer}>
          <CustomRadio
            value="INITIATED"
            name="task"
            label="Initiated"
            checked={check === 'INITIATED'}
            onChange={() => setCheck('INITIATED')}
          />
          <CustomRadio
            value="SETTLED"
            name="task"
            label="settled"
            checked={check === 'SETTLED'}
            onChange={() => setCheck('SETTLED')}
          />
          <CustomRadio
            value="REJECTED"
            name="task"
            label="rejected"
            checked={check === 'REJECTED'}
            onChange={() => setCheck('REJECTED')}
          />
        </div>
        <div className={styles.TableMainContainer}>
          <div className={styles.tableContainer}>
            <TableV2
              tableHeaderData={ongoingClaimsHeaderMatch[check]}
              tableRowData={onGoingClaimsData}
              active={false}
              handleClick={handleNotes}
            />
          </div>
          {/* Pagination */}
          {ongoingClaimsHeaderMatch[check] &&
            ongoingClaimsHeaderMatch[check].length > 0 && (
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

export default OnGoingClaims
