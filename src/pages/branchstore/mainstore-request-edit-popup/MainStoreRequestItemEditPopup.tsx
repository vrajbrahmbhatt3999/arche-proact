import { FC, useState, useEffect } from "react";
import { colors } from "../../../constants/color";
import { useAppDispatch, useAppSelector } from "../../../hooks/index";
import { CloseIcon } from "../../../components/common/svg-components";
import { mainstoreRequestEditHeaderData } from "../../../constants/table-data/mainStoreRequestEditItemTableDataPopup";
import TableV2 from "../../../components/common/table/tableV2/TableV2";
import Button from "../../../components/common/button/Button";
import Loader from "../../../components/common/spinner/Loader";
import styles from "./mainStoreRequestItemEditPopup.module.scss";

interface IMainStoreRequestEditPopup {
  popData?: any;
  handleClose?: any;
  handleSubmitData?: any;
}

const MainStoreRequestItemEditPopup: FC<IMainStoreRequestEditPopup> = ({
  popData,
  handleClose,
  handleSubmitData,
}) => {
  // const dispatch = useAppDispatch();
  const { isLoading, mainStoreRequestItemsData } = useAppSelector(
    (state) => state.branchStore
  );

  // define state variables
  const [isDisableMainStoreRequestBtn, setIsDisableMainStoreRequestBtn] =
    useState(false);

  // useeffect for disable main store request button
  useEffect(() => {
    const isDisableBtn = mainStoreRequestItemsData?.some(
      (item: any) =>
        Number(item?.requested_qty) <= 0 || item?.requested_qty === undefined
    );
    setIsDisableMainStoreRequestBtn(isDisableBtn);
  }, [mainStoreRequestItemsData]);

  return (
    <>
      {isLoading && <Loader />}

      <div
        className={styles.mainStoreRequestItemEditPopupMainContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => handleClose()}
        />
        <h1 className={styles.mainStoreRequestEditModalHeading}>
          Edit Request
        </h1>
        <hr className={styles.mainStoreRequestEditModalDivider} />
        <div className={styles.mainStoreRequestEditContainer}>
          <div className={styles.mainStoreInfoContainer}>
            <div className={styles.infoContainer}>
              <p className={styles.infoLabel}>Source:</p>
              <p className={styles.infoText}>
                {" "}
                {popData?.source?.toLowerCase()}
              </p>
            </div>
            <div className={styles.infoContainer}>
              <p className={styles.infoLabel}>Store:</p>
              <p className={styles.infoText}>
                {" "}
                {popData?.destination?.toLowerCase()}
              </p>
            </div>
          </div>
          <div className={styles.tableContainer}>
            <TableV2
              tableHeaderData={mainstoreRequestEditHeaderData}
              tableRowData={mainStoreRequestItemsData}
              active={false}
            />
          </div>
        </div>
        <div className={styles.btn}>
          <Button
            title="Update"
            type="button"
            handleClick={handleSubmitData}
            disable={
              mainStoreRequestItemsData?.length === 0 ||
              isDisableMainStoreRequestBtn
            }
          />
        </div>
      </div>
    </>
  );
};

export default MainStoreRequestItemEditPopup;
