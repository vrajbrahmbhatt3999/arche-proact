import React, { FC, useEffect, useState } from "react";
import styles from "./createNewFormAddEditDialog.module.scss";
import {
  CloseIcon,
  DropDownArrowIcon,
  DropDownIcon,
} from "../../../components/common/svg-components";
import { colors } from "../../../constants/color";
import Divider from "../../../components/common/divider/Divider";
import Search from "../../../components/common/search/Search";
import DropDown from "../../../components/common/dropdown/DropDown";
import Button from "../../../components/common/button/Button";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useForm, useController, Controller } from "react-hook-form";
import { searchableSelectStyle } from "../../../utils/utils";
import {
  MODULE_LABEL_NAME,
  DEPARTMENT_LABEL_NAME,
  FORM_LABEL_NAME,
} from "../../../constants/constant";
import { manageCreateNewFormsValidators } from "../../../form-validators/manageCreateNewFormValidatiors";
import { components } from "react-select";
import { trimValue } from "../../../utils/utils";
import { saveDataForFormBuilderHeader } from "../../../redux/features/create-new-form/createNewFormSlice";
import { useDispatch } from "react-redux";
import {
  getAllCreateNewFormById,
  getAllCreateNewFormModules,
  updateCreateNewFormById,
} from "../../../redux/features/create-new-form/createNewFormAsynActions";
import { requestGenerator } from "../../../utils/payloadGenerator";
import { useAppDispatch, useAppSelector } from "../../../hooks/index";
import { getAllDepartment } from "../../../redux/features/department/departmentAsyncActions";

interface ICreateNewFormAddEditDialog {
  selectedCreateNewFormId: any;
  popData?: {};
  handleClose?: any;
}

const CreateNewFormAddEditDialog: FC<ICreateNewFormAddEditDialog> = ({
  popData,
  handleClose,
  selectedCreateNewFormId,
}) => {
  /* Dependency to navigate between pages */
  const navigate = useNavigate();
  /* Dependency to navigate between pages */

  /* Dependency to dispatch an action */
  const dispatch = useAppDispatch();
  /* Dependency to dispatch an action */

  // Dependencies for searchable select */
  const [departments, setDepartments] = useState([]);
  const [modules, setModules] = useState([]);
  // Dependencies for searchable select */

  const [selectedCreateNewFormAddEditId, setSelectedCreateNewFormAddEditId] =
    useState();

  /* Form submission dependencies */
  const { control, handleSubmit, formState, register, reset, watch, setValue } =
    useForm({
      mode: "all",
    });
  const form = watch();
  const { errors, dirtyFields, isDirty, isValid } = formState;
  /* Form submission dependencies */

  /* Selector to get the initial data of module from redux store*/
  const { isLoading, createNewFormByIdData, isStatusUpdated } = useAppSelector(
    (state) => state.createNewForm
  );
  /* Selector to get the initial data of module from redux store*/

  /* Initial API call for select list */
  useEffect(() => {
    /* API call - Select list for departments */
    dispatch(getAllDepartment(requestGenerator({}))).then((result) => {
      const selectListData = result?.payload?.data;
      const filteredSelectListData = selectListData?.map((_element: any) => {
        return {
          value: _element._id,
          label: _element.name,
        };
      });
      setDepartments(filteredSelectListData);
    });
    /* API call - Select list for departments */

    /* API call - Select list for modules */
    dispatch(getAllCreateNewFormModules(requestGenerator({}))).then(
      (result) => {
        const selectListData = result?.payload?.data;
        const filteredSelectListData = selectListData?.map((_element: any) => {
          return {
            value: _element._id,
            label: _element.name,
          };
        });
        setModules(filteredSelectListData);
      }
    );
    /* API call for select list - modules */
  }, []);
  /* Initial API call for select list */

  /* Initially Re-setting the data when component is loaded - Edit component */
  useEffect(() => {
    if (
      selectedCreateNewFormId &&
      selectedCreateNewFormId !== undefined &&
      selectedCreateNewFormId !== null
    ) {
      setSelectedCreateNewFormAddEditId(selectedCreateNewFormId);
      let dataToBeSent = {
        id: selectedCreateNewFormId,
      };
      dispatch(getAllCreateNewFormById(requestGenerator(dataToBeSent))).then(
        (result) => {
          const tempCreateNewFormByIdDataDetails = result?.payload;

          /* Setting the value of department select drop down - Edit */
          let compDepartmentObj, selDepartmentLabel, selDepartmentValue;
          if (
            tempCreateNewFormByIdDataDetails?.department_id &&
            tempCreateNewFormByIdDataDetails?.department_id !== null &&
            tempCreateNewFormByIdDataDetails?.department_id !== undefined
          ) {
            selDepartmentLabel =
              tempCreateNewFormByIdDataDetails.department_id.name;
            selDepartmentValue =
              tempCreateNewFormByIdDataDetails.department_id._id;
            compDepartmentObj = {
              value: selDepartmentValue,
              label: selDepartmentLabel,
            };
          }
          /* Setting the value of department select drop down - Edit */

          reset({
            _id: tempCreateNewFormByIdDataDetails?._id,
            name: tempCreateNewFormByIdDataDetails?.name || "",
            module_name: tempCreateNewFormByIdDataDetails?.module_name || "",
            department_id: compDepartmentObj,
            form: tempCreateNewFormByIdDataDetails?.form || "",
            note: tempCreateNewFormByIdDataDetails?.note || "",
          });
        }
      );
    }
  }, []);
  /* Initially Re-setting the data when component is loaded - Edit component */

  /* Function definition for form submission */
  const onSubmit = (formData:any) => {
    navigate('createNewFormBuilder',{state:{id:selectedCreateNewFormId ?? ""}})
    dispatch(saveDataForFormBuilderHeader(formData))
  };
  /* Function definition for form submission */

  /* Function definition for form submission of form data only */
  const onSubmitFormData = (formData:any) => {
    const dataToBeSent = {
      id: formData._id,
      data: {
          name: formData?.name,
          module_name: formData?.module_name,
          department_id: formData?.department_id?.value,
          note: formData.note,
          form: formData.form
      }
  }

    dispatch(updateCreateNewFormById(requestGenerator(dataToBeSent))).then(
      (result) => {
        handleClose();
      }
    );
  };
  /* Function definition for form submission of form data only */

  return (
    <>
      {/* Create New Form Dialog */}
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <div
          className={styles.mainContainer}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.iconContainer}>
            <CloseIcon
              customClass={styles.closeIconStyle}
              fillColor={colors.green1}
              handleClick={handleClose}
            />
          </div>

          <header className={styles.headerContainer}>
            <span className={styles.title}>
              {selectedCreateNewFormId &&
              selectedCreateNewFormId !== "" &&
              selectedCreateNewFormId !== undefined &&
              selectedCreateNewFormId !== null
                ? "Edit Form"
                : "Create New Form"}
            </span>
            <Divider customClass={styles.dividerStyle} />
          </header>

          <form onSubmit={handleSubmit(onSubmit)}>
          <section className={styles.sectionContainer}>
            <div className="common-input-wrapper">
              <label className="common-input-wrapper__label">
                Form<span className="asterick">*</span>{" "}
              </label>
              <input
                type="text"
                placeholder="Form"
                className="common-input-wrapper__input"
                {...register(
                  "name",
                  manageCreateNewFormsValidators[FORM_LABEL_NAME]
                )}
                onChange={(e) => trimValue(e)}
              />
              <div className="common-input-wrapper__error-container">
                {errors[FORM_LABEL_NAME] && (
                  <p className="dashboardFormError">
                    {errors[FORM_LABEL_NAME].message?.toString()}
                  </p>
                )}
              </div>
            </div>

            <div className="common-input-wrapper">
              <label className="common-input-wrapper__label">
                Module<span className="asterick">*</span>{" "}
              </label>
              <input
                type="text"
                placeholder="Module"
                className="common-input-wrapper__input"
                {...register(
                  "module_name",
                  manageCreateNewFormsValidators[MODULE_LABEL_NAME]
                )}
                onChange={(e) => trimValue(e)}
              />
              <div className="common-input-wrapper__error-container">
                {errors[MODULE_LABEL_NAME] && (
                  <p className="dashboardFormError">
                    {errors[MODULE_LABEL_NAME].message?.toString()}
                  </p>
                )}
              </div>
            </div>


            <div className="common-input-wrapper">
              <label className="common-input-wrapper__label">
                Department<span className="asterick">*</span>
              </label>
              <div className="common-input-wrapper__searchable-select">
                {
                  <Controller
                    name="department_id"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Select
                          options={departments}
                          value={field.value}
                          onChange={(option: any) => field.onChange(option)}
                          placeholder="Department"
                          components={{ DropdownIndicator }}
                          isClearable={true}
                          backspaceRemovesValue={true}
                          styles={searchableSelectStyle}
                        />
                      );
                    }}
                    rules={{ required: true }}
                  />
                }
              </div>
              <div className="common-input-wrapper__error-container">
                {errors[DEPARTMENT_LABEL_NAME] && (
                  <p className="dashboardFormError">
                    {
                      manageCreateNewFormsValidators[DEPARTMENT_LABEL_NAME]
                        .required
                    }
                  </p>
                )}
              </div>
            </div>

            <div className="common-input-wrapper">
              <label className="common-input-wrapper__label">Note</label>
              <textarea
                rows={5}
                placeholder="Note"
                className="common-input-wrapper__textarea"
                {...register("note")}
                onChange={(e) => trimValue(e)}
              />
            </div>

            <div className={styles.buttonContainer}>
              <button onClick={handleSubmit(onSubmit)}>{`${
                  selectedCreateNewFormId &&
                  selectedCreateNewFormId !== "" &&
                  selectedCreateNewFormId !== undefined &&
                  selectedCreateNewFormId !== null
                    ? "Edit Form"
                    : "Create New Form"
                }`}</button>
                
              {selectedCreateNewFormId &&
                selectedCreateNewFormId !== "" &&
                selectedCreateNewFormId !== undefined &&
                selectedCreateNewFormId !== null && (
                  <button onClick={handleSubmit(onSubmitFormData)}>Submit</button>
                )}
            </div>
          </section>
          </form>
        </div>
      </div>
      {/* Create New Form Dialog */}
    </>
  );
};
export default CreateNewFormAddEditDialog;

export const DropdownIndicator = (props: any) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        {props.selectProps.menuIsOpen ? (
          <DropDownArrowIcon fillColor="#797979" />
        ) : (
          <DropDownIcon fillColor="#797979" />
        )}
      </components.DropdownIndicator>
    )
  );
};
