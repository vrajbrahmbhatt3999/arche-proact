import { FC } from "react";
import Divider from "../../../../components/common/divider/Divider";
import { CloseIcon } from "../../../../components/common/svg-components";
import { colors } from "../../../../constants/color";
import styles from "./addJobPopup.module.scss";


interface IComparePopupProps {
  handleClose: (e?: React.MouseEvent<HTMLElement>) => void;
  isEditing?: boolean;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddJobPopup: FC<IComparePopupProps> = ({
  handleClose,
  setIsEditing,
  isEditing,
}) => {
  
  return (
    <>
      <div
        className={styles.addJobPopupContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => {
            handleClose();
            setIsEditing && setIsEditing(false);
          }}
        />
        <div className={styles.addJobContainer}>
        <p className={styles.title}>Add Job</p>
          <Divider customClass={styles.dividerStyle} />
          <p className={styles.descriptionText}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas soluta odio molestias! Earum ad, placeat asperiores cumque quae reiciendis eveniet harum non dignissimos, provident quam veritatis unde corporis. Aut in vel nihil delectus doloribus aspernatur, cumque sint aliquam magni nobis? Explicabo fuga animi impedit debitis, accusantium magnam harum, reiciendis voluptatibus aperiam cumque rem laboriosam? Expedita mollitia  exercitationem neque. </p>
        </div>
      </div>
    </>
  );
};
export default AddJobPopup;
