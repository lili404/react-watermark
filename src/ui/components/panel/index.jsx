import React, {useEffect} from 'react';
import {Flex, Form, Slider, Button, Select} from 'antd';
import styles from './panel.module.scss';

const Panel = ({
  imageCanvasRef,
  overlayCanvasRef,
  imageName,
  imageType,
  watermarkSettings,
  setWatermarkSettings,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(watermarkSettings);
  }, [form, watermarkSettings]);

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
    // console.log(imageName, imageType);
    link.download = `${imageName}-watermarked.${imageType}`;
    link.click();
  };

  return (
    <Flex className={styles.panelWrapper} gap="large" vertical>
      <Form
        className={styles.form}
        form={form}
        layout="vertical"
        initialValues={watermarkSettings}
        onValuesChange={(_, values) => {
          setWatermarkSettings(values);
        }}
      >
        <Form.Item label="Watermark" name="watermark">
          <Select
            style={{
              width: 120,
            }}
            options={[
              {
                value: 'ksu.png',
                label: 'KSU',
              },
            ]}
          />
        </Form.Item>

        <Form.Item label="Position" name="position">
          <Select
            style={{
              width: 120,
            }}
            options={[
              {value: 'tl', label: 'Top Left'},
              {value: 'tr', label: 'Top Right'},
              {value: 'bl', label: 'Bottom Left'},
              {value: 'br', label: 'Bottom Right'},
            ]}
          />
        </Form.Item>

        <Form.Item label="Scale" name="scale">
          <Slider min={0.5} max={10} step={0.1} />
        </Form.Item>
        <Form.Item label="Margin" name="margin">
          <Slider min={0} max={100} step={10} />
        </Form.Item>
      </Form>

      <Button type="primary" onClick={handleDownload}>
        Download
      </Button>
    </Flex>
  );
};

export default Panel;
