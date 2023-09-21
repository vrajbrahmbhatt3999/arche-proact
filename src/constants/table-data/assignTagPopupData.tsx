import { useState } from "react";
import ToggleSwitchV2 from "../../components/common/toggle-switch/ToggleSwitchV2";
import { useAppDispatch, useAppSelector } from "../../hooks";

export const assignTagHeaderData: any = [
  {
    Header: "LABEL NAME",
    accessor: "label_name",
  },
  {
    Header: "LABEL ICON",
    accessor: "label_icon",
    Cell: (props: any) => {
      let imgUrl = props?.row?.original?.label_icon;
      //   console.log("props>>>>", imgUrl);
      return (
        <div style={{ width: "50px", height: "50px", margin: "auto" }}>
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
    accessor: "is_active",
    Cell: (props: any) => {
      const is_active = props?.rows;
      console.log("row", is_active);
      const { tagData } = useAppSelector((state) => state.tag);
      const [toggle, setToggle] = useState(is_active);

      console.log("toggle", toggle);

      tagData?.tagData?.length > 0 &&
        tagData.map((item: any) => {
          return;
          {
            item.is_active = toggle;
          }
        });

      console.log("tagData", tagData);
      //   const handleToggle = (item: any) => {
      //     console.log("item", item);
      //     // is_active = !item?.origin?.is_active;
      //     setToggle(!item?.origin?.is_active);
      //   };
      return (
        // <>
        //   hiii
        //   {tagData &&
        //     tagData.length > 0 &&
        //     tagData.map((item: any) => {
        //       return (
        //         <ToggleSwitchV2
        //           isToggled={item?.original?.is_active}
        //           handleToggle={() => handleToggle(props?.original?.is_active)}
        //         />
        //       );
        //     })}
        // </>
        <ToggleSwitchV2
          isToggled={toggle}
          handleToggle={() => setToggle(!toggle)}
        />
      );
    },
  },
];
