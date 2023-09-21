import React, { FC } from 'react';
import { CloseIcon } from '../../svg-components';
import { colors } from '../../../../constants/color';
import Divider from '../../divider/Divider';
import styles from './departmentListPopup.module.scss';

interface IDepartmentList {
  handleClose?: any;
  popData?: any;
}
const DepartmentListPopup: FC<IDepartmentList> = ({ handleClose, popData }) => {
  console.log('popData', popData);

  return (
    <>
      <div className={styles.notesPopupContainer}>
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={handleClose}
        />
        <div className={styles.notesContainer}>
          <p className={styles.title}>Departments</p>
          <Divider customClass={styles.dividerStyle} />
          <div className={styles.listContainer}>
            {popData.length > 0 &&
              popData.map((item: any, index: number) => {
                return (
                  <li key={index} className={styles.deptText}>
                    {item.department_name}
                  </li>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DepartmentListPopup;
