import moment from "moment";
import styles from "./viewAllImagesTable.module.scss";
import { CheckIcon, UncheckIcon } from "../../components/common/svg-components";
import { colors } from "../color";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  setPatientHistoryImagesData,
  setSelectedImagesData,
} from "../../redux/features/patient-history/patientHistorySlice";
import { setMessage } from "../../redux/features/toast/toastSlice";
import { failure } from "../data";
import { checkSameImgCategory } from "../../utils/utils";

export const viewAllImagesHeaderData: any = [
  {
    Header: "DATE",
    // disableSortBy: true,
    accessor: (row: any) => {
      return moment(row?.date).format("DD-MMM-YYYY") ?? "-";
    },
  },
  {
    Header: "IMAGE CATEGORY",
    accessor: (row: any) => {
      // console.log("row", row);s
      return row?.diag?.img_category;
    },
    // disableSortBy: true,
  },
  {
    Header: "IMAGE NAME",
    accessor: (row: any) => {
      // console.log("row", row);
      return row?.diag?.img_name;
    },
    // disableSortBy: true,
  },
  {
    Header: "VIEW",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.diag?.img_id ? (
            <span
              className={styles.viewPopupLink}
              onClick={() => {
                props?.onRowClick(props?.row?.original);
              }}
            >
              View
            </span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "SELECT",
    Cell: (props: any) => {
      const { patientHistoryAttachments, selectedDocForCompare } =
        useAppSelector((state) => state.patientHistory);
      // console.log("selectedDocForCompare", selectedDocForCompare);
      const dispatch = useAppDispatch();
      const handleImageSelection = (imageItem: any) => {
        
        let tempArr = patientHistoryAttachments?.map((item: any) => {
          if (imageItem?.diag?.img_id === item?.diag?.img_id) {
            return { ...item, status: !item?.status };
          } else {
            return item;
          }
        });
        console.log("tempArr", tempArr);
        console.log('temp array after selettion,', tempArr, imageItem)
        const selectedDocs = tempArr?.filter((item: any) => item?.status);
        // console.log("selectedDocs", selectedDocs);
        
        if (selectedDocs?.length > 3) {
          dispatch(
            setMessage({
              message: "Maximum Image selection upto 3",
              type: failure,
            })
          );
        } else {
          dispatch(setPatientHistoryImagesData(tempArr));
          dispatch(setSelectedImagesData(selectedDocs));
        }
        {
          // dispatch(
          //   setMessage({
          //     message: 'Please select same category images',
          //     type: failure,
          //   })
          // )
        }
      };
      let isActive = selectedDocForCompare?.find(
        (item: any) => item?.diag?.img_id === props?.row?.original?.diag?.img_id
      );
      console.log("isActive", isActive);
      return (
        <>
          {props?.row?.original?.diag?.img_id ? (
            isActive?.status ? (
              <CheckIcon
                fillColor={colors.green1}
                handleClick={() => handleImageSelection(props?.row?.original)}
              />
            ) : (
              <UncheckIcon
                fillColor={colors.grey1}
                handleClick={() => handleImageSelection(props?.row?.original)}
              />
            )
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "NOTES",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.diag?.img_id ? (
            <span
              className={styles.viewPopupLink}
              onClick={() => {
                props?.onClick(props?.row?.original);
              }}
            >
              View
            </span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
];
