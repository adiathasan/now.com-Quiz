import QuizContextProvider from '../hooks/quizContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <QuizContextProvider>
      <Component {...pageProps} />
    </QuizContextProvider>
  );
}

export default MyApp;
