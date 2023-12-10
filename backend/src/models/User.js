const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    username: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['admin', 'employee', 'customer'], 
        required: true 
    },
    cart: [
        {
            book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
            quantity: { type: Number, required: true },
        }
    ],
    orders: [
        {
            order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
            status: { type: String, enum: ['pending', 'shipped', 'delivered'], required: true },
        }
    ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
