import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { Dropdown, Navbar as RBNavbar } from 'react-bootstrap';

import { NavbarRoutes } from '@/constants/routes';
import useOutsideClick from '@/hooks/useOutsideClick';
import styles from '@/styles/components/layouts/Navbar.module.scss';

const Navbar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { pathname } = useRouter();
  const refUserMenu = useRef(null);

  useOutsideClick(refUserMenu, () => {
    if (showUserMenu) setShowUserMenu(false);
  });

  return (
    <RBNavbar className={styles.navbarContainer} bg="light" variant="light" expand="lg">
      <RBNavbar.Brand>Color Drawing</RBNavbar.Brand>
      <RBNavbar.Toggle aria-controls="basic-navbar-nav" />

      { (
        <>
          <RBNavbar.Collapse id="basic-navbar-nav">
            {NavbarRoutes.map((route, index) => (
              <Link
                key={index}
                className={clsx(styles.navbarLink, pathname === route.path && styles.navbarLinkActive)}
                href={route.path}
              >
                {route.label}
              </Link>
            ))}
          </RBNavbar.Collapse>

          <Dropdown className={styles.userMenuDropdown} show={showUserMenu} ref={refUserMenu}>
            <Dropdown.Toggle
              as={'div'}
              className={styles.userMenuDropdownToggle}
              onClick={() => setShowUserMenu((preState) => !preState)}
            >
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles.iconDropdownMenu}>
              <div className={styles.logoContainer}>
                <div className={styles.closeImgContainer} onClick={() => setShowUserMenu(false)}></div>
              </div>

            </Dropdown.Menu>
          </Dropdown>
        </>
      )}
    </RBNavbar>
  );
};

export default Navbar;
