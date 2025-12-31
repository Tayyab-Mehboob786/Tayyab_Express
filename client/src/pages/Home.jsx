import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hero from '../components/Hero'; 
import { Link, useLocation } from 'react-router-dom'; 

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); 

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('search');
  const categoryTerm = queryParams.get('category');

  useEffect(() => {
    setLoading(true);
    let url = 'http://tayyab-express-server.vercel.app/api/products';
    if (searchTerm) url += `?q=${encodeURIComponent(searchTerm)}`;
    else if (categoryTerm) url += `?category=${encodeURIComponent(categoryTerm)}`;

    axios.get(url).then(res => {
      setProducts(res.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [location.search]); 

  const handleImageError = (e) => {
    e.target.onerror = null; 
    e.target.src = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
      
      {!searchTerm && !categoryTerm && <Hero />}

      <div style={{ width: '92%', margin: '40px auto', maxWidth: '1280px' }}>
        <div style={styles.headerRow}>
           <h1 style={styles.sectionTitle}>
             {searchTerm ? `Search: "${searchTerm}"` : categoryTerm ? categoryTerm : "Curated For You"}
           </h1>
           {!searchTerm && !categoryTerm && <Link to="/" style={styles.viewAll}>View All Products →</Link>}
        </div>
        
        {loading ? (
          <div style={{textAlign: 'center', padding: '60px'}}>
             <div style={styles.spinner}></div>
             <p style={{color: '#64748b', marginTop: '10px'}}>Loading catalog...</p>
          </div>
        ) : products.length === 0 ? (
          <div style={{textAlign: 'center', padding: '60px'}}>
            <h3 style={{color: '#475569', fontSize: '20px'}}>No products found.</h3>
            <Link to="/" style={styles.resetBtn}>Reset Filters</Link>
          </div>
        ) : (
          <div style={styles.grid}>
            {products.map(product => (
              <Link to={`/product/${product._id}`} key={product._id} style={{textDecoration: 'none'}}>
                <div style={styles.card}>
                  <div style={styles.imageWrapper}>
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      style={styles.image} 
                      onError={handleImageError} 
                    />
                    {product.stock <= 0 && <div style={styles.outStockOverlay}>Out of Stock</div>}
                  </div>
                  
                  <div style={styles.cardContent}>
                    <p style={styles.category}>{product.category}</p>
                    <h3 style={styles.title}>{product.title}</h3>
                    
                    <div style={styles.footer}>
                       <div>
                          <span style={styles.price}>Rs. {product.price.toLocaleString()}</span>
                          {product.discountPrice && <span style={styles.discount}>Rs. {product.discountPrice.toLocaleString()}</span>}
                       </div>
                       <button style={styles.iconBtn}>+</button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '25px', borderBottom: '1px solid #e2e8f0', paddingBottom: '15px' },
  sectionTitle: { fontSize: '24px', color: '#0f172a', fontWeight: '700', margin: 0 },
  viewAll: { color: '#4f46e5', textDecoration: 'none', fontWeight: '600', fontSize: '14px' },
  
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '25px' },
  
  // MODERN CARD DESIGN
  card: { 
    backgroundColor: 'white', 
    borderRadius: '12px', 
    overflow: 'hidden', 
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)', // Tailwind 'shadow-md'
    cursor: 'pointer', 
    transition: 'all 0.2s ease-in-out', 
    height: '100%', 
    display: 'flex', 
    flexDirection: 'column',
    border: '1px solid #f1f5f9'
  },
  
  imageWrapper: { 
    width: '100%', 
    height: '240px', 
    position: 'relative',
    backgroundColor: '#f1f5f9'
  },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  outStockOverlay: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    background: 'rgba(0,0,0,0.6)', color: 'white',
    textAlign: 'center', padding: '5px', fontSize: '12px', fontWeight: 'bold'
  },
  
  cardContent: { padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 },
  category: { fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '6px' },
  title: { fontSize: '15px', fontWeight: '600', margin: '0 0 12px 0', color: '#1e293b', lineHeight: '1.5', height: '44px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical' },
  
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' },
  price: { color: '#0f172a', fontSize: '18px', fontWeight: '700' },
  discount: { fontSize: '12px', color: '#94a3b8', textDecoration: 'line-through', marginLeft: '8px' },
  
  iconBtn: { 
    width: '32px', height: '32px', 
    borderRadius: '50%', 
    border: '1px solid #e2e8f0', 
    background: 'white', 
    color: '#4f46e5',
    cursor: 'pointer',
    fontSize: '18px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s'
  },
  
  resetBtn: { color: '#4f46e5', fontWeight: '600', textDecoration: 'none', fontSize: '14px' },
  spinner: { width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTop: '4px solid #4f46e5', borderRadius: '50%', margin: '0 auto', animation: 'spin 1s linear infinite' }
};

export default Home;