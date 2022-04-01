import MyContext, { data } from "../context";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";

import store from "../components/store";
import "../../styles/index.scss";

function MyApp({ Component, pageProps, session }) {
  return (
    <SessionProvider
      basePath={`${process.env.NEXTAUTH_URL}/api/auth`}
      session={session}
    >
      <Provider store={store}>
        <MyContext.Provider value={data}>
          <Component {...pageProps} />
        </MyContext.Provider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
