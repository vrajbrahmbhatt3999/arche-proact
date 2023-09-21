import { FC, useEffect } from "react";
import styles from "./addCategoryModal.module.scss";
import { CloseIcon } from "../../svg-components";
import { colors } from "../../../../constants/color";
import Divider from "../../divider/Divider";
import Button from "../../button/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAddCategory } from "../../../../interfaces/interfaces";
import { MASTER_TABLE_CATEGORY_NAME } from "../../../../constants/constant";
import { addCategoryValidators } from "../../../../form-validators/addCategoryValidators";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
  addMasterTableCategory,
  editMasterTableCategory,
  getAllMasterTableCategory,
  getMasterTableCategoryById,
} from "../../../../redux/features/master-table-category/MasterTableCategoryAsyncActions";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import { clearState } from "../../../../redux/features/master-table-category/MasterTableCategorySlice";
import Loader from "../../spinner/Loader";

interface IAddCategoryModal {
  setModelOpenClose?: any;
  popData?: any;
}
const AddCategoryModal: FC<IAddCategoryModal> = ({
  setModelOpenClose,
  popData,
}) => {
  const dispatch = useAppDispatch();
  const { isLoading, masterCategoryDataById } = useAppSelector(
    (state) => state.masterTableCategory
  );

  // edit api call
  useEffect(() => {
    let data = {
      id: popData?._id,
    };
    popData?._id &&
      dispatch(getMasterTableCategoryById(requestGenerator(data)));
  }, []);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddCategory>({});

  const onSubmit: SubmitHandler<IAddCategory> = (data) => {
    let payloadData = {
      page: 1,
      pageSize: 10,
      search: "",
      is_active: "",
    };

    if (popData?._id) {
      let data1 = {
        id: popData?._id,
        data: { ...data },
      };
      dispatch(editMasterTableCategory(requestGenerator(data1))).then((e) => {
        if (e.type === "masterTableManagementCategory/editCategory/fulfilled") {
          setTimeout(() => {
            setModelOpenClose(false);
          }, 2000);
          dispatch(getAllMasterTableCategory(requestGenerator(payloadData)));
        }
      });
    } else {
      dispatch(addMasterTableCategory(requestGenerator(data))).then((e) => {
        if (e.type === "masterTableManagementCategory/addCategory/fulfilled") {
          setTimeout(() => {
            setModelOpenClose(false);
          }, 2000);
          dispatch(getAllMasterTableCategory(requestGenerator(payloadData)));
        }
      });
    }
    console.log("data", data);
  };

  useEffect(() => {
    if (masterCategoryDataById) {
      reset(masterCategoryDataById);
    }
  }, [reset, masterCategoryDataById]);

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
            {popData?._id ? "Edit Category" : "Add Category"}
          </p>
          <Divider customClass={styles.dividerStyle} />

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formLayoutContainer}>
              <div className={styles.formContainer}>
                <div className={styles.inputContainer}>
                  <div className={styles.labelField}>
                    <label
                      htmlFor={MASTER_TABLE_CATEGORY_NAME}
                      className={styles.labelText}
                    >
                      Category Name
                      <span className="asterick">*</span>
                    </label>
                    <div className={styles.fieldErrorContainer}>
                      <input
                        type="text"
                        placeholder="Enter Category Name"
                        className={styles.inputField}
                        {...register(
                          MASTER_TABLE_CATEGORY_NAME,
                          addCategoryValidators[MASTER_TABLE_CATEGORY_NAME]
                        )}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                      <div className={styles.errorContainer}>
                        <span className={styles.extraSpan}></span>
                        {errors[MASTER_TABLE_CATEGORY_NAME] && (
                          <p className="dashboardFormError">
                            {errors[MASTER_TABLE_CATEGORY_NAME].message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className={styles.buttonConatiner}>
                <Button title="Submit" type="submit" />
                <Button
                  title="Reset"
                  type="reset"
                  customClass={styles.resetButtonStyle}
                />
              </div> */}

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

export default AddCategoryModal;
