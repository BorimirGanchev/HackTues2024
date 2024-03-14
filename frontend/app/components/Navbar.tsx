import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div>
          <Link href="/"  className="text-gray-800 dark:text-white text-xl font-bold">
            FitnessApp
          </Link>
        </div>
        <div>
          <Link href="/signup"  className="btn" style={{ marginRight: "20px" }}>
            Sign Up
          </Link>
          <Link href="/login"  className="btn">
            Log In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
