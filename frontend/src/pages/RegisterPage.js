import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState('student'); // New state for user type
  const [accessCode, setAccessCode] = useState(''); // New state for access code
  const [error, setError] = useState('');
  // const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const { data } = await axios.post('/api/users', { name, email, password, userType, accessCode }); // Include userType and accessCode in the request
      login(data);
      window.location.href = '/';
    } catch (err) {
      setError('Failed to register');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="px-4 py-16 lg:py-0 sm:px-6 lg:px-8 mx-auto max-w-screen-xl lg:flex lg:flex-row">
        <div className="text-center mx-auto lg:flex lg:flex-col lg:justify-center">
          <h1 className="text-2xl font-bold text-indigo-600 sm:text-3xl">Get started today</h1>
          <p className="mt-4 max-w-md lg:mx-4 text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt dolores deleniti inventore quaerat mollitia?
          </p>
        </div>
        {error && <div className="bg-red-200 text-red-800 p-2 mb-4">{error}</div>}
        <form className="lg:-translate-y-10 lg:mx-4 lg:scale-[95%] mt-2 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-[#f3f3f388]" onSubmit={submitHandler}>
          <p className="text-center text-lg font-medium">Create your account</p>
          <div>
            <label htmlFor="name" className="block text-base font-semibold text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-base font-semibold text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-base font-semibold text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-400 focus:outline-none"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10S6.477 0 12 0c2.21 0 4.26.72 5.875 1.925M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-base font-semibold text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="text-gray-400 focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10S6.477 0 12 0c2.21 0 4.26.72 5.875 1.925M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="userType" className="block text-base font-semibold text-gray-700">User Type</label>
            <select
              id="userType"
              name="userType"
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="student">Student</option>
              <option value="alumni">Alumni</option>
              <option value="admin">Admin</option>
              <option value="alumni association incharge">Alumni Association Incharge</option>
            </select>
          </div>
          {(userType === 'admin' || userType === 'alumni association incharge') && (
            <div>
              <label htmlFor="accessCode" className="block text-base font-semibold text-gray-700">Access Code</label>
              <input
                type="text"
                id="accessCode"
                name="accessCode"
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Enter access code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                required
              />
            </div>
          )}
          <div className="flex items-center">
            <input
              id="agreement"
              name="agreement"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              required
            />
            <label htmlFor="agreement" className="ml-2 block text-sm text-gray-900">
              By clicking, you agree to the Lorem User Agreement, Privacy Policy, and Cookie Policy.
            </label>
          </div>
          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            Create account
          </button>
          <p className="text-center text-sm text-gray-500">
            Already have an account?
            <Link to="/login" className="underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;