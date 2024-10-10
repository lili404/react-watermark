import React from 'react';
import {UploadOutlined} from '@ant-design/icons';
import {Upload as AntUpload} from 'antd';
import {Button} from 'antd';

const Upload = ({uploadedImage, setUploadedImage, setImageInfo}) => {
  const uploadProps = {
    name: 'file',
    accept: 'image/*',
    maxCount: 1,
    showUploadList: false,
    beforeUpload(file) {
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage);
      }
      setUploadedImage(URL.createObjectURL(file));
      setImageInfo({
        name: file.name.split('.')[0],
        type: file.type.split('/')[1],
      });
      return false;
    },
  };

  return (
    <AntUpload {...uploadProps}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </AntUpload>
  );
};

export default Upload;
