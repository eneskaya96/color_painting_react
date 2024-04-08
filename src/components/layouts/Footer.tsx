import React from 'react';

import styles from '@/styles/components/layouts/Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.copyRightText}>&copy; Color Drawing 2024</span>
    </footer>
  );
}
