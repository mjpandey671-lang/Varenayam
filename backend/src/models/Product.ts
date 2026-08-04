import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  image: { type: String, required: true },
  images: [{ type: String }],
  category: { type: String, required: true },
  sizes: [{ type: String }],
  colors: [{ type: String }],
  inStock: { type: Boolean, default: true },
  isNewProduct: { type: Boolean, default: false },
  isBestseller: { type: Boolean, default: false }
}, {
  timestamps: true
});

// Create model
const Product = mongoose.model('Product', productSchema);
export default Product;
