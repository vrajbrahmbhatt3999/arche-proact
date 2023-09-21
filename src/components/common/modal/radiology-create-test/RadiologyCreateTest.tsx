import { FC, useEffect } from 'react'
import styles from "./radiologyCreateTest.module.scss"
import Button from '../../button/Button'
import { capitalizeFirstLetter, trimValue } from '../../../../utils/utils'
import { AddButtonIcon, CloseIcon } from '../../svg-components'
import { colors } from '../../../../constants/color'
import Divider from '../../divider/Divider'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import { IRadiologyCreateTestForm } from '../../../../interfaces/interfaces'
import { radiologyCreateTestValidators } from '../../../../form-validators/radiologyCreateTestValidators'
import { RADIOLOGY_COST_PRICE, RADIOLOGY_SELL_PRICE, RADIOLOGY_SOURCE, RADIOLOGY_TEST_CATEGORY, RADIOLOGY_TEST_NAME, RADIOLOGY_TEST_TAT } from '../../../../constants/constant'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { failure, sourceData } from '../../../../constants/data'
import { createRadiologyTest, editRadiologyTest, getAllRadiologyTest } from '../../../../redux/features/radiology/radiologyAsyncActions'
import { requestGenerator } from '../../../../utils/payloadGenerator'
import { setMessage } from '../../../../redux/features/toast/toastSlice'


interface IRadiologyConfiguration {
    handleClose?: any
    popData?: any
    setModelOpenClose?: any
}

const RadiologyCreateTest: FC<IRadiologyConfiguration> = ({ handleClose, setModelOpenClose }) => {

    const { radiologyCategoryData, radiologyTest } = useAppSelector((state) => state.radiology)
    const dispatch = useAppDispatch()


    const values = radiologyTest

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        trigger,
        formState: { errors },
    } = useForm<IRadiologyCreateTestForm>({
        defaultValues: {
            name: radiologyTest?.name,
            turn_around_time: radiologyTest?.turn_around_time,
            cost_price: radiologyTest?.cost_price,
            sell_price: radiologyTest?.sell_price,
            source: radiologyTest?.source,
        },
        values,
    })

    const formData = watch()

    useEffect(() => {
        if (radiologyTest[RADIOLOGY_TEST_CATEGORY]) {
            setValue(RADIOLOGY_TEST_CATEGORY, {
                label: radiologyTest?.category_id?.name || '',
                value: radiologyTest?.category_id?._id || '',
            })
        }
    }, [radiologyTest[RADIOLOGY_TEST_CATEGORY]])


    useEffect(() => {
        if (radiologyTest[RADIOLOGY_SOURCE]) {
            setValue(RADIOLOGY_SOURCE, {
                label: capitalizeFirstLetter(radiologyTest?.source) || '',
                value: radiologyTest?.source || '',
            })
        }
    }, [radiologyTest[RADIOLOGY_SOURCE]])

    const handleKeyDown = (e: any) => {
        if (e.target.value.length >= 7 && e.key !== "Backspace") {
            e.preventDefault();
        }
    };


    const onSubmit = async (data: IRadiologyCreateTestForm) => {
        console.log("data", data)
        let reqData = {
            ...data,
            [RADIOLOGY_TEST_CATEGORY]: formData[RADIOLOGY_TEST_CATEGORY]?.value || '',
            [RADIOLOGY_SOURCE]: formData[RADIOLOGY_SOURCE]?.value || ''
        }
        reqData.sell_price = Number(reqData.sell_price)
        reqData.cost_price = Number(reqData.cost_price)
        if (reqData.sell_price >= reqData.cost_price) {
            if (radiologyTest?._id !== undefined) {
                let payloadData = {
                    id: radiologyTest?._id,
                    data: reqData,
                }
                dispatch(editRadiologyTest(requestGenerator(payloadData))).then((e) => {
                    if (e.type === 'radiology/editRadiologyTest/fulfilled') {
                        let requestData = {
                            search: '',
                            filters: {},
                            page: 0,
                            pageSize: 10,
                            order_by: { name: 1 },
                        }
                        dispatch(getAllRadiologyTest(requestGenerator(requestData)))
                        // dispatch(cleartestData())
                        setTimeout(() => {
                            setModelOpenClose(false)
                        }, 1000)
                    }
                })
            } else {
                dispatch(createRadiologyTest(requestGenerator(reqData))).then((e) => {
                    if (e.type === 'radiology/createRadiologyTest/fulfilled') {
                        let requestData = {
                            search: '',
                            filters: {},
                            page: 0,
                            pageSize: 10,
                            order_by: { name: 1 },
                        }
                        dispatch(getAllRadiologyTest(requestGenerator(requestData)))
                        setTimeout(() => {
                            setModelOpenClose(false)
                        }, 1000)
                    }
                })
            }
        }
        else {
            let toastData = {
                message: "Sell price should be greater than or equal to cost price",
                type: failure,
            };
            dispatch(setMessage(toastData));
        }
    }




    return (
        <>
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
                    <p className={styles.title}>{radiologyTest?._id !== undefined ? "Edit" : "Create"} Test</p>
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
                                        {...register(RADIOLOGY_TEST_NAME, radiologyCreateTestValidators[RADIOLOGY_TEST_NAME])}
                                        onChange={(e) => trimValue(e)}
                                    />
                                    {errors[RADIOLOGY_TEST_NAME] && (
                                        <p className="errorText">{errors[RADIOLOGY_TEST_NAME].message}</p>
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
                                            RADIOLOGY_TEST_CATEGORY,
                                            radiologyCreateTestValidators[RADIOLOGY_TEST_CATEGORY]
                                        )}
                                        value={watch(RADIOLOGY_TEST_CATEGORY)}
                                        options={radiologyCategoryData?.map((item: any) => ({
                                            label: item?.name,
                                            value: item?._id,
                                        }))}
                                        onChange={(e: any) => {
                                            setValue(RADIOLOGY_TEST_CATEGORY, e)
                                            trigger(RADIOLOGY_TEST_CATEGORY)
                                        }}
                                        maxMenuHeight={200}
                                    />

                                    {errors[RADIOLOGY_TEST_CATEGORY] && (
                                        <p className="errorText">
                                            {errors[RADIOLOGY_TEST_CATEGORY].message as any}
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
                                        {...register(RADIOLOGY_TEST_TAT, radiologyCreateTestValidators[RADIOLOGY_TEST_TAT])}
                                        onChange={(e) => trimValue(e)}
                                    />
                                    {errors[RADIOLOGY_TEST_TAT]?.message && (
                                        <p className="errorText">
                                            {errors[RADIOLOGY_TEST_TAT]?.message as any}
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
                                        value={watch(RADIOLOGY_SOURCE)}
                                        {...register(RADIOLOGY_SOURCE, radiologyCreateTestValidators[RADIOLOGY_SOURCE])}
                                        options={sourceData?.map((item: any) => ({
                                            label: item?.label,
                                            value: item?.value,
                                        }))}
                                        onChange={(e: any) => {
                                            setValue(RADIOLOGY_SOURCE, e)
                                            trigger(RADIOLOGY_SOURCE)
                                        }}
                                        maxMenuHeight={200}
                                    />
                                    {errors[RADIOLOGY_SOURCE] && (
                                        <p className="errorText">{errors[RADIOLOGY_SOURCE].message as any}</p>
                                    )}
                                </div>
                            </div>
                            <div className={styles.labelField}>
                                <label className={styles.labelText}>
                                    Cost Price <span className="asterick">*</span>
                                </label>
                                <div className={styles.fieldErrorContainer}>
                                    <input
                                        type="text"
                                        className={styles.inputField}
                                        placeholder="Enter Cost Price"
                                        {...register(RADIOLOGY_COST_PRICE, radiologyCreateTestValidators[RADIOLOGY_COST_PRICE])}
                                        onChange={(e) => trimValue(e)}
                                        onKeyDown={handleKeyDown}
                                    />
                                    {errors[RADIOLOGY_COST_PRICE] && (
                                        <p className="errorText">
                                            {errors[RADIOLOGY_COST_PRICE].message as any}
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
                                        {...register(RADIOLOGY_SELL_PRICE, radiologyCreateTestValidators[RADIOLOGY_SELL_PRICE])}
                                        onChange={(e) => trimValue(e)}
                                        onKeyDown={handleKeyDown}
                                    />
                                    {errors[RADIOLOGY_SELL_PRICE] && (
                                        <p className="errorText">
                                            {errors[RADIOLOGY_SELL_PRICE].message as any}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={styles.btnContainer}>
                            <Button title={radiologyTest?._id !== undefined ? "Update" : "Create"} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RadiologyCreateTest
