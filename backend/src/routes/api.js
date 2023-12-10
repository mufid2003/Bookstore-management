const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const userController = require('../controllers/userController');
const orderController = require('../controllers/orderController');

// Route to get all books
router.get('/books', bookController.getAllBooks);

// Route to create a new book
router.post('/addbooks', bookController.createBook);




// Route to get all users
router.get('/users', userController.getAllUsers);

// Route to create a new user
router.post('/adduser', userController.createUser);



// Route to get all orders
router.get('/orders', orderController.getAllOrders);

// Route to create a new order
router.post('/addorder', orderController.createOrder);

module.exports = router;
