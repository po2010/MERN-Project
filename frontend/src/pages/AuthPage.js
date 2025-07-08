import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthPage.css';

function AuthPage({ role }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    try {
      const res = await axios.post('https://mern-project-backend2-9eul.onrender.com/api/auth/login', {
        username,
        password
      });

      // Save token or session info
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="auth-container">
  <div className="auth-box">
    <h2>{role === 'maker' ? '🔧 Quiz Maker Login' : '🧠 Quiz Taker Login'}</h2>
    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
    {error && <p className="error">{error}</p>}
    <button onClick={handleLogin}>🔐 Login</button>
    <p>
      Don't have an account?{' '}
      <span className="register-link" onClick={handleRegisterRedirect}>
        Register here
      </span>
    </p>
  </div>
</div>
  );
}

export default AuthPage;
