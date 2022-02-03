import MyContext, { data } from "../context";
import "../../styles/index.scss";

function MyApp({ Component, pageProps }) {
  return (
    <MyContext.Provider value={data}>
      <Component {...pageProps} />
    </MyContext.Provider>
  );
}

export default MyApp;
