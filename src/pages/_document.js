import Document, { Head, Html, Main, NextScript } from "next/document";

export default class extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <div id="notification" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
