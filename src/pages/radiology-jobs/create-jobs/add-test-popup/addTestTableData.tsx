import styles from "./addTestPopup.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
  getProfileTestData,
  getTestData,
  setAddText,
  setTestAddText,
} from "../../../../redux/features/radiology-jobs/jobsSlice";

// Add Test Popup Table
export const addTestPopupTableHeaderData: any = [
  // {
  //   Header: "TEST PROFILE",
  //   accessor: "test_group",
  // },
  {
    Header: "TEST ID",
    accessor: "test_no",
  },

  {
    Header: "TEST NAME",
    accessor: "name",
  },
  {
    Header: "TEST PRICE",
    accessor: "sell_price",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.sell_price ? (
            <span>${props?.row?.original?.sell_price?.toLocaleString()}</span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "SELECT LIST",
    accessor: "add_to_job",
    Cell: (props: any) => {
      const { addTestText } = useAppSelector((state) => state.radiologyJobs);
      const { radiologyTestData } = useAppSelector((state) => state.radiology);
      const dispatch = useAppDispatch();
      const handleTestData = () => {
        const checkCommonIds = radiologyTestData?.find(
          (s: any) => s._id === props.row.original._id
        );
        let testData = {
          test_id: checkCommonIds?.test_no,
          test_name: checkCommonIds?.name,
          ...checkCommonIds,
        };
        dispatch(getTestData(testData));
      };

      const handleTestAdd = () => {
        dispatch(setTestAddText(props.row.original._id));
      };

      return (
        <div className={styles.addTestPopupAddToJob} onClick={handleTestAdd}>
          {!addTestText?.includes(props.row.original._id) ? (
            <span
              className={styles.addToJobAddText}
              onClick={() => handleTestData()}
            >
              Add
            </span>
          ) : (
            <span
              className={styles.addToJobAddGreenText}
              onClick={() => handleTestData()}
            >
              Added
            </span>
          )}
        </div>
      );
    },
  },
];

export const addProfileTableHeaderData: any = [
  {
    Header: "PROFILE ID",
    accessor: (row: any) => {
      return row?.profile_no ? row?.profile_no : "-";
    },
  },
  {
    Header: "PROFILE NAME",
    accessor: "name",
  },
  {
    Header: "PROFILE TEST",
    // accessor: "",
    Cell: (props: any) => {
      return (
        <>
          <span
            className={styles.view_Btn}
            onClick={() => props.onPopClose(props.row.original.radiologytest_ids)}
          >
            View
          </span>
        </>
      );
    },
  },
  {
    Header: "PROFILE PRICE",
    accessor: "total_amount",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.total_amount ? (
            <span>${props?.row?.original?.total_amount?.toLocaleString()}</span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "SELECT PROFILE",
    Cell: (props: any) => {
      const { radiologyTestProfileData } = useAppSelector(
        (state) => state.radiology
      );

      const { addText } = useAppSelector((state) => state.radiologyJobs);
      const dispatch = useAppDispatch();
      const handleTestData = () => {
        const checkCommonIds = radiologyTestProfileData?.find(
          (s: any) => s._id === props.row.original._id
        );
        let profileTestData = {
          profile_test_id: checkCommonIds?.profile_no,
          profile_test_name: checkCommonIds?.name,
          ...checkCommonIds,
        };
        dispatch(getProfileTestData(profileTestData));
      };
      
      const handleAdd = () => {
        dispatch(setAddText(props.row.original._id));
      };

      return (
        <div className={styles.addTestPopupAddToJob} onClick={handleAdd}>
          {!addText.includes(props.row.original._id) ? (
            <span
              className={styles.addToJobAddText}
              onClick={() => handleTestData()}
            >
              Add
            </span>
          ) : (
            <span
              className={styles.addToJobAddGreenText}
              onClick={() => handleTestData()}
            >
              Added
            </span>
          )}
        </div>
      );
    },
  },
];

