import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from './UserContext';
import './Login.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setEmail } = useUser();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/users/login', form);
      if (res.status === 200) {
        setEmail(form.email);
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>

        {error && <div className="message">{error}</div>}

        <div className="register-link">
          New user? <Link to="/register">Register here</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
