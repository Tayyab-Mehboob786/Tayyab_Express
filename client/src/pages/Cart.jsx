import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // Import Auth
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { user } = useAuth(); // Get current logged-in user
  const navigate = useNavigate();

  const subtotal = getCartTotal();
  const deliveryCharges = subtotal > 0 ? 150 : 0; 
  const grandTotal = subtotal + deliveryCharges;

  const handleCheckout = async () => {
    // 1. Check if Cart is empty
    if (cart.length === 0) return;

    // 2. Check if User is Logged In
    if (!user) {
      alert("⚠️ You must be logged in to place an order.");
      navigate('/login');
      return;
    }
    
    // 3. Confirm & Send Request
    const confirm = window.confirm(`Place order for Rs. ${grandTotal}?`);
    if (confirm) {
      try {
        await axios.post('http://localhost:5000/api/checkout', { 
          cartItems: cart,
          userId: user._id || user.id, // Send User ID
          userName: user.fullName,     // Send Name
          totalAmount: grandTotal      // Send Total
        });
        
        clearCart();
        alert('✅ Order Placed Successfully! You can view it in your Profile.');
        navigate('/profile'); // Redirect to Profile History
      } catch (err) {
        alert('❌ Error: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Your Cart is Empty</h2>
        <Link to="/" style={{ color: '#0f172a', fontWeight: 'bold' }}>Go Shopping</Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Shopping Cart ({cart.length} items)</h2>

      <div style={styles.content}>
        <div style={styles.cartList}>
          {cart.map((item) => (
            <div key={item._id} style={styles.cartItem}>
              <img src={item.image} alt={item.title} style={styles.itemImage} />
              
              <div style={styles.itemInfo}>
                <h4 style={styles.itemTitle}>{item.title}</h4>
                <p style={styles.itemPrice}>Rs. {item.price}</p>
                <button onClick={() => removeFromCart(item._id)} style={styles.removeBtn}>Remove</button>
              </div>

              <div style={styles.quantityControl}>
                <button onClick={() => updateQuantity(item._id, -1)} style={styles.qtyBtn}>-</button>
                <span style={styles.qtyValue}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, 1)} style={styles.qtyBtn}>+</button>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.summary}>
          <h3 style={styles.summaryTitle}>Order Summary</h3>
          <div style={styles.row}><span>Subtotal</span><span>Rs. {subtotal}</span></div>
          <div style={styles.row}><span>Delivery Fee</span><span>Rs. {deliveryCharges}</span></div>
          <hr style={{ margin: '15px 0', border: '0', borderTop: '1px solid #ddd' }} />
          <div style={{ ...styles.row, fontSize: '18px', fontWeight: 'bold', color: '#0f172a' }}>
            <span>Total</span><span>Rs. {grandTotal}</span>
          </div>
          <button onClick={handleCheckout} style={styles.checkoutBtn}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '1100px', margin: '30px auto', padding: '0 20px' },
  heading: { marginBottom: '20px', color: '#0f172a' },
  content: { display: 'flex', gap: '30px', flexDirection: 'row', flexWrap: 'wrap' },
  cartList: { flex: 2, background: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
  cartItem: { display: 'flex', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '20px' },
  itemImage: { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', marginRight: '15px' },
  itemInfo: { flex: 1 },
  itemTitle: { margin: '0 0 5px 0', fontSize: '14px', color: '#333' },
  itemPrice: { color: '#f85606', fontWeight: 'bold', marginBottom: '5px' },
  removeBtn: { background: 'none', border: 'none', color: '#ef4444', fontSize: '12px', cursor: 'pointer', padding: 0 },
  quantityControl: { display: 'flex', alignItems: 'center', gap: '10px' },
  qtyBtn: { width: '30px', height: '30px', background: '#f1f5f9', border: 'none', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' },
  qtyValue: { width: '20px', textAlign: 'center' },
  summary: { flex: 1, background: 'white', borderRadius: '8px', padding: '20px', height: 'fit-content', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
  summaryTitle: { marginTop: 0, marginBottom: '20px', color: '#0f172a' },
  row: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: '#555' },
  checkoutBtn: { width: '100%', padding: '15px', background: '#f85606', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px', marginTop: '10px' }
};

export default Cart;