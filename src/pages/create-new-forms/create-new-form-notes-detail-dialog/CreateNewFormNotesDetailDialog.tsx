import React, { FC, useEffect, useState } from "react";
import styles from "./createNewFormNotesDetailDialog.module.scss";
import { CloseIcon, DropDownArrowIcon, DropDownIcon } from "../../../components/common/svg-components";
import { colors } from "../../../constants/color";
import Divider from "../../../components/common/divider/Divider";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/index";

interface ICreateNewFormAddPopUp {
  handleClose?: any;
  open:boolean;
  noteDetails:string
}

const CreateNewFormNotesDetailDialog: FC<ICreateNewFormAddPopUp> = ({ handleClose, open, noteDetails }) => {

  /* Dependency to navigate between pages */
  const navigate = useNavigate()
  /* Dependency to navigate between pages */

  /* Dependency to dispatch an action */
  const dispatch = useAppDispatch()
  /* Dependency to dispatch an action */

  return (
    <>
    {/* Create New Form Dialog */}
    {
      open &&
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
            <span className={styles.title}>Notes</span>
            <Divider customClass={styles.dividerStyle} />
          </header>

            <section className={styles.sectionContainer}>
            {noteDetails}
            </section>
        </div>
      </div>
    }
      {/* Create New Form Dialog */}
    </>
  );
};
export default CreateNewFormNotesDetailDialog;
