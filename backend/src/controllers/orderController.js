const Order = require('../models/Order');

// Controller to get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to create a new order
exports.createOrder = async (req, res) => {
  const order = new Order({
    user_id: req.body.user_id,
    items: req.body.items,
    status: req.body.status,
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
