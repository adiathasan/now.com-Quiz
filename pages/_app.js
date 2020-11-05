import QuizContextProvider from '../hooks/quizContext';
import '../styles/globals.css';
import Header from '../components/header/Header.jsx';

function MyApp({ Component, pageProps }) {
  return (
    <QuizContextProvider>
      <Header />
      <Component {...pageProps} />
    </QuizContextProvider>
  );
}

export default MyApp;
