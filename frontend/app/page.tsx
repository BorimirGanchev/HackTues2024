import Link from "next/link";
import Image from "next/image";
import {Navbar} from "./components/Navbar"; // Adjust the import path as necessary

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10 p-60">
        {/* Introduction Section */}
        <div className="text-center py-10 my-52" id="home"> {/* Adjusted padding for the first section */}
          <h1 className="text-5xl font-bold text-green-700 dark:text-white">
            Welcome to FitnessApp
          </h1>
          <p className="mt-3 text-2xl text-gray-600 dark:text-gray-400 p-5">
            Your journey to a healthier life starts here.
          </p>
          <Link href="#our-mission"  className="btn fancy-btn mt-5 p-8">
            Get Started
          </Link>
        </div>

        {/* Our Mission Section */}
          <div className="my-[70vh] px-5 py-10 bg-gray-400 rounded-lg shadow-lg" id='our-mission'>
        <h2 className="text-4xl text-green-700 font-bold text-center mb-5">Our Mission</h2>
        <p className="text-center text-lg text-black">
          Introducing a cutting-edge fitness tracker designed to revolutionize your workout experience! With this innovative device, seamlessly monitor your training regimen with precision and finesse.
          
          Picture this: as you embark on a rigorous workout session, our state-of-the-art bracelet diligently observes every movement. Whether you're engaging in a dynamic bench press or executing a perfect squat, simply initiate the tracking feature to meticulously analyze your exercise form. Once satisfied, effortlessly conclude the session by tagging it with a personalized name and pertinent details such as sets and repetitions.
          
          But the ingenuity doesn't stop there! Seamlessly integrated with our robust backend system, your workout data is securely transmitted for comprehensive analysis. Meanwhile, on our intuitive web application, users gain exclusive access to detailed training insights. Delve into nuanced analyses, from observing movement patterns across varying intensities to receiving expert evaluations on form precision.
         
          Experience the future of fitness tracking with us – where every move is met with unparalleled sophistication and accuracy!
        </p>
      </div>


        {/* Opportunities Section */}
        <div className="my-[70vh] px-5 py-10" id="opportunities"> {/* Increased vertical margin for more space */}
          <h2 className="text-4xl  text-green-700 font-bold text-center">Opportunities</h2>
          <div className="mt-5 text-center">
            <p>
              Explore a variety of workouts tailored to your goals, track your progress with insightful statistics, and join a community that cheers for every milestone achieved.
            </p>
            <div className="flex flex-wrap justify-center mt-5">
              <div className="m-4">
                <Image src="/assets/workout.png" alt="Workout" width={200} height={200} />
                <p>Custom Workouts</p>
              </div>
              <div className="m-4">
                <Image src="/assets/statistics.png" alt="Statistics" width={200} height={200} />
                <p>Real-Time Stats</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="my-32 px-5 py-10 bg-gray-100 dark:bg-gray-700" id="contact"> {/* Increased vertical margin for more space */}
          <h2 className="text-4xl  text-green-700  font-bold text-center">Stay in Touch</h2>
          <div className="mt-5 text-center">
            <p>Join our newsletter to get the latest updates and news.</p>
            <form className="mt-5">
              <input
                type="email"
                className="px-4 py-2 border rounded-lg text-gray-700"
                placeholder="Enter your email"
                aria-label="Email Address"
              />
              <button type="submit" className="btn fancy-btn ml-2">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
