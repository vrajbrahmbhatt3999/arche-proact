import { FC, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Tabs from '../../components/core/tab/Tabs'
import { invoiceTabData } from '../../constants/data'
import { clearInvoicePatientData } from '../../redux/features/invoice-module/invoiceSlice'
import { useAppDispatch } from '../../hooks'

interface IInvoiceLayout {}

const InvoiceLayout: FC<IInvoiceLayout> = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  useEffect(() => {
    navigate('/invoice/information')
  }, [])
  useEffect(() => {
    return () => {
      dispatch(clearInvoicePatientData())
    }
  }, [])
  return (
    <>
      <Tabs tabData={invoiceTabData} />
      <Outlet />
    </>
  )
}
export default InvoiceLayout
