import React, { FC, useRef } from 'react'
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from 'react-zoom-pan-pinch'
import {
  ZoomInICon,
  ZoomOutIcon,
  ResetImageIcon,
  CloseIcon,
} from '../../svg-components'
import { colors } from '../../../../constants/color'
import styles from './imageZoomInOutModal.module.scss'

interface IImageZoomInOutModal {
  handleClose: (e?: React.MouseEvent<HTMLElement>) => void
  popData: any
}

const ImageZoomInOutModal: FC<IImageZoomInOutModal> = ({
  handleClose,
  popData,
}) => {
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null)
  return (
    <>
      <div
        className={styles.imageZoomInOutModalContainer}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => {
            handleClose()
          }}
        />
        <TransformWrapper
          ref={transformComponentRef}
          initialScale={1}
          disablePadding={true}
          wheel={{ wheelDisabled: true }}
          doubleClick={{ disabled: true }}
        >
          {(utils) => (
            <React.Fragment>
              <ImageControllar {...utils} />
              <TransformComponent wrapperClass={styles.zoomImageWrapper}>
                <img
                  className={styles.zoomImageStyle}
                  src={popData}
                  alt="zoom_img"
                />
                {/* <ImageControllar {...utils} /> */}
              </TransformComponent>
            </React.Fragment>
          )}
        </TransformWrapper>
      </div>
    </>
  )
}

const ImageControllar = ({ zoomIn, zoomOut, resetTransform }: any) => (
  <div className={styles.imageControllarContainer}>
    <ZoomInICon
      customClass={styles.zoomInIconStyle}
      fillColor={colors.white1}
      handleClick={() => zoomIn()}
    />
    <ResetImageIcon
      customClass={styles.resetIconStyle}
      fillColor={colors.white1}
      handleClick={() => resetTransform()}
    />
    <ZoomOutIcon
      customClass={styles.zoomOutIconStyle}
      fillColor={colors.white1}
      handleClick={() => zoomOut()}
    />
  </div>
)

export default ImageZoomInOutModal
