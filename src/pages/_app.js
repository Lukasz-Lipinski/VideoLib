import MyContext, { data } from "../context";
import { Provider } from "react-redux";

import store from "../components/store";
import "../../styles/index.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <MyContext.Provider value={data}>
        <Component {...pageProps} />
      </MyContext.Provider>
    </Provider>
  );
}

export default MyApp;
