import React, { useEffect, useState } from 'react'
import Button from '../../components/common/button/Button'
import { useAppDispatch, useAppSelector } from '../../hooks'
import styles from './labNewServices.module.scss'
import {
  handleAddedService,
  handleRemoveAddedService,
  setTestAddText,
} from '../../redux/features/lab-invoice/labInvoiceSlice'

export const labInvoiceNewServiceHeaderData: any = [

  // {
  //   Header: "SR NO.",
  //   Cell: ({ row, index }: any) => {
  //     return (
  //       <>
  //         <span
  //         >{parseInt(row.id) + 1}</span>
  //       </>
  //     );
  //   },
  // },

  {
    Header: 'SERVICE ',
    accessor: 'name',
  },
  {
    Header: 'DESCRIPTION',
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.description == null ? (
            '-'
          ) : (
            <span
              className={styles.viewPopupLink}
              onClick={() => {
                props?.onClick(props?.row?.original)
              }}
            >
              View
            </span>
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

      const { labServicesList, addTestText } = useAppSelector(
        (state) => state.labInvoice
      )
      const dispatch = useAppDispatch()

      const handleTestData = () => {
        const checkCommonIds = labServicesList?.find(
          (s: any) => s._id === props.row.original._id
        );
        let profileTestData = {
          quantity: 1,
          unitPrice: props.row.original.sell_price,
          test_name: props.row.original.name,
          billable: 'Yes',
          ...checkCommonIds
        }
        console.log(profileTestData, "profileTestData")
        dispatch(handleAddedService(profileTestData));
      };

      const handleAdd = () => {
        dispatch(setTestAddText(props.row.original._id))
      }

      const handleRemove = () => {
        dispatch(handleRemoveAddedService(props?.row?.original?._id))
      }


      return (
        <>
          <div
            className={styles.addTestPopupAddToJob}
            onClick={handleAdd}
          >
            {!addTestText.includes(props.row.original._id) ? (
              <Button
                title='Add'
                customClass={styles.addedServiceButton}
                handleClick={() => handleTestData()}
              />
            ) : (
              <Button
                title='Added'
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
