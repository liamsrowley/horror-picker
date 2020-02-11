import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './style.module.scss';

export const Header = () => {
  return (
    <header className={styles['header']}>
      <nav className={styles['nav']}>
        <NavLink exact to="/" className={styles['nav-item']} activeClassName={styles['nav-item--active']}>Home</NavLink>
        <NavLink exact to="/pinned" className={styles['nav-item']} activeClassName={styles['nav-item--active']}>Pinned Movies</NavLink>
      </nav>
    </header>
  );
}
