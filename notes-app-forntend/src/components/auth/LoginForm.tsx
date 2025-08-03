import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';
import toast from 'react-hot-toast';

const LoginForm = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { username, password });
      login(data);
      navigate('/dashboard');
      toast.success(`Welcome back, ${data.username}!`);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to login');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
        <input 
          id="username"
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" 
          required 
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input 
          id="password"
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" 
          required 
        />
      </div>
      <button type="submit" className="w-full py-3 px-4 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-600 transition duration-300 shadow-sm">
        Login
      </button>
    </form>
  );
};

export default LoginForm;