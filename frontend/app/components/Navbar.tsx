import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/assets/logo.svg';

export const Navbar = () => {
  return (
    <nav className="bg-dark-blue dark:bg-gray-900 shadow-lg fixed top-0 w-full z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="FitnessApp Logo" width={50} height={50} />
          <span className="text-gray-800 dark:text-white text-xl font-bold ml-2">
            FitnessApp
          </span>
        </Link>
        <div className="flex items-center"> {/* Added a div to contain the buttons */}
          <Link href="/signup" className="btn fancy-btn mr-4"> {/* Added mr-4 class for margin-right */}
            Sign Up
          </Link>
          <Link href="/login" className="btn fancy-btn">
            Log In
          </Link>
        </div>
      </div>
    </nav>
  );
};
