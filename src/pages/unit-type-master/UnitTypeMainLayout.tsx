import React, { useState, useEffect } from 'react'
import styles from './UnitTypeMainLayout.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
  createInventoryUnits,
  deleteInventoryUnits,
  getInventoryItemUnits,
  getInventoryAllUnits,
  editInventoryUnits,
} from '../../redux/features/unit-type/unittypeAsyncActions'
import { requestGenerator } from '../../utils/payloadGenerator'
import Button from '../../components/common/button/Button'
import TableV2 from '../../components/common/table/tableV2/TableV2'
import { unitTypeTableHeaderData } from '../../constants/table-data/unitTypeMasterTabledata'
import {
  CREATE_INVENTORY_ITEM_UNIT,
  DELETE_INVENTORY_ITEM_UNIT,
  EDIT_INVENTORY_ITEM_UNIT,
} from '../../constants/asyncActionsType'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  Cols,
  ILabInvoiceForm,
  IUnitTypeValues,
} from '../../interfaces/interfaces'
import {
  BASE_UNIT_TYPE,
  MAPPED_UNIT_TYPE,
  MASTER_UNIT_TYPE_QTY,
} from '../../constants/constant'
import { unitTypeValidators } from '../../form-validators/unitTypeMasterValidators'
import TableV3 from '../../components/common/table/tableV3/TableV3'
import {
  Column,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from 'react-table'
import {
  clearStates,
  setEditableItem,
} from '../../redux/features/unit-type/unitTypeSlice'
import { rest } from 'lodash'
import { success } from '../../constants/data'
import { setMessage } from '../../redux/features/toast/toastSlice'
import Loader from '../../components/common/spinner/Loader'
const UnitTypeMainLayout = () => {
  const { allCategoriesList, addedUnitList, editableItem, isLoading } =
    useAppSelector((state) => state.unitTypeMaster)
  const dispatch = useAppDispatch()

  // FORM
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    watch,
    formState: { errors },
  } = useForm<any>()

  // Submit Function
  const onSubmit: SubmitHandler<IUnitTypeValues> = (data: any) => {
    console.log(data, 'data')

    if (editableItem?._id) {
      dispatch(
        editInventoryUnits(requestGenerator({ ...data, id: editableItem?._id }))
      ).then((e) => {
        if (e.type === `${EDIT_INVENTORY_ITEM_UNIT}/fulfilled`) {
          dispatch(getInventoryItemUnits(requestGenerator({})))
          setValue(BASE_UNIT_TYPE, '')
          setValue(MAPPED_UNIT_TYPE, '')
          setValue(MASTER_UNIT_TYPE_QTY, '')
          dispatch(clearStates())
          dispatch(
            setMessage({
              message: 'Unit Item Updated Successfully',
              type: success,
            })
          )
        }
      })
    } else {
      dispatch(createInventoryUnits(requestGenerator(data))).then((e) => {
        if (e.type === `${CREATE_INVENTORY_ITEM_UNIT}/fulfilled`) {
          dispatch(getInventoryItemUnits(requestGenerator({})))
          setValue(BASE_UNIT_TYPE, '')
          setValue(MAPPED_UNIT_TYPE, '')
          setValue(MASTER_UNIT_TYPE_QTY, '')
          dispatch(
            setMessage({
              message: 'Unit Item Created Successfully',
              type: success,
            })
          )
        }
      })
    }
  }

  // React Table define
  const data: Cols[] = addedUnitList
  const columns: Column<Cols>[] = unitTypeTableHeaderData
  const options: TableOptions<Cols> = {
    data,
    columns,
  }

  const {
    state,
    // @ts-ignore
    setGlobalFilter,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(options, useGlobalFilter, useSortBy)

  useEffect(() => {
    const requestData = {
      category_name: 'INVENTORY_UNIT_TYPE',
    }
    dispatch(getInventoryAllUnits(requestGenerator(requestData)))
    dispatch(getInventoryItemUnits(requestGenerator({})))
  }, [])

  const handleEdit = (item: any) => {
    console.log(item, 'item')
    dispatch(setEditableItem(item))
    // reset(item);
    setValue(BASE_UNIT_TYPE, item?.base_unit_type_id?._id)
    setValue(MAPPED_UNIT_TYPE, item?.mapped_unit_type_id?._id)
    setValue(MASTER_UNIT_TYPE_QTY, item?.qty)
  }

  const handleReset = () => {
    setValue(BASE_UNIT_TYPE, '')
    setValue(MAPPED_UNIT_TYPE, '')
    setValue(MASTER_UNIT_TYPE_QTY, '')
  }

  return (
    <>
      {isLoading && <Loader />}

      <div className={styles.mainContainer}>
        <form
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.unitTypeContainer}>
            <div className={styles.labelFieldContainer}>
              <label className={styles.labelText}>
                Base Unit
                <span className="asterick">*</span>
              </label>
              <div className={styles.fieldErrorContainer}>
                <select
                  className={styles.selectInputField}
                  {...register(
                    BASE_UNIT_TYPE,
                    unitTypeValidators[BASE_UNIT_TYPE]
                  )}
                  // value={editableItem?.base_unit_type_id?._id}
                >
                  <option value="">Select Unit</option>
                  {allCategoriesList[0]?.values.map((item: any, i: number) => {
                    return (
                      <React.Fragment key={i}>
                        <option
                          value={item?._id}
                          selected={
                            item?._id === editableItem?.base_unit_type_id?._id
                          }
                        >
                          {item?.value}
                        </option>
                      </React.Fragment>
                    )
                  })}
                </select>
                <div className={styles.errorContainer}>
                  {errors[BASE_UNIT_TYPE] && (
                    <p className="dashboardFormError">
                      {errors[BASE_UNIT_TYPE].message as any}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.labelFieldContainer}>
              <label className={styles.labelText}>
                Conversational Unit
                <span className="asterick">*</span>
              </label>
              <div className={styles.fieldErrorContainer}>
                <select
                  className={styles.selectInputField}
                  {...register(
                    MAPPED_UNIT_TYPE,
                    unitTypeValidators[MAPPED_UNIT_TYPE]
                  )}
                  // value={editableItem?.mapped_unit_type_id?._id}
                >
                  <option value="">Select Unit</option>
                  {allCategoriesList[0]?.values.map((item: any, i: number) => {
                    return (
                      <React.Fragment key={i}>
                        <option
                          value={item?._id}
                          selected={
                            item?._id === editableItem?.mapped_unit_type_id?._id
                          }
                        >
                          {item?.value}
                        </option>
                      </React.Fragment>
                    )
                  })}
                </select>
                <div className={styles.errorContainer}>
                  {errors[MAPPED_UNIT_TYPE] && (
                    <p className="dashboardFormError">
                      {errors[MAPPED_UNIT_TYPE].message as any}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.labelFieldContainer}>
              <label className={styles.labelText}>
                Qty
                <span className="asterick">*</span>
              </label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="text"
                  placeholder="Patient Name"
                  className={styles.searchInputField}
                  {...register(
                    MASTER_UNIT_TYPE_QTY,
                    unitTypeValidators[MASTER_UNIT_TYPE_QTY]
                  )}
                />
                <div className={styles.errorContainer}>
                  {errors[MASTER_UNIT_TYPE_QTY] && (
                    <p className="dashboardFormError">
                      {errors[MASTER_UNIT_TYPE_QTY].message as any}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <Button
              title={editableItem?._id ? 'Update' : 'Add'}
              type="submit"
              customClass={styles.saveButtonStyle}
              // handleClick={handleSubmit}
            />

            <Button
              title="Reset"
              type="button"
              customClass={styles.resetButtonStyle}
              handleClick={handleReset}
            />
          </div>
        </form>

        <div className={styles.tableContainer}>
          <TableV3
            handleRowClick={(item: any) => handleEdit(item)}
            getTableProps={getTableProps}
            getTableBodyProps={getTableBodyProps}
            headerGroups={headerGroups}
            rows={rows}
            prepareRow={prepareRow}
          />
        </div>
      </div>
    </>
  )
}

export default UnitTypeMainLayout
