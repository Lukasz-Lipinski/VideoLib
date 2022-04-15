import MyContext, { data } from "../context";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";

import store from "../components/store";
import "../../styles/index.scss";

function MyApp({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <MyContext.Provider value={data}>
          <SWRConfig
            value={{
              refreshInterval: 500,
              fetcher: (url) => fetch(url).then((res) => res.json()),
            }}
          >
            <Component {...pageProps} />
          </SWRConfig>
        </MyContext.Provider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
