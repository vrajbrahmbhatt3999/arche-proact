import { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../hooks'
import { getCompareDocumentsById } from '../../../../../redux/features/patient-history/patientHistoryAsyncActions'
import { requestGenerator } from '../../../../../utils/payloadGenerator'
import Loader from '../../../spinner/Loader'
import { CloseIcon } from '../../../svg-components'
import styles from './compareDocs.module.scss'
import { colors } from '../../../../../constants/color'
import Popup from '../../../popup/Popup'
import DocumentsViewerModal from '../../documents-viewer-modal/DocumentsViewerModal'
import {
  clearCompareData,
  clearDocData,
  setPatientHistoryImagesData,
  setSelectedImagesData,
} from '../../../../../redux/features/patient-history/patientHistorySlice'

interface ICompareModalProps {
  handleClose: any
  handleOpen: any
  heading: string
}

const CompareDocModal: FC<ICompareModalProps> = ({
  handleClose,
  heading,
  handleOpen,
}) => {
  const {
    selectedDocForCompare,
    patientCompareDocumentsData,
    isLoading,
    patientHistoryAttachments,
  } = useAppSelector((state) => state.patientHistory)
  const dispatch = useAppDispatch()
  useEffect(() => {
    const tempArr = selectedDocForCompare?.map((item: any) => {
      return { diag_id: item?._id, img_id: item?.diag?.doc_id }
    })
    const payload = {
      img_ids: tempArr,
      flag: true,
    }
    dispatch(getCompareDocumentsById(requestGenerator(payload)))
  }, [selectedDocForCompare])
  useEffect(() => {
    return () => {
      let tempArr = patientHistoryAttachments?.map((item: any) => {
        return { ...item, status: false }
      })
      dispatch(setPatientHistoryImagesData(tempArr ?? []))
      dispatch(setSelectedImagesData([]))
    }
  }, [])
  return (
    <>
      {isLoading && <Loader />}
      <div
        className={styles.compareModalContainer}
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
        <h1 className={styles.compareModalHeading}>{heading}</h1>
        <hr className={styles.compareModalDivider} />
        {patientCompareDocumentsData?.length > 0 && (
          <div className={styles.compateImagesContainer}>
            {patientCompareDocumentsData?.map((item: any, index: number) => {
              return (
                <div className={styles.iframeContainer}>
                  <iframe
                    src={`${item}#toolbar=0`}
                    className={styles.docs}
                    key={`${index}-doc`}
                    title="document"
                    height={300}
                    width={300}
                  />
                  <span
                    className={styles.viewButton}
                    onClick={() => handleOpen(item)}
                  >
                    View
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
export default CompareDocModal
