import React, { FC } from 'react';
import styles from "./dropdownwithicon.module.scss"

interface IDropdownicon {
  data?: any,
  onChange?: any
}

const DropdownWithIcon: FC<IDropdownicon> = ({ data, onChange }) => {
  return (
    <div className={styles.dropdownMainContainer}>
      <select className={styles.dropdownSelect} onChange={(e) => onChange(e.target.value)}>
        {data.map((item: any) => (
          <option key={item.value} value={item.value}>
            <div className={styles.icon}>
              {item.name} {item.icon}
            </div>
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownWithIcon;
