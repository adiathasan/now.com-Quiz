import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useAuth from '../../hooks/useAuth';
import Link from 'next/link';
import styles from './header.module.css';
import useLoading from '../../hooks/useLoading';
import Loader from '../loader/Loader.jsx';

const Header = () => {
  const [user, _, logoutUser, __] = useAuth();
  const [isLoading] = useLoading();

  return (
    <div className={styles.root}>
      <AppBar position="static">
        {isLoading && <Loader />}
        <Toolbar>
          <Typography variant="h5" className={styles.title}>
            <Button color="inherit">
              <Link href="/">
                <a>
                  <img
                    className={styles.title__image}
                    src="./favicon.ico"
                    alt="logo"
                  />
                </a>
              </Link>
            </Button>
            <Link href="/">
              <a className={styles.title__text}>Now</a>
            </Link>
          </Typography>
          <Button color="inherit">
            <Link href="/order">
              <a>Order</a>
            </Link>
          </Button>
          {user ? (
            <Button color="inherit" onClick={() => logoutUser()}>
              <Typography variant="body2">Logout</Typography>
            </Button>
          ) : (
            <Button color="inherit">
              <Link href="/login">
                <a>Login</a>
              </Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
