import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Header({ className, name }) {
  const { pathname } = useRouter();
  return (
    <header className={clsx('flex items-center h-12', className)}>
      <h1
        className={clsx(
          'font-black text-blue-500 text-xl',
          pathname === '/' && 'text-3xl'
        )}
      >
        <Link href="/">
          <a>{name}</a>
        </Link>
      </h1>
      <nav />
    </header>
  );
}
Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Header;
