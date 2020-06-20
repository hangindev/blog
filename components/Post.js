import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { format } from 'date-fns';
import PortableText from './PortableText';
import Figure from './Figure';

function Post({ className, title, publishedAt, content, coverImage = null }) {
  return (
    <article className={clsx(className)}>
      <small>{format(new Date(publishedAt), 'MMMM d, yyyy')}</small>
      <h2 className="text-gray-800 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-8">
        {title}
      </h2>
      {coverImage && (
        <Figure
          {...coverImage}
          className="-m-3 mb-5"
          imageClassName="md:rounded shadow-xl"
        />
      )}
      <PortableText blocks={content} />
    </article>
  );
}
Post.propTypes = {
  title: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  content: PropTypes.array.isRequired,
  coverImage: PropTypes.object,
};
export default Post;
