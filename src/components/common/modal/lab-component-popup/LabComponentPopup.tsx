import { FC, useEffect, useState } from "react";
import styles from "./labComponentPopup.module.scss";
import { AddButtonIcon, CloseIcon } from "../../svg-components";
import { colors } from "../../../../constants/color";
import Divider from "../../divider/Divider";
import { trimValue } from "../../../../utils/utils";
import { COMPONENT, NEW_COMPONENT } from "../../../../constants/constant";
import { createTestValidators } from "../../../../form-validators/createTestValidators";
import { useForm } from "react-hook-form";
import { ICreateTestForm } from "../../../../interfaces/interfaces";
import Button from "../../button/Button";
import TableV2 from "../../table/tableV2/TableV2";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
  createLabComponent,
  deleteComponent,
  getLabComponent,
  getLabTest,
  updateLabComponent,
} from "../../../../redux/features/lab/labAsyncActions";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import { labComponentHeaderData } from "../../../../constants/table-data/labComponentPopupData";
import {
  clearComponentData,
  clearRangeData,
} from "../../../../redux/features/lab/labSlice";

interface ILabComponentPopup {
  handleClose?: any;
  handleDepartment?: any;
  popData?: any;
  branchId?: any;
  handleDepartmentServiceConfig?: any;
}

const LabComponentPopup: FC<ILabComponentPopup> = ({
  handleClose,
  handleDepartment,
  popData,
  branchId,
  handleDepartmentServiceConfig,
}) => {
  const { componentData, testData } = useAppSelector((state) => state.lab);
  const dispatch = useAppDispatch();

  const [editId, setEditId] = useState();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<ICreateTestForm>({});

  const formData = watch();

  const onSubmit = async (data: ICreateTestForm) => {
    let reqData = {
      labtest_id: branchId,
      ranges: popData,
      name: data.name,
    };
    if (componentData?._id !== undefined) {
      let payloadData = {
        id: componentData?._id,
        data: reqData,
      };
      dispatch(updateLabComponent(requestGenerator(payloadData))).then((e) => {
        if (e.type == "lab/updateComponent/fulfilled") {
          reset();
          dispatch(clearComponentData());
          dispatch(clearRangeData());
          dispatch(getLabTest(requestGenerator({ id: branchId })));
        }
      });
    } else {
      dispatch(createLabComponent(requestGenerator(reqData))).then((e) => {
        if (e.type == "lab/createComponent/fulfilled") {
          reset();
          dispatch(clearComponentData());
          dispatch(clearRangeData());
          dispatch(getLabTest(requestGenerator({ id: branchId })));
        }
      });
    }
  };

  useEffect(() => {
    if (
      formData[NEW_COMPONENT] === undefined ||
      formData[NEW_COMPONENT] === null
    ) {
      setValue(NEW_COMPONENT, "NEW");
    }
  }, [formData[NEW_COMPONENT]]);

  useEffect(() => {
    if (
      formData[NEW_COMPONENT] === "VIEW" ||
      formData[NEW_COMPONENT] === undefined ||
      formData[NEW_COMPONENT] === null
    ) {
      dispatch(clearComponentData());
      setValue(COMPONENT, "");
    }
  }, [formData[NEW_COMPONENT]]);

  const handleEdit = (id: any) => {
    setEditId(id);
  };

  const handelDelete = (item: any) => {
    let reqData = {
      id: item?._id,
      labtest_id: branchId,
      data: {
        is_active: !item?.is_active,
      },
    };
    dispatch(deleteComponent(requestGenerator(reqData))).then((e) => {
      if (e.type === "lab/deleteComponent/fulfilled") {
        dispatch(getLabTest(requestGenerator({ id: branchId })));
      }
    });
  };

  useEffect(() => {
    if (editId !== undefined) {
      dispatch(getLabComponent(requestGenerator({ id: editId }))).then((e) => {
        if (e.type === "lab/getComponent/fulfilled") {
          setValue(NEW_COMPONENT, "NEW");
          setEditId(undefined);
        }
      });
    }
  }, [editId]);

  useEffect(() => {
    if (componentData?._id !== undefined) {
      setValue(COMPONENT, componentData?.name);
    }
  }, [componentData]);

  return (
    <>
      <div
        className={styles.mainContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={handleClose}
        />
        <div className={styles.uploadContainer}>
          <p className={styles.title}>Component</p>
          <Divider customClass={styles.dividerStyle} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.radioBtnContainer}>
              <div className={styles.singlRadioBtnConatainer}>
                <label htmlFor="new" className={styles.radioLabel}>
                  <input
                    className={styles.radioInput}
                    type="radio"
                    id="new"
                    value="NEW"
                    {...register(NEW_COMPONENT)}
                  />
                  <span className={styles.customRadio} />
                  <p className={styles.radioLabelTxt}>New</p>
                </label>
              </div>
              <div className={styles.singlRadioBtnConatainer}>
                <label htmlFor="view" className={styles.radioLabel}>
                  <input
                    className={styles.radioInput}
                    type="radio"
                    id="view"
                    value="VIEW"
                    {...register(NEW_COMPONENT)}
                  />
                  <span className={styles.customRadio} />
                  <p className={styles.radioLabelTxt}>View</p>
                </label>
              </div>
            </div>
            {formData[NEW_COMPONENT] === "NEW" ? (
              <>
                <div className={styles.labelField}>
                  <label className={styles.labelText}>
                    Component <span className="asterick">*</span>
                  </label>
                  <div className={styles.fieldErrorContainer}>
                    <input
                      type="text"
                      className={styles.inputField}
                      placeholder="Enter Component"
                      {...register(COMPONENT, createTestValidators[COMPONENT])}
                      onChange={(e) => trimValue(e)}
                    />
                    {errors[COMPONENT] && (
                      <p className="errorText">Please enter component</p>
                    )}
                  </div>
                </div>
                <div className={styles.labelField}>
                  <label className={styles.labelText}>Range</label>
                  <div
                    className={styles.fieldErrorContainer}
                    style={{ width: "200px" }}
                  >
                    <AddButtonIcon
                      fillColor={colors.green1}
                      handleClick={handleDepartment}
                      customClass={styles.iconStyle}
                    />
                  </div>
                </div>
                <div className={styles.btnContainer}>
                  <Button
                    title={
                      componentData?._id === undefined ? "Create" : "Update"
                    }
                  />
                </div>
              </>
            ) : (
              <div className={styles.tableContainer}>
                <TableV2
                  tableHeaderData={labComponentHeaderData}
                  tableRowData={testData?.components_ids}
                  handleClick={handleEdit}
                  handleRowClick={handleDepartmentServiceConfig}
                  setModelOpenClose={handelDelete}
                />
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default LabComponentPopup;
