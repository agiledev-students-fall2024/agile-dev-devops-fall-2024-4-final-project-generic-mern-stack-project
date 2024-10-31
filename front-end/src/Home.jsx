import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-50">
      {/* Logo Section */}
      <section className="h-80 flex flex-col justify-center items-center">
        <h1 className="mt-4 text-3xl font-bold mb-8">Cyclable</h1>
        <Link
          to="/login"
          className="mt-4 bg-emerald-800 text-white px-6 py-4 rounded-md"
        >
          Join the Community
        </Link>
      </section>

      {/* Feature Sections */}
      <section className="w-full px-7 py-4 space-y-4 mb-10">
        {/* About */}
        <div className="max-w-4xl mx-auto flex items-center">
          <div className="w-1/4 bg-gray-200 p-3">
            <h2 className="text-xl font-bold">About</h2>
          </div>
          <div className="w-3/4 p-2">
            <p className="text-gray-600">
              Cyclable is a route planning web application designed to enhance
              the cycling experience in New York City by integrating real-time
              user reports on road constructions and bike lane blockages.
            </p>
          </div>
        </div>

        {/* Feature 1 */}
        <div className="max-w-4xl mx-auto flex items-center">
          <div className="w-1/4 bg-gray-200 p-3">
            <h2 className="text-xl font-bold">Feature 1</h2>
          </div>
          <div className="w-3/4 p-3">
            <p className="text-gray-600">
              Cyclists are able to report blockages or construction in
              real-time, view an interactive map displaying current bike lanes
              and reported issues, and plan safer routes that avoid these
              disruptions. Additionally, users will have the option to save
              frequently used routes for future reference, making it easier to
              navigate the city on subsequent trips.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="max-w-4xl mx-auto flex items-center">
          <div className="w-1/4 bg-gray-200 p-3">
            <h2 className="text-xl font-bold">Feature 2</h2>
          </div>
          <div className="w-3/4 p-3">
            <p className="text-gray-600">
              Cyclists are able to report blockages or construction in
              real-time, view an interactive map displaying current bike lanes
              and reported issues, and plan safer routes that avoid these
              disruptions. Additionally, users will have the option to save
              frequently used routes for future reference, making it easier to
              navigate the city on subsequent trips.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
