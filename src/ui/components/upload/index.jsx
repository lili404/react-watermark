import React from 'react';
import {UploadOutlined} from '@ant-design/icons';
import {Upload as AntUpload} from 'antd';
import {Button} from 'antd';

const Upload = ({setUploadedImage, setImageName, setImageType}) => {
  const handleFile = (file) => {
    const uploadedUrl = URL.createObjectURL(file);
    setUploadedImage(uploadedUrl);
    setImageName(file.name);
    setImageType(file.type);

    // console.log(file.name);
    // console.log(file.type);
  };

  const uploadProps = {
    name: 'file',
    accept: 'image/*',
    maxCount: 1,
    showUploadList: false,
    beforeUpload(file) {
      handleFile(file);
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
