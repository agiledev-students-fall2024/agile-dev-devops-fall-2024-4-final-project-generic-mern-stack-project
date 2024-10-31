import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center bg-gray-50'>
      {/* Logo Section */}
      <section className='flex h-80 flex-col items-center justify-center'>
        <h1 className='mb-8 mt-4 text-3xl font-bold'>Cyclable</h1>
        <Link
          to='/login'
          className='mt-4 rounded-md bg-emerald-800 px-6 py-4 text-white'
        >
          Join the Community
        </Link>
      </section>

      {/* Feature Sections */}
      <section className='mb-10 w-full space-y-4 px-7 py-4'>
        {/* About */}
        <div className='mx-auto flex max-w-4xl items-center'>
          <div className='w-1/4 bg-gray-200 p-3'>
            <h2 className='text-xl font-bold'>About</h2>
          </div>
          <div className='w-3/4 p-2'>
            <p className='text-gray-600'>
              Cyclable is a route planning web application designed to enhance
              the cycling experience in New York City by integrating real-time
              user reports on road constructions and bike lane blockages.
            </p>
          </div>
        </div>

        {/* Feature 1 */}
        <div className='mx-auto flex max-w-4xl items-center'>
          <div className='w-1/4 bg-gray-200 p-3'>
            <h2 className='text-xl font-bold'>Feature 1</h2>
          </div>
          <div className='w-3/4 p-3'>
            <p className='text-gray-600'>
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
        <div className='mx-auto flex max-w-4xl items-center'>
          <div className='w-1/4 bg-gray-200 p-3'>
            <h2 className='text-xl font-bold'>Feature 2</h2>
          </div>
          <div className='w-3/4 p-3'>
            <p className='text-gray-600'>
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
