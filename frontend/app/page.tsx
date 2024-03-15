import Link from 'next/link';
import { Navbar } from './components/Navbar'; // Make sure this path is correct

export default function Home() {
  const links = [
    { name: 'Signup', link: '/signup' },
    { name: 'Login', link: '/login' },
  ];

  return (
    <>
      <Navbar links={links} />
      <div className="container mx-auto mt-10 p-60">
        {/* Introduction Section */}
        <div className="text-center py-10 my-[50vh] mt-[20%]" id="home">
          <h1 className="text-5xl font-bold text-green-500 dark:text-white">
            Welcome to TrackFit
          </h1>
          <p className="mt-3 text-2xl text-white dark:text-gray-400 p-5">
            Your journey to a healthier life starts here.
          </p>
          <Link href="#our-mission" className="btn fancy-btn mt-5 p-8">
            
              Get Started
            
          </Link>
        </div>

        {/* Our Mission Section */}
        <div className="my-[30vh] px-5 py-10 bg-gray-500 rounded-lg shadow-xl transition duration-300 ease-in-out hover:shadow-2xl" id='our-mission'>
          <h2 className="text-4xl text-green-500 font-bold text-center mb-5">Our Mission</h2>
          <p className="text-center text-xl text-white">
            Introducing a cutting-edge fitness tracker designed to revolutionize your workout experience! With this innovative device, seamlessly monitor your training regimen with precision and finesse.
            <br></br>
            Picture this: as you embark on a rigorous workout session, our state-of-the-art bracelet diligently observes every movement. Whether you are engaging in a dynamic bench press or executing a perfect squat, simply initiate the tracking feature to meticulously analyze your exercise form.
            <br></br> 
            Once satisfied, effortlessly conclude the session by tagging it with a personalized name and pertinent details such as sets and repetitions.
            
            But the ingenuity does not stop there! Seamlessly integrated with our robust backend system, your workout data is securely transmitted for comprehensive analysis.
            <br></br> 
            Meanwhile, on our intuitive web application, users gain exclusive access to detailed training insights. Delve into nuanced analyses, from observing movement patterns across varying intensities to receiving expert evaluations on form precision.
            
            Experience the future of fitness tracking with us – where every move is met with unparalleled sophistication and accuracy!
          </p>
        </div>

        {/* Opportunities Section */}
        <div className="my-[10vh] px-2 py-5" id="opportunities">
          <h2 className="text-4xl text-green-500 font-bold text-center p-[10vh]">Opportunities</h2>
          <div className="mt-10 flex justify-center gap-10">
            {/* Personalization */}
            <div className="w-1/4 bg-gray-500 rounded-lg shadow-xl p-8 transition duration-300 ease-in-out hover:scale-105">
              <h3 className="text-2xl text-green-500 font-semibold text-center mb-4">Personalization</h3>
              <p className="text-lg text-white text-center">
                Discover personalized workout plans tailored to your fitness goals and preferences.
              </p>
            </div>

            {/* Efficiency */}
            <div className="w-1/4 bg-gray-500 rounded-lg shadow-xl p-8 transition duration-300 ease-in-out hover:scale-105">
              <h3 className="text-2xl text-green-500 font-semibold text-center mb-4">Efficiency</h3>
              <p className="text-lg text-white text-center">
                Maximize your workout efficiency with optimized exercise routines and techniques.
              </p>
            </div>

            {/* Progress Tracking */}
            <div className="w-1/4 bg-gray-500 rounded-lg shadow-xl p-8 transition duration-300 ease-in-out hover:scale-105">
              <h3 className="text-2xl text-green-500 font-semibold text-center mb-4">Progress Tracking</h3>
              <p className="text-lg text-white text-center">
                Track your fitness journey and monitor your progress with insightful statistics and analytics.
              </p>
            </div>

            {/* Variety of Workouts */}
            <div className="w-1/4 bg-gray-500 rounded-lg shadow-xl p-8 transition duration-300 ease-in-out hover:scale-105">
              <h3 className="text-2xl text-green-500 font-semibold text-center mb-4">Variety of Workouts</h3>
              <p className="text-lg text-white text-center">
                Explore a diverse range of workout options to keep your routine fresh and exciting.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        {/* Implement the contact section as needed */}

      </div>
    </>
  );
}
