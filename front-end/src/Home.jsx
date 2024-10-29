import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      
      {/* Logo Section */}
      <section className="flex-1 flex flex-col justify-center items-center">
        <h1 className="mt-4 text-3xl font-bold mb-4">Cyclable</h1>
        <Link to="/login" className="mt-4 bg-emerald-800 text-white px-6 py-2 rounded-md">
          Join the Community
          </Link>
      </section>

      {/* Feature Sections */}
      <section className="w-full px-4 py-8 space-y-8">
        {/* Feature 1 */}
        <div className="max-w-4xl mx-auto flex items-center">
          <div className="w-1/4 bg-gray-200 p-3">
            <h2 className="text-xl font-bold">About</h2>
          </div>
          <div className="w-3/4 p-3">
            <p className="text-gray-600">
              Cyclable is a route planning web application designed to enhance the cycling experience in New York City by integrating real-time user reports on road constructions and bike lane blockages. The app ensures smoother, safer rides for cyclists by providing up-to-date information on disruptions and generating alternative routes that prioritize safety. 
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="max-w-4xl mx-auto flex items-center">
          <div className="w-1/4 bg-gray-200 p-3">
            <h2 className="text-xl font-bold">Feature</h2>
          </div>
          <div className="w-3/4 p-3">
            <p className="text-gray-600">
              Cyclists are able to report blockages or construction in real-time, view an interactive map displaying current bike lanes and reported issues, and plan safer routes that avoid these disruptions. Additionally, users will have the option to save frequently used routes for future reference, making it easier to navigate the city on subsequent trips.
            </p>
          </div>
        </div>

        
        {/* <div className="max-w-4xl mx-auto flex items-center">
          <div className="w-1/2 bg-gray-200 p-8">
            <h2 className="text-xl font-bold">Feature 3</h2>
          </div>
          <div className="w-1/2 p-8">
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div> */}
      </section>
    </div>
  );
};

export default Home;

