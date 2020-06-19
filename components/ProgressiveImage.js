import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { loadImage } from '../utils';

function ProgressiveImage({
  className,
  src,
  alt,
  lqip = null,
  aspectRatio = 3 / 2,
}) {
  const [loaded, setLoaded] = useState(src);
  useEffect(() => {
    loadImage(src).then(() => {
      setLoaded(true);
    });
  }, [src]);
  return (
    <div className={clsx('relative overflow-hidden', className)}>
      <div style={{ paddingBottom: `${100 / aspectRatio}%` }} />
      {lqip && (
        <img
          className="absolute w-full h-full inset-0 object-cover object-center"
          src={lqip}
          alt={alt}
        />
      )}
      <img
        className={clsx(
          'absolute w-full h-full inset-0 object-cover object-center opacity-0 transition duration-700 ease-in-out transition-opacity',
          (loaded || !lqip) && 'opacity-100'
        )}
        src={src}
        alt={alt}
      />
    </div>
  );
}
ProgressiveImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  lqip: PropTypes.string,
  aspectRatio: PropTypes.number,
};

export default ProgressiveImage;
