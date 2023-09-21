import { FC } from "react";
import { colors } from "../../../../constants/color";
import Divider from "../../../../components/common/divider/Divider";
import { CloseIcon } from "../../../../components/common/svg-components/index";
import styles from "./addresultsnotesPopup.module.scss";
import Button from "../../../../components/common/button/Button";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { useForm } from "react-hook-form";
import {
  UpdateAllAddResultData,
} from "../../../../redux/features/jobs/jobsAsyncActions";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import {
  setShowAddResultPopup,
  setShowNotes,
} from "../../../../redux/features/jobs/jobsSlice";
interface IPropsData {
  handleClose?: any;
  popData?: any;
  register?: any;
}
const AddNotesPopup: FC<IPropsData> = ({ handleClose, popData }) => {

  const { handleSubmit, register } = useForm();
  const dispatch: any = useAppDispatch();
  const { notesData } = useAppSelector(
    (state) => state.labsJob
  );

  const submitData = (item: any) => {
    const reqPayload = {
      _id: notesData?.test_id,
      components: notesData.components?.map((itemKey: any) => {
        return {
          ...itemKey,
          test_notes:
            itemKey._id === notesData.component_id
              ? item?.[`notes${notesData.component_id}`]
              : itemKey.test_notes,
        };
      }),
    };
    let testJobComponentList = {
      testJobComponentList: [reqPayload]
    };
    dispatch(
      UpdateAllAddResultData(requestGenerator(testJobComponentList))
    ).then((e: any) => {
      if (e.type === "JOB/UpdateAllAddResultData/fulfilled") {
        dispatch(setShowNotes(false));
        dispatch(setShowAddResultPopup(false));
      }
    });
  };

  return (
    <div
      className={styles.addResultsNotesPopupContainer}
      onClick={(e) => e.stopPropagation()}
    >
      <CloseIcon
        customClass={styles.closeIconStyle}
        fillColor={colors.green1}
        handleClick={() => handleClose()}
      />
      <div className={styles.addResultsNotesContainer}>
        <p className={styles.title}>Notes</p>
        <Divider customClass={styles.dividerStyle} />
        <form onSubmit={handleSubmit(submitData)}>
          <textarea
            className={styles.textContainer}
            placeholder="Please enter Notes"
            {...register(`notes${notesData.component_id}`)}
            defaultValue={notesData?.test_notes}
          />
          <div className={styles.btnContainer}>
            <Button title="Submit" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNotesPopup;
