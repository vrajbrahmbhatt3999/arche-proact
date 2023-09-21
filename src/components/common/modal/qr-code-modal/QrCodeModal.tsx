import { FC } from "react";
import ToolTip from "../../../common/toolTip/ToolTip";
import { CloseIcon, QrcodeImgDot, CopyIcon } from "../../svg-components";
import { colors } from "../../../../constants/color";
import styles from "./QrCodeModal.module.scss";
import { useAppSelector } from "../../../../hooks";
import { hanleCopy } from "../../../../utils/utils";
interface IQrcodeModalProps {
  heading?: string;
  message?: string;
  handleClose?: (e?: React.MouseEvent<HTMLElement>) => void;
  popData?: string | any;
}

const QrCodeModal: FC<IQrcodeModalProps> = ({
  heading,
  message,
  handleClose,
  popData,
}) => {
  const { userData } = useAppSelector((state) => state.login);
  const { toolTipMessage } = useAppSelector((state) => state.toast);
  // console.log("userDatauserDatauserDatauserData :>> ", userData);
  const mcInfoText = `{"mc_id":"${userData.mc_id}","mc_name":"${userData.mc_name}"}`;
  return (
    <div
      className={styles.qrcodeModalContainer}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <CloseIcon
        customClass={styles.closeIconStyle}
        fillColor={colors.green1}
        handleClick={() => {
          handleClose && handleClose();
        }}
      />
      <h1 className={styles.qrcodeModalHeading}>Get QR code</h1>
      <hr className={styles.descriptionDivider} />

      <div className={styles.qrcodeDescriptionMain}>
        <div className={styles.qrcodeDot}>
          <QrcodeImgDot />
        </div>
        <div className={styles.qrcodeText}>
          <p>Copy Below Text</p>
        </div>
      </div>

      <div className={styles.qrcodeDescriptionMain}>
        {/* <div className={styles.qrcodeDot}>
          <QrcodeImgDot />
        </div> */}
        <div className={styles.qrcodeTextCopy}>
          <p className={styles.linkTag}>{mcInfoText}</p>
          <CopyIcon
            fillColor={colors.grey2}
            handleClick={() => {
              hanleCopy(mcInfoText, "Copied!");
            }}
            width={18}
            height={18}
          />
          {toolTipMessage && <ToolTip customClass={styles.qrCodeCopyToolTip} />}
        </div>
      </div>

      <div className={styles.qrcodeDescriptionMain}>
        <div className={styles.qrcodeDot}>
          <QrcodeImgDot />
        </div>
        <div className={styles.qrcodeText}>
          <p>
            Select any online tool to generate QR code using the above data. For
            instance- Enter this online tool URL for your reference-{" "}
            <a
              href="https://www.the-qrcode-generator.com"
              target="_blank"
              style={{ textDecoration: "underline" }}
            >
              https://www.the-qrcode-generator.com
            </a>{" "}
            The application is QR Code Generator. The QR Code Generator page
            appears.
          </p>
        </div>
      </div>

      <div className={styles.qrcodeDescriptionMain}>
        <div className={styles.qrcodeDot}>
          <QrcodeImgDot />
        </div>
        <div className={styles.qrcodeText}>
          <p>Click FREE TEXT.</p>
        </div>
      </div>

      <div className={styles.qrcodeDescriptionMain}>
        <div className={styles.qrcodeDot}>
          <QrcodeImgDot />
        </div>
        <div className={styles.qrcodeText}>
          <p>
            Enter or copy and paste the text to share here i.e
            <span className={styles.linkTag}>
              {`{"mc_id":"${userData.mc_id}","mc_name":"${userData.mc_name}"}`}
            </span>
          </p>
        </div>
      </div>

      <div className={styles.qrcodeDescriptionMain}>
        <div className={styles.qrcodeDot}>
          <QrcodeImgDot />
        </div>
        <div className={styles.qrcodeText}>
          <p>
            The tool will immediately reflect the static QR Code on the right
            side.
          </p>
        </div>
      </div>

      <div className={styles.qrcodeDescriptionMain}>
        <div className={styles.qrcodeDot}>
          <QrcodeImgDot />
        </div>
        <div className={styles.qrcodeText}>
          <p>
            Click the Download QR Code to download the QR Code. The Download QR
            Code popup appears.
          </p>
        </div>
      </div>

      <div className={styles.qrcodeDescriptionMain}>
        <div className={styles.qrcodeDot}>
          <QrcodeImgDot />
        </div>
        <div className={styles.qrcodeText}>
          <p>Enter the filename.</p>
        </div>
      </div>

      <div className={styles.qrcodeDescriptionMain}>
        <div className={styles.qrcodeDot}>
          <QrcodeImgDot />
        </div>
        <div className={styles.qrcodeText}>
          <p>Select the Image Format as PNG or SVG.</p>
        </div>
      </div>

      <div className={styles.qrcodeDescriptionMain}>
        <div className={styles.qrcodeDot}>
          <QrcodeImgDot />
        </div>
        <div className={styles.qrcodeText}>
          <p>Select the desired size of the image.</p>
        </div>
      </div>

      <div className={styles.qrcodeDescriptionMain}>
        <div className={styles.qrcodeDot}>
          <QrcodeImgDot />
        </div>
        <div className={styles.qrcodeText}>
          <p>
            Click DOWNLOAD. The QR Code image will be downloaded in your PC.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QrCodeModal;
