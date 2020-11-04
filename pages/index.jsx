import { Typography } from '@material-ui/core';
import Head from 'next/head';
import Header from '../components/header/Header';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Now Quiz | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.design}>
          <Typography className={styles.anime} variant="body1">
            Welcome To Now!
          </Typography>
        </div>
      </main>
    </div>
  );
};

export default Home;
