import Head from 'next/head';
import Header from '../components/header/Header';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Now Quiz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>Only I rule</main>
    </div>
  );
};

export default Home;
