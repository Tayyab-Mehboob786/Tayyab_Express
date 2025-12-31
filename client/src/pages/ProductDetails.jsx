import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; 

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const { user } = useAuth(); 
  const [activeTab, setActiveTab] = useState('desc');

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        const found = res.data.find(p => p._id === id);
        setProduct(found);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      alert("⚠️ You must be logged in to add items to your cart!");
      navigate('/login');
      return;
    }
    if (product.stock <= 0) {
      alert("❌ Sorry, this item is out of stock.");
      return;
    }
    addToCart(product);
    alert("✅ Added to Cart!");
  };

  const handleBuyNow = () => {
    if (!user) {
      alert("⚠️ Please login to purchase items.");
      navigate('/login');
      return;
    }
    if (product.stock <= 0) {
        alert("❌ Sorry, this item is out of stock.");
        return;
    }
    addToCart(product);
    navigate('/cart');
  };

  // ✅ SMART IMAGE FIXER
  const handleImageError = (e) => {
    e.target.onerror = null; 
    e.target.src = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
  };

  if (!product) return <div style={{padding: '50px', textAlign: 'center'}}>Loading...</div>;

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.backBtn}>← Back</button>
      
      <div style={styles.topSection}>
        <div style={styles.imageContainer}>
          <img 
            src={product.image} 
            alt={product.title} 
            style={styles.image} 
            onError={handleImageError} // <--- Fix applied here
          />
        </div>

        <div style={styles.infoContainer}>
          <h1 style={styles.title}>{product.title}</h1>
          <div style={styles.brandRow}>
            Brand: <span style={{color: '#1a9cb7'}}>{product.brand || 'Generic'}</span>
            <span style={{margin: '0 10px'}}>|</span>
            <span style={{color: '#fbbf24'}}>★ {product.rating}</span>
            <span style={{marginLeft: '10px', color: '#666'}}>({product.reviews} Reviews)</span>
          </div>
          <hr style={{border: '0', borderTop: '1px solid #eee', margin: '15px 0'}} />
          <div style={styles.priceBox}>
            <span style={styles.price}>Rs. {product.price}</span>
            {product.discountPrice && <span style={styles.oldPrice}>Rs. {product.discountPrice}</span>}
            <span style={{marginLeft: '15px', fontSize: '13px', color: product.stock > 0 ? '#16a34a' : '#dc2626', fontWeight: 'bold'}}>
                {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
            </span>
          </div>
          <div style={styles.actions}>
            <button onClick={handleAddToCart} style={styles.addBtn}>Add to Cart</button>
            <button onClick={handleBuyNow} style={styles.buyBtn}>Buy Now</button>
          </div>
          <div style={styles.deliveryInfo}>
            <p>🚚 Standard Delivery (2-4 Days)</p>
            <p>🛡️ 7 Days Return Warranty</p>
          </div>
        </div>
      </div>

      <div style={styles.bottomSection}>
        <div style={styles.tabs}>
          <button style={activeTab === 'desc' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('desc')}>Specifications</button>
          <button style={activeTab === 'reviews' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('reviews')}>Reviews</button>
        </div>
        <div style={styles.tabContent}>
          {activeTab === 'desc' ? (
            <ul style={styles.specList}>
               {product.specifications?.length ? product.specifications.map((s,i)=><li key={i}>{s}</li>) : <li>No details available.</li>}
            </ul>
          ) : (
             <div>
               {product.reviewsList?.length ? product.reviewsList.map((r,i)=>(
                 <div key={i} style={{borderBottom:'1px solid #eee', padding:'10px 0'}}>
                    <strong>{r.user}</strong> <span style={{color:'#fbbf24'}}>★ {r.rating}</span>
                    <p style={{margin:'5px 0', color:'#555'}}>{r.comment}</p>
                 </div>
               )) : <p>No reviews yet.</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '1100px', margin: '20px auto', padding: '0 20px' },
  backBtn: { background: 'none', border: 'none', color: '#1a9cb7', cursor: 'pointer', marginBottom: '20px' },
  topSection: { display: 'flex', gap: '30px', background: 'white', padding: '20px', borderRadius: '4px', flexWrap: 'wrap' },
  imageContainer: { flex: 1, minWidth: '300px' },
  image: { width: '100%', borderRadius: '4px' },
  infoContainer: { flex: 1.5, minWidth: '300px' },
  title: { fontSize: '22px', margin: '0 0 10px 0', fontWeight: '400' },
  brandRow: { fontSize: '13px', color: '#757575' },
  priceBox: { display: 'flex', alignItems: 'baseline', marginBottom: '20px' },
  price: { fontSize: '30px', color: '#f85606', fontWeight: 'bold', marginRight: '10px' },
  oldPrice: { textDecoration: 'line-through', color: '#9e9e9e' },
  actions: { display: 'flex', gap: '10px', marginBottom: '20px' },
  addBtn: { flex: 1, padding: '12px', background: '#2dde98', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' },
  buyBtn: { flex: 1, padding: '12px', background: '#f85606', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' },
  deliveryInfo: { fontSize: '13px', color: '#555', lineHeight: '1.6' },
  bottomSection: { marginTop: '20px', background: 'white', padding: '20px' },
  tabs: { display: 'flex', borderBottom: '1px solid #eee', marginBottom: '20px' },
  tab: { padding: '10px 20px', background: 'none', border: 'none', cursor: 'pointer', color: '#555' },
  activeTab: { padding: '10px 20px', background: 'none', border: 'none', cursor: 'pointer', color: '#f85606', borderBottom: '2px solid #f85606', fontWeight: 'bold' },
  specList: { paddingLeft: '20px', color: '#555', lineHeight: '1.8' }
};

export default ProductDetails;