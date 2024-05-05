const Order = require('../models/Order');
const User = require('../models/User');
const Book = require('../models/Book')

// Controller to list all orders
exports.getAllOrders = async (req, res) => {
  try {
    // Find all orders and populate the user and book details
    const orders = await Order.find().populate({
      path: 'user_id',
      model: 'User', // Replace with the actual name of your User model
    }).populate({
      path: 'items.book_id',
      model: 'Book', // Replace with the actual name of your Book model
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found.' });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Controller to get order details by order id with user and book details
exports.getOneOrder = async (req, res) => {
  const { id } = req.params;// Assuming you pass the orderId as a route parameter

  try {
    // Find the order with the given order_id and populate the user and book details
    const order = await Order.findById(id).populate({
      path: 'user_id',
      model: 'User', // Replace with the actual name of your User model
    }).populate({
      path: 'items.book_id',
      model: 'Book', // Replace with the actual name of your Book model
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Controller to add a new order
exports.addOrder = async (req, res) => {
  const { user_id, items, status } = req.body;

  try {
    // Check availability of each book
    for (const item of items) {
      const book = await Book.findById(item.book_id);
      if (!book) {
        return res.status(400).json({ message: `Book with ID ${item.book_id} not found.` });
      }
      if (item.quantity > book.quantity) {
        return res.status(400).json({ message: `Ordered quantity exceeds available quantity for book ${book.title}.` });
      }
    }

    // Calculate the amount based on the quantity and price of each book
    const amount = items.reduce((totalAmount, item) => {
      return totalAmount + item.quantity * item.price;
    }, 0);

    const newOrder = new Order({
      user_id,
      items,
      amount, // Add the calculated amount
      status,
    });

    const savedOrder = await newOrder.save();

    // Update the user's order array in the User schema
    await User.findByIdAndUpdate(user_id, {
      $push: {
        orders: {
          order_id: savedOrder._id,
          status: savedOrder.status,
        },
      },
    });

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


//controller to get all orders done by a user.
exports.getAllOrdersByUser = async (req, res) => {
  const userId = req.params.userId; // Assuming you pass the userId as a route parameter

  try {
    // Find all orders with the given user_id and populate the book details
    const orders = await Order.find({ user_id: userId }).populate({
      path: 'items.book_id',
      model: 'Book', // Replace with the actual name of your Book model
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for the specified user.' });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
