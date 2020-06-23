import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Link from 'next/link';

function PostNav({ next, prev, className }) {
  return (
    <ul
      className={clsx(
        'flex flex-col md:flex-row md:justify-between',
        className
      )}
    >
      <li className="mb-2 md:flex-grow md:w-0 md:my-0 md:mr-2">
        {prev && (
          <Link href="/blog/[slug]" as={`/blog/${prev.slug}`}>
            <a>← {prev.title}</a>
          </Link>
        )}
      </li>
      <li className="mt-2 md:flex-grow md:w-0 md:my-0 md:ml-2">
        {next && (
          <Link href="/blog/[slug]" as={`/blog/${next.slug}`}>
            <a>{next.title} →</a>
          </Link>
        )}
      </li>
    </ul>
  );
}
PostNav.propTypes = {
  prev: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  next: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
};

export default PostNav;
