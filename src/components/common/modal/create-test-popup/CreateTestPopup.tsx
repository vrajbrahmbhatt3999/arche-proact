import { FC, useEffect, useState } from 'react'
import { AddButtonIcon, CloseIcon } from '../../svg-components'
import { colors } from '../../../../constants/color'
import Divider from '../../divider/Divider'
import styles from './createTestPopup.module.scss'
import {
  capitalizeFirstLetter,
  getValuesForSelectOptions,
  handleKeyDown,
  trimValue,
} from '../../../../utils/utils'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import {
  ICreateTestForm,
  ICreateTestProfile,
} from '../../../../interfaces/interfaces'
import Button from '../../button/Button'
import { failure, sourceData } from '../../../../constants/data'
import { createTestValidators } from '../../../../form-validators/createTestValidators'
import {
  COMPONENT,
  COST_PRICE,
  SAMPLE_TYPE,
  SELL_PRICE,
  SOURCE,
  TEST_CATEGORY,
  TEST_NAME,
  TEST_TAT,
  UNIT,
} from '../../../../constants/constant'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { requestGenerator } from '../../../../utils/payloadGenerator'
import {
  createLabTest,
  editLabTest,
  getAllLabComponent,
  getAllLabSampleType,
  getAllLabTest,
  getAllLabUnit,
} from '../../../../redux/features/lab/labAsyncActions'
import Loader from '../../spinner/Loader'
import { cleartestData } from '../../../../redux/features/lab/labSlice'
import { setMessage } from '../../../../redux/features/toast/toastSlice'

interface ICreateTest {
  handleClose?: any
  handleDepartment?: any
  popData?: any
  setModelOpenClose?: any
}

const CreateTestPopup: FC<ICreateTest> = ({
  handleClose,
  handleDepartment,
  popData,
  setModelOpenClose,
}) => {
  const dispatch = useAppDispatch()
  const {
    isLoading,
    labUnitData,
    sampleTypeData,
    categoryData,
    labComponentData,
    testData,
  } = useAppSelector((state) => state.lab)

  const values = testData

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ICreateTestForm>({
    defaultValues: {
      name: testData?.name,
      turn_around_time: testData?.turn_around_time,
      cost_price: testData?.cost_price,
      sell_price: testData?.sell_price,
      source: testData?.source,
    },
    values,
  })

  const formData = watch()

  // useEffect(() => {
  //   if (testData[COMPONENT]) {
  //     const matchingItems = labComponentData.filter((obj: any) =>
  //       testData[COMPONENT]?.some((item: any) => item._id === obj._id)
  //     );

  //     let componentsData: any[] = [];
  //     componentsData =
  //       matchingItems.length > 0
  //         ? matchingItems?.map((item: any) => {
  //             return { label: item?.name, value: item?._id };
  //           })
  //         : [];
  //     setValue(COMPONENT, componentsData || []);
  //   }
  // }, [testData[COMPONENT]]);

  useEffect(() => {
    if (testData[TEST_CATEGORY]) {
      setValue(TEST_CATEGORY, {
        label: testData?.category_id?.name || '',
        value: testData?.category_id?._id || '',
      })
    }
  }, [testData[TEST_CATEGORY]])

  useEffect(() => {
    if (testData[SAMPLE_TYPE]) {
      setValue(SAMPLE_TYPE, {
        label: testData?.sample_id?.name || '',
        value: testData?.sample_id?._id || '',
      })
    }
  }, [testData[SAMPLE_TYPE]])

  useEffect(() => {
    if (testData[SOURCE]) {
      setValue(SOURCE, {
        label: capitalizeFirstLetter(testData?.source) || '',
        value: testData?.source || '',
      })
    }
  }, [testData[SOURCE]])

  useEffect(() => {
    if (testData[UNIT]) {
      setValue(UNIT, {
        label: testData?.unit_id?.name || '',
        value: testData?.unit_id?._id || '',
      })
    }
  }, [testData[UNIT]])

  useEffect(() => {
    dispatch(getAllLabSampleType(requestGenerator({})))
    dispatch(getAllLabUnit(requestGenerator({ page: 1, pageSize: 10000 })))
    dispatch(getAllLabComponent(requestGenerator({})))
  }, [dispatch])

  const onSubmit = async (data: ICreateTestForm) => {
    data.ranges = popData
    console.log('first', data)
    let reqData = {
      ...data,
      // [COMPONENT]: formData[COMPONENT]?.map((item: any) => item?.value),
      [TEST_CATEGORY]: formData[TEST_CATEGORY]?.value || '',
      [SAMPLE_TYPE]: formData[SAMPLE_TYPE]?.value || '',
      [SOURCE]: formData[SOURCE]?.value || '',
      [UNIT]: formData[UNIT]?.value || '',
    }
    reqData.sell_price = Number(reqData.sell_price)
    reqData.cost_price = Number(reqData.cost_price)
    if (reqData.sell_price >= reqData.cost_price) {
      if (testData?._id !== undefined) {
        let payloadData = {
          id: testData?._id,
          data: reqData,
        }
        dispatch(editLabTest(requestGenerator(payloadData))).then((e) => {
          if (e.type === 'lab/editLabTest/fulfilled') {
            let requestData = {
              search: '',
              filters: {},
              page: 0,
              pageSize: 10,
              order_by: { name: 1 },
            }
            dispatch(getAllLabTest(requestGenerator(requestData)))
            dispatch(cleartestData())
            setTimeout(() => {
              setModelOpenClose(false)
            }, 1000)
          }
        })
      } else {
        dispatch(createLabTest(requestGenerator(reqData))).then((e) => {
          if (e.type === 'lab/createLabTest/fulfilled') {
            let requestData = {
              search: '',
              filters: {},
              page: 0,
              pageSize: 10,
              order_by: { name: 1 },
            }
            dispatch(getAllLabTest(requestGenerator(requestData)))
            setTimeout(() => {
              setModelOpenClose(false)
            }, 1000)
          }
        })
      }
    } else {
      let toastData = {
        message: 'Sell price should be greater than or equal to cost price',
        type: failure,
      }
      dispatch(setMessage(toastData))
    }
  }
  return (
    <>
      {isLoading && <Loader />}
      <div
        className={styles.notesPopupContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => handleClose()}
        />
        <div className={styles.notesContainer}>
          <p className={styles.title}>
            {testData?._id !== undefined ? 'Edit' : 'Create'} Test
          </p>
          <Divider customClass={styles.dividerStyle} />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.formContainer}
          >
            <div className={styles.form}>
              <div className={styles.labelField}>
                <label className={styles.labelText}>
                  Test Name<span className="asterick">*</span>
                </label>
                <div className={styles.fieldErrorContainer}>
                  <input
                    type="text"
                    className={styles.inputField}
                    placeholder="Enter Test Name"
                    {...register(TEST_NAME, createTestValidators[TEST_NAME])}
                    onChange={(e) => trimValue(e)}
                  />
                  {errors[TEST_NAME] && (
                    <p className="errorText">{errors[TEST_NAME].message}</p>
                  )}
                </div>
              </div>
              <div className={styles.labelField}>
                <label className={styles.labelText}>
                  Test Category<span className="asterick">*</span>
                </label>
                <div className={styles.fieldErrorContainer}>
                  <Select
                    className={styles.select}
                    placeholder="Test Category"
                    closeMenuOnSelect={true}
                    isSearchable={true}
                    {...register(
                      TEST_CATEGORY,
                      createTestValidators[TEST_CATEGORY]
                    )}
                    value={watch(TEST_CATEGORY)}
                    options={categoryData?.map((item: any) => ({
                      label: item?.name,
                      value: item?._id,
                    }))}
                    onChange={(e: any) => {
                      setValue(TEST_CATEGORY, e)
                      trigger(TEST_CATEGORY)
                    }}
                    maxMenuHeight={200}
                  />

                  {errors[TEST_CATEGORY] && (
                    <p className="errorText">
                      {errors[TEST_CATEGORY].message as any}
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.labelField}>
                <label className={styles.labelText}>
                  TAT<span className="asterick">*</span>
                </label>
                <div className={styles.fieldErrorContainer}>
                  <input
                    type="text"
                    className={styles.inputField}
                    placeholder="Enter TAT"
                    {...register(TEST_TAT, createTestValidators[TEST_TAT])}
                    onChange={(e) => trimValue(e)}
                  />
                  {errors[TEST_TAT]?.message && (
                    <p className="errorText">
                      {errors[TEST_TAT]?.message as any}
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.labelField}>
                <label className={styles.labelText}>
                  Sample Type<span className="asterick">*</span>
                </label>
                <div className={styles.fieldErrorContainer}>
                  <Select
                    className={styles.select}
                    placeholder="Sample Type"
                    closeMenuOnSelect={true}
                    isSearchable={true}
                    {...register(
                      SAMPLE_TYPE,
                      createTestValidators[SAMPLE_TYPE]
                    )}
                    value={watch(SAMPLE_TYPE)}
                    options={sampleTypeData?.map((item: any) => ({
                      label: item?.name,
                      value: item?._id,
                    }))}
                    onChange={(e: any) => {
                      setValue(SAMPLE_TYPE, e)
                      trigger(SAMPLE_TYPE)
                    }}
                    maxMenuHeight={200}
                  />

                  {errors[SAMPLE_TYPE] && (
                    <p className="errorText">
                      {errors[SAMPLE_TYPE].message as any}
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.labelField}>
                <label className={styles.labelText}>
                  Source<span className="asterick">*</span>
                </label>
                <div className={styles.fieldErrorContainer}>
                  <Select
                    className={styles.select}
                    placeholder="Source"
                    closeMenuOnSelect={true}
                    isSearchable={true}
                    value={watch(SOURCE)}
                    {...register(SOURCE, createTestValidators[SOURCE])}
                    options={sourceData?.map((item: any) => ({
                      label: item?.label,
                      value: item?.value,
                    }))}
                    onChange={(e: any) => {
                      setValue(SOURCE, e)
                      trigger(SOURCE)
                    }}
                    maxMenuHeight={200}
                  />

                  {errors[SOURCE] && (
                    <p className="errorText">{errors[SOURCE].message as any}</p>
                  )}
                </div>
              </div>
              <div className={styles.labelField}>
                <label className={styles.labelText}>
                  Unit<span className="asterick">*</span>
                </label>
                <div className={styles.fieldErrorContainer}>
                  <Select
                    className={styles.select}
                    placeholder="Unit"
                    closeMenuOnSelect={true}
                    isSearchable={true}
                    {...register(UNIT, createTestValidators[UNIT])}
                    value={watch(UNIT)}
                    options={labUnitData?.map((item: any) => ({
                      label: item?.name,
                      value: item?._id,
                    }))}
                    onChange={(e: any) => {
                      setValue(UNIT, e)
                      trigger(UNIT)
                    }}
                    maxMenuHeight={200}
                  />

                  {errors[UNIT] && (
                    <p className="errorText">{errors[UNIT].message as any}</p>
                  )}
                </div>
              </div>
              {/* <div className={styles.labelField}>
                <label className={styles.labelText}>Range</label>
                <div
                  className={styles.fieldErrorContainer}
                  style={{ width: '200px' }}
                >
                  <AddButtonIcon
                    fillColor={colors.green1}
                    handleClick={handleDepartment}
                    customClass={styles.iconStyle}
                  />
                </div>
              </div> */}
              {/* <div className={styles.labelField}>
                <label className={styles.labelText} htmlFor={COMPONENT}>
                  Component <span className="asterick">*</span>
                </label>
                <div className={styles.fieldErrorContainer}>
                  <Select
                    className={styles.select}
                    placeholder="Component"
                    closeMenuOnSelect={true}
                    isSearchable={true}
                    isMulti
                    {...register(COMPONENT, createTestValidators[COMPONENT])}
                    options={labComponentData?.map((item: any) => ({
                      label: item?.name,
                      value: item?._id,
                    }))}
                    value={watch(COMPONENT) || []}
                    onChange={(e) => {
                      setValue(
                        COMPONENT,
                        e.map((item: any) => {
                          return item
                        })
                      )
                      trigger(COMPONENT)
                    }}
                    maxMenuHeight={200}
                  />

                  {errors[COMPONENT] && (
                    <p className="errorText">
                      {errors[COMPONENT].message as any}
                    </p>
                  )}
                </div>
              </div> */}
              <div className={styles.labelField}>
                <label className={styles.labelText}>
                  Cost Price <span className="asterick">*</span>
                </label>
                <div className={styles.fieldErrorContainer}>
                  <input
                    type="text"
                    className={styles.inputField}
                    placeholder="Enter Cost Price"
                    {...register(COST_PRICE, createTestValidators[COST_PRICE])}
                    onChange={(e) => trimValue(e)}
                    onKeyDown={handleKeyDown}
                  />
                  {errors[COST_PRICE] && (
                    <p className="errorText">
                      {errors[COST_PRICE].message as any}
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.labelField}>
                <label className={styles.labelText}>
                  Sell Price <span className="asterick">*</span>
                </label>
                <div className={styles.fieldErrorContainer}>
                  <input
                    type="text"
                    className={styles.inputField}
                    placeholder="Enter Sell Price"
                    {...register(SELL_PRICE, createTestValidators[SELL_PRICE])}
                    onChange={(e) => trimValue(e)}
                    onKeyDown={handleKeyDown}
                  />
                  {errors[SELL_PRICE] && (
                    <p className="errorText">
                      {errors[SELL_PRICE].message as any}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.btnContainer}>
              <Button
                title={testData?._id !== undefined ? 'Update' : 'Create'}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateTestPopup
