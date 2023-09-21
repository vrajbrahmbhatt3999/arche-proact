import { FC, useState } from "react";
import { CloseIcon } from "../../svg-components";
import { colors } from "../../../../constants/color";
import styles from "./dianosisModal.module.scss";
import { useForm } from "react-hook-form";

interface IDiagnosisModal {
  handleClose: (e?: React.MouseEvent<HTMLElement>) => void;
  popData: any;
  heading: string;
  handleOpen: any;
  setModelOpenClose: any;
}

const DiagnosisModal: FC<IDiagnosisModal> = ({
  handleClose,
  popData,
  heading,
  handleOpen,
  setModelOpenClose,
}) => {
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore((prevState) => !prevState);
  };
  return (
    <>
      <div
        className={styles.diagnosisModalContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => {
            handleClose();
          }}
        />
        <h1 className={styles.diagnosisModalHeading}>{heading}</h1>
        <hr className={styles.diagnosisModalDivider} />
        <div className={styles.diagnosisContainer}>
          <div className={styles.diagnosisModalDateContainer}>
            <p className={styles.diagnosisModalDateTitle}>Date</p>{" "}
            <p className={styles.diagnosisModalDate}>
              {popData?.diag_apt_date}
            </p>
          </div>
          <p className={styles.diagnosisDesctriptionText}>
            {isReadMore
              ? popData?.diag_desc?.slice(0, 150)
              : popData?.diag_desc}
            {popData?.diag_desc?.length > 150 && (
              <span onClick={toggleReadMore} className={styles.readMoreStyle}>
                {isReadMore ? "...Read More" : " Read Less"}
              </span>
            )}
          </p>
          <div className={styles.scribeNotesContainer}>
            <p className={styles.scribeNotesText}>Scribe Notes</p>
            <div className={styles.scribeNotesImgConatainer}>
              {popData?.scribe_notes?.length > 0 ? (
                popData?.scribe_notes?.map(
                  (scribeNoteImg: any, index: number) => (
                    <div
                      key={index}
                      className={styles.scribeNotesimg}
                      onClick={() => handleOpen(scribeNoteImg?.path)}
                    >
                      <img
                        src={scribeNoteImg.path}
                        alt="scribe_notes_img"
                        className={styles.scribeNotesImgStyle}
                      />
                      <div className={styles.scribeNotesImgOverlayContainer}>
                        <span className={styles.scribeNotesImgPreviewText}>
                          preview
                        </span>
                      </div>
                    </div>
                  )
                )
              ) : (
                <p className={styles.scribeNotesImgNoFoundText}>
                  No Notes Available
                </p>
              )}
            </div>
          </div>
          <div className={styles.scribeImagesContainer}>
            <p className={styles.scribeImagesText}>Scribe Image</p>
            <div className={styles.scribeImagesImgContainer}>
              {popData?.scribe_images?.length > 0 ? (
                popData?.scribe_images?.map((scribeImg: any, index: number) => (
                  <div
                    key={index}
                    className={styles.scribeImage}
                    onClick={() => setModelOpenClose(scribeImg?.path)}
                  >
                    <img
                      src={scribeImg?.path}
                      alt="scribe_img"
                      className={styles.scribeImgStyle}
                    />
                    <div className={styles.scribeImgOverlayContainer}>
                      <span className={styles.scribeImgPreviewText}>
                        preview
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.scribeImgNoFoundText}>
                  No Images Available
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiagnosisModal;
