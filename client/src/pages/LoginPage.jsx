import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser({ email, password }));
    console.log(resultAction);
    if (loginUser.fulfilled.match(resultAction)) {
      navigate('/homepage');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="input mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="btn"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
