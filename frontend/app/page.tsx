import Link from "next/link";
import Navbar from "./components/Navbar"; // Adjust the import path as necessary

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Welcome to FitnessApp
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
            Your journey to a healthier life starts here.
          </p>
          <Link href="/signup"  className="btn fancy-btn mt-5 items-justify-center">
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
}
