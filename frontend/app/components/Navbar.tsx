import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/assets/logo.svg'; // Make sure this path is correct

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
           
            <Image src={logo} alt="TrackFit Logo" width={50} height={50} className='ml-[-10vh]'/>
            <span className="text-white dark:text-white text-xl font-bold ml-5 ">
              TrackFit
            </span>
          
        </Link>
        <div className="flex items-center">
          {links.map((link, index) => (
            <Link key={index} href={link.link} className="btn fancy-btn mr-4 last:mr-0 ml-2 text-white bg-green-600 hover:bg-green-700 transition-colors duration-300 py-2 px-4 rounded-lg">
              
                {link.name}
            
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
