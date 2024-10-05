import React from 'react';
import styles from './wrapper.module.scss';
import WatermarkEditor from '../watermark-editor';

const Wrapper = () => {
  return (
    <div className={styles.wrapper}>
      <WatermarkEditor />
    </div>
  );
};

export default Wrapper;
