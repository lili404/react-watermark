import React, {useEffect, useState, useRef} from 'react';
import styles from './watermarkEditor.module.scss';
import {Flex} from 'antd';
import Upload from '../upload';
import Panel from '../panel';

const WatermarkEditor = () => {
  const presetWatermarks = ['floria.png', 'ksu.png'];

  const [baseImage, setBaseImage] = useState(null);
  const [imageInfo, setImageInfo] = useState({name: 'result', type: 'png'});

  const imageCanvasRef = useRef(null);
  const overlayCanvasRef = useRef(null);

  const [selectedWatermark, setSelectedWatermark] = useState(
    presetWatermarks[0]
  );
  const [selectedPosition, setSelectedPosition] = useState('tl');
  const [watermarkScale, setWatermarkScale] = useState(1);
  const [watermarkMargin, setWatermarkMargin] = useState(0);

  useEffect(() => {
    if (!baseImage) return;

    const imageCanvas = imageCanvasRef.current;
    const imageContext = imageCanvas.getContext('2d');

    const overlayCanvas = overlayCanvasRef.current;
    const overlayContext = overlayCanvas.getContext('2d');

    const image = new Image();
    image.src = baseImage;

    image.onload = () => {
      imageCanvas.width = image.naturalWidth;
      imageCanvas.height = image.naturalHeight;

      imageContext.drawImage(
        image,
        0,
        0,
        imageCanvas.width,
        imageCanvas.height
      );
    };
  }, [baseImage]);

  useEffect(() => {
    if (!baseImage) return;

    const overlayCanvas = overlayCanvasRef.current;
    const overlayContext = overlayCanvas.getContext('2d');

    const watermark = new Image();
    watermark.src = selectedWatermark;

    watermark.onload = () => {
      overlayCanvas.width = imageCanvasRef.current.width;
      overlayCanvas.height = imageCanvasRef.current.height;

      const width = watermark.naturalWidth * watermarkScale;
      const height = watermark.naturalHeight * watermarkScale;

      const positions = {
        tl: [watermarkMargin, watermarkMargin],
        tr: [overlayCanvas.width - width - watermarkMargin, watermarkMargin],
        bl: [watermarkMargin, overlayCanvas.height - height - watermarkMargin],
        br: [
          overlayCanvas.width - width - watermarkMargin,
          overlayCanvas.height - height - watermarkMargin,
        ],
      };
      const [x, y] = positions[selectedPosition];
      overlayContext.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
      overlayContext.drawImage(watermark, x, y, width, height);
    };
  }, [
    baseImage,
    selectedPosition,
    selectedWatermark,
    watermarkScale,
    watermarkMargin,
  ]);

  return (
    <Flex className={styles.wrapper} vertical align="center" gap="large">
      <Upload setUploadedImage={setBaseImage} setImageInfo={setImageInfo} />
      <Flex className={styles.editorWrapper} justify="center" gap="large">
        <div className={styles.previewWrapper}>
          <canvas ref={imageCanvasRef} className={styles.imageCanvas} />
          <canvas ref={overlayCanvasRef} className={styles.overlayCanvas} />
        </div>
        {baseImage && (
          <Panel
            imageCanvasRef={imageCanvasRef}
            overlayCanvasRef={overlayCanvasRef}
            imageName={imageInfo.name}
            imageType={imageInfo.type}
            setSelectedWatermark={setSelectedWatermark}
            setSelectedPosition={setSelectedPosition}
            setWatermarkScale={setWatermarkScale}
            setWatermarkMargin={setWatermarkMargin}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default WatermarkEditor;
