import ReactDOM from "react-dom";
import { FC, ReactNode } from "react";
import { CloseIcon } from "../svg-components";
import { colors } from "../../../constants/color";
import styles from "./styles.module.scss";

interface IModal {
  showModal: boolean;
  closeModal: (e: React.MouseEvent<Element>) => any;
  children: ReactNode;
  title?: string;
  customModalClass?: string;
  width?: string;
  height?: string;
  closeIconClassName?: string;
  zIndex?: string;
  overlayzIndex?: string;
}

export const CustomModal: FC<IModal> = (props) => {
  const {
    showModal,
    closeModal,
    title,
    customModalClass,
    width,
    height,
    closeIconClassName,
    zIndex,
    overlayzIndex,
    children,
  } = props;

  return ReactDOM.createPortal(
    <>
      {showModal && (
        <>
          <section
            className={styles.modalOverlay}
            style={{ zIndex: `${overlayzIndex}` }}
            onClick={(e) => closeModal(e)}
          />
          <section
            className={[styles.modalWrapper, customModalClass]?.join(" ")}
            style={{
              width: `${width}`,
              height: `${height}`,
              zIndex: `${zIndex}`,
            }}
          >
            <CloseIcon
              customClass={[styles.closeModal, closeIconClassName]?.join(" ")}
              fillColor={colors.green1}
              handleClick={(e) => closeModal && closeModal(e)}
            />
            {!!title?.length && (
              <div className={styles.titleContainer}>
                <h2 className={styles.addTestHeading}>{title}</h2>
                <span className={styles.textUnderline} />
              </div>
            )}
            {children}
          </section>
        </>
      )}
    </>,
    document.querySelector("#modal-portal") as any
  );
};
