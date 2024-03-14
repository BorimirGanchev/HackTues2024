import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/assets/logo.svg';

interface LinkItem {
  name: string;
  link: string;
}

interface Props {
  links: LinkItem[];
}

export const Navbar: React.FC<Props> = ({ links }) => {
  return (
    <nav className="bg-dark-blue dark:bg-gray-900 shadow-lg fixed top-0 w-full z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="FitnessApp Logo" width={50} height={50} />
          <span className="text-white dark:text-white text-xl font-bold ml-2">
            TrackFit
          </span>
        </Link>
        <div className="flex items-center">
          {links.map((link, index) => (
            <Link key={index} href={link.link} className="btn fancy-btn mr-4">
              {link.name.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};