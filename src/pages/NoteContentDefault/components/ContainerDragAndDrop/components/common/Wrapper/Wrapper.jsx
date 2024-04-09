import React from 'react';
import styles from './Wrapper.module.css';

export function Wrapper({ children, center, style }) {
  return (
    <div
    className={`note-grid-principal-container ${styles.Wrapper} ${center ? styles.center : ''} `}
      style={style}
    >
      {children}
    </div>
  );
}