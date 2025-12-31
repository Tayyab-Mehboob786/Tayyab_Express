import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from './models/Product.js'; 

dotenv.config();

// EXTENSIVE LIST OF UNIQUE IMAGES PER CATEGORY
const uniqueProducts = [
  // --- ELECTRONIC DEVICES ---
  { category: "Electronic Devices", title: "iPhone 14 Pro Max", image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=600&q=80" },
  { category: "Electronic Devices", title: "Samsung S23 Ultra", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80" },
  { category: "Electronic Devices", title: "MacBook Air M2", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&w=600&q=80" },
  { category: "Electronic Devices", title: "Sony 4K TV", image: "https://images.unsplash.com/photo-1593784991095-a20506948430?auto=format&fit=crop&w=600&q=80" },
  { category: "Electronic Devices", title: "iPad Pro 12.9", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80" },
  { category: "Electronic Devices", title: "Dell XPS 15", image: "https://images.unsplash.com/photo-1593642632823-8f7853674697?auto=format&fit=crop&w=600&q=80" },
  { category: "Electronic Devices", title: "Canon EOS R5", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80" },
  { category: "Electronic Devices", title: "Logitech Gaming Mouse", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80" },
  { category: "Electronic Devices", title: "Mechanical Keyboard", image: "https://images.unsplash.com/photo-1587829741301-dc798b91add1?auto=format&fit=crop&w=600&q=80" },
  { category: "Electronic Devices", title: "GoPro Hero 11", image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=600&q=80" },

  // --- ELECTRONIC ACCESSORIES ---
  { category: "Electronic Accessories", title: "AirPods Pro 2", image: "https://images.unsplash.com/photo-1603351154351-5cfb3e19ef0f?auto=format&fit=crop&w=600&q=80" },
  { category: "Electronic Accessories", title: "JBL Bluetooth Speaker", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80" },
  { category: "Electronic Accessories", title: "Samsung Smart Watch", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80" },
  { category: "Electronic Accessories", title: "Anker Power Bank", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=600&q=80" },
  { category: "Electronic Accessories", title: "USB-C Fast Charger", image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80" },
  { category: "Electronic Accessories", title: "Laptop Cooling Pad", image: "https://images.unsplash.com/photo-1587829741301-dc798b91add1?auto=format&fit=crop&w=600&q=80" },
  { category: "Electronic Accessories", title: "External Hard Drive 2TB", image: "https://images.unsplash.com/photo-1531492326212-3286f7f6a33c?auto=format&fit=crop&w=600&q=80" },
  { category: "Electronic Accessories", title: "Phone Tripod Stand", image: "https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=600&q=80" },

  // --- HOME & LIFESTYLE ---
  { category: "Home & Lifestyle", title: "Modern Desk Lamp", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80" },
  { category: "Home & Lifestyle", title: "Ceramic Coffee Mug", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80" },
  { category: "Home & Lifestyle", title: "Cotton Bedsheet Set", image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=600&q=80" },
  { category: "Home & Lifestyle", title: "Non-Stick Frying Pan", image: "https://images.unsplash.com/photo-1590486803833-1c5dc8ce2ac3?auto=format&fit=crop&w=600&q=80" },
  { category: "Home & Lifestyle", title: "Aromatic Candles", image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80" },
  { category: "Home & Lifestyle", title: "Indoor Plant Pot", image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80" },
  { category: "Home & Lifestyle", title: "Wall Clock Vintage", image: "https://images.unsplash.com/photo-1563861826100-9cb868c625b8?auto=format&fit=crop&w=600&q=80" },

  // --- MEN'S FASHION ---
  { category: "Men's Fashion", title: "Denim Jacket", image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=600&q=80" },
  { category: "Men's Fashion", title: "White Sneakers", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80" },
  { category: "Men's Fashion", title: "Formal Oxford Shirt", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80" },
  { category: "Men's Fashion", title: "Leather Wallet", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80" },
  { category: "Men's Fashion", title: "Aviator Sunglasses", image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=600&q=80" },
  { category: "Men's Fashion", title: "Classic Wrist Watch", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80" },

  // --- WOMEN'S FASHION ---
  { category: "Women's Fashion", title: "Summer Floral Dress", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80" },
  { category: "Women's Fashion", title: "Red Leather Handbag", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80" },
  { category: "Women's Fashion", title: "High Heel Sandals", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80" },
  { category: "Women's Fashion", title: "Gold Pendant Necklace", image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=600&q=80" },
  { category: "Women's Fashion", title: "Cat Eye Sunglasses", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80" },

  // --- HEALTH & BEAUTY ---
  { category: "Health & Beauty", title: "Vitamin C Serum", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80" },
  { category: "Health & Beauty", title: "Matte Lipstick Set", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80" },
  { category: "Health & Beauty", title: "Perfume for Men", image: "https://images.unsplash.com/photo-1523293188086-b46e0a867f5c?auto=format&fit=crop&w=600&q=80" },
  { category: "Health & Beauty", title: "Organic Face Wash", image: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&w=600&q=80" },

  // --- SPORTS ---
  { category: "Sports & Outdoor", title: "Yoga Mat Non-Slip", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=600&q=80" },
  { category: "Sports & Outdoor", title: "Dumbbells Set (5kg)", image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?auto=format&fit=crop&w=600&q=80" },
  { category: "Sports & Outdoor", title: "Running Shoes Neon", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80" },
  { category: "Sports & Outdoor", title: "Soccer Ball Size 5", image: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?auto=format&fit=crop&w=600&q=80" },

  // --- GROCERIES ---
  { category: "Groceries & Pets", title: "Organic Green Tea", image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=600&q=80" },
  { category: "Groceries & Pets", title: "Premium Dog Food", image: "https://images.unsplash.com/photo-1589924691195-41432c84c161?auto=format&fit=crop&w=600&q=80" },
  { category: "Groceries & Pets", title: "Olive Oil Extra Virgin", image: "https://images.unsplash.com/photo-1474979266404-7cadd259c308?auto=format&fit=crop&w=600&q=80" },
  { category: "Groceries & Pets", title: "Dark Chocolate Bar", image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=600&q=80" }
];

const generateProducts = () => {
  // We will map over our unique list to create full product objects
  return uniqueProducts.map((item) => {
    const price = Math.floor(Math.random() * 10000) + 500;
    
    return {
      title: item.title,
      price: price,
      discountPrice: Math.random() > 0.6 ? Math.floor(price * 0.85) : null, // 15% discount sometimes
      image: item.image,
      category: item.category,
      rating: (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1), // High ratings 4.0+
      reviews: Math.floor(Math.random() * 300) + 20,
      stock: Math.floor(Math.random() * 80) + 10,
      brand: "Tayyab Select",
      specifications: [
        "Premium Quality Material",
        "Authentic & Genuine",
        "1 Year Local Warranty",
        "Best Seller 2024"
      ],
      reviewsList: []
    };
  });
};

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('🔗 Connected to DB...');
    
    console.log('🧹 Clearing old repetitive products...');
    await Product.deleteMany({}); 

    console.log('🌱 Seeding unique products...');
    const newProducts = generateProducts();
    await Product.insertMany(newProducts);
    
    console.log(`✅ Successfully Seeded ${newProducts.length} Unique Products!`);
    process.exit();
  })
  .catch(err => {
    console.error("❌ Seeding Error:", err);
    process.exit(1);
  });