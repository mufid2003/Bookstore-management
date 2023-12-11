const Order = require('../models/Order');

// Controller to list all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to find only one order
exports.getOneOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to add a new order
exports.addOrder = async (req, res) => {
  const {
    user_id,
    items,
    status
  } = req.body;

  const newOrder = new Order({
    user_id,
    items,
    status
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to update an order
exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const {
    user_id,
    items,
    status
  } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        user_id,
        items,
        status
      },
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete an order
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
