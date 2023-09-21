import React, { FC, useEffect } from "react";
import styles from "./addTodoModal.module.scss";
import { CloseIcon } from "../../svg-components";
import { colors } from "../../../../constants/color";
import Divider from "../../divider/Divider";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../button/Button";
import Select from "react-select";
import { IAddTodoList } from "../../../../interfaces/interfaces";
import {
  TODO_TASK_DESCRIPTION,
  TODO_TASK_NAME,
  TODO_TASK_PRIORITY,
} from "../../../../constants/constant";
import { addTodoValidators } from "../../../../form-validators/addTodoValidators";
import { trimValue } from "../../../../utils/utils";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
  createTodoList,
  getAllTodoList,
  getAllTodoListById,
  updateTodoList,
} from "../../../../redux/features/receptionist/receptionistAsyncActions";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import Loader from "../../spinner/Loader";
import { clearTodoState } from "../../../../redux/features/receptionist/receptionistSlice";
interface IAddTodoModal {
  popData?: any;
  setModelOpenClose?: any;
}

const AddTodoModal: FC<IAddTodoModal> = ({ setModelOpenClose, popData }) => {
  const dispatch = useAppDispatch();
  const { loading, todoListDataById } = useAppSelector(
    (state) => state.receptionist
  );

  // select option data
  const optionData = [
    { value: "LOW", label: "Low" },
    { value: "MEDIUM", label: "Medium" },
    { value: "HIGH", label: "High" },
  ];

  // edit api call
  useEffect(() => {
    let data = {
      id: popData?._id,
    };
    popData?._id && dispatch(getAllTodoListById(requestGenerator(data)));
  }, [dispatch]);

  // FORM
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<IAddTodoList>({});

  const onSubmit: SubmitHandler<IAddTodoList> = (data) => {
    data.status = "ACTIVE";
    let payloadData = {
      page: 0,
      pageSize: 0,
      search: "",
      is_active: true,
    };

    if (popData?._id) {
      let id = popData?._id;
      dispatch(
        updateTodoList(
          requestGenerator({
            id,
            data: {
              title: data?.title,
              description: data?.description,
              priority: data?.priority,
              status: data?.status,
            },
          })
        )
      ).then((e) => {
        if (e.type === "receptionist/updateTodoList/fulfilled") {
          setTimeout(() => {
            setModelOpenClose(false);
          }, 2000);
          dispatch(getAllTodoList(requestGenerator(payloadData)));
        }
      });
    } else {
      dispatch(createTodoList(requestGenerator(data))).then((e) => {
        if (e.type === "receptionist/createTodoList/fulfilled") {
          setTimeout(() => {
            setModelOpenClose(false);
          }, 500);
          dispatch(getAllTodoList(requestGenerator(payloadData)));
        }
      });
    }
  };
  // set the data on form
  useEffect(() => {
    if (todoListDataById) {
      reset(todoListDataById);
    }
  }, [reset, todoListDataById]);

  useEffect(() => {
    return () => {
      dispatch(clearTodoState());
    };
  }, []);

  return (
    <>
      {loading && <Loader />}
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
            {popData?._id ? "Edit Task" : "Create New Task"}
          </p>
          <Divider customClass={styles.dividerStyle} />

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formLayoutContainer}>
              <div className={styles.formContainer}>
                <div className={styles.inputContainer}>
                  <div className={styles.inputTaskContainer}>
                    <div className={styles.labelField}>
                      <label
                        htmlFor={TODO_TASK_NAME}
                        className={styles.labelText}
                      >
                        Task Name
                        <span className="asterick">*</span>
                      </label>
                      <div className={styles.fieldErrorContainer}>
                        <input
                          type="text"
                          maxLength={40}
                          placeholder="Enter Task Name"
                          className={styles.inputField}
                          {...register(
                            TODO_TASK_NAME,
                            addTodoValidators[TODO_TASK_NAME]
                          )}
                          onChange={(e) => trimValue(e)}
                        />
                        <div className={styles.errorContainer}>
                          <span className={styles.extraSpan}></span>
                          {errors[TODO_TASK_NAME] && (
                            <p className="dashboardFormError">
                              {errors[TODO_TASK_NAME].message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className={styles.labelField1}>
                      <label className={styles.labelText}>
                        Task Priority <span className="asterick">*</span>
                      </label>
                      <div className={styles.fieldErrorContainer}>
                        <select
                          className={styles.selectInputField}
                          {...register(
                            TODO_TASK_PRIORITY,
                            addTodoValidators[TODO_TASK_PRIORITY]
                          )}
                        >
                          <option value="" selected disabled hidden>
                            Select Priority
                          </option>
                          {optionData?.map((item: any, i: number) => {
                            return (
                              <React.Fragment key={i}>
                                <option
                                  value={item?.value}
                                  selected={item?.value === popData?.priority}
                                >
                                  {item?.label}
                                </option>
                              </React.Fragment>
                            );
                          })}
                        </select>
                        <div className={styles.errorContainer}>
                          <span className={styles.extraSpan}></span>
                          {errors[TODO_TASK_PRIORITY] && (
                            <p className="dashboardFormError">
                              {errors[TODO_TASK_PRIORITY].message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.labelField}>
                    <label
                      htmlFor={TODO_TASK_DESCRIPTION}
                      className={styles.labelText}
                    >
                      Task Description
                    </label>
                    <div className={styles.fieldErrorContainer}>
                      <textarea
                        placeholder="Enter Task Description"
                        className={styles.inputField}
                        {...register(TODO_TASK_DESCRIPTION)}
                        onChange={(e) => trimValue(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.buttonConatiner}>
                <Button title="Set" type="submit" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTodoModal;
