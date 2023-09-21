import { FC, useState } from "react";
import PatientActivityLogModal from "./patient-activity-log-modal/PatientActivityLogModal";
import Popup from "../../components/common/popup/Popup";
import Button from "../../components/common/button/Button";
interface IPatientActivityLog {}

const PatientActivityLog: FC<IPatientActivityLog> = (props) => {
  // Define state variables
  const [showPatientActivityLog, setShowPatientActivityLog] =
    useState<boolean>(false);

  const handlePatientActivityModal = () => {
   
    setShowPatientActivityLog((prevState) => !prevState);
  };

  return (
    <div>
      {showPatientActivityLog && (
        <Popup
          Children={PatientActivityLogModal}
          handleClose={handlePatientActivityModal}
        />
      )}
      <Button
        title={"Patient Activity"}
        type="button"
        handleClick={handlePatientActivityModal}
      />
    </div>
  );
};

export default PatientActivityLog;
