const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const userController = require('../controllers/userController');
const orderController = require('../controllers/orderController');
const cartController = require('../controllers/cartController');


// Route to list only one book
router.get('/books/:id', bookController.getOneBook);
// Route to list all books
router.get('/books', bookController.getAllBooks);

// Route to add a new book
router.post('/books', bookController.addBook);

// Route to update a book
router.put('/books/:id', bookController.updateBook);

// Route to delete a book
router.delete('/books/:id', bookController.deleteBook);






// Route to list only one user
router.get('/getoneuser/:id', userController.getOneUser);

// Route to list all users
router.get('/users', userController.getAllUsers);



// Route to add a new user
router.post('/users', userController.addUser);

// Route to update a user
router.put('/users/:id', userController.updateUser);

// Route to delete a user
router.delete('/users/:id', userController.deleteUser);

//Route to login user
router.post('/login',userController.loginUser);





// Route to find only one order
router.get('/getoneorder/:id', orderController.getOneOrder);

// Route to list all orders
router.get('/orders', orderController.getAllOrders);



// Route to add a new order
router.post('/orders', orderController.addOrder);

// Route to update an order
router.put('/orders/:id', orderController.updateOrder);

// Route to delete an order
router.delete('/orders/:id', orderController.deleteOrder);




//add item to cart
router.post('/addtocart/:userId/cart/:bookId', cartController.addToCart);

// Use the controller in your route
router.get('/cart/:userId', cartController.getCartItems);

router.put('/cart/:userId/:bookId', cartController.updateCartItemQuantity); // Use PUT for updating

//delete item from cart
router.delete('/cart/:userId/:bookId', cartController.deleteCartItem);

module.exports = router;
