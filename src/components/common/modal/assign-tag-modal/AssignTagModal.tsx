import { FC, useEffect, useState } from "react";
import styles from "./assignTagModal.module.scss";
import { CloseIcon } from "../../svg-components";
import { colors } from "../../../../constants/color";
import { assignTagRowData, success } from "../../../../constants/data";
import Table from "../../table/Table";
import Button from "../../button/Button";
import Divider from "../../divider/Divider";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { getAllTag } from "../../../../redux/features/patient-emr/tag/tagAsyncActions";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import { assignTagHeaderData } from "../../../../constants/table-data/assignTagPopupData";
import {
  assignTag,
  getAllAssignTag,
} from "../../../../redux/features/patient-emr/patient/patientAsyncAction";
import TableV2 from "../../table/tableV2/TableV2";
import Loader from "../../spinner/Loader";
import ToggleSwitchV2 from "../../toggle-switch/ToggleSwitchV2";
import { setTagData } from "../../../../redux/features/patient-emr/tag/tagSlice";
import { setMessage } from "../../../../redux/features/toast/toastSlice";
import { setAssignTagData } from "../../../../redux/features/patient-emr/patient/patientSlice";

interface IAssignTag {}

const AssignTagModal: FC<IAssignTag> = () => {
  const dispatch = useAppDispatch();
  const { isLoading, tagData } = useAppSelector((state) => state.tag);
  const { assignTagInfo, patientDataObjectById, assignTagInfoData } =
    useAppSelector((state) => state.patient);

  let activeTagIds = [] as any;

  // console.log("tagData>>>>>", tagData);
  // console.log("assignTagInfoData>>>>", assignTagInfoData);

  const activeTagData = assignTagInfoData?.map((item: any) => {
    if (item.assigned === true && item?._id !== undefined) {
      activeTagIds.push(item?._id);
    }
  });

  let newArr = [] as any;

  const newData = tagData?.map((item: any) => {
    let ac;
    assignTagInfoData?.map((itemN: any) => {
      // if (item.is_active === true && item?._id !== undefined) {
      //   activeTagsData.push(item);
      // }

      if (item._id === itemN._id) {
        // console.log("truuuuuu");
        newArr.push(item);
        ac = itemN?.is_active;
      }
    });
    return { ...item, is_active: ac === true ? ac : false };
    // if (item.is_active === true && item?._id !== undefined) {
    //   activeTagIds.push(item?._id);
    // }
  });

  // console.log("newArr>>>", newArr);
  // console.log("newData>>>", newData);

  // console.log("activeTagData>>>>", activeTagData);

  let activeTagsData = [] as any;

  const activeTag = assignTagInfoData?.map((item: any) => {
    if (item.is_active === true && item?._id !== undefined) {
      activeTagsData.push(item);
    }
  });

  // console.log("activeTagsData>>>", activeTagsData);

  const assignTagHeaderData: any = [
    {
      Header: "LABEL NAME",
      accessor: "label_name",
    },
    {
      Header: "LABEL ICON",
      accessor: "label_icon",
      Cell: (props: any) => {
        let imgUrl = props?.row?.original?.label_icon;
        return (
          <div style={{ width: "25px", height: "25px", margin: "auto" }}>
            <img
              src={imgUrl}
              alt="icon_img"
              style={{ width: "fitContent", height: "100%" }}
            />
          </div>
        );
      },
    },

    {
      Header: "ACTIVE/INACTIVE",
      accessor: "assigned",
      Cell: ({ row }: any) => {
        // console.log("row>>>>>", row);
        const is_active = row?.original?.assigned;

        const handleToggle = (item: any) => {
          // console.log("item>>>", item._id);
          const { _id } = item;
          if (patientDataObjectById?._id !== undefined) {
            dispatch(setAssignTagData(_id));
          } else {
            dispatch(setTagData(_id));
          }
        };

        return (
          <ToggleSwitchV2
            isToggled={is_active}
            handleToggle={() => handleToggle(row?.original)}
          />
        );
      },
    },
  ];

  // useEffect(() => {
  //   let data = {
  //     page: 1,
  //     pageSize: 10,
  //     search: "",
  //     is_active: true,
  //   };
  //   dispatch(getAllTag(requestGenerator(data)));
  // }, []);

  const handleAssignTag = () => {
    if (patientDataObjectById?._id == undefined) {
      let toastData = {
        message: "Please load patient data",
        type: success,
      };
      dispatch(setMessage(toastData));
    } else {
      let reqData = {
        patient_id: patientDataObjectById?._id,
        // patient_id: "643cd77436c4ce562a664756",
        // tag_ids: ["64410e111df343703a80bc13", "64410e531df343703a80bc18"],
        tag_ids: activeTagIds,
      };
      console.log("first", reqData?.patient_id);
      dispatch(assignTag(requestGenerator(reqData))).then((e) => {
        if (e.type === "patient/assignTag/fulfilled") {
          let data = {
            patient_id: patientDataObjectById?._id,
            // patient_id: "643cd77436c4ce562a664756",
          };
          dispatch(getAllAssignTag(requestGenerator(data)));
        }
      });
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.mainContainer}>
        <div className={styles.closeIconContainer}>
          <CloseIcon
            customClass={styles.closeIconStyle}
            fillColor={colors.green1}
          />
        </div>
        <p className={styles.title}>Assign Tags</p>
        <Divider customClass={styles.dividerStyle} />
        <div
          className={styles.tableContainer}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <TableV2
            tableHeaderData={assignTagHeaderData}
            // tableRowData={tagData}
            tableRowData={
              assignTagInfoData.length > 0 ? assignTagInfoData : tagData
            }
          />
        </div>

        <Button
          title="Save"
          customClass={styles.buttonStyle}
          handleClick={() => handleAssignTag()}
        />
      </div>
    </>
  );
};

export default AssignTagModal;
