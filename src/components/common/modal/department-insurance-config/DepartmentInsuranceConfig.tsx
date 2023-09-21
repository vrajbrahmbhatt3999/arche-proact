import { FC, useState } from 'react';
import { CloseIcon, EditIcon } from '../../svg-components';
import { colors } from '../../../../constants/color';
import Divider from '../../divider/Divider';
import styles from './departmentInsuranceConfig.module.scss';
import Button from '../../button/Button';
import { disableArrowKey, trimValue } from '../../../../utils/utils';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { IDepartmentServiceConfig } from '../../../../interfaces/interfaces';
import {
  INSURANCE_COPAY,
  INSURANCE_DEPARTMENT,
  INSURANCE_DISCOUNT,
} from '../../../../constants/constant';
import { useAppSelector } from '../../../../hooks';
import { departmentInsuranceConfigValidators } from '../../../../form-validators/addInsurancePlanValidators';

interface IDepartmentInsuranceConfig {
  handleClose?: any;
  popData?: any;
  setModelOpenClose?: any;
  handleSubmitData?: any;
}

const DepartmentInsuranceConfig: FC<IDepartmentInsuranceConfig> = ({
  handleClose,
  popData,
  setModelOpenClose,
  handleSubmitData,
}) => {
  const [disable, setDisable] = useState(true);
  const { departmentData } = useAppSelector((state) => state.department);
  const [departmentName, setDepartmentName] = useState('');

  let selectedDepartment = departmentData?.find(
    (item: any) => item?._id === popData
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<IDepartmentServiceConfig>();

  const onSubmit = async (data: IDepartmentServiceConfig) => {
    if (disable === true) {
      data.department_id = selectedDepartment?._id;
      data.department_name = selectedDepartment?.name;
    } else {
      data.department_name = departmentName;
    }
    handleSubmitData(data);
    setTimeout(() => {
      setModelOpenClose(false);
    }, 200);
  };

  const handleKeyDown = (e: any) => {
    if (e.target.value.length >= 2 && e.key !== 'Backspace') {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.popupContainer} onClick={(e) => e.stopPropagation()}>
      <CloseIcon
        customClass={styles.closeIconStyle}
        fillColor={colors.green1}
        handleClick={handleClose}
      />
      <div className={styles.notesContainer}>
        <p className={styles.title}>Department Insurance Config</p>
        <Divider customClass={styles.dividerStyle} />
        <form
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.fieldContainer}>
            <label className={styles.labelText}>Dept.</label>
            <div className={styles.inputContainer}>
              <Select
                className={styles.selectStyle}
                placeholder="Select Category"
                closeMenuOnSelect={true}
                {...register(INSURANCE_DEPARTMENT)}
                isSearchable={true}
                value={{
                  label: selectedDepartment?.name,
                  value: selectedDepartment?._id,
                }}
                options={departmentData?.map((item: any) => ({
                  label: item.name,
                  value: item._id,
                }))}
                onChange={(selectedOption) => {
                  setValue(INSURANCE_DEPARTMENT, selectedOption?.value || '');
                  trigger(INSURANCE_DEPARTMENT);
                  setDepartmentName(selectedOption?.label);
                }}
                maxMenuHeight={200}
                isDisabled={true}
              />
            </div>
            {/* <EditIcon
              customClass={styles.editStyle}
            // handleClick={() => setDisable(!disable)}
            /> */}
          </div>
          <div className={styles.fieldContainer}>
            <label className={styles.labelText}>Discount%</label>
            <div className={styles.inputContainer}>
              <input
                type="number"
                className={styles.inputStyle}
                placeholder="Enter discount%"
                {...register(
                  INSURANCE_DISCOUNT
                  // departmentInsuranceConfigValidators[INSURANCE_DISCOUNT]
                )}
                onChange={(e) => trimValue(e)}
                onKeyDown={(e: any) => {
                  handleKeyDown(e);
                  disableArrowKey(e);
                }}
                onWheel={(e: any) => {
                  e.target.blur();
                }}
              />
              {/* {errors[INSURANCE_DISCOUNT] && (
                <p className="errorText">
                  {errors[INSURANCE_DISCOUNT].message as any}
                </p>
              )} */}
            </div>
          </div>
          <div className={styles.fieldContainer}>
            <label className={styles.labelText}>Copay%</label>
            <div className={styles.inputContainer}>
              <input
                type="number"
                className={styles.inputStyle}
                placeholder="Enter copay%"
                {...register(
                  INSURANCE_COPAY
                  // departmentInsuranceConfigValidators[INSURANCE_COPAY]
                )}
                onChange={(e) => trimValue(e)}
                onKeyDown={(e: any) => {
                  handleKeyDown(e);
                  disableArrowKey(e);
                }}
                onWheel={(e: any) => {
                  e.target.blur();
                }}
              />
              {/* {errors[INSURANCE_COPAY] && (
                <p className="errorText">
                  {errors[INSURANCE_COPAY].message as any}
                </p>
              )} */}
            </div>
          </div>
          <Button
            title="Submit"
            customClass={styles.buttonStyle}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default DepartmentInsuranceConfig;
