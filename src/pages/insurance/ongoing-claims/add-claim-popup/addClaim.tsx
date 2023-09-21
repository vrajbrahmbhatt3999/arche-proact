import { FC, useEffect, useState } from 'react'
import Button from '../../../../components/common/button/Button'
import { CloseIcon } from '../../../../components/common/svg-components'
import { colors } from '../../../../constants/color'
import styles from '../styles.module.scss'
import { Label } from '../../../../components/common/label'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { getAllmarketplace } from '../../../../redux/features/insurance/insuranceAsyncActions'
import {
  createNewClaim,
  getAllOngoingClaims,
  getPandingClaims,
} from '../../../../redux/features/ongoing-claims/onGoingClaimsAsyncActions'
import { requestGenerator } from '../../../../utils/payloadGenerator'
// import { MARKETPLACE } from "./add-claim-constants";
import makeAnimated from 'react-select/animated'
import Select from 'react-select'
import { disableArrowKey } from '../../../../utils/utils'
import { IAddClaimForm } from '../../../../interfaces/interfaces'
import {
  ADD_CLAIM_AMOUNT,
  ADD_CLAIM_DATE,
  ADD_CLAIM_NOTE,
  MARKETPLACE_ADD_CLAIM,
  PENDING_CLAIMS,
} from './addClaimConstants'
import Loader from '../../../../components/common/spinner/Loader'
import { NOTES } from '../../../../constants/constant'
import { CREATE_CLAIM_TYPE } from '../../../../constants/asyncActionsType'
import { addClaimsValidators } from './addClaimsValidators'

interface IClaimsProps {
  handleClose: any
  setModelOpenClose: any
  heading: any
  setIsDefault?: any
  handleYes: any
}

const AddClaimPopup: FC<IClaimsProps> = ({
  handleClose,
  setModelOpenClose,
  heading,
  setIsDefault,
  handleYes,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<IAddClaimForm>({})
  const formData = watch()
  const onsubmit: SubmitHandler<IAddClaimForm> = (data: any) => {
    const payload = {
      [ADD_CLAIM_DATE]: data[ADD_CLAIM_DATE],
      [PENDING_CLAIMS]: data[PENDING_CLAIMS]?.value,
      [ADD_CLAIM_NOTE]: data[ADD_CLAIM_NOTE],
    }
    dispatch(createNewClaim(requestGenerator(payload))).then((e) => {
      if (e.type === `${CREATE_CLAIM_TYPE}/fulfilled`) {
        handleYes()
        //   if (heading === 'INITIATED') {
        //     let reqPayload = {
        //       page: 1,
        //       pageSize: 10,
        //       claim_status: 'INITIATED',
        //     }
        //     dispatch(getAllOngoingClaims(requestGenerator(reqPayload))).then(
        //       (result) => {
        //         setIsDefault(result.payload.lastPage)
        //       }
        //     )
        //   } else {
        //     setModelOpenClose('INITIATED')
        //   }
        //   handleClose()
        // }
      }
    })
  }
  const dispatch = useAppDispatch()
  const animatedComponent = makeAnimated()
  const { marketplaceData } = useAppSelector((state) => state.insurance)
  const { pandingClaimsData, isLoading } = useAppSelector(
    (state) => state.ongoingClaims
  )
  useEffect(() => {
    dispatch(getAllmarketplace(requestGenerator({ page: 1, pageSize: 1000 })))
  }, [])
  const [marketPlaceOptions, setMarketOptions] = useState<any>([])
  const [pandingData, setPandingData] = useState<any>([])

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
    if (pandingClaimsData && pandingClaimsData.length > 0) {
      // set market options
      const tempArr = pandingClaimsData?.map((item: any) => ({
        label: item?.invoice_no,
        value: item?._id,
        amount: item?.insurance_claim_amount,
      }))
      setPandingData(tempArr)
    }
  }, [pandingClaimsData])

  useEffect(() => {
    if (formData[PENDING_CLAIMS]) {
      setValue(ADD_CLAIM_AMOUNT, formData[PENDING_CLAIMS]?.amount)
    }
  }, [formData[PENDING_CLAIMS]])

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
          handleClick={handleClose}
        />
        <div className={styles.addClaimContainer}>
          <div className={styles.titleContainer}>
            <h2 className={styles.addClaimHeading}>Add Claim</h2>
            <span className={styles.textUnderline} />
          </div>
          <form onSubmit={handleSubmit(onsubmit)}>
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
                    value={watch(MARKETPLACE_ADD_CLAIM)}
                    components={animatedComponent}
                    closeMenuOnSelect={true}
                    placeholder="Select Market Place"
                    {...register(
                      MARKETPLACE_ADD_CLAIM,
                      addClaimsValidators[MARKETPLACE_ADD_CLAIM]
                    )}
                    onChange={(e: any) => {
                      setValue(MARKETPLACE_ADD_CLAIM, e)
                      trigger(MARKETPLACE_ADD_CLAIM)
                      let reqData = {
                        marketplace_id: e?.value,
                      }
                      setPandingData([])
                      dispatch(getPandingClaims(requestGenerator(reqData)))
                    }}
                  />

                  {errors[MARKETPLACE_ADD_CLAIM] && (
                    <p className="dashboardFormError">
                      {errors[MARKETPLACE_ADD_CLAIM].message}
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.inputWrapper}>
                <Label
                  htmlFor=""
                  labelText="Pending Claims"
                  requiredField={true}
                />
                <div className={styles.inputContainer}>
                  <Select
                    className={styles.selectField}
                    isSearchable={true}
                    options={pandingData}
                    value={watch(PENDING_CLAIMS) ?? null}
                    components={animatedComponent}
                    closeMenuOnSelect={true}
                    placeholder="Select Pending Claims"
                    // disabled={!isDataAvailable}
                    {...register(
                      PENDING_CLAIMS,
                      addClaimsValidators[PENDING_CLAIMS]
                    )}
                    onChange={(e: any) => {
                      setValue(PENDING_CLAIMS, e)
                      trigger(PENDING_CLAIMS)
                    }}
                  />
                  {errors[PENDING_CLAIMS] && (
                    <p className="dashboardFormError">
                      {errors[PENDING_CLAIMS].message}
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
                      ADD_CLAIM_DATE,
                      addClaimsValidators[ADD_CLAIM_DATE]
                    )}
                  />
                  {errors[ADD_CLAIM_DATE] && (
                    <p className="dashboardFormError">
                      {errors[ADD_CLAIM_DATE].message}
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
                      ADD_CLAIM_AMOUNT,
                      addClaimsValidators[ADD_CLAIM_AMOUNT]
                    )}
                    placeholder="Enter Claim Amount"
                    onKeyDown={(e: any) => disableArrowKey(e)}
                    onWheel={(e: any) => {
                      e.target.blur()
                    }}
                    readOnly
                  />
                  {errors[ADD_CLAIM_AMOUNT] && (
                    <p className="dashboardFormError">
                      {errors[ADD_CLAIM_AMOUNT].message}
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.inputWrapper}>
                <Label htmlFor="" labelText="Notes" />
                <div className={styles.inputContainer}>
                  <textarea
                    className={styles.inputField}
                    {...register(ADD_CLAIM_NOTE)}
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
export default AddClaimPopup
