import { FC } from "react";
import styles from "./configurationEditPopup.module.scss";
import { CloseIcon } from "../../svg-components";
import { colors } from "../../../../constants/color";
import Divider from "../../divider/Divider";
import TableV2 from "../../table/tableV2/TableV2";
import {
  // configurationEditHeaderData,
  configurationEditTable,
} from "../../../../constants/table-data/configurationEditPopupData";
import Button from "../../button/Button";

interface IConfigureEditPopup {
  handleClose?: any;
  handleOpen?: any;
  handleChildClick?: any;
}

const ConfigurationEditPopup: FC<IConfigureEditPopup> = ({
  handleClose,
  handleOpen,
  handleChildClick,
}) => {
  const configurationEditHeaderData: any = [
    {
      Header: "TEST PROFILE",
      accessor: "g",
    },
    {
      Header: "TEST NAME",
      accessor: "f",
    },
    {
      Header: "UNIT",
      Cell: ({ row }: any) => {
        return (
          <>
            <select
              className={styles.selectOption}
              // value={row?.original?.billable === true ? "yes" : "no"}
            >
              <option value="g/fl">g/fl</option>
              <option value="d/fl">d/fl</option>
              <option value="mmHg">mmHg</option>
              <option value="mmol/L">mmol/L</option>
              <option value="none">none</option>
            </select>
          </>
        );
      },
    },
    {
      Header: "COMPONENT",
      accessor: "rf",
    },
    {
      Header: "REMARKS",
      Cell: ({}) => {
        return (
          <p className={styles.blueLinkText} onClick={handleOpen}>
            View
          </p>
        );
      },
    },
    {
      Header: "DETAILS",
      Cell: (props: any) => {
        return (
          <p className={styles.blueLinkText} onClick={handleChildClick}>
            More Details
          </p>
        );
      },
    },
  ];

  return (
    <>
      <div
        className={styles.notesPopupContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => handleClose()}
        />
        <div className={styles.notesContainer}>
          <p className={styles.title}>Configuration Edit</p>
          <Divider customClass={styles.dividerStyle} />
          <TableV2
            tableHeaderData={configurationEditHeaderData}
            tableRowData={configurationEditTable}
            active={false}
            handleClick={handleOpen}
            setModelOpenClose={handleChildClick}
          />
          <div className={styles.btnContainer}>
            <Button title="Save" customClass={styles.saveBtn} />
            <Button title="Reset" customClass={styles.resetBtn} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfigurationEditPopup;
