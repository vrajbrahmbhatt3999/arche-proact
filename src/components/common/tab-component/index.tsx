import React from "react";
import { dataSource } from "../../../pages/appointment/datajson";

const TabComponent = ({
  data,
  children,
  initialState,
  secondaryState,
}: any) => {
  return (
    <>
      {data.map((s: any, index: number) => (
        <div style={{ display: "flex" }} key={index}>
          <p
            style={{ paddingRight: "10px" }}
            onClick={() => secondaryState(s?.label)}
          >
            {s?.label}
          </p>
          {initialState === s?.label && <div>{children}</div>}
        </div>
      ))}

      {/*   
      {tabs === "MS Request" && (
        <div>
          <p>table 2</p>
        </div>
      )} */}
    </>
  );
};

export default TabComponent;
