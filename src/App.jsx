import React, {useEffect, useState, useRef} from 'react';
import {Flex} from 'antd';
import Upload from './ui/components/upload';
import Panel from './ui/components/panel';
import Preview from './ui/components/preview';

const App = () => {
  const [baseImage, setBaseImage] = useState(null);
  const [imageInfo, setImageInfo] = useState({name: 'result', type: 'png'});

  const imageCanvasRef = useRef(null);
  const overlayCanvasRef = useRef(null);

  const [watermarkSettings, setWatermarkSettings] = useState({
    watermark: null,
    position: 'tl',
    scale: 1,
    margin: 20,
  });

  useEffect(() => {
    if (!baseImage) return;

    const imageCanvas = imageCanvasRef.current;
    const imageContext = imageCanvas.getContext('2d');

    const image = new Image();
    image.src = baseImage;

    image.onload = () => {
      imageCanvas.width = image.naturalWidth;
      imageCanvas.height = image.naturalHeight;

      imageContext.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
      imageContext.drawImage(
        image,
        0,
        0,
        imageCanvas.width,
        imageCanvas.height
      );

      console.log('Image:', imageCanvas.width, imageCanvas.height);
      rerenderOverlay();
    };
  }, [baseImage]);

  useEffect(() => {
    rerenderOverlay();
  }, [watermarkSettings]);

  const rerenderOverlay = () => {
    if (!baseImage) return;

    const overlayCanvas = overlayCanvasRef.current;
    const overlayContext = overlayCanvas.getContext('2d');

    const watermark = new Image();
    watermark.src = watermarkSettings.watermark;

    watermark.onload = () => {
      overlayCanvas.width = imageCanvasRef.current.width;
      overlayCanvas.height = imageCanvasRef.current.height;
      console.log('Canvas:', overlayCanvas.width, overlayCanvas.height);

      // const width = watermark.naturalWidth * watermarkSettings.scale;
      // const height = watermark.naturalHeight * watermarkSettings.scale;

      const watermarkAspectRatio =
        watermark.naturalWidth / watermark.naturalHeight;

      const maxBaseDimensionSmall =
        Math.max(overlayCanvas.width, overlayCanvas.height) / 6;

      let width, height;
      if (overlayCanvas.width >= overlayCanvas.height) {
        width = maxBaseDimensionSmall * watermarkSettings.scale;
        height = width / watermarkAspectRatio;
      } else {
        height = maxBaseDimensionSmall * watermarkSettings.scale;
        width = height / watermarkAspectRatio;
      }

      const margin = (watermarkSettings.margin * maxBaseDimensionSmall) / 100;

      const positions = {
        tl: [margin, margin],
        tr: [overlayCanvas.width - width - margin, margin],
        bl: [margin, overlayCanvas.height - height - margin],
        br: [
          overlayCanvas.width - width - margin,
          overlayCanvas.height - height - margin,
        ],
      };
      const [x, y] = positions[watermarkSettings.position];

      overlayContext.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
      overlayContext.drawImage(watermark, x, y, width, height);
    };
  };

  return (
    <Flex vertical align="center" gap="large">
      <Upload setUploadedImage={setBaseImage} setImageInfo={setImageInfo} />
      <Flex justify="center" gap="large">
        <Preview
          imageCanvasRef={imageCanvasRef}
          overlayCanvasRef={overlayCanvasRef}
        />
        {baseImage && (
          <Panel
            imageCanvasRef={imageCanvasRef}
            overlayCanvasRef={overlayCanvasRef}
            imageName={imageInfo.name}
            imageType={imageInfo.type}
            watermarkSettings={watermarkSettings}
            setWatermarkSettings={setWatermarkSettings}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default App;
