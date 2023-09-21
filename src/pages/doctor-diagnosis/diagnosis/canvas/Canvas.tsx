import React, { useEffect, useState } from 'react'
import { setMessage } from '../../../../redux/features/toast/toastSlice'
import { useAppDispatch } from '../../../../hooks'
import { failure } from '../../../../constants/data'

const Canvas = (props: any) => {
  const { buttonRef, onSubmit, canvasRef, contextRef, imageSrc, setImageSrc } =
    props
  // const canvasRef = useRef<any>(null);
  // const contextRef = useRef<any>(null);
  const [isDrawing, setIsDrawing] = useState(false)
  // const [imageSrc, setImageSrc] = useState<string>('')
  const dispatch = useAppDispatch()

  useEffect(() => {
    const canvas: any = canvasRef.current
    const context = canvas.getContext('2d')
    contextRef.current = context

    // Set canvas dimensions to match the background image
    canvas.width = 1050 * 2
    canvas.height = window.innerHeight * 2

    canvas.style.width = `${1050}px`
    canvas.style.height = `${window.innerHeight}px`
    canvas.style.border = '1px solid lightgray'
    canvas.style.borderRadius = '10px'
    context.fillStyle = 'white'
    context.fillRect(0, 0, canvas.width, canvas.height)

    // Draw the background image
    if (imageSrc) {
      const backgroundImage = new Image()
      backgroundImage.src = imageSrc
      backgroundImage.style.backgroundSize = 'inherit'
      backgroundImage.onload = () => {
        context.drawImage(backgroundImage, 280, 50, 500, 500)
      }
    }

    // Set line properties
    context.strokeStyle = 'black'
    context.lineCap = 'round'
    context.scale(2, 2)
    context.lineWidth = 5

    // Draw a line
    context.beginPath()
    context.moveTo(50, 50) // Starting point coordinates
    // context.lineTo(200, 200); // Ending point coordinates
    context.stroke()
  }, [imageSrc])

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    console.log('file into change', file, reader)
    reader.onload = (e: any) => {
      setImageSrc(e.target.result)
    }

    if (file) {
      reader.readAsDataURL(file)
    }
    event.target.value = ''
  }
  const DownloadImage = () => {
    const canvas: any = canvasRef.current
    // const downloadLink = document.createElement('a');
    // downloadLink.href = canvas.toDataURL('image/png',1);
    // downloadLink.download = 'canvas.png';
    // downloadLink.click();

    const isCanvasEmpty = !canvas
      .getContext('2d')
      .getImageData(0, 0, canvas.width, canvas.height)
      .data.some((channel: any) => channel !== 0)
    if (isCanvasEmpty) {
      return dispatch(
        setMessage({
          message: 'please add your scribe',
          type: failure,
        })
      )
    }
    const dataUrl = canvas.toDataURL('image/png', 1)
    onSubmit(dataUrl)
  }

  const startDrawing = ({ nativeEvent }: any) => {
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const finishDrawing = () => {
    setIsDrawing(false)
  }

  const draw = ({ nativeEvent }: any) => {
    if (!isDrawing) {
      return
    }
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }
  const clearCanvas = () => {
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    )
    setImageSrc('')
  }
  return (
    <>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => handleImageUpload(e)}
        ref={buttonRef}
      />
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onPointerDown={startDrawing}
        onPointerUp={finishDrawing}
        onPointerMove={draw}
        onTouchStart={startDrawing}
        onTouchEnd={finishDrawing}
        onTouchMove={draw}
        ref={canvasRef}
      />
      <div>
        <button style={{ margin: '33px 0px' }} onClick={DownloadImage}>
          Submit
        </button>
        <button
          style={{
            margin: '33px 10px',
            background: 'white',
            color: '#0e26a3',
            border: '1px solid #0e26a3',
          }}
          onClick={clearCanvas}
        >
          Clear All
        </button>
      </div>
      {/* <button onClick={DownloadImage}>Download</button> */}
    </>
  )
}

export default Canvas
