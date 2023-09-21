import { FC, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { radiologyTabData } from '../../constants/data'
import Tabs from '../../components/core/tab/Tabs'
import { useAppDispatch } from '../../hooks'
import { clearInvoicePatientData } from '../../redux/features/invoice-module/invoiceSlice'
import { clearRadiologyInvoiceData } from '../../redux/features/radiology/radiologySlice'

interface IRadiologyInvoiceLayout {}

const RadiologyInvoiceLayout: FC<IRadiologyInvoiceLayout> = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  useEffect(() => {
    navigate('/radiology-invoice/information')
  }, [])
  useEffect(() => {
    return () => {
      dispatch(clearInvoicePatientData())
      dispatch(clearRadiologyInvoiceData())
    }
  }, [])
  return (
    <>
      <Tabs tabData={radiologyTabData} />
      <Outlet />
    </>
  )
}
export default RadiologyInvoiceLayout
