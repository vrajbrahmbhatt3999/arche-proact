import React, { FC, useEffect, useState } from "react";
import styles from "./deletePopUpAlert.module.scss";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../hooks";
import { CloseIcon } from "../../../../components/common/svg-components";
import { colors } from "../../../../constants/color";
import Divider from "../../../../components/common/divider/Divider";
import { deleteDiagnosisTreatmentPlans } from "../../../../redux/features/treatmentPlans/treatmentPlansAsyncActions";
import { requestGenerator } from "../../../../utils/payloadGenerator";

interface IDeletePopUpAlert {
  handleClose?: any;
  open?: boolean;
  selectedId?: any;
  dispatchFunction?: any;
  isDisabled?: any;
  rowId?: any;
}

const DeletePopUpAlert: FC<IDeletePopUpAlert> = ({
  isDisabled,
  handleClose,
  open,
  selectedId,
  dispatchFunction,
  rowId,
}) => {
  /* Dependency to navigate between pages */
  const navigate = useNavigate();
  /* Dependency to navigate between pages */

  /* Dependency to dispatch an action */
  const dispatch = useAppDispatch();
  /* Dependency to dispatch an action */
  const checkStatus = () => {
    let payLoad = {
      id: rowId,
      data: {
        is_active: false,
      },
    };
    dispatch(deleteDiagnosisTreatmentPlans(requestGenerator(payLoad)));
    console.log("indeletestatus....");
  };

  const handleDeleteById = () => {
    if (isDisabled === true) {
      checkStatus();
    }

    dispatch(dispatchFunction(selectedId));
    handleClose();
  };
  return (
    <>
      {/* Delete PopUp Alert Dialog */}
      {open && (
        <div className="dialog">
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
              <span className={styles.title}>Delete</span>
              <Divider customClass={styles.dividerStyle} />
            </header>

            <section className={styles.sectionContainer}>
              <span className={styles.alert}>
                Are you sure you want to Delete?
              </span>

              <div className={styles.buttonContainer}>
                <button
                  className={styles.btnStyleTwo}
                  onClick={handleDeleteById}
                >
                  Yes
                </button>
                <button className={styles.btnStyleOne} onClick={handleClose}>
                  No
                </button>
              </div>
            </section>
          </div>
        </div>
      )}
      {/* Delete PopUp Alert Dialog */}
    </>
  );
};
export default DeletePopUpAlert;
