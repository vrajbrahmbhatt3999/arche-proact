import { FC, useState, useEffect } from 'react';
import { CloseIcon } from '../../svg-components';
import { colors } from '../../../../constants/color';
import Divider from '../../divider/Divider';
import styles from './rangePopup.module.scss';
import { disableArrowKey, trimValue } from '../../../../utils/utils';
import { IRangeForm } from '../../../../interfaces/interfaces';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import Button from '../../button/Button';
import TableV2 from '../../table/tableV2/TableV2';
import { genderData } from '../../../../constants/data';
import {
  AGE_FROM,
  AGE_TO,
  GENDER_RANGE,
  PERIOD,
  RANGE_FROM,
  RANGE_TO,
} from '../../../../constants/constant';
import { rangePopupValidators } from '../../../../form-validators/rangePopupValidators';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { getAllRangeData } from '../../../../redux/features/lab/labSlice';

interface IRange {
  handleClose?: any;
  handleSubmitData?: any;
  setModelOpenClose?: any;
  popData?: any;
}
const RangePopup: FC<IRange> = ({
  handleClose,
  handleSubmitData,
  setModelOpenClose,
  popData,
}) => {
  // const [gender, setGender] = useState(null)
  // const [ageFrom, setAgeFrom] = useState('')
  // const [ageTo, setAgeTo] = useState('')
  // const [rangeFrom, setRangeFrom] = useState('')
  // const [rangeTo, setRangeTo] = useState('')
  const { testData, rangeTableData, componentData } = useAppSelector(
    (state) => state.lab
  );
  const [tableData, setTableData] = useState<any>(rangeTableData);

  console.log('popData', popData);

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<IRangeForm>();

  const headerData: any = [
    {
      Header: 'GENDER',
      accessor: 'gender',
    },
    {
      Header: 'PERIOD',
      accessor: 'age_type',
    },
    {
      Header: 'AGE FROM',
      accessor: 'age_from',
    },
    {
      Header: 'AGE TO',
      accessor: 'age_to',
    },
    {
      Header: 'RANGE FROM',
      accessor: 'range_from',
    },
    {
      Header: 'RANGE TO',
      accessor: 'range_to',
    },
  ];

  const onSubmit = async (data: IRangeForm) => {
    console.log('first', data);
    const payload = {
      ...data,
      [GENDER_RANGE]: data[GENDER_RANGE]?.value,
      [PERIOD]: data[PERIOD]?.value,
    };
    console.log('payload', payload);
    // if (data.age_from < data.age_to && data.range_from < data.range_to) {
    setTableData((prevTableData: any) => [...prevTableData, payload]);
    setTimeout(() => {
      reset();
      setValue(GENDER_RANGE, '');
      setValue(PERIOD, '');
    }, 300);
    // } else {
    //   return
    // }
  };

  useEffect(() => {
    if (componentData?._id !== undefined && rangeTableData?.length === 0) {
      const newData = componentData?.ranges?.map(
        ({ _id, ...rest }: any) => rest
      );
      setTableData(newData);
    } else {
      setTableData(rangeTableData);
    }
  }, [componentData?._id]);

  console.log('componentData', componentData);

  const blockInvalidChar = (e: any) =>
    ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();

  const ageFormatData: any = [
    {
      value: 'DAY',
      label: 'Day',
    },
    {
      value: 'YEAR',
      label: 'Year',
    },
  ];

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
          <p className={styles.title}>Range</p>
          <Divider customClass={styles.dividerStyle} />
          <div className={styles.tableForm}>
            {popData === undefined && popData !== '1' && (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.formContainer}
              >
                <div className={styles.form}>
                  <div className={styles.labelField}>
                    <label className={styles.labelText}>
                      Gender<span className="asterick">*</span>
                    </label>
                    <div className={styles.fieldErrorContainer}>
                      <Select
                        className={styles.select}
                        placeholder="Gender"
                        closeMenuOnSelect={true}
                        isSearchable={true}
                        value={watch(GENDER_RANGE)}
                        {...register(
                          GENDER_RANGE,
                          rangePopupValidators[GENDER_RANGE]
                        )}
                        options={genderData}
                        onChange={(e: any) => {
                          setValue(GENDER_RANGE, e);
                          // setGender(e)
                          trigger(GENDER_RANGE);
                        }}
                        maxMenuHeight={200}
                      />

                      {errors[GENDER_RANGE] && (
                        <p className={styles.errorText}>
                          {errors[GENDER_RANGE].message as any}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={styles.labelField}>
                    <label className={styles.labelText}>
                      Period<span className="asterick">*</span>
                    </label>
                    <div className={styles.fieldErrorContainer}>
                      <Select
                        className={styles.select}
                        placeholder="Period"
                        closeMenuOnSelect={true}
                        isSearchable={true}
                        value={watch(PERIOD)}
                        {...register(PERIOD, rangePopupValidators[PERIOD])}
                        options={ageFormatData}
                        onChange={(e: any) => {
                          setValue(PERIOD, e);
                          trigger(PERIOD);
                        }}
                        maxMenuHeight={200}
                      />

                      {errors[PERIOD] && (
                        <p className={styles.errorText}>
                          {errors[PERIOD].message as any}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={styles.labelField}>
                    <label className={styles.labelText}>
                      Age From <span className="asterick">*</span>
                    </label>
                    <div className={styles.fieldErrorContainer}>
                      <input
                        type="number"
                        className={styles.inputField}
                        placeholder="Enter Age From"
                        // value={ageFrom ? ageFrom : ''}
                        {...register(AGE_FROM, rangePopupValidators[AGE_FROM])}
                        onChange={(e: any) => {
                          trimValue(e);
                          // setAgeFrom(e.target.value)
                          disableArrowKey(e);
                        }}
                        // onKeyDown={blockInvalidChar}
                        onKeyDown={(e: any) => {
                          disableArrowKey(e);
                          blockInvalidChar(e);
                        }}
                        onWheel={(e: any) => {
                          e.target.blur();
                        }}
                      />
                      {errors[AGE_FROM] && (
                        <p className={styles.errorText}>
                          {errors[AGE_FROM].message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={styles.labelField}>
                    <label className={styles.labelText}>
                      Age To <span className="asterick">*</span>
                    </label>
                    <div className={styles.fieldErrorContainer}>
                      <input
                        type="number"
                        className={styles.inputField}
                        placeholder="Enter Age To"
                        // value={ageTo}
                        {...register(AGE_TO, rangePopupValidators[AGE_TO])}
                        onChange={(e: any) => {
                          trimValue(e);
                          // setAgeTo(e.target.value)
                          disableArrowKey(e);
                        }}
                        onWheel={(e: any) => {
                          e.target.blur();
                        }}
                        onKeyDown={(e: any) => {
                          disableArrowKey(e);
                          blockInvalidChar(e);
                        }}
                      />
                      {errors[AGE_TO] && (
                        <p className={styles.errorText}>
                          {errors[AGE_TO].message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={styles.labelField}>
                    <label className={styles.labelText}>
                      Range From <span className="asterick">*</span>
                    </label>
                    <div className={styles.fieldErrorContainer}>
                      <input
                        type="text"
                        className={styles.inputField}
                        placeholder="Enter Range From"
                        // value={rangeFrom}
                        {...register(
                          RANGE_FROM,
                          rangePopupValidators[RANGE_FROM]
                        )}
                        onChange={(e: any) => {
                          trimValue(e);
                          // setRangeFrom(e.target.value)
                          disableArrowKey(e);
                        }}
                        onKeyDown={(e: any) => {
                          disableArrowKey(e);
                          blockInvalidChar(e);
                        }}
                        onWheel={(e: any) => {
                          e.target.blur();
                        }}
                      />
                      {errors[RANGE_FROM] && (
                        <p className={styles.errorText}>
                          {errors[RANGE_FROM].message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={styles.labelField}>
                    <label className={styles.labelText}>
                      Range To <span className="asterick">*</span>
                    </label>
                    <div className={styles.fieldErrorContainer}>
                      <input
                        type="text"
                        className={styles.inputField}
                        placeholder="Enter Range To"
                        // value={rangeTo}
                        {...register(RANGE_TO, rangePopupValidators[RANGE_TO])}
                        onChange={(e: any) => {
                          trimValue(e);
                          // setRangeTo(e.target.value)
                          disableArrowKey(e);
                        }}
                        onWheel={(e: any) => {
                          e.target.blur();
                        }}
                        onKeyDown={(e: any) => {
                          disableArrowKey(e);
                          blockInvalidChar(e);
                        }}
                      />
                      {errors[RANGE_TO] && (
                        <p className={styles.errorText}>
                          {errors[RANGE_TO].message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.btnContainer}>
                  <Button title="Add" />
                </div>
              </form>
            )}
            <TableV2
              tableHeaderData={headerData}
              tableRowData={
                popData ? (popData === '1' ? [] : popData) : tableData
              }
              active={false}
            />
            {popData === undefined && popData !== '1' && (
              <div className={styles.btnContainer}>
                <Button
                  title="Submit"
                  handleClick={() => {
                    console.log('tableData', tableData);
                    handleSubmitData(tableData);
                    setModelOpenClose(false);
                    dispatch(getAllRangeData(tableData));
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RangePopup;
