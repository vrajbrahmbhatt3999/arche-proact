import React, { FC, useEffect, useState } from "react";
import styles from "./previewFormDialog.module.scss";
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
import { FormBuilder, Form } from 'react-formio/lib/components';

interface IPreviewFormDialog {
  handleClose?: any;
  selectedFormDetails?: any;
  open:boolean
}

const PreviewFormDialog: FC<IPreviewFormDialog> = ({
  handleClose,
  selectedFormDetails,
  open
}) => {
  /* Dependency to navigate between pages */
  const navigate = useNavigate();
  /* Dependency to navigate between pages */

  /* Dependency to dispatch an action */
  const dispatch = useAppDispatch();
  /* Dependency to dispatch an action */

  const [formValue, setFormValue] = useState<any>()

  /* Form submission dependencies */
  const { control, handleSubmit, formState, register, reset, watch, setValue } =
    useForm({
      mode: "all",
    });
  const form = watch();
  const { errors, dirtyFields, isDirty, isValid } = formState;
  /* Form submission dependencies */

const handleSubmitForm=(item:any)=>{
console.log("item",item)
console.log('selectedFormDetails', selectedFormDetails)
}
  return (
    <>
      {/* Form Preview Dialog */}
      {
        open &&
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
              Form Preview
            </span>
            <Divider customClass={styles.dividerStyle} />
          </header>

          <section className={styles.sectionContainer}>
            <Form form={JSON.parse(selectedFormDetails.form)} onSubmit={(e:any)=>handleSubmitForm(e)}/>
          </section>
        </div>
      </div>
      }
      {/* Form Preview Dialog */}
    </>
  );
};
export default PreviewFormDialog;
