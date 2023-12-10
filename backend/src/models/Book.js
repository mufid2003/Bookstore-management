const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String
    },
    ISBN: {
        type: String,
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    publishdate: {
        type: Date
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
