import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import ProgressiveImage from "./ProgressiveImage";

function Figure({
  className,
  imageClassName,
  alt,
  caption,
  captionUrl,
  src,
  lqip,
  aspectRatio
}) {
  return (
    <figure className={clsx("text-center", className)}>
      <ProgressiveImage
        alt={alt}
        src={src}
        lqip={lqip}
        aspectRatio={aspectRatio}
        className={imageClassName}
      />
      {caption && (
        <figcaption className="text-xs text-gray-800 mt-1">
          {captionUrl ? (
            <a href={captionUrl} target="_blank" rel="noopener noreferrer">
              {caption}
            </a>
          ) : (
            caption
          )}
        </figcaption>
      )}
    </figure>
  );
}
Figure.propTypes = {
  imageClassName: PropTypes.string,
  alt: PropTypes.string.isRequired,
  caption: PropTypes.string,
  captionUrl: PropTypes.string,
  src: PropTypes.string.isRequired,
  lqip: PropTypes.string,
  aspectRatio: PropTypes.number
};
export default Figure;
