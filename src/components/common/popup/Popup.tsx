import { FC } from 'react'
import styles from './popup.module.scss'
interface IPopup {
  Children: any
  handleClose?: (e?: React.MouseEvent<HTMLElement>) => void
  popData?: string | any
  message?: string
  heading?: string
  setModelOpenClose?: any
  handleSubmit?: (e?: React.MouseEvent<HTMLElement>) => void
  isDefault?: boolean
  setIsDefault?: any
  handleOpen?: any
  handleRowClick?: any
  appointmentIds?: any[]
  customClassPopup?: string
  handleNo?: any
  headerData?: any
  handleYes?: any
  handleNotesPreview?: any
  handleImagesPreview?: any
  branchId?: any
  handleChildClick?: () => void
  handleDepartment?: any
  handleDepartmentServiceConfig?: any
  handleSubmitData?: any
  invoiceFlag?: boolean
  handleInsuranceRowClick?: any
  deleteDepartment?: boolean
  setDeleteDepartment?: any
  deleteFlag?: boolean
  setDeleteFlag?: any
  popupTitle?: string
  popupSubTitle?: string
  selectedSupplierName?: any
}

const Popup: FC<IPopup> = ({
  Children,
  handleClose,
  popData,
  message,
  heading,
  setModelOpenClose,
  handleSubmit,
  isDefault,
  setIsDefault,
  handleRowClick,
  handleOpen,
  customClassPopup,
  appointmentIds,
  handleNo,
  headerData,
  handleYes,
  handleNotesPreview,
  handleImagesPreview,
  branchId,
  handleChildClick,
  handleDepartment,
  handleDepartmentServiceConfig,
  handleSubmitData,
  invoiceFlag,
  handleInsuranceRowClick,
  deleteDepartment,
  setDeleteDepartment,
  deleteFlag,
  setDeleteFlag,
  popupTitle,
  popupSubTitle,
  selectedSupplierName,
}) => {
  // const [isDefault, setIsDefault] = useState<boolean>(false);
  return (
    <>
      <div
        className={[styles.popup, customClassPopup].join(' ')}
        onClick={() => handleClose && handleClose()}
      >
        <Children
          popData={popData}
          message={message}
          handleClose={handleClose}
          heading={heading}
          setModelOpenClose={setModelOpenClose}
          handleSubmit={handleSubmit}
          handleRowClick={handleRowClick}
          isDefault={isDefault}
          setIsDefault={setIsDefault}
          handleOpen={handleOpen}
          appointmentIds={appointmentIds}
          handleNo={handleNo}
          headerData={headerData}
          handleYes={handleYes}
          handleNotesPreview={handleNotesPreview}
          handleImagesPreview={handleImagesPreview}
          branchId={branchId}
          handleChildClick={handleChildClick}
          handleDepartment={handleDepartment}
          handleDepartmentServiceConfig={handleDepartmentServiceConfig}
          handleSubmitData={handleSubmitData}
          invoiceFlag={invoiceFlag}
          handleInsuranceRowClick={handleInsuranceRowClick}
          deleteDepartment={deleteDepartment}
          setDeleteDepartment={setDeleteDepartment}
          deleteFlag={deleteFlag}
          setDeleteFlag={setDeleteFlag}
          popupTitle={popupTitle}
          popupSubTitle={popupSubTitle}
        />
      </div>
    </>
  )
}

export default Popup
