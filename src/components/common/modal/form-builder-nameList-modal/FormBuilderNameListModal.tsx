import React, { FC, useEffect, useState } from "react";
import styles from "./formBuilderNameListModal.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { DropDownIcon, FormIcon } from "../../svg-components";
import { getAllCreateNewForms } from "../../../../redux/features/create-new-form/createNewFormAsynActions";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import { useNavigate } from "react-router-dom";
import { saveDataForFormBuilderHeader } from "../../../../redux/features/create-new-form/createNewFormSlice";
import { colors } from "../../../../constants/color";
import { login } from "../../../../redux/features/login/loginCrud";

interface IFormBuilderNameListModal {
  handleOpen: any;
  formBuilderRef: any;
  handleClose: any;
  selectField: any;
  handleInsurancePlan?: any;
}

const FormBuilderNameListModal: FC<IFormBuilderNameListModal> = ({
  formBuilderRef,
  handleOpen,
  handleClose,
  selectField,
  handleInsurancePlan,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { filteredFormData } = useAppSelector((state) => state.createNewForm);
  const { userData } = useAppSelector((state) => state.login);

  // console.log("filteredFormData", filteredFormData);
  // const formData: any[] = [];
  useEffect(() => {
    let requestData = {
      search: "",
      page: 1,
      pageSize: 100,
    };
    dispatch(getAllCreateNewForms(requestGenerator(requestData)));
  }, []);

  const handlePreviewFormDialogOpen = (item: any) => {
    selectField(item);
    handleClose(false);
    handleOpen(true);
    dispatch(saveDataForFormBuilderHeader({ state: { id: item?._id } }));
  };
  return (
    <>
      {/* {(userData?.role === 'DOCTOR') && ( */}
      <>
        <div className={styles.mainContainer} ref={formBuilderRef}>
          <div className={styles.container}>
            {userData?.role === "DOCTOR" &&
              filteredFormData?.length > 0 &&
              filteredFormData?.map((item: any, index: any) => {
                return (
                  <React.Fragment key={index}>
                    <div className={styles.formContainer}>
                      <FormIcon customClass={styles.iconStyle} />
                      <p
                        className={styles.formNameTextStyle}
                        onClick={() => handlePreviewFormDialogOpen(item)}
                      >
                        {item?.name}
                      </p>
                    </div>
                  </React.Fragment>
                );
              })}
            {userData?.role === "RECEPTIONIST" && (
              <>
                <div className={styles.insurancePlan}>
                  <div
                    className={styles.insurance}
                    onClick={handleInsurancePlan}
                  >
                    <FormIcon customClass={styles.iconStyle} />
                    <p className={styles.formNameTextStyle}>Insurance Plans</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </>
      {/* )} */}
    </>
  );
};

export default FormBuilderNameListModal;
