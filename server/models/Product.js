import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  image: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  // New Fields
  brand: { type: String, default: 'Generic' },
  stock: { type: Number, default: 100 },
  specifications: { type: [String], default: [] }, // Array of specs
  reviewsList: [
    {
      user: String,
      rating: Number,
      comment: String,
      date: { type: Date, default: Date.now }
    }
  ]
});

export default mongoose.model('Product', productSchema);