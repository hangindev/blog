import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

function Footer({ socialLinks = [], className }) {
  return (
    <footer className={clsx('flex text-blue-600 mb-8', className)}>
      {socialLinks.map(({ type, url }, i) => (
        <div key={url}>
          {i > 0 && <span className="mx-2">•</span>}
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
      ]),
      url: PropTypes.string.isRequired,
    })
  ),
};
export default Footer;
