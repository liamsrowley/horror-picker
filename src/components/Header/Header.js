import React from 'react';
import { Link } from 'react-router-dom';

import styles from './style.module.scss';

export const Header = () => {
  return (
    <header className={styles['header']}>
      <nav className={styles['nav']}>
        <Link to="/" className={styles['nav-item']} activeClassName={styles['nav-item--active']}>Home</Link>
        <Link to="/pinned" className={styles['nav-item']} activeClassName={styles['nav-item--active']}>Pinned Movies</Link>
      </nav>
    </header>
  );
}
