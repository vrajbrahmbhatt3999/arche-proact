import { FC, useEffect } from 'react'
import styles from './viewHistoryPopup.module.scss'
import Divider from '../../divider/Divider'
import { CloseIcon } from '../../svg-components'
import { colors } from '../../../../constants/color'
import TableV2 from '../../table/tableV2/TableV2'
import { viewHistoryPopupTableHeaderData } from '../../../../constants/table-data/viewHistoryPopupTableData'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { requestGenerator } from '../../../../utils/payloadGenerator'
import { getAllMedicalHistory } from '../../../../redux/features/patient-emr/patient/patientAsyncAction'
import Loader from '../../spinner/Loader'

interface IViewHistoryModal {
  handleClose: (e?: React.MouseEvent<HTMLElement>) => void
}

const ViewHistoryPopup: FC<IViewHistoryModal> = ({ handleClose }) => {
  const dispatch = useAppDispatch()
  const { isLoading, medicalHistoryData, patientDataObjectById } =
    useAppSelector((state) => state.patient)
  const { patientFormData } = useAppSelector((state) => state.patientHistory)
  // console.log("patientFormData :>> ", patientFormData?.patient_id);
  useEffect(() => {
    let data = {}
    if (patientFormData?.patient_id) {
      data = {
        patient_id: patientFormData?.patient_id,
      }
    } else {
      data = {
        patient_id: patientDataObjectById?._id,
        // patient_id: "6441140439449b0283c28561",
      }
    }
    dispatch(getAllMedicalHistory(requestGenerator(data)))
  }, [dispatch])

  return (
    <>
      {isLoading && <Loader />}
      <div
        className={styles.popupContainer}
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
        <div className={styles.viewHistory}>
          <p className={styles.title}>
            {patientFormData?.patient_id ? 'Medical History' : 'View History'}
          </p>
          <Divider customClass={styles.dividerStyle} />
          <div
            style={{ height: '100%', overflowY: 'scroll', maxHeight: '400px' }}
          >
            <TableV2
              tableHeaderData={viewHistoryPopupTableHeaderData}
              tableRowData={medicalHistoryData}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewHistoryPopup
