import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useAuth from '../../hooks/useAuth';
import Link from 'next/link';
import styles from './header.module.css';
import useLoading from '../../hooks/useLoading';

const Header = () => {
  const [user, _, logoutUser, __] = useAuth();
  const [isLoading] = useLoading();

  return (
    <div className={styles.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" className={styles.title}>
            <Button color="inherit">
              <Link href="/">
                <a>Now</a>
              </Link>
            </Button>
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
