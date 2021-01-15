import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import Link from "next/link";
import { imageBuilder } from "../lib/api";
import Image from "./ProgressiveImage";

function PostListItem({ title, publishedAt, slug, excerpt, coverImage }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:w-full mb-10">
      <Link href="/blog/[slug]" as={`/blog/${slug}`}>
        <a>
          <Image
            src={imageBuilder
              .image(coverImage.url)
              .width(800)
              .url()}
            lqip={coverImage.lqip}
            alt={coverImage.alt}
            className="mb-2 rounded overflow-hidden shadow-xl sm:flex-shrink-0 sm:w-64 sm:mb-0 sm:mr-4"
          />
        </a>
      </Link>
      <div>
        <small>{format(new Date(publishedAt), "MMM d, yyyy")}</small>
        <h4 className="text-2xl font-bold mb-2 leading-tight">
          <Link href="/blog/[slug]" as={`/blog/${slug}`}>
            <a>{title}</a>
          </Link>
        </h4>
        <p className="clamp">{excerpt}</p>
      </div>
      <style jsx>{`
        .clamp {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </div>
  );
}
PostListItem.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  coverImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
    lqip: PropTypes.string.isRequired,
    alt: PropTypes.string,
  }),
};

export default PostListItem;
