import React from 'react';
import {Flex, Form, Slider, Button, Select} from 'antd';
import styles from './panel.module.scss';

const Panel = ({
  imageCanvasRef,
  overlayCanvasRef,
  imageName,
  imageType,
  setSelectedWatermark,
  setSelectedPosition,
  setWatermarkScale,
  setWatermarkMargin,
}) => {
  const handleDownload = () => {
    const imageCanvas = imageCanvasRef.current;
    const overlayCanvas = overlayCanvasRef.current;

    const combinedCanvas = document.createElement('canvas');
    const combinedContext = combinedCanvas.getContext('2d');

    combinedCanvas.width = imageCanvas.width;
    combinedCanvas.height = imageCanvas.height;

    combinedContext.drawImage(imageCanvas, 0, 0);
    combinedContext.drawImage(overlayCanvas, 0, 0);

    const link = document.createElement('a');
    link.href = combinedCanvas.toDataURL(imageType);
    link.download = `${imageName}-watermarked.${imageType}`;
    console.log(imageName);
    console.log(imageType);
    link.click();
  };

  return (
    <Flex className={styles.panelWrapper} gap="large" vertical>
      <Form className={styles.form}>
        <Form.Item label="Watermark">
          <Select
            defaultValue="Floria"
            style={{
              width: 120,
            }}
            onChange={setSelectedWatermark}
            options={[
              {
                value: 'floria.png',
                label: 'Floria',
              },
              {
                value: 'ksu.png',
                label: 'KSU',
              },
            ]}
          />
        </Form.Item>

        <Form.Item label="Position">
          <Select
            defaultValue="Top Left"
            style={{
              width: 120,
            }}
            onChange={setSelectedPosition}
            options={[
              {value: 'tl', label: 'Top Left'},
              {value: 'tr', label: 'Top Right'},
              {value: 'bl', label: 'Bottom Left'},
              {value: 'br', label: 'Bottom Right'},
            ]}
          />
        </Form.Item>

        <Form.Item label="Watermark scale">
          <Slider
            min={0.5}
            max={3}
            step={0.1}
            defaultValue={1}
            onChange={setWatermarkScale}
          />
        </Form.Item>
        <Form.Item label="Watermark margin">
          <Slider
            min={0}
            max={100}
            step={10}
            defaultValue={20}
            onChange={setWatermarkMargin}
          />
        </Form.Item>
      </Form>

      <Button type="primary" onClick={handleDownload}>
        Download
      </Button>
    </Flex>
  );
};

export default Panel;
