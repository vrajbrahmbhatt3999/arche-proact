import Button from "../../../../components/common/button/Button";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { updatePoFormData } from "../../../../redux/features/inventory-request/inventoryRequestSlice";
import styles from "./style.module.scss";

const AddPoNotes = (props: any) => {
  const { objId, closeModal } = props;
  const { poFormData } = useAppSelector((state) => state.inventoryRequest);
  const dispatch = useAppDispatch();
  const addNotes = (e: any) => {
    const value = e.target.value;
    let data = poFormData?.map((s: any) => {
      if (s._id === objId) {
        return {
          ...s,
          poNotes: value,
        };
      } else {
        return s;
      }
    });
    dispatch(updatePoFormData(data));
  };

  const findNotes = poFormData?.find((s: any) => s._id ===  objId);

  return (
    <div className={styles.addNotesContainer}>
      <textarea onChange={addNotes} value={findNotes?.poNotes} />
      <Button title="Add Notes" handleClick={closeModal} />
    </div>
  );
};

export default AddPoNotes;
