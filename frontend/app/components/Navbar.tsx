import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/assets/logo.svg'; 

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
            <Image src={logo} alt="FitnessApp Logo" width={50} height={50} />
            <span className="text-gray-800 dark:text-white text-xl font-bold ml-2">
              FitnessApp
            </span>
        </Link>
        <div>
          <Link href="/signup"  className="btn fancy-btn" style={{ marginRight: "20px" }}>
             Sign Up
          </Link>
          <Link href="/login"  className="btn fancy-btn">
            Log In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
