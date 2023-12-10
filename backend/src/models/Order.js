const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
      quantity: { type: Number, required: true },
    }
  ],
  status: { type: String, enum: ['pending', 'shipped', 'delivered'], required: true },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
