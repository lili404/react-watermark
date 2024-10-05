import React, {useEffect, useState, useRef} from 'react';
import styles from './watermarkEditor.module.scss';
import {Flex} from 'antd';
import Upload from '../upload';
import Panel from '../panel';

const WatermarkEditor = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [imageType, setImageType] = useState('');

  const [config, setConfig] = useState({
    content: 'awenko',
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 32,
    rotate: -30,
    gap: [130, 150],
    translate: [0, 0],
  });

  const {content, color, fontSize, rotate, gap, translate} = config;

  const imageCanvasRef = useRef(null);
  const overlayCanvasRef = useRef(null);

  useEffect(() => {
    const imageCanvas = imageCanvasRef.current;
    const imageContext = imageCanvas.getContext('2d');

    const overlayCanvas = overlayCanvasRef.current;
    const overlayContext = overlayCanvas.getContext('2d');

    const image = new Image();
    image.src = uploadedImage;

    image.onload = () => {
      imageCanvas.width = overlayCanvas.width = image.naturalWidth;
      imageCanvas.height = overlayCanvas.height = image.naturalHeight;

      imageContext.drawImage(
        image,
        0,
        0,
        imageCanvas.width,
        imageCanvas.height
      );

      overlayContext.font = `${config.fontSize}px Arial`;
      overlayContext.fillStyle = config.color;
      const [gapX, gapY] = gap;
      const [translateX, translateY] = translate;

      for (let x = -200; x < overlayCanvas.width + 200; x += gapX) {
        for (let y = -200; y < overlayCanvas.height + 200; y += gapY) {
          overlayContext.save();
          overlayContext.translate(x + translateX, y + translateY);
          overlayContext.rotate((config.rotate * Math.PI) / 180);
          overlayContext.fillText(config.content, 0, 0);
          overlayContext.restore();
        }
      }
    };
  }, [uploadedImage, config]);

  return (
    <Flex className={styles.wrapper} vertical align="center" gap="large">
      <Upload
        setUploadedImage={setUploadedImage}
        setImageName={setImageName}
        setImageType={setImageType}
      />
      <Flex className={styles.editorWrapper} justify="center" gap="large">
        <div className={styles.previewWrapper}>
          <canvas ref={imageCanvasRef} className={styles.imageCanvas} />
          <canvas ref={overlayCanvasRef} className={styles.overlayCanvas} />
        </div>
        {uploadedImage && (
          <Panel
            config={config}
            setConfig={setConfig}
            imageCanvasRef={imageCanvasRef}
            overlayCanvasRef={overlayCanvasRef}
            imageName={imageName}
            imageType={imageType}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default WatermarkEditor;
