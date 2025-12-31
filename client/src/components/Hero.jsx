import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const categories = [
    "Electronic Devices", "Electronic Accessories", "Home & Lifestyle", 
    "Health & Beauty", "Men's Fashion", "Women's Fashion", 
    "Sports & Outdoor", "Groceries & Pets"
  ];

  const slides = [
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80", 
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80", 
    "https://images.unsplash.com/photo-1556656793-02715d8dd6f8?auto=format&fit=crop&w=1200&q=80"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div style={styles.heroContainer}>
      {/* Category Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>BROWSE CATEGORIES</div>
        <ul style={styles.catList}>
          {categories.map((cat, index) => (
            <li 
              key={index} 
              style={styles.catItem}
              onClick={() => navigate(`/?category=${encodeURIComponent(cat)}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f1f5f9';
                e.currentTarget.style.color = '#4f46e5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#475569';
              }}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Slider */}
      <div style={styles.slider}>
        <img src={slides[currentSlide]} alt="Banner" style={styles.slideImage} />
        
        {/* Modern Dots */}
        <div style={styles.dotsContainer}>
          {slides.map((_, idx) => (
            <div 
              key={idx} 
              onClick={() => setCurrentSlide(idx)}
              style={{
                ...styles.dot,
                background: currentSlide === idx ? '#4f46e5' : 'rgba(255,255,255,0.5)',
                width: currentSlide === idx ? '24px' : '8px'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  heroContainer: { 
    display: 'flex', 
    width: '92%', 
    maxWidth: '1280px', 
    margin: '30px auto', 
    background: 'white', 
    borderRadius: '12px', 
    overflow: 'hidden', 
    height: '420px', 
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
  },
  
  sidebar: { 
    width: '240px', 
    padding: '20px 0', 
    borderRight: '1px solid #f1f5f9',
    display: 'flex',
    flexDirection: 'column'
  },
  sidebarHeader: {
    padding: '0 25px 15px 25px',
    fontSize: '11px',
    fontWeight: '800',
    color: '#94a3b8',
    letterSpacing: '1px'
  },
  catList: { listStyle: 'none', padding: 0, margin: 0 },
  catItem: { 
    padding: '12px 25px', 
    fontSize: '14px', 
    color: '#475569', 
    cursor: 'pointer', 
    fontWeight: '500',
    transition: 'all 0.2s',
    display: 'flex',
    justifyContent: 'space-between'
  },
  
  slider: { flex: 1, position: 'relative', background: '#0f172a' },
  slideImage: { width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 },
  
  dotsContainer: { 
    position: 'absolute', bottom: '25px', left: '30px', 
    display: 'flex', gap: '8px' 
  },
  dot: { 
    height: '8px', 
    borderRadius: '4px', 
    cursor: 'pointer', 
    transition: 'all 0.3s ease' 
  }
};

export default Hero;