import React from 'react';

import { Spinner } from '../Spinner/Spinner';

import styles from './style.module.scss';

export const Button = ({ children, onClick, variant, size, isLoading, emphasized }) => {
  let buttonClasses = [styles['button']];

  switch (variant) {
    case 'subtle':
      buttonClasses.push(styles['subtle']);
      break;

    default:
      break;
  }

  switch (size) {
    case 'large':
      buttonClasses.push(styles['large']);
      break;

    case 'small':
      buttonClasses.push(styles['small']);
      break;

    default:
      break;
  }

  if (emphasized) {
    buttonClasses.push(styles['emphasized']);
  }

  return (
    <button
      className={buttonClasses.join(' ')}
      onClick={onClick}
    >
    { isLoading ? <Spinner /> : children }
    </button>
  );
}
