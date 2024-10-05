import React from 'react';
import {ColorPicker, Flex, Form, Input, Slider, Button} from 'antd';
import styles from './panel.module.scss';

const Panel = ({
  config,
  setConfig,
  imageCanvasRef,
  overlayCanvasRef,
  imageName,
  imageType,
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
    link.download = `${imageName.split('.')[0]}-watermarked.${
      imageType.split('/')[1]
    }`;
    link.click();
  };

  return (
    <Flex className={styles.panelWrapper} gap="large" vertical>
      <Form
        className={styles.form}
        layout="vertical"
        initialValues={config}
        onValuesChange={(_, values) => {
          if (typeof values.color === 'object' && values.color !== null) {
            values.color = values.color.toRgbString();
          }
          setConfig((prevConfig) => ({...prevConfig, ...values}));
        }}
      >
        <Form.Item name="content" label="Watermark Text">
          <Input placeholder="Input your watermark text" />
        </Form.Item>
        <Form.Item name="color" label="Color">
          <ColorPicker />
        </Form.Item>
        <Form.Item name="fontSize" label="Font size">
          <Slider step={1} min={1} max={100} />
        </Form.Item>
        <Form.Item name="rotate" label="Rotation">
          <Slider step={1} min={-180} max={180} />
        </Form.Item>
        <Form.Item label="Gap">
          <Flex gap="middle">
            <Form.Item className={styles.slider} name={['gap', 0]} label="X">
              <Slider step={10} min={10} max={500} />
            </Form.Item>
            <Form.Item className={styles.slider} name={['gap', 1]} label="Y">
              <Slider step={10} min={10} max={500} />
            </Form.Item>
          </Flex>
        </Form.Item>
        <Form.Item label="Offset">
          <Flex gap="middle">
            <Form.Item
              className={styles.slider}
              name={['translate', 0]}
              label="X"
            >
              <Slider step={10} min={-100} max={100} />
            </Form.Item>
            <Form.Item
              className={styles.slider}
              name={['translate', 1]}
              label="Y"
            >
              <Slider step={10} min={-100} max={100} />
            </Form.Item>
          </Flex>
        </Form.Item>
      </Form>
      <Button type="primary" onClick={handleDownload}>
        Download
      </Button>
    </Flex>
  );
};

export default Panel;
