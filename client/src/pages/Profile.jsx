import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  
  const [orders, setOrders] = useState([]);
  const [uploading, setUploading] = useState(false);
  
  // EDIT MODE STATES
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      // 1. Load User Data into Form
      setFormData({
        fullName: user.fullName || '',
        phone: user.phone || ''
      });

      // 2. Fetch Orders
      axios.get(`http://localhost:5000/api/orders/${user._id}`)
        .then(res => setOrders(res.data))
        .catch(err => console.error("Error fetching orders:", err));
    }
  }, [user, navigate]);

  // --- HANDLERS ---

  // 1. Handle Profile Picture Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const base64Image = reader.result;
        const res = await axios.put(`http://tayyab-express-server.vercel.app/api/auth/profile/${user._id}`, {
          image: base64Image
        });
        updateUser(res.data.user);
        alert("✅ Profile Picture Updated!");
      } catch (err) {
        console.error(err);
        alert("❌ Failed to upload image.");
      } finally {
        setUploading(false);
      }
    };
  };

  // 2. Handle Text Info Update
  const handleSaveInfo = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/auth/profile/${user._id}`, {
        fullName: formData.fullName,
        phone: formData.phone
      });
      
      updateUser(res.data.user); // Update Context immediately
      setIsEditing(false);       // Exit Edit Mode
      alert("✅ Profile Info Updated!");
    } catch (err) {
      alert("❌ Update Failed: " + (err.response?.data?.message || err.message));
    }
  };

  if (!user) return null;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>My Profile</h1>
      </div>

      <div style={styles.card}>
        <div style={styles.topSection}>
          {/* Profile Image Section */}
          <div style={styles.imageWrapper}>
            <img 
              src={user.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
              alt="Profile" 
              style={styles.profileImage}
            />
            <label htmlFor="file-upload" style={styles.editIcon} title="Change Picture">
              📷
            </label>
            <input 
              id="file-upload" 
              type="file" 
              accept="image/*" 
              style={{display: 'none'}} 
              onChange={handleImageUpload}
            />
            {uploading && <span style={styles.uploadingText}>Uploading...</span>}
          </div>
          
          {/* User Info / Edit Form */}
          <div style={styles.infoBlock}>
            {isEditing ? (
              // EDIT MODE
              <div style={styles.editForm}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Full Name</label>
                  <input 
                    type="text" 
                    value={formData.fullName} 
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    style={styles.input}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Phone</label>
                  <input 
                    type="text" 
                    value={formData.phone} 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    style={styles.input}
                  />
                </div>
                <div style={styles.btnRow}>
                  <button onClick={handleSaveInfo} style={styles.saveBtn}>Save</button>
                  <button onClick={() => setIsEditing(false)} style={styles.cancelBtn}>Cancel</button>
                </div>
              </div>
            ) : (
              // VIEW MODE
              <div>
                <h2 style={styles.userName}>{user.fullName}</h2>
                <p style={styles.userEmail}>{user.email}</p>
                <div style={styles.detailRow}>
                  <span style={styles.icon}>📞</span> {user.phone}
                </div>
                <button onClick={() => setIsEditing(true)} style={styles.editBtn}>
                   Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>

        <button onClick={logout} style={styles.logoutBtn}>Sign Out</button>
      </div>

      <h2 style={styles.sectionTitle}>Order History</h2>
      
      {orders.length === 0 ? (
        <div style={styles.emptyState}>No orders placed yet.</div>
      ) : (
        <div style={styles.orderGrid}>
          {orders.map(order => (
            <div key={order._id} style={styles.orderCard}>
              <div style={styles.orderHeader}>
                <span style={{color: '#64748b'}}>Placed: {new Date(order.date).toLocaleDateString()}</span>
                <span style={styles.total}>Rs. {order.totalAmount?.toLocaleString()}</span>
              </div>
              <div style={styles.itemsList}>
                {order.items.map((item, idx) => (
                  <div key={idx} style={styles.itemRow}>
                    <img src={item.image} alt="product" style={styles.itemImage} />
                    <div style={{marginLeft: '15px'}}>
                      <div style={styles.itemTitle}>{item.title}</div>
                      <div style={styles.itemMeta}>Rs. {item.price} x {item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { maxWidth: '900px', margin: '40px auto', padding: '0 20px', fontFamily: "'Inter', sans-serif" },
  pageTitle: { fontSize: '28px', color: '#1e293b', marginBottom: '20px' },
  
  card: { background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '40px' },
  topSection: { display: 'flex', gap: '30px', alignItems: 'flex-start', marginBottom: '20px' },
  
  imageWrapper: { position: 'relative', width: '100px', height: '100px', flexShrink: 0 },
  profileImage: { width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '4px solid #f1f5f9' },
  editIcon: { position: 'absolute', bottom: '0', right: '0', background: '#4f46e5', color: 'white', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '3px solid white', fontSize: '14px' },
  uploadingText: { position: 'absolute', bottom: '-25px', left: '0', fontSize: '11px', color: '#f59e0b', width: '100%', textAlign: 'center' },
  
  infoBlock: { flex: 1 },
  userName: { margin: '0 0 5px 0', color: '#0f172a', fontSize: '24px' },
  userEmail: { margin: '0 0 15px 0', color: '#64748b', fontSize: '15px' },
  detailRow: { display: 'flex', alignItems: 'center', gap: '8px', color: '#334155', fontSize: '15px', marginBottom: '15px' },
  
  // EDIT FORM STYLES
  editForm: { display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '300px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
  label: { fontSize: '12px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' },
  input: { padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' },
  btnRow: { display: 'flex', gap: '10px', marginTop: '5px' },
  saveBtn: { padding: '8px 16px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' },
  cancelBtn: { padding: '8px 16px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' },
  
  editBtn: { background: 'white', border: '1px solid #cbd5e1', color: '#334155', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px', transition: 'all 0.2s' },
  logoutBtn: { float: 'right', background: '#fef2f2', color: '#ef4444', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', marginTop: '-40px' }, // Floating Logout
  
  sectionTitle: { fontSize: '22px', color: '#0f172a', marginBottom: '20px', fontWeight: '700' },
  emptyState: { padding: '40px', textAlign: 'center', background: 'white', borderRadius: '12px', color: '#94a3b8' },
  orderGrid: { display: 'grid', gap: '20px' },
  orderCard: { background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' },
  orderHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px', fontSize: '14px', fontWeight: '500' },
  total: { color: '#0f172a', fontWeight: '700' },
  itemsList: { display: 'flex', flexDirection: 'column', gap: '15px' },
  itemRow: { display: 'flex', alignItems: 'center' },
  itemImage: { width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' },
  itemTitle: { fontWeight: '600', fontSize: '14px', color: '#1e293b' },
  itemMeta: { fontSize: '12px', color: '#64748b' }
};

export default Profile;