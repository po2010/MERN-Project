import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css'; // 👈 custom CSS

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '', role: 'taker' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.username || !form.password) {
      setError('All fields are required');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Registration failed');
      navigate('/auth');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <h2>📝 Register</h2>
      <p>Create your account to start making or taking quizzes!</p>
      <input name="username" value={form.username} onChange={handleChange} placeholder="Username" />
      <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" />
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="taker">Quiz Taker</option>
        <option value="maker">Quiz Maker</option>
      </select>
      {error && <p className="error">{error}</p>}
      <button onClick={handleSubmit}>Register</button>
      <p onClick={() => navigate('/auth')} className="login-link">Already have an account? Login here</p>
    </div>
  );
}

export default RegisterPage;
