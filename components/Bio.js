import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import BlockContent from "@sanity/block-content-to-react";
import { imageBuilder } from "../lib/api";

function Bio({ author, className }) {
  const twitter = author.socialLinks.find(l => l.type === "Twitter");
  return (
    <aside className={clsx("flex items-center", className)}>
      <img
        className="w-12 h-12 object-cover object-center rounded-full"
        src={imageBuilder
          .image(author.picture)
          .width(128)
          .url()}
        alt={author.name}
        id="Avatar"
      />
      <div className="ml-4">
        <a
          className="text-lg text-gray-900"
          rel="author"
          href={twitter?.url || "/"}
        >
          {author.name}
        </a>
        <BlockContent blocks={author.bio} />
      </div>
    </aside>
  );
}
Bio.propTypes = {
  author: PropTypes.shape({
    picture: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    bio: PropTypes.array.isRequired
  })
};
export default Bio;
