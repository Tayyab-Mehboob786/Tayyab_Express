import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      alert(res.data.message);
      login(res.data.user);
      navigate('/'); 
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={{margin: 0, color: '#1e293b'}}>Welcome Back</h2>
          <p style={{margin: '5px 0 0', color: '#64748b', fontSize: '14px'}}>Please enter your details</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              style={styles.input}
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              style={styles.input}
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          <button type="submit" style={styles.btn}>Sign In</button>
        </form>
        
        <p style={{textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748b'}}>
          Don't have an account? <Link to="/signup" style={{color: '#4f46e5', fontWeight: '600', textDecoration: 'none'}}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: { 
    minHeight: '80vh', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    // BACKGROUND LOGIC:
    backgroundImage: 'linear-gradient(rgba(248, 250, 252, 0.9), rgba(248, 250, 252, 0.9)), url("/logo.png")', 
    backgroundSize: '300px',  // Size of the logo pattern
    backgroundRepeat: 'space', // Repeats the logo nicely
    backgroundPosition: 'center',
  },
  card: { 
    background: 'white', 
    padding: '40px', 
    borderRadius: '16px', 
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', 
    width: '100%', 
    maxWidth: '400px',
    border: '1px solid #e2e8f0'
  },
  header: { marginBottom: '30px', textAlign: 'center' },
  inputGroup: { marginBottom: '20px' },
  label: { display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#334155' },
  input: { 
    width: '100%', 
    padding: '12px 16px', 
    borderRadius: '8px', 
    border: '1px solid #cbd5e1', 
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s'
  },
  btn: { 
    width: '100%', 
    padding: '12px', 
    background: '#4f46e5', 
    color: 'white', 
    border: 'none', 
    borderRadius: '8px', 
    cursor: 'pointer', 
    fontWeight: '600',
    fontSize: '14px',
    marginTop: '10px',
    transition: 'background 0.2s'
  }
};

export default Login;