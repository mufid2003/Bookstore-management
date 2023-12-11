const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const userController = require('../controllers/userController');
const orderController = require('../controllers/orderController');

// Route to list all books
router.get('/books', bookController.getAllBooks);

// Route to list only one book
router.get('/books/:id', bookController.getOneBook);

// Route to add a new book
router.post('/books', bookController.addBook);

// Route to update a book
router.put('/books/:id', bookController.updateBook);

// Route to delete a book
router.delete('/books/:id', bookController.deleteBook);




// Route to list all users
router.get('/users', userController.getAllUsers);

// Route to list only one user
router.get('/users/:id', userController.getOneUser);

// Route to add a new user
router.post('/users', userController.addUser);

// Route to update a user
router.put('/users/:id', userController.updateUser);

// Route to delete a user
router.delete('/users/:id', userController.deleteUser);

//Route to login user
router.post('/login',userController.loginUser);



// Route to list all orders
router.get('/orders', orderController.getAllOrders);

// Route to find only one order
router.get('/orders/:id', orderController.getOneOrder);

// Route to add a new order
router.post('/orders', orderController.addOrder);

// Route to update an order
router.put('/orders/:id', orderController.updateOrder);

// Route to delete an order
router.delete('/orders/:id', orderController.deleteOrder);
module.exports = router;
