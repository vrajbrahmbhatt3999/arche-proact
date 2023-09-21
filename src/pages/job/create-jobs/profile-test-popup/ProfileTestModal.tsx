import { FC } from "react";
import TableV2 from "../../../../components/common/table/tableV2/TableV2";
interface IProfileTestModal {
  popData: any;
  headerData: any;
}

const ProfileTestModal: FC<IProfileTestModal> = ({ popData, headerData }) => {
  return (
    <div style={{ marginTop: "25px", height: "200px", overflow: "auto" }}>
      <TableV2
        tableHeaderData={headerData}
        tableRowData={popData}
        active={false}
      />
    </div>
  );
};

export default ProfileTestModal;
