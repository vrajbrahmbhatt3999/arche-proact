import moment from 'moment'
import styles from './viewAllAttachmentsTable.module.scss'
import { CheckIcon, UncheckIcon } from '../../components/common/svg-components'
import { colors } from '../color'
import { setMessage } from '../../redux/features/toast/toastSlice'
import { failure } from '../data'
import { checkSameImgCategory } from '../../utils/utils'
import {
  setPatientHistoryImagesData,
  setSelectedImagesData,
} from '../../redux/features/patient-history/patientHistorySlice'
import { useAppDispatch, useAppSelector } from '../../hooks'

export const viewAllAttachmentsModalHeaderData: any = [
  {
    Header: 'DATE',
    accessor: (row: any) => {
      return moment(row?.date).format('DD-MMM-YYYY') ?? '-'
    },
    // disableSortBy: true,
  },
  {
    Header: 'DOC.CATEGORY',
    accessor: (row: any) => {
      return row?.diag?.doc_category
    },
    // disableSortBy: true,
  },
  {
    Header: 'DOC.NAME',
    accessor: (row: any) => {
      // console.log("row", row);
      return row?.diag?.doc_name
    },
    // disableSortBy: true,
  },
  {
    Header: 'VIEW DOC.',
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.diag?.doc_id ? (
            <span
              className={styles.viewPopupLink}
              onClick={() => {
                props?.onRowClick(props?.row?.original)
              }}
            >
              View
            </span>
          ) : (
            '-'
          )}
        </>
      )
    },
  },
  {
    Header: 'SELECT',
    Cell: (props: any) => {
      const { patientHistoryAttachments, selectedDocForCompare } =
        useAppSelector((state) => state.patientHistory)
      const dispatch = useAppDispatch()
      const handleImageSelection = (imageItem: any) => {
        let tempArr = patientHistoryAttachments?.map((item: any) => {
          if (imageItem?.diag?.doc_id === item?.diag?.doc_id) {
            return { ...item, status: !item?.status }
          } else {
            return item
          }
        })

        // console.log('temp array after selettion,', tempArr, imageItem)
        const selectedDocs = tempArr?.filter((item: any) => item?.status)
        if (selectedDocs?.length > 3) {
          dispatch(
            setMessage({
              message: 'Maximum documents selection upto 3',
              type: failure,
            })
          )
        }
        else {
          dispatch(setPatientHistoryImagesData(tempArr))
          dispatch(setSelectedImagesData(selectedDocs))
        }
        //  else if (
        //   selectedDocs.length > 0 &&
        //   !checkSameImgCategory(selectedDocs, 'doc_category')
        // ) {
        //   dispatch(
        //     setMessage({
        //       message: 'Please select same category docs',
        //       type: failure,
        //     })
        //   )
        // } else {
        //   dispatch(setPatientHistoryImagesData(tempArr))
        //   dispatch(setSelectedImagesData(selectedDocs))
        // }
      }
      console.log('selected docs>>', selectedDocForCompare)
      let isActive = selectedDocForCompare?.find(
        (item: any) => item?.diag?.doc_id === props?.row?.original?.diag?.doc_id
      )
      return (
        <>
          {props?.row?.original?.diag?.doc_id ? (
            isActive?.status ? (
              <CheckIcon
                fillColor={colors.green1}
                handleClick={() => handleImageSelection(props?.row?.original)}
              />
            ) : (
              <UncheckIcon
                fillColor={colors.grey1}
                handleClick={() => handleImageSelection(props?.row?.original)}
              />
            )
          ) : (
            '-'
          )}
        </>
      )
    },
  },
  {
    Header: 'NOTES',
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.diag_note ? (
            <span
              className={styles.viewPopupLink}
              onClick={() => {
                props?.onClick(props?.row?.original)
              }}
            >
              View
            </span>
          ) : (
            '-'
          )}
        </>
      )
    },
  },
]
