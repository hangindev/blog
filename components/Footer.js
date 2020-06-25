import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

function Footer({ socialLinks = [], className }) {
  return (
    <footer className={clsx('flex justify-between  mb-8 w-full', className)}>
      <div className="flex">
        {socialLinks.map(({ type, url }, i) => (
          <div key={url}>
            {i > 0 && <span className="mx-2 text-blue-600">•</span>}
            <a
              className="underline"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {type}
            </a>
          </div>
        ))}
      </div>
      <a
        className="underline"
        href="/feed.json"
        target="_blank"
        rel="noopener noreferrer"
      >
        rss
      </a>
    </footer>
  );
}
Footer.propTypes = {
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf([
        'Facebook',
        'Twitter',
        'Medium',
        'Github',
        'Stackoverflow',
        'Dev.to',
      ]),
      url: PropTypes.string.isRequired,
    })
  ),
};
export default Footer;
