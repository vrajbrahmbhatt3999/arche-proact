import React, { FC, useEffect, useState } from "react";
import styles from "./addCategoryValue.module.scss";
import Button from "../../button/Button";
import Divider from "../../divider/Divider";
import { colors } from "../../../../constants/color";
import { CloseIcon } from "../../svg-components";
import Select from "react-select";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAddCategoryValue } from "../../../../interfaces/interfaces";
import {
  MASTER_TABLE_CATEGORY_VALUE,
  MASTER_TABLE_CATEGORY_VALUE_NAME,
} from "../../../../constants/constant";
import { addCategoryValueValidators } from "../../../../form-validators/addCategoryValueValidators";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
  addMasterTableCategoryValue,
  editMasterTableCategoryValue,
  getAllMasterTableCategory,
  getAllMasterTableCategoryValue,
  getMasterTableCategoryValueById,
} from "../../../../redux/features/master-table-category/MasterTableCategoryAsyncActions";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import { clearState } from "../../../../redux/features/master-table-category/MasterTableCategorySlice";
import Loader from "../../spinner/Loader";
import makeAnimated from "react-select/animated";
interface IAddCategory {
  setModelOpenClose?: any;
  popData?: any;
  _id: any;
}

const AddCategoryValue: FC<IAddCategory> = ({ setModelOpenClose, popData }) => {
  console.log("popData value>>", popData);
  const dispatch = useAppDispatch();
  const animatedComponents = makeAnimated();
  const { isLoading, masterCategoryData, masterCategoryValueDataById } =
    useAppSelector((state) => state.masterTableCategory);

  const masterCategoryValueSelect = useAppSelector(
    (state) =>
      state.masterTableCategory?.masterCategoryValueDataById?.category_id?._id
  );
  console.log("masterCategory", masterCategoryValueDataById);
  useEffect(() => {
    let payloadData = {
      page: 0,
      pageSize: 100,
      search: "",
      is_active: true,
    };
    dispatch(getAllMasterTableCategory(requestGenerator(payloadData)));
  }, [dispatch]);

  // edit api call
  useEffect(() => {
    let data = {
      id: popData?._id,
    };
    popData?._id &&
      dispatch(getMasterTableCategoryValueById(requestGenerator(data)));
  }, [dispatch]);

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm<IAddCategoryValue>({});

  const onSubmit: SubmitHandler<IAddCategoryValue> = (data) => {
    let payloadData = {
      page: 0,
      pageSize: 0,
      search: "",
    };
    if (popData?._id) {
      let id = popData?._id;

      dispatch(
        editMasterTableCategoryValue(
          requestGenerator({
            id,
            data: {
              category_id: data?.category_id?._id,
              value: data?.value,
            },
          })
        )
      ).then((e) => {
        if (
          e.type === "masterTableManagementCategory/editCategoryValue/fulfilled"
        ) {
          setTimeout(() => {
            setModelOpenClose(false);
          }, 2000);
          dispatch(
            getAllMasterTableCategoryValue(requestGenerator(payloadData))
          );
        }
      });
    } else {
      dispatch(addMasterTableCategoryValue(requestGenerator(data))).then(
        (e) => {
          if (
            e.type ===
            "masterTableManagementCategory/addCategoryValue/fulfilled"
          ) {
            setTimeout(() => {
              setModelOpenClose(false);
            }, 2000);
            dispatch(
              getAllMasterTableCategoryValue(requestGenerator(payloadData))
            );
          }
        }
      );
    }
  };

  useEffect(() => {
    if (masterCategoryValueDataById) {
      reset(masterCategoryValueDataById);
    }
  }, [reset, masterCategoryValueDataById]);

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  const handleChange = (e: any) => {
    const value = e.target.value;
    if (value.length === 1 && value === " ") {
      e.target.value = "";
    } else if (
      value.length > 1 &&
      value[0] === " " &&
      value[value.length - 1] === " "
    ) {
      e.target.value = value.trim();
    }
  };

  const handleReset = () => {
    setValue(MASTER_TABLE_CATEGORY_VALUE_NAME, { label: "", value: "" });
  };

  const selectedValues = watch(MASTER_TABLE_CATEGORY_VALUE_NAME);

  const handleCancel = () => {
    setModelOpenClose(false);
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.mainContainer}>
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
        />
        <div
          className={styles.addCategoryContainer}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <p className={styles.title}>
            {popData?._id ? "Edit Category Value" : "Add Category Value"}
          </p>
          <Divider customClass={styles.dividerStyle} />

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formLayoutContainer}>
              <div className={styles.formContainer}>
                <div className={styles.inputContainer}>
                  <div className={styles.labelField}>
                    <label className={styles.labelText}>
                      Category <span className="asterick">*</span>
                    </label>
                    <div className={styles.fieldErrorContainer}>
                      {popData?._id ? (
                        <Select
                          className={styles.selectInputField}
                          placeholder="Select Category"
                          closeMenuOnSelect={true}
                          {...register(
                            MASTER_TABLE_CATEGORY_VALUE_NAME,
                            addCategoryValueValidators[
                              MASTER_TABLE_CATEGORY_VALUE_NAME
                            ]
                          )}
                          isSearchable={true}
                          options={masterCategoryData?.map((item: any) => ({
                            label: item?.category_name,
                            value: item?._id,
                          }))}
                          defaultValue={{
                            label: popData?.category_id?.category_name,
                            value: popData?.category_id?._id,
                          }}
                          onChange={(e: any) => {
                            setValue(MASTER_TABLE_CATEGORY_VALUE_NAME, e.value);
                            trigger(MASTER_TABLE_CATEGORY_VALUE_NAME);
                          }}
                          maxMenuHeight={200}
                        />
                      ) : (
                        <Select
                          className={styles.selectInputField}
                          placeholder="Select Category"
                          closeMenuOnSelect={true}
                          {...register(
                            MASTER_TABLE_CATEGORY_VALUE_NAME,
                            addCategoryValueValidators[
                              MASTER_TABLE_CATEGORY_VALUE_NAME
                            ]
                          )}
                          isSearchable={true}
                          options={masterCategoryData?.map((item: any) => ({
                            label: item?.category_name,
                            value: item?._id,
                          }))}
                          onChange={(e: any) => {
                            setValue(MASTER_TABLE_CATEGORY_VALUE_NAME, e.value);
                            trigger(MASTER_TABLE_CATEGORY_VALUE_NAME);
                          }}
                          maxMenuHeight={200}
                        />
                      )}
                      {/* <Select
                        className={styles.selectInputField}
                        placeholder="Select Category"
                        closeMenuOnSelect={true}
                        {...register(
                          MASTER_TABLE_CATEGORY_VALUE_NAME,
                          addCategoryValueValidators[
                            MASTER_TABLE_CATEGORY_VALUE_NAME
                          ]
                        )}
                        isSearchable={true}
                        options={masterCategoryData?.map((item: any) => ({
                          label: item?.category_name,
                          value: item?._id,
                        }))}
                        defaultValue={{
                          label: popData?.category_id?.category_name,
                          value: popData?.category_id?._id,
                        }}
                        onChange={(e: any) => {
                          setValue(MASTER_TABLE_CATEGORY_VALUE_NAME, e.value);
                          trigger(MASTER_TABLE_CATEGORY_VALUE_NAME);
                        }}
                        maxMenuHeight={200}
                      /> */}

                      {/* <select
                        className={styles.selectInputField}
                        {...register(
                          MASTER_TABLE_CATEGORY_VALUE_NAME,
                          addCategoryValueValidators[
                            MASTER_TABLE_CATEGORY_VALUE_NAME
                          ]
                        )}
                      >
                        <option value="" selected disabled>
                          Select Category
                        </option>
                        {masterCategoryData?.map((item: any, i: number) => {
                          return (
                            <React.Fragment key={i}>
                              <option
                                value={item?._id}
                                selected={
                                  item?._id === popData?.category_id?._id
                                }
                              >
                                {item?.category_name}
                              </option>
                            </React.Fragment>
                          );
                        })}
                      </select> */}

                      <div className={styles.errorContainer}>
                        <span className={styles.extraSpan}></span>
                        {errors[MASTER_TABLE_CATEGORY_VALUE_NAME] && (
                          <p className="dashboardFormError">
                            {
                              errors[MASTER_TABLE_CATEGORY_VALUE_NAME]
                                .message as any
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.inputContainer}>
                  <div className={styles.labelField}>
                    <label
                      htmlFor={MASTER_TABLE_CATEGORY_VALUE}
                      className={styles.labelText}
                    >
                      Value
                      <span className="asterick">*</span>
                    </label>
                    <div className={styles.fieldErrorContainer}>
                      <input
                        type="text"
                        className={styles.inputField}
                        {...register(
                          MASTER_TABLE_CATEGORY_VALUE,
                          addCategoryValueValidators[
                            MASTER_TABLE_CATEGORY_VALUE
                          ]
                        )}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        placeholder="Enter category value"
                      />
                      <div className={styles.errorContainer}>
                        <span className={styles.extraSpan}></span>
                        {errors[MASTER_TABLE_CATEGORY_VALUE] && (
                          <p className="dashboardFormError">
                            {errors[MASTER_TABLE_CATEGORY_VALUE].message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {!popData?._id ? (
                <div className={styles.buttonConatiner}>
                  <Button
                    title="Submit"
                    type="submit"
                    customClass={styles.submitButtonStyle}
                  />
                  <Button
                    title="Reset"
                    type="reset"
                    handleClick={handleReset}
                    customClass={styles.resetButtonStyle}
                  />
                </div>
              ) : (
                <div className={styles.buttonConatiner}>
                  <Button
                    title="Update"
                    type="submit"
                    customClass={styles.submitButtonStyle}
                  />
                  <Button
                    title="Cancel"
                    handleClick={handleCancel}
                    customClass={styles.resetButtonStyle}
                  />
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategoryValue;
