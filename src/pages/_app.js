import MyContext, { data } from "../context";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";

import store from "../components/store";
import "../../styles/index.scss";

function MyApp({ Component, pageProps, session }) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <MyContext.Provider value={data}>
          <Component {...pageProps} />
        </MyContext.Provider>
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
