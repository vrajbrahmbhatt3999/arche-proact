import { FC } from "react";
import { colors } from "../../../../constants/color";
import Divider from "../../../../components/common/divider/Divider";
import { CloseIcon } from "../../../../components/common/svg-components/index";
import styles from "./addresultsnotesPopup.module.scss";
interface IPropsData {
  handleClose?: any;
}
const AddResultsNotesPopup: FC<IPropsData> = ({ handleClose }) => {
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
          <p className={styles.title}>Result Notes</p>
          <Divider customClass={styles.dividerStyle} />
          <div className={styles.addResultsNotesInfo}>
          <p className={styles.descriptionText}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas soluta odio molestias! Earum ad, placeat asperiores cumque quae reiciendis eveniet harum non dignissimos, provident quam veritatis unde corporis. Aut in vel nihil delectus doloribus aspernatur, cumque sint aliquam magni nobis? Explicabo fuga animi impedit debitis, accusantium magnam harum, reiciendis voluptatibus aperiam cumque rem laboriosam? Expedita mollitia hic consequatur iure excepturi praesentium possimus incidunt voluptatum? Eos corporis cumque labore esse minus facere dolorem quae dolores, omnis aperiam, hic impedit, a optio dicta sequi nesciunt dolore adipisci. Excepturi cumque non, reiciendis ratione obcaecati dolor. Nisi voluptatem, corporis tempora rerum quae exercitationem neque. </p>
          </div>
        </div>
      </div>
  );
};

export default AddResultsNotesPopup;
