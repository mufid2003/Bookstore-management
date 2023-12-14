const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }, // Add price field
    }
  ],
  amount: { type: Number, required: true }, // Add amount field
  status: { type: String, enum: ['pending', 'shipped', 'delivered'], required: true },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
