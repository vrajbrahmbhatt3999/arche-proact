import styles from "./addTestPopup.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
  getProfileTestData,
  getTestData,
  setAddText,
  setTestAddText,
} from "../../../../redux/features/jobs/jobsSlice";

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
      // const [addText, setAddText] = useState(true);

      const { addTestText } = useAppSelector((state) => state.labsJob)

      const { labTestData } = useAppSelector((state) => state.lab);
      const dispatch = useAppDispatch();
      const handleTestData = () => {
        const checkCommonIds = labTestData?.find(
          (s: any) => s._id === props.row.original._id
        );
        let testData = {
          test_id: checkCommonIds?.test_no,
          test_name: checkCommonIds?.name,
          ...checkCommonIds
        }
        dispatch(getTestData(testData));
      };

      const handleTestAdd = () => {
        dispatch(setTestAddText(props.row.original._id))
      }

      return (
        <div
          className={styles.addTestPopupAddToJob}
          onClick={handleTestAdd}
        >
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
      console.log(props.row.original, 'props')
      return (
        <>
          <span
            className={styles.view_Btn}
            onClick={() => props.onPopClose(props.row.original.labtest_ids)}
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
    accessor: "add_to_job",
    Cell: (props: any) => {
      // const [addText, setAddText] = useState(true);
      const { testProfileData } = useAppSelector((state) => state.lab);

      const { addText } = useAppSelector((state) => state.labsJob)

      // const 
      const dispatch = useAppDispatch();

      const handleTestData = () => {
        const checkCommonIds = testProfileData?.find(
          (s: any) => s._id === props.row.original._id
        );
        let profileTestData = {
          profile_test_id: checkCommonIds?.profile_no,
          profile_test_name: checkCommonIds?.name,
          ...checkCommonIds
        }
        dispatch(getProfileTestData(profileTestData));
      };

      // const deleteTestData = () => {
      //   dispatch(removeProfileTestData({ id: props.row.original._id }));
      // };

      const handleAdd = () => {
        dispatch(setAddText(props.row.original._id))
      }

      return (
        <div
          className={styles.addTestPopupAddToJob}
          onClick={handleAdd}
        >
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

//   {
//     test_id: 1,
//     test_group: "Lipid Profile",
//     test_name:[ "WBC"],
//     price: 56,
//     add_to_job: "Add",
//   },
//   {
//     test_id: 2,
//     test_group: "X-RAY",
//     test_name:[ "RBC"],
//     price: 50,
//     add_to_job: "Add",
//   },
//   {
//     test_id: 3,
//     test_group: "",
//     test_name: ["Hb"],
//     price: 21,
//     add_to_job: "Add",
//   },
//   {
//     test_id: 4,
//     test_group: "-",
//     test_name: ["X-ray"],
//     price: 36,
//     add_to_job: "Add",
//   },
// ];
