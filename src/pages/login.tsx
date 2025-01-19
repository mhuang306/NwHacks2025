import React, { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase'; // Replace with your Firebase config import
import { useNavigate } from 'react-router-dom';

const Input = ({ icon: Icon, type, placeholder, value, onChange }) => (
  <div className="relative w-full">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
      <Icon className="text-gray-400 w-5 h-5" />
    </div>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full py-2 pl-10 pr-4 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
    />
  </div>
);

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Correctly call useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home'); // Navigate to /home after successful login
    } catch (err) {
      setError(err.message); // Display error message on failure
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 text-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-md p-8 bg-white shadow-md rounded-xl"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">Welcome Back!</h2>
        <p className="text-center text-gray-500 mb-6">Sign in to continue</p>

        {error && <div className="mb-4 text-sm text-red-500">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            icon={Mail}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 disabled:bg-blue-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? 'Signing In...' : (
              <>
                Sign In <LogIn className="inline-block w-5 h-5 ml-2" />
              </>
            )}
          </motion.button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
