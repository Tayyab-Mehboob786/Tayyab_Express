import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  items: [
    {
      title: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],
  totalAmount: Number,
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);