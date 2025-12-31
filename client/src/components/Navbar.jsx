import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; 

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth(); 
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) navigate(`/?search=${searchTerm}`);
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        
        {/* Modern Logo */}
        <Link to="/" style={styles.logo}>
          <img src="/logo.png" alt="Logo" style={styles.logoImage} />
          <span>Tayyab<span style={{color: '#818cf8'}}>Express</span></span> {/* Indigo-400 Accent */}
        </Link>

        {/* Minimalist Search Bar */}
        <div style={styles.searchBox}>
          <input 
            type="text" 
            placeholder="Search essentials..." 
            style={styles.input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button style={styles.searchBtn} onClick={handleSearch}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
        </div>

        {/* Navigation & Profile */}
        <div style={styles.links}>
          {user ? (
            <div style={styles.userSection}>
              <Link to="/profile" style={styles.profileLink}>
                 <img 
                    src={user.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
                    alt="Profile" 
                    style={styles.profileImage}
                    title={user.fullName}
                 />
              </Link>
              <button onClick={logout} style={styles.logoutBtn}>Sign Out</button>
            </div>
          ) : (
            <div style={styles.authLinks}>
              <Link to="/login" style={styles.navLink}>Log In</Link>
              <Link to="/signup" style={styles.navBtn}>Get Started</Link>
            </div>
          )}

          <Link to="/cart" style={styles.cartLink}>
             <span style={{fontSize: '22px'}}>🛍️</span>
             {cart.length > 0 && <span style={styles.cartBadge}>{cart.length}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: { 
    backgroundColor: '#0f172a', // Slate-900 (Matte Dark)
    padding: '16px 0', 
    position: 'sticky', 
    top: 0, 
    zIndex: 1000,
    borderBottom: '1px solid #1e293b'
  },
  container: { 
    width: '92%', 
    maxWidth: '1280px', 
    margin: '0 auto', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between' 
  },
  logo: { 
    fontSize: '22px', 
    fontWeight: '700', 
    color: '#f8fafc', 
    textDecoration: 'none', 
    display: 'flex', 
    alignItems: 'center',
    letterSpacing: '-0.5px'
  },
  logoImage: { height: '32px', marginRight: '10px', objectFit: 'contain' },
  
  searchBox: { 
    display: 'flex', 
    flexGrow: 1, 
    margin: '0 60px', 
    maxWidth: '480px', 
    backgroundColor: '#1e293b', // Slate-800
    borderRadius: '8px', 
    padding: '6px 6px 6px 16px',
    border: '1px solid #334155'
  },
  input: { 
    width: '100%', 
    border: 'none', 
    outline: 'none', 
    background: 'transparent', 
    color: '#f1f5f9',
    fontSize: '14px',
    fontWeight: '500'
  },
  searchBtn: { 
    width: '36px',
    height: '36px',
    borderRadius: '6px',
    background: '#4f46e5', // Indigo-600
    border: 'none', 
    color: 'white', 
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s'
  },
  
  links: { display: 'flex', gap: '30px', alignItems: 'center' },
  userSection: { display: 'flex', alignItems: 'center', gap: '20px' },
  authLinks: { display: 'flex', gap: '20px', alignItems: 'center' },
  
  navLink: { color: '#cbd5e1', textDecoration: 'none', fontWeight: '500', fontSize: '14px', transition: 'color 0.2s' },
  navBtn: { 
    background: '#4f46e5', // Indigo-600
    color: 'white', 
    padding: '8px 20px', 
    borderRadius: '6px', 
    textDecoration: 'none', 
    fontWeight: '600', 
    fontSize: '13px',
    transition: 'background 0.2s'
  },
  
  profileImage: { width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #4f46e5', cursor: 'pointer' },
  logoutBtn: { background: 'none', border: '1px solid #475569', color: '#94a3b8', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '500' },
  
  cartLink: { position: 'relative', textDecoration: 'none' },
  cartBadge: { 
    position: 'absolute', 
    top: '-6px', 
    right: '-8px', 
    background: '#ef4444', 
    color: 'white', 
    fontSize: '10px', 
    fontWeight: 'bold', 
    width: '18px', 
    height: '18px', 
    borderRadius: '50%', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    border: '2px solid #0f172a'
  }
};

export default Navbar;