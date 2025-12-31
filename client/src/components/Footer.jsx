import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        
        {/* Column 1: Customer Care */}
        <div style={styles.column}>
          <h3 style={styles.heading}>Customer Care</h3>
          <p style={styles.text}>Help Center</p>
          <p style={styles.text}>How to Buy</p>
          <p style={styles.text}>Returns & Refunds</p>
          <p style={styles.text}>Contact Us</p>
        </div>

        {/* Column 2: Brand Info */}
        <div style={styles.column}>
          <h3 style={styles.heading}>Tayyab Express</h3>
          <p style={styles.text}>About Us</p>
          <p style={styles.text}>Careers</p>
          <p style={styles.text}>Blog</p>
          <p style={styles.text}>Terms & Conditions</p>
        </div>

        {/* Column 3: Payment Methods */}
        <div style={styles.column}>
          <h3 style={styles.heading}>Payment Methods</h3>
          <div style={styles.row}>
            <span style={styles.badge}>VISA</span>
            <span style={styles.badge}>MasterCard</span>
            <span style={styles.badge}>EasyPaisa</span>
            <span style={styles.badge}>Cash on Delivery</span>
          </div>
        </div>

        {/* Column 4: Follow Us */}
        <div style={styles.column}>
          <h3 style={styles.heading}>Follow Us</h3>
          <div style={styles.socialRow}>
             {/* Using simple text/emojis if icons aren't installed */}
             <span style={styles.socialIcon}>📘 Facebook</span>
             <span style={styles.socialIcon}>📸 Instagram</span>
             <span style={styles.socialIcon}>▶ Youtube</span>
          </div>
        </div>

      </div>
      
      {/* Bottom Copyright Bar */}
      <div style={styles.bottomBar}>
        © 2025 Tayyab Express - All Rights Reserved
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#0f172a', // Midnight Blue (Primary Brand Color)
    color: '#94a3b8',           // Soft Gray Text
    padding: '60px 0 0 0',
    marginTop: '60px',
    borderTop: '4px solid #fbbf24', // Electric Gold Accent Line
    fontFamily: 'Poppins, sans-serif'
  },
  container: {
    width: '90%',
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingBottom: '30px'
  },
  column: {
    flex: '1',
    minWidth: '220px',
    marginBottom: '30px'
  },
  heading: {
    fontSize: '16px',
    marginBottom: '20px',
    fontWeight: '700',
    color: 'white',             // White Headings
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  text: {
    fontSize: '14px',
    marginBottom: '10px',
    cursor: 'pointer',
    transition: 'color 0.2s',
    width: 'fit-content'
  },
  row: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  badge: {
    backgroundColor: 'white',
    color: '#0f172a',
    padding: '6px 12px',
    fontSize: '12px',
    borderRadius: '4px',
    fontWeight: 'bold',
    border: '1px solid #ccc'
  },
  socialRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  socialIcon: {
    cursor: 'pointer',
    fontSize: '14px',
    color: '#fbbf24' // Gold color for social links
  },
  bottomBar: {
    backgroundColor: '#020617', // Even darker shade for the very bottom
    color: '#64748b',
    textAlign: 'center',
    padding: '20px',
    fontSize: '13px',
    borderTop: '1px solid #1e293b'
  }
};

export default Footer;