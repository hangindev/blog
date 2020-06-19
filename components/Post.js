import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { format } from 'date-fns';
import PortableText from './PortableText';
import Figure from './Figure';

function Post({ className, title, publishedAt, content, coverImage = null }) {
  return (
    <article className={clsx(className)}>
      {coverImage && (
        <Figure
          {...coverImage}
          className="-m-3 mb-5"
          imageClassName="md:rounded shadow-xl"
        />
      )}
      <small>{format(new Date(publishedAt), 'MMMM d, yyyy')}</small>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 leading-tight mb-6">
        {title}
      </h2>
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
