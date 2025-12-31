import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', phone: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('tayyab-express-server.vercel.app/api/auth/register', formData);
      alert(res.data.message);
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={{margin: 0, color: '#1e293b'}}>Create an Account</h2>
          <p style={{margin: '5px 0 0', color: '#64748b', fontSize: '14px'}}>Join Tayyab Express today</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input 
              type="text" placeholder="abc" style={styles.input}
              value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input 
              type="email" placeholder="abc@example.com" style={styles.input}
              value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Phone Number</label>
            <input 
              type="text" placeholder="+92 300 1234567" style={styles.input}
              value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" placeholder="Create a password" style={styles.input}
              value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required
            />
          </div>
          <button type="submit" style={styles.btn}>Create Account</button>
        </form>
        
        <p style={{textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748b'}}>
          Already have an account? <Link to="/login" style={{color: '#4f46e5', fontWeight: '600', textDecoration: 'none'}}>Log in</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: { 
    minHeight: '90vh', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    // BACKGROUND LOGIC:
    backgroundImage: 'linear-gradient(rgba(248, 250, 252, 0.9), rgba(248, 250, 252, 0.9)), url("/logo.png")', 
    backgroundSize: '300px', 
    backgroundRepeat: 'space', 
    backgroundPosition: 'center',
    padding: '20px'
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
  header: { marginBottom: '25px', textAlign: 'center' },
  inputGroup: { marginBottom: '15px' },
  label: { display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155', textTransform: 'uppercase' },
  input: { 
    width: '100%', 
    padding: '10px 14px', 
    borderRadius: '8px', 
    border: '1px solid #cbd5e1', 
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
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
    marginTop: '10px'
  }
};

export default Signup;