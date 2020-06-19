import Document, { Html, Head, Main, NextScript } from 'next/document';
import { getFavicon, imageBuilder } from '../lib/api';

const appleTouchIconWidths = [57, 76, 96, 120, 144, 195, 228];
const faviconWidths = [192, 32, 96, 16];

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const iconUrl = await getFavicon();
    return { ...initialProps, iconUrl };
  }

  render() {
    const { iconUrl } = this.props;
    return (
      <Html lang="en">
        <Head>
          {iconUrl &&
            appleTouchIconWidths.map(w => (
              <link
                key={w}
                rel="apple-touch-icon"
                sizes={`${w}x${w}`}
                href={imageBuilder
                  .image(iconUrl)
                  .width(w)
                  .height(w)
                  .url()}
              />
            ))}
          {iconUrl &&
            faviconWidths.map(w => (
              <link
                key={w}
                rel="icon"
                sizes={`${w}x${w}`}
                href={imageBuilder
                  .image(iconUrl)
                  .width(w)
                  .height(w)
                  .url()}
              />
            ))}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
