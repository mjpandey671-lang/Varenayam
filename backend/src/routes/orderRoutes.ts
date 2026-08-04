import express from 'express';
import Order from '../models/Order';

const router = express.Router();

// GET all orders (for admin)
router.get('/', async (req, res) => {
  try {
    // Populate product details in items
    const orders = await Order.find({}).populate('items.product').sort({ date: -1 });
    
    const mappedOrders = orders.map(o => {
      const orderObj = o.toObject();
      orderObj.id = orderObj._id;
      return orderObj;
    });
    
    res.json(mappedOrders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST create an order (for user checkout)
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    const createdOrder = await order.save();
    
    const orderObj = createdOrder.toObject();
    orderObj.id = orderObj._id;
    
    res.status(201).json(orderObj);
  } catch (error) {
    res.status(400).json({ message: 'Invalid order data', error });
  }
});

// PUT update order status (for admin)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    
    if (order) {
      order.status = status;
      const updatedOrder = await order.save();
      
      const orderObj = updatedOrder.toObject();
      orderObj.id = orderObj._id;
      
      res.json(orderObj);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
