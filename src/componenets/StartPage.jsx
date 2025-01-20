import React, { useState } from 'react';
import { Send } from 'lucide-react';

export const StartPage = ({ onStart }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return;
    }
    onStart(email);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg text-center transform transition-all duration-300 hover:scale-105">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Welcome to the Quiz</h1>
        <p className="text-lg text-gray-600 mb-8">Test your knowledge and have fun!</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-left">
            <label htmlFor="email" className="block text-md font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              className="block w-full rounded-lg border border-gray-300 shadow-md focus:border-purple-500 focus:ring-purple-500 py-3 px-4 text-lg"
              placeholder="Enter your email..."
            />
            {error && <p className="mt-2 text-md text-red-500">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg py-3 px-6 text-lg font-bold shadow-lg hover:opacity-90 transition-all"
          >
            Start Quiz
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
