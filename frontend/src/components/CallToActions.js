// frontend/src/components/CallToActions.js
import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="mt-16 text-center">
      <h2 className="text-3xl font-bold text-blue-700">Ready to Get Started?</h2>
      <p className="text-xl mt-4 text-gray-700">
        Sign up today and join a community of professionals and learners.
      </p>
      <Link
        to="/register"
        className="inline-block mt-6 bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Sign Up Now
      </Link>
    </section>
  );
};

export default CallToAction;
