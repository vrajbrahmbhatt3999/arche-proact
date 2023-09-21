import { FC, useState, useEffect } from 'react'
import Button from '../../../../components/common/button/Button'
import { CloseIcon } from '../../../../components/common/svg-components'
import { colors } from '../../../../constants/color'
import styles from '../styles.module.scss'
import { CustomRadio } from '../../../../components/common/custom-radio'
import TableV2 from '../../../../components/common/table/tableV2/TableV2'
import { Label } from '../../../../components/common/label'
import { rejectedDummyData, rejectedClaimsHeaderData } from './claimsData'
import { SubmitHandler, useForm } from 'react-hook-form'
import Select from 'react-select'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { getAllmarketplace } from '../../../../redux/features/insurance/insuranceAsyncActions'
import { requestGenerator } from '../../../../utils/payloadGenerator'
import makeAnimated from 'react-select/animated'
import {
  createSetteledClaims,
  getAllOngoingClaims,
  getClaimsByMarketPlace,
} from '../../../../redux/features/ongoing-claims/onGoingClaimsAsyncActions'
import {
  IRejectedClaimForm,
  ISetteledClaimForm,
} from '../../../../interfaces/interfaces'

import { rejectedClaimValidators } from './rejectedClaimsValidators'
import { disableArrowKey } from '../../../../utils/utils'
import { CREATE_SETTLED_CLAIM_TYPE } from '../../../../constants/asyncActionsType'
import Loader from '../../../../components/common/spinner/Loader'
import {
  CLAIM_STATUS,
  INITIATED_CLAIMS_REJECTED,
  REJECTED_AMOUNT,
  REJECTED_CLAIM_AMOUNT,
  REJECTED_CLAIM_DATE,
  REJECTED_CLAIM_NOTE,
  REJECTED_MARKETPLACE_CLAIM,
} from './rejectedClaimsConstants'

interface IClaimsProps {
  handleClose: any
  setModelOpenClose: any
  heading: any
  setIsDefault?: any
  handleYes: any
}

const SettledClaimPopup: FC<IClaimsProps> = ({
  handleClose,
  setModelOpenClose,
  heading,
  setIsDefault,
  handleYes,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm<IRejectedClaimForm>({})
  const dispatch = useAppDispatch()
  const formData = watch()
  const onSubmit: SubmitHandler<IRejectedClaimForm> = (data: any) => {
    const payload = {
      [INITIATED_CLAIMS_REJECTED]: data[INITIATED_CLAIMS_REJECTED].value,
      [CLAIM_STATUS]: 'REJECTED',
      data: {
        [REJECTED_CLAIM_DATE]: data[REJECTED_CLAIM_DATE],
        [REJECTED_AMOUNT]: data[REJECTED_AMOUNT],
        [REJECTED_CLAIM_NOTE]: data[REJECTED_CLAIM_NOTE],
      },
    }
    dispatch(createSetteledClaims(requestGenerator(payload))).then((e) => {
      if (e.type === `${CREATE_SETTLED_CLAIM_TYPE}/fulfilled`) {
        handleYes()
        // if (heading === 'REJECTED') {
        //   let reqPayload = {
        //     page: 1,
        //     pageSize: 10,
        //     claim_status: 'REJECTED',
        //   }
        //   dispatch(getAllOngoingClaims(requestGenerator(reqPayload))).then(
        //     (result) => {
        //       setIsDefault(result.payload.lastPage)
        //     }
        //   )
        // } else {
        //   setModelOpenClose('REJECTED')
        // }
        // handleClose()
      }
    })
  }
  useEffect(() => {
    dispatch(getAllmarketplace(requestGenerator({ page: 1, pageSize: 1000 })))
  }, [])
  const [marketPlaceOptions, setMarketOptions] = useState<any>([])
  const [initiatedData, setInitiatedData] = useState<any>([])
  const animatedComponent = makeAnimated()
  const { marketplaceData } = useAppSelector((state) => state.insurance)
  const { claimsByMarketPlace, isLoading } = useAppSelector(
    (state) => state.ongoingClaims
  )
  useEffect(() => {
    if (marketplaceData && marketplaceData.length > 0) {
      // set market options
      const value = marketplaceData?.map((item: any) => ({
        label: item?.marketplace_name,
        value: item?._id,
      }))
      setMarketOptions(value)
    }
  }, [marketplaceData])
  useEffect(() => {
    if (claimsByMarketPlace && claimsByMarketPlace.length > 0) {
      // set market options
      const tempArr = claimsByMarketPlace?.map((item: any) => ({
        label: item?.invoice_no,
        value: item?._id,
        amount: item?.claim_amount,
      }))
      setInitiatedData(tempArr)
    }
  }, [claimsByMarketPlace])
  useEffect(() => {
    if (formData[INITIATED_CLAIMS_REJECTED]) {
      setValue(
        REJECTED_CLAIM_AMOUNT,
        formData[INITIATED_CLAIMS_REJECTED]?.amount
      )
    }
  }, [formData[INITIATED_CLAIMS_REJECTED]])
  return (
    <>
      {isLoading && <Loader />}

      <div
        className={styles.PopupContainer}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => handleClose()}
        />
        <div className={styles.addClaimContainer}>
          <div className={styles.titleContainer}>
            <h2 className={styles.addClaimHeading}>Add Rejected Claim</h2>
            <span className={styles.textUnderline} />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formWrapper}>
              <div className={styles.inputWrapper}>
                <Label
                  htmlFor=""
                  labelText="Market Place"
                  requiredField={true}
                />
                <div className={styles.inputContainer}>
                  <Select
                    className={styles.selectField}
                    isSearchable={true}
                    options={marketPlaceOptions}
                    value={watch(REJECTED_MARKETPLACE_CLAIM)}
                    components={animatedComponent}
                    closeMenuOnSelect={true}
                    placeholder="Select Market Place"
                    {...register(
                      REJECTED_MARKETPLACE_CLAIM,
                      rejectedClaimValidators[REJECTED_MARKETPLACE_CLAIM]
                    )}
                    onChange={(e: any) => {
                      setValue(REJECTED_MARKETPLACE_CLAIM, e)
                      trigger(REJECTED_MARKETPLACE_CLAIM)
                      let reqData = {
                        marketplace_id: e?.value,
                        page: 1,
                        pageSize: 10000,
                        claim_status: 'INITIATED',
                      }
                      setInitiatedData([])
                      dispatch(
                        getClaimsByMarketPlace(requestGenerator(reqData))
                      )
                    }}
                  />
                  {errors[REJECTED_MARKETPLACE_CLAIM] && (
                    <p className="dashboardFormError">
                      {errors[REJECTED_MARKETPLACE_CLAIM].message}
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.inputWrapper}>
                <Label
                  htmlFor=""
                  labelText="Initiated Claims"
                  requiredField={true}
                />
                <div className={styles.inputContainer}>
                  <Select
                    className={styles.selectField}
                    isSearchable={true}
                    options={initiatedData}
                    value={watch(INITIATED_CLAIMS_REJECTED) ?? null}
                    components={animatedComponent}
                    closeMenuOnSelect={true}
                    placeholder="Select Initiated Claims"
                    {...register(
                      INITIATED_CLAIMS_REJECTED,
                      rejectedClaimValidators[INITIATED_CLAIMS_REJECTED]
                    )}
                    onChange={(e: any) => {
                      setValue(INITIATED_CLAIMS_REJECTED, e)
                      trigger(INITIATED_CLAIMS_REJECTED)
                    }}
                  />
                  {errors[INITIATED_CLAIMS_REJECTED] && (
                    <p className="dashboardFormError">
                      {errors[INITIATED_CLAIMS_REJECTED].message}
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.inputWrapper}>
                <Label htmlFor="" labelText="Date" requiredField={true} />
                <div className={styles.inputContainer}>
                  <input
                    type="date"
                    className={styles.inputField}
                    {...register(
                      REJECTED_CLAIM_DATE,
                      rejectedClaimValidators[REJECTED_CLAIM_DATE]
                    )}
                  />
                  {errors[REJECTED_CLAIM_DATE] && (
                    <p className="dashboardFormError">
                      {errors[REJECTED_CLAIM_DATE].message}
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.inputWrapper}>
                <Label
                  htmlFor=""
                  labelText="Claim Amount"
                  requiredField={true}
                />
                <div className={styles.inputContainer}>
                  <input
                    type="number"
                    className={styles.inputField}
                    {...register(
                      REJECTED_CLAIM_AMOUNT,
                      rejectedClaimValidators[REJECTED_CLAIM_AMOUNT]
                    )}
                    placeholder="Enter Claim Amount"
                    onKeyDown={(e: any) => disableArrowKey(e)}
                    onWheel={(e: any) => {
                      e.target.blur()
                    }}
                    readOnly
                  />
                  {errors[REJECTED_CLAIM_AMOUNT] && (
                    <p className="dashboardFormError">
                      {errors[REJECTED_CLAIM_AMOUNT].message}
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.inputWrapper}>
                <Label
                  htmlFor=""
                  labelText="Settled Amount"
                  requiredField={true}
                />
                <div className={styles.inputContainer}>
                  <input
                    type="number"
                    className={styles.inputField}
                    {...register(
                      REJECTED_AMOUNT,
                      rejectedClaimValidators[REJECTED_AMOUNT]
                    )}
                    placeholder="Enter Claim Amount"
                    onKeyDown={(e: any) => disableArrowKey(e)}
                    onWheel={(e: any) => {
                      e.target.blur()
                    }}
                  />
                  {errors[REJECTED_AMOUNT] && (
                    <p className="dashboardFormError">
                      {errors[REJECTED_AMOUNT].message}
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.inputWrapper}>
                <Label htmlFor="" labelText="Notes" />
                <div className={styles.inputContainer}>
                  <textarea
                    className={styles.inputField}
                    {...register(REJECTED_CLAIM_NOTE)}
                  />
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Button title="Submit" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export default SettledClaimPopup
