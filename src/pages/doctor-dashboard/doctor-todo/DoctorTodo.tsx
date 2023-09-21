import React, { useEffect } from "react";
import styles from "./DoctorTodo.module.scss";
import {
  AlarmIcon,
  TodoCheckIcon,
  TodoUnCheckIcon,
} from "../../../components/common/svg-components";
import Button from "../../../components/common/button/Button";

import Divider from "../../../components/common/divider/Divider";
import {
  deleteTodoList,
  getAllTodoList,
  updateTodoList,
} from "../../../redux/features/receptionist/receptionistAsyncActions";
import { requestGenerator } from "../../../utils/payloadGenerator";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import Loader from "../../../components/common/spinner/Loader";

interface IDoctorTodo {
  showAddModal?: any;
  setShowAddModal?: any;
  addModalData?: any;
  setAddModalData?: any;
  handleAddModal?: any;
  showAddReminderModal?: any;
  setShowAddReminderModal?: any;
  addReminderModalData?: any;
  setAddReminderModalData?: any;
  handleAddReminderModal?: any;
}

const DoctorTodo: React.FunctionComponent<IDoctorTodo> = ({
  showAddModal,
  setShowAddModal,
  setAddModalData,
  handleAddModal,
  showAddReminderModal,
  setShowAddReminderModal,
  addReminderModalData,
  setAddReminderModalData,
  handleAddReminderModal,
}) => {
  const dispatch = useAppDispatch();
  const { loading, todoListData } = useAppSelector(
    (state) => state.receptionist
  );

  useEffect(() => {
    let payloadData = {
      page: 0,
      pageSize: 0,
      search: "",
      is_active: true,
    };
    dispatch(getAllTodoList(requestGenerator(payloadData)));
  }, [dispatch]);

  // handleReadTodo
  const handleReadTodo = (item: any) => {
    let payloadData = {
      page: 0,
      pageSize: 0,
      search: "",
      is_active: true,
    };
    let id = item?._id;

    dispatch(
      updateTodoList(
        requestGenerator({
          id,
          data: {
            title: item?.title,
            description: item?.description,
            priority: item?.priority,
            status: "DONE",
          },
        })
      )
    ).then((e) => {
      if (e.type === "receptionist/updateTodoList/fulfilled") {
        dispatch(getAllTodoList(requestGenerator(payloadData)));
      }
    });
  };

  // handleUnReadTodo
  const handleUnReadTodo = (item: any) => {
    let payloadData = {
      page: 0,
      pageSize: 0,
      search: "",
      is_active: true,
    };
    let id = item?._id;

    dispatch(
      updateTodoList(
        requestGenerator({
          id,
          data: {
            title: item?.title,
            description: item?.description,
            priority: item?.priority,
            status: "ACTIVE",
          },
        })
      )
    ).then((e) => {
      if (e.type === "receptionist/updateTodoList/fulfilled") {
        dispatch(getAllTodoList(requestGenerator(payloadData)));
      }
    });
  };

  // handleEditModal
  const handleEditModal = (item: any) => {
    setShowAddModal(!showAddModal);
    setAddModalData(item);
  };

  // handleReminderModal
  const handleReminderModal = (item: any) => {
    setShowAddReminderModal(!showAddModal);
    setAddReminderModalData(item);
  };

  // handleDeleteModal
  const handleDeleteModal = (item: any) => {
    let payloadData = {
      page: 0,
      pageSize: 0,
      search: "",
      is_active: true,
    };
    let deletPayloadData = {
      id: item?._id,
      data: {
        is_active: !item?.is_active,
      },
    };
    dispatch(deleteTodoList(requestGenerator(deletPayloadData))).then((e) => {
      if (e.type === "receptionist/deleteTodoList/fulfilled") {
        dispatch(getAllTodoList(requestGenerator(payloadData)));
      }
    });
  };
  return (
    <>
      {loading && <Loader />}
      {/* todo container */}
      <div className={styles.todoContainer}>
        <div className={styles.todoHeaderContainer}>
          <p className={styles.todoTitle}>To-Do List</p>
          <p className={styles.addNewStyle} onClick={() => handleAddModal()}>
            Add New
          </p>
        </div>

        <div className={styles.mainContainerTodo}>
          <div className={styles.container}>
            {todoListData.length > 0 ? (
              todoListData?.map((item: any, i: any) => {
                return (
                  <React.Fragment key={i}>
                    <div className={styles.notifyContainer}>
                      {item?.status === "ACTIVE" ? (
                        <div className={styles.unReadStyle}>
                          <div className={styles.titleStatusContainer}>
                            <div className={styles.titleStatusStyleContainer}>
                              <div>
                                <TodoUnCheckIcon
                                  customClass={styles.iconStyle}
                                  handleClick={() => handleReadTodo(item)}
                                />
                              </div>

                              <div
                                style={{
                                  width: "100%",
                                  padding: "0px 10px 0px 0px",
                                }}
                              >
                                <h5 className={styles.titleStyle}>
                                  {item?.title}
                                </h5>
                              </div>
                            </div>

                            <div className={styles.alarmPriorityContainer}>
                              <div
                                className={styles.priorityListStyleContainer}
                              >
                                {item?.priority === "MEDIUM" ? (
                                  <div className={styles.mediumPriorityStyle}>
                                    Medium
                                  </div>
                                ) : item?.priority === "HIGH" ? (
                                  <div className={styles.highPriorityStyle}>
                                    High
                                  </div>
                                ) : item?.priority === "LOW" ? (
                                  <div className={styles.lowPriorityStyle}>
                                    Low
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                              <AlarmIcon
                                customClass={styles.alarmIcon}
                                handleClick={() => handleReminderModal(item)}
                              />
                            </div>
                          </div>
                          <p className={styles.textStyle}>
                            {item?.description}
                          </p>

                          <div className={styles.buttonContainer}>
                            <Button
                              title="Edit"
                              customClass={styles.editButtonStyle}
                              handleClick={() => handleEditModal(item)}
                            />
                            <Button
                              title="Delete"
                              customClass={styles.deleteButtonStyle}
                              handleClick={() => handleDeleteModal(item)}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className={styles.isReadStyle}>
                          <div className={styles.titleStatusContainer}>
                            <div className={styles.titleStatusStyleContainer}>
                              <div>
                                <TodoCheckIcon
                                  customClass={styles.iconStyle}
                                  handleClick={() => handleUnReadTodo(item)}
                                />
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  padding: "0px 10px 0px 0px",
                                }}
                              >
                                <h5 className={styles.titleStyle}>
                                  {item?.title}
                                </h5>
                              </div>
                            </div>
                            <div className={styles.alarmPriorityContainer}>
                              <div
                                className={styles.priorityListStyleContainer}
                              >
                                {item?.priority === "MEDIUM" ? (
                                  <div className={styles.mediumPriorityStyle}>
                                    Medium
                                  </div>
                                ) : item?.priority === "HIGH" ? (
                                  <div className={styles.highPriorityStyle}>
                                    High
                                  </div>
                                ) : item?.priority === "LOW" ? (
                                  <div className={styles.lowPriorityStyle}>
                                    Low
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                          <p className={styles.textStyle}>
                            {item?.description}
                          </p>
                        </div>
                      )}

                      {i !== todoListData?.length - 1 && (
                        <Divider customClass={styles.divider} />
                      )}
                    </div>
                  </React.Fragment>
                );
              })
            ) : (
              <p className={styles.noRecordTextStyle}>No task available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorTodo;
