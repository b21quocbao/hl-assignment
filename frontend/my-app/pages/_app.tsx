import "../styles/globals.css";
import type { AppProps } from "next/app";
import rootSaga from "../store/sagas";
import configureStore from "../store/configureStore";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
  const store = configureStore();
  store.runSaga(rootSaga);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
