import React from 'react';

import { Spinner } from '../Spinner/Spinner';

import styles from './style.module.scss';

export const Button = ({ children, onClick, variant, size, isLoading }) => {
  let buttonClasses = [styles['button']];

  switch (variant) {
    case 'subtle':
      buttonClasses.push(styles['button--subtle']);
      break;

    default:
      break;
  }

  switch (size) {
    case 'large':
      buttonClasses.push(styles['button--large']);
      break;

    case 'small':
      buttonClasses.push(styles['button--small']);
      break;

    default:
      break;
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
