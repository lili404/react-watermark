import React, {forwardRef} from 'react';
import styles from './preview.module.scss';

const Preview = forwardRef(({imageCanvasRef, overlayCanvasRef}, ref) => {
  return (
    <div className={styles.previewWrapper}>
      <canvas ref={imageCanvasRef} className={styles.imageCanvas} />
      <canvas ref={overlayCanvasRef} className={styles.overlayCanvas} />
    </div>
  );
});

export default Preview;
