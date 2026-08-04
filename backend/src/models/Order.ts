import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  size: { type: String },
  color: { type: String }
});

const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true }
});

const orderSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  status: { 
    type: String, 
    required: true,
    enum: ['Processing', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Processing'
  },
  total: { type: Number, required: true },
  items: [orderItemSchema],
  shippingAddress: addressSchema
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
