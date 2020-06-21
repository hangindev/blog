import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { extToMimeType } from '../utils';

function SEO({
  type = 'website',
  title,
  description,
  siteName,
  image,
  twitter,
  twitterCreator,
  children,
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:site_name" content={siteName} />
      <meta name="description" key="description" content={description} />
      <meta property="og:title" key="ogTitle" content={title} />
      <meta
        property="og:description"
        key="ogDescription"
        content={description}
      />
      <meta property="og:type" content={type} key="ogType" />
      <meta name="twitter:card" content="summary_large_image" />
      {twitter && <meta name="twitter:site" content={`@${twitter}`} />}
      {twitterCreator && (
        <meta name="twitter:creator" content={`@${twitterCreator}`} />
      )}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && (
        <>
          <meta property="og:image" key="ogImage" content={image.src} />
          {image.alt && (
            <meta
              property="og:image:alt"
              key="ogImageAlt"
              content={image.alt}
            />
          )}
          <meta
            property="og:image:type"
            key="ogImageType"
            content={extToMimeType(image.ext) || image.type}
          />
          <meta
            property="og:image:width"
            key="ogImageWidth"
            content={image.dimensions?.width}
          />
          <meta
            property="og:image:height"
            key="ogImageHeight"
            content={image.dimensions?.height}
          />
          <meta name="twitter:image" content={image.src} />
        </>
      )}
      {children}
    </Head>
  );
}
SEO.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  siteName: PropTypes.string.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    type: PropTypes.string,
    ext: PropTypes.string,
    dimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }),
  }),
  twitter: PropTypes.string,
  twitterCreator: PropTypes.string,
};
export default SEO;
