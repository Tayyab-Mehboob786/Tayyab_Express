import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import Profile from './pages/Profile'; // Import Profile

function App() {
  return (
    <Router>
      <div style={styles.appContainer}>
        
        {/* Top Navigation */}
        <Navbar />
        
        {/* Main Content Area */}
        <main style={styles.mainContent}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} /> {/* New Protected Route */}
          </Routes>
        </main>

        {/* Bottom Footer */}
        <Footer />
        
      </div>
    </Router>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', 
    backgroundColor: '#f1f5f9'
  },
  mainContent: {
    flex: 1, 
    width: '100%',
    margin: '0 auto'
  }
};

export default App;