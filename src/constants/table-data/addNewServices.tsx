import { useState, useEffect } from 'react'
import styles from './addNewServices.module.scss'
import Button from '../../components/common/button/Button'
import { useAppDispatch, useAppSelector } from '../../hooks'

import // handleAddedService,
// handleRemoveAddedService,
'../../redux/features/treatmentPlans/treatmentPlansSlice'

import {
  handleAddedServiceNew,
  handleRemoveAddedServiceNew,
  setTestAddNewText,
  handleAddedNewService,
  handleRemoveNewService,
} from '../../redux/features/invoice-module/invoiceSlice'

import {
  handleRadiologyAddedService,
  handleRadiologyRemoveAddedService,
  handleAddedService,
  handleRemoveAddedService,
  setTestAddText,
} from '../../redux/features/radiology/radiologySlice'

// receptionist new service data
export const invoiceAddServiceHeaderData: any = [
  // {
  //   Header: "SR NO.",
  //   accessor: "discount",
  // },
  {
    Header: 'SERVICE ',
    accessor: 'name',
  },
  {
    Header: 'DESCRIPTION',
    Cell: (props: any) => {
      // console.log("props", props?.row?.original);
      return (
        <>
          {props?.row?.original?._id ? (
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

  {
    Header: 'AMOUNT',
    accessor: 'price',
  },

  {
    Header: 'ADD TO INVOICE',
    Cell: (props: any) => {
      // const handleAdd = (id: any) => {
      //   dispatch(handleAddedService(id));
      //   dispatch(handleAddedServiceNew(id));
      // };

      // const handleRemove = (id: any) => {
      //   dispatch(handleRemoveAddedService(id));
      //   dispatch(handleRemoveAddedServiceNew(id));

      //   // setAddService(true);
      // };

      const dispatch = useAppDispatch()
      const { popupServiceData, addTestText } = useAppSelector(
        (state) => state.invoice
      )

      const handleTestData = () => {
        const checkCommonIds = popupServiceData?.find(
          (s: any) => s._id === props.row.original._id
        )
        let profileTestData = {
          quantity: 1,
          unitPrice: props.row.original?.price,
          test_name: props.row.original?.name,
          isBillable: 'Yes',
          ...checkCommonIds,
        }
        dispatch(handleAddedNewService(profileTestData))
      }

      const handleAdd = () => {
        dispatch(setTestAddNewText(props.row.original._id))
      }

      const handleRemove = () => {
        dispatch(handleRemoveNewService(props?.row?.original?._id))
      }

      return (
        // <>
        //   {!row?.original?.is_active ? (
        //     <Button
        //       title="Added"
        //       customClass={styles.addToJobAddGreenText}
        //       handleClick={() => handleRemove(row.original?._id)}
        //     />
        //   ) : (
        //     <Button
        //       title="Add"
        //       customClass={styles.addServiceButton}
        //       handleClick={() => handleAdd(row.original?._id)}
        //     />
        //   )}
        // </>
        <>
          <div className={styles.addTestPopupAddToJob} onClick={handleAdd}>
            {!addTestText.includes(props.row.original._id) ? (
              <Button
                title="Add"
                customClass={styles.addedServiceButton}
                handleClick={(e) => {
                  // e.stopPropagation()
                  handleTestData()
                }}
              />
            ) : (
              <Button
                title="Added"
                customClass={styles.addServiceButton}
                handleClick={(e) => {
                  // e.stopPropagation()
                  handleRemove()
                }}
              />
            )}
          </div>
        </>
      )
    },
  },
]

// radiology new service data

export const radiologyAddServiceHeaderData: any = [
  // {
  //   Header: "SR NO.",
  //   accessor: "test_no",
  // },
  {
    Header: 'SERVICE ',
    accessor: 'name',
  },
  {
    Header: 'DESCRIPTION',
    Cell: (props: any) => {
      // console.log("props", props?.row?.original);
      return (
        <>
          {props?.row?.original?._id ? (
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

  {
    Header: 'AMOUNT',
    accessor: 'sell_price',
  },

  {
    Header: 'ADD TO INVOICE',
    Cell: (props: any) => {
      const dispatch = useAppDispatch()
      const { radiologyTestDataList, addTestText } = useAppSelector(
        (state) => state.radiology
      )

      // const handleAdd = (id: any) => {
      //   dispatch(handleRadiologyAddedService(id));
      // };

      // const handleRemove = (id: any) => {
      //   dispatch(handleRadiologyRemoveAddedService(id));
      // };

      const handleTestData = () => {
        const checkCommonIds = radiologyTestDataList?.find(
          (s: any) => s._id === props.row.original._id
        )
        let profileTestData = {
          quantity: 1,
          unitPrice: props.row.original.sell_price,
          test_name: props.row.original.name,
          billable: 'Yes',
          ...checkCommonIds,
        }
        console.log(profileTestData, 'profileTestData')
        dispatch(handleAddedService(profileTestData))
      }

      const handleAdd = () => {
        dispatch(setTestAddText(props.row.original._id))
      }

      const handleRemove = () => {
        dispatch(handleRemoveAddedService(props?.row?.original?._id))
      }

      return (
        // <>
        //   {!row?.original?.is_active ? (
        //     <Button
        //       title="Added"
        //       customClass={styles.addServiceButton}
        //       handleClick={() => handleRemove(row.original?._id)}
        //     />
        //   ) : (
        //     <Button
        //       title="Add"
        //       customClass={styles.addServiceButton}
        //       handleClick={() => handleAdd(row.original?._id)}
        //     />
        //   )}
        // </>
        <>
          <div className={styles.addTestPopupAddToJob} onClick={handleAdd}>
            {!addTestText.includes(props.row.original._id) ? (
              <Button
                title="Add"
                customClass={styles.addedServiceButton}
                handleClick={() => handleTestData()}
              />
            ) : (
              <Button
                title="Added"
                customClass={styles.addServiceButton}
                handleClick={() => handleRemove()}
              />
            )}
          </div>
        </>
      )
    },
  },
]
