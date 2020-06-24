import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { format, formatRFC3339 } from 'date-fns';
import PortableText from './PortableText';
import Figure from './Figure';

function Post({ className, title, publishedAt, content, coverImage = null }) {
  const date = new Date(publishedAt);
  const dateDisplay = format(date, 'MMMM d, yyyy');
  return (
    <article className={clsx(className)}>
      <time pubdate="ttue" dateTime={formatRFC3339(date)} title={dateDisplay}>
        {dateDisplay}
      </time>
      <h1 className="text-gray-800 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-8">
        {title}
      </h1>
      {coverImage && (
        <Figure
          {...coverImage}
          className="-m-3 mb-5"
          imageClassName="md:rounded shadow-xl"
        />
      )}
      <div id="Content">
        <PortableText blocks={content} />
      </div>
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
