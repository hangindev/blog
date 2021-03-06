import Document, { Html, Head, Main, NextScript } from "next/document";
import { getDocuemntData, imageBuilder } from "../lib/api";

const faviconWidths = [512, 192, 32, 96, 64, 16];

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const data = await getDocuemntData();
    return { ...initialProps, ...data };
  }

  render() {
    const { title, url, icon, paymentPointer } = this.props;
    return (
      <Html lang="en">
        <Head>
          {icon &&
            faviconWidths.map(w => (
              <link
                key={w}
                rel="icon"
                sizes={`${w}x${w}`}
                href={imageBuilder
                  .image(icon)
                  .width(w)
                  .height(w)
                  .url()}
              />
            ))}
          {paymentPointer && (
            <meta name="monetization" content={paymentPointer} />
          )}
          <link
            rel="alternate"
            title={`${title} RSS Feed`}
            type="application/json"
            href={`${url}/feed.json`}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
