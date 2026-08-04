import express from 'express';
import Product from '../models/Product';

const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    // Map _id to id for the frontend
    const mappedProducts = products.map(p => {
      const productObj = p.toObject();
      productObj.id = productObj._id;
      return productObj;
    });
    res.json(mappedProducts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST create a product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    const createdProduct = await product.save();
    
    const productObj = createdProduct.toObject();
    productObj.id = productObj._id;
    
    res.status(201).json(productObj);
  } catch (error) {
    res.status(400).json({ message: 'Invalid product data', error });
  }
});

// PUT update a product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (product) {
      const productObj = product.toObject();
      productObj.id = productObj._id;
      res.json(productObj);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid product data' });
  }
});

// DELETE a product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
