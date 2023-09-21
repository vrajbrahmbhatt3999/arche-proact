import React, { FC, useEffect, useState } from 'react';
import { IItemTableInventory } from '../../../interfaces/interfaces';
import { SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select';
import styles from './addNewItem.module.scss';
import Button from '../../../components/common/button/Button';
import {
  INVENTORY_ITEM_NAME,
  INVENTORY_ITEM_CODE,
  INVENTORY_BASE_UNIT_TYPE,
  INVENTORY_GROUP,
  INVENTORY_QUANTITY,
  INVENTORY_CHARGABLE,
  INVENTORY_COST_PRICE,
  INVENTORY_SELL_PRICE,
  INVENTORY_EXPIRY_DAYS
} from '../../../constants/constant';
import { inventoryItemTableValidators } from '../../../form-validators/inventoryItemTableValidators';
import {
  blockInvalidCharacter,
  disableArrowKey,
  trimValue,
} from '../../../utils/utils';
import { useLocation, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { requestGenerator } from '../../../utils/payloadGenerator';
import {
  createInventoryItem,
  updateInventoryItem,
} from '../../../redux/features/inventory-item/inventoryItemAsyncActions';
import Loader from '../../../components/common/spinner/Loader';

interface IAddNewItem {}

const AddNewItem: FC<IAddNewItem> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { isLoading } = useAppSelector((state) => state.inventoryMaster);
  const { masterValueData } = useAppSelector((state) => state.login); 
  const itemDetailsObjectById = location?.state?.itemDetailData;
  let inventoryUnitTypeData = [] as any;

  masterValueData?.map((item: any) => {
    if (item?.category_name === 'INVENTORY_UNIT_TYPE') {
      inventoryUnitTypeData = inventoryUnitTypeData.concat(item?.values);
    } else {
      return;
    }
  }); 
  const groupOptions: any[] = [
    { label: 'Group', value: 'group' },
    { label: 'Individual', value: 'individual' }
  ];

  const chargableOptions: any[] = [
    { label: 'None', value: 'NONE' },
    { label: 'Inventory', value: 'INVENTORY' },
    { label: 'Invoice', value: 'INVOICE' },
    { label: 'Both', value: 'BOTH' }
  ];

  // use form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<IItemTableInventory>({});
   
  const onSubmit: SubmitHandler<IItemTableInventory> = (data: any) => {   
     
    let dataPayload:any = {};
    dataPayload = {
      id: itemDetailsObjectById?._id,
      ...data,
    };
    dataPayload.chargable =data.chargable.value;
    dataPayload.unit_type =data.base_unit.value;
    dataPayload.group =data.group.value;
    delete dataPayload.base_unit;
    delete dataPayload.code;
    
    if (itemDetailsObjectById?._id) {
     
      dispatch(updateInventoryItem(requestGenerator(dataPayload))).then((e) => {
          if (e.type === 'inventoryItem/updateInventoryItem/fulfilled') {
            navigate('/inventoryitemtable');
          }
        }
      );
    } else {
      dispatch(createInventoryItem(requestGenerator(dataPayload))).then((e) => {
          if (e.type === 'inventoryItem/createInventoryItem/fulfilled') {
            navigate('/inventoryitemtable');
          }
        });
    }
  };

  // set the data on form
  useEffect(() => {
    if (itemDetailsObjectById) {
      reset(itemDetailsObjectById);
      const groupFind = groupOptions.find((itm:any)=>itm.value===itemDetailsObjectById.group);
      const chargableFind = chargableOptions.find((itm:any)=>itm.value===itemDetailsObjectById.chargable);

      setValue(INVENTORY_GROUP, groupFind);
      setValue(INVENTORY_CHARGABLE, chargableFind);
      setValue(INVENTORY_BASE_UNIT_TYPE,{
        label: itemDetailsObjectById?.base_unit_type?.value,
        value: itemDetailsObjectById?.base_unit_type?._id,
      });
    }
  }, [reset, itemDetailsObjectById]);
 

  const handleReset = () => {
    reset();
    setValue(INVENTORY_ITEM_NAME, '');
    setValue(INVENTORY_ITEM_CODE, '');
    setValue(INVENTORY_BASE_UNIT_TYPE, '');
    setValue(INVENTORY_GROUP, '');
    setValue(INVENTORY_QUANTITY, '');
    setValue(INVENTORY_CHARGABLE, '');
    setValue(INVENTORY_COST_PRICE, '');
    setValue(INVENTORY_SELL_PRICE, '');
    setValue(INVENTORY_EXPIRY_DAYS, ''); 
  };

  const ItemNameInput = ()=>(
      <div className={styles.labelField}>
              <label
                htmlFor={INVENTORY_ITEM_NAME}
                className={styles.labelText}>
               Item Name <span className="asterick">*</span>
              </label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="Enter Name"
                  {...register(
                    INVENTORY_ITEM_NAME,
                    inventoryItemTableValidators[INVENTORY_ITEM_NAME]
                  )}
                  onChange={(e) => trimValue(e)}
                />
                {errors[INVENTORY_ITEM_NAME] && (
                  <p className="dashboardFormError">
                    {errors[INVENTORY_ITEM_NAME].message as any}
                  </p>
                )}
              </div>
      </div>
  )

const ItemCodeInput = ()=>(
    <div className={styles.labelField}>
            <label
              htmlFor={INVENTORY_ITEM_CODE}
              className={styles.labelText}>
              Item Code <span className="asterick">*</span>
            </label>
            <div className={styles.fieldErrorContainer}>
              <input
                type="text"
                className={styles.inputField}
                placeholder="Enter Code"
                {...register(
                  INVENTORY_ITEM_CODE,
                  inventoryItemTableValidators[INVENTORY_ITEM_CODE]
                )}
                onChange={(e) => trimValue(e)}
              />
              {errors[INVENTORY_ITEM_CODE] && (
                <p className="dashboardFormError">
                  {errors[INVENTORY_ITEM_CODE].message as any}
                </p>
              )}
            </div>
    </div>
)

const Input_SellPrice: any = () => {
  return (
    <div className={styles.labelField}>
      <label className={styles.labelText}>
        Sell Price<span className="asterick">*</span>
      </label>
      <div className={styles.fieldErrorContainer}>
        <input
          type="number"
          min="1"
          step={1}
          className={styles.inputField}
          placeholder="Enter Sell Price"
          {...register(
            INVENTORY_SELL_PRICE,
            inventoryItemTableValidators[INVENTORY_SELL_PRICE]
          )}
          onChange={(e: any) => {
            trimValue(e);
          }}
        />
        {errors[INVENTORY_SELL_PRICE] && (
          <p className="errorText">{errors[INVENTORY_SELL_PRICE].message as any}</p>
        )}
      </div>
    </div>
  );
};

const Input_CostPrice: any = () => {
  return (
    <div className={styles.labelField}>
      <label className={styles.labelText}>
        Cost Price<span className="asterick">*</span>
      </label>
      <div className={styles.fieldErrorContainer}>
        <input
          type="number"
          min="1"
          step={1}
          className={styles.inputField}
          placeholder="Enter Cost Price"
          {...register(INVENTORY_COST_PRICE,inventoryItemTableValidators[INVENTORY_COST_PRICE])}
          onChange={(e: any) => {
            trimValue(e);
          }}
        />
        { errors[INVENTORY_COST_PRICE] && (
          <p className="errorText">{errors[INVENTORY_COST_PRICE].message as any}</p>
        )}
      </div>
    </div>
  );
};

const Input_Quantity: any = () => {
  return (
    <div className={styles.labelField}>
      <label className={styles.labelText}>
        Quantity<span className="asterick">*</span>
      </label>
      <div className={styles.fieldErrorContainer}>
        <input
          type="number"
          min="1"
          step={1}
          className={styles.inputField}
          placeholder="Enter Quantity"
          {...register(
            INVENTORY_QUANTITY,
            inventoryItemTableValidators[INVENTORY_QUANTITY]
          )}
          onChange={(e: any) => {
            trimValue(e);
          }}
        />
        {errors[INVENTORY_QUANTITY] && (
          <p className="errorText">{errors[INVENTORY_QUANTITY].message as any}</p>
        )}
      </div>
    </div>
  );
};

const Input_ExpiryDays: any = () => {
  return (
    <div className={styles.labelField}>
      <label className={styles.labelText}>
        Expiry Days<span className="asterick">*</span>
      </label>
      <div className={styles.fieldErrorContainer}>
        <input
          type="number"
          min="1"
          step={1}
          className={styles.inputField}
          placeholder="Enter Expiry Days"
          {...register(
            INVENTORY_EXPIRY_DAYS,
            inventoryItemTableValidators[INVENTORY_EXPIRY_DAYS]
          )}
          onChange={(e: any) => {
            trimValue(e);
          }}
        />
        {errors[INVENTORY_EXPIRY_DAYS] && (
          <p className="errorText">{errors[INVENTORY_EXPIRY_DAYS].message as any}</p>
        )}
      </div>
    </div>
  );
};

const Select_Group: any = () => {
  return (
    <div className={styles.labelField}>
      <label className={styles.labelText}>
        Group<span className="asterick">*</span>
      </label>
      <div className={styles.fieldErrorContainer}>
        <Select
          className={styles.select}
          placeholder="Group"
          closeMenuOnSelect={true}
          isSearchable={true}
          value={watch(INVENTORY_GROUP)}
          {...register(
            INVENTORY_GROUP,
            inventoryItemTableValidators[INVENTORY_GROUP]
          )}
          options={groupOptions}
          onChange={(e: any) => {
            setValue(INVENTORY_GROUP, e);
            trigger(INVENTORY_GROUP);
          }}
          maxMenuHeight={200}
        />
        {errors[INVENTORY_GROUP] && (
          <p className="errorText">{errors[INVENTORY_GROUP].message as any}</p>
        )}
      </div>
    </div>
  );
};

const Select_Chargable: any = () => {
  return (
    <div className={styles.labelField}>
      <label className={styles.labelText}>
       Chargable<span className="asterick">*</span>
      </label>
      <div className={styles.fieldErrorContainer}>
        <Select
          className={styles.select}
          placeholder="Chargable"
          closeMenuOnSelect={true}
          isSearchable={true}
          value={watch(INVENTORY_CHARGABLE)}
          {...register(
            INVENTORY_CHARGABLE,
            inventoryItemTableValidators[INVENTORY_CHARGABLE]
          )}
          options={chargableOptions}
          onChange={(e: any) => {
            setValue(INVENTORY_CHARGABLE, e);
            trigger(INVENTORY_CHARGABLE);
          }}
          maxMenuHeight={200}
        />
        {errors[INVENTORY_CHARGABLE] && (
          <p className="errorText">{errors[INVENTORY_CHARGABLE].message as any}</p>
        )}
      </div>
    </div>
  );
};

const Select_BaseUnit: any = () => {
  return (
    <div className={styles.labelField}>
      <label className={styles.labelText}>
        Base Unit Type<span className="asterick">*</span>
      </label>
      <div className={styles.fieldErrorContainer}>
        <Select
          className={styles.select}
          placeholder="Base Unit Type"
          closeMenuOnSelect={true}
          isSearchable={true}
          value={watch(INVENTORY_BASE_UNIT_TYPE)}
          {...register(
            INVENTORY_BASE_UNIT_TYPE,
            inventoryItemTableValidators[INVENTORY_BASE_UNIT_TYPE]
          )}
          options={inventoryUnitTypeData?.map((item: any) => ({
            label: item?.value,
            value: item?._id,
          }))}
          onChange={(e: any) => {
            setValue(INVENTORY_BASE_UNIT_TYPE, e);
            trigger(INVENTORY_BASE_UNIT_TYPE);
          }}
          maxMenuHeight={200}
        />
        {errors[INVENTORY_BASE_UNIT_TYPE] && (
          <p className="errorText">{errors[INVENTORY_BASE_UNIT_TYPE].message as any}</p>
        )}
      </div>
    </div>
  );
};


  const submitButton = ()=>(
    <div className={styles.btnContainer}>
            <Button title="Submit" type="submit" />
            <Button
              title="Reset"
              type="button"
              customClass={styles.backBtn}
              handleClick={handleReset}
            />
            <Button
              title="Back"
              customClass={styles.backBtn}
              type="button"
              handleClick={() => {
                navigate('/inventoryitemtable');
              }}
            />
    </div>
  )

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.manageBranchContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputFieldsContainer}>
              <div>
              {ItemNameInput()}
              {ItemCodeInput()}
              {Input_Quantity()}
              </div>
              <div>
              {Select_BaseUnit()}
              {Select_Group()}
              {Select_Chargable()}

              </div>
              <div>
              {Input_CostPrice()}
              {Input_SellPrice()}
              {Input_ExpiryDays()}
              </div>
              
             
              {submitButton()}
            </div>
        </form>
      </div>
    </>
  );
};

export default AddNewItem;
