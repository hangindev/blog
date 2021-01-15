import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

function ProgressiveImage({
  className,
  src,
  alt,
  lqip = null,
  aspectRatio = 3 / 2,
}) {
  const imgRef = useRef();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);
  return (
    <div className={clsx("relative overflow-hidden", className)}>
      <div style={{ paddingBottom: `${100 / aspectRatio}%` }} />
      {lqip && (
        <img
          className="absolute w-full h-full inset-0 object-cover object-center"
          src={lqip}
          alt=""
          aria-hidden="true"
        />
      )}
      <img
        loading="lazy"
        ref={imgRef}
        className={clsx(
          "absolute w-full h-full inset-0 object-cover object-center opacity-0 transition duration-700 ease-in-out transition-opacity",
          (loaded || !lqip) && "opacity-100",
        )}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
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
