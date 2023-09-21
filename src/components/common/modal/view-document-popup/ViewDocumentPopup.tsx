import { FC } from 'react';
import styles from './viewDocumentPopup.module.scss';
import { CloseIcon } from '../../svg-components';
import { colors } from '../../../../constants/color';
import Divider from '../../divider/Divider';
import { useAppSelector } from '../../../../hooks';

interface IViewDocument {
  popData?: any;
}

const ViewDocumentPopup: FC<IViewDocument> = ({ popData }) => {
  const { insurancePlanDetail } = useAppSelector((state) => state.insurance);

  let docData = insurancePlanDetail?.attachments?.map((item: any) => {
    return {
      uri: item?.data_uri,
      type: item?.data_uri
        ?.substring(
          item?.data_uri?.indexOf(':') + 1,
          item?.data_uri?.indexOf(';')
        )
        .split('/')?.[1],
    };
  });

  return (
    <>
      <div className={styles.notesPopupContainer}>
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
        />
        <div className={styles.notesContainer}>
          <p className={styles.title}>Documents</p>
          <Divider customClass={styles.dividerStyle} />
          <div className={styles.mainContainer}>
            {docData?.length > 0 &&
              docData?.map((item: any, index: any) => {
                return item.type === 'pdf' ? (
                  <iframe
                    className={styles.documentViwerStyle}
                    src={item.uri}
                    title="document_pdf"
                    key={index}
                  />
                ) : (
                  <img
                    className={styles.imageStyle}
                    src={item.uri}
                    alt="img"
                    key={index}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewDocumentPopup;
