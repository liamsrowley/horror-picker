import React from 'react';

import styles from './style.module.scss';

export const Overlay = ({ children }) => {
  return (
    <div className={styles['overlay']}>
      { children }
    </div>
  );
}
