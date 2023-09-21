import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Tabs from '../../components/core/tab/Tabs'
import { labInvoiceTabData } from '../../constants/data'
import { useDispatch } from 'react-redux'
import { clearLabInvoicePatientData } from '../../redux/features/lab-invoice/labInvoiceSlice'

const LabInvoiceLayout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    navigate('/invoice/labinformation')
  }, [])

  useEffect(() => {
    return () => {
      dispatch(clearLabInvoicePatientData())
    }
  }, [])

  return (
    <>
      <Tabs tabData={labInvoiceTabData} />
      <Outlet />
    </>
  )
}

export default LabInvoiceLayout
