import { FC } from "react";
import { CloseIcon } from "../../svg-components";
import Divider from "../../divider/Divider";
import { colors } from "../../../../constants/color";
import styles from "./testListPopup.module.scss";
import TableV2 from "../../table/tableV2/TableV2";

interface ITestList {
  handleClose?: any;
  popData?: any;
}

const TestListPopup: FC<ITestList> = ({ handleClose, popData }) => {
  const testListHeaderData: any = [
    {
      Header: "TEST ID",
      accessor: "test_no",
    },
    {
      Header: "TEST NAME",
      accessor: "name",
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
          <p className={styles.title}>Profile Tests</p>
          <Divider customClass={styles.dividerStyle} />
          <div className={styles.titleContainer}>
            <p className={styles.profileText}>Profile Name:</p>
            <p className={styles.profileName}>{popData?.name}</p>
          </div>
          <div className={styles.table}>
            <TableV2
              tableHeaderData={testListHeaderData}
              tableRowData={popData?.labtest_ids || popData?.radiologytest_ids
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TestListPopup;
