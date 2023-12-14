const User = require('../models/User'); // Import the User model
const Book = require('../models/Book'); // Import the Book model


// Controller to add a book to the user's cart
exports.addToCart = async (req, res) => {
    const { userId, bookId } = req.params;
  
    try {
      // Validate user and book existence
      const user = await User.findById(userId);
      const book = await Book.findById(bookId);
  
      if (!user || !book) {
        return res.status(404).json({ message: 'User or book not found.' });
      }
  
      // Check if the book is already in the user's cart
      const existingCartItem = user.cart.find(item => item.book_id.equals(book._id));
  
      if (existingCartItem) {
        // If the book is already in the cart, increment the quantity
        existingCartItem.quantity += 1;
      } else {
        // If the book is not in the cart, add it with quantity 1
        user.cart.push({
          book_id: book._id,
          quantity: 1,
        });
      }
  
      // Save the updated user with the new cart item
      await user.save();
  
      res.status(200).json({ message: 'Book added to cart successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };


//   // Controller to get all items from the user's cart
// exports.getCartItems = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     // Validate user existence
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     // Return the user's cart items
//     res.status(200).json({ cart: user.cart });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error.' });
//   }
// };
exports.getCartItems = async (req, res) => {
  const { userId } = req.params;

  try {
    // Validate user existence
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Get the book IDs and quantities from the user's cart
    const cartItems = user.cart;

    // Map through the cart items and populate book details
    const booksWithQuantity = await Promise.all(
      cartItems.map(async (cartItem) => {
        const bookDetails = await Book.findById(cartItem.book_id);
        return {
          bookDetails,
          quantity: cartItem.quantity
        };
      })
    );

    // Return the array of objects with book details and quantities
    res.status(200).json({ booksWithQuantity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Controller to update quantity of a specific item in the user's cart
exports.updateCartItemQuantity = async (req, res) => {
  const { userId, bookId } = req.params;
  const qt  = req.body.qt;

  try {
    // Validate user existence and update the cart item
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: userId,
        'cart.book_id': bookId,
      },
      {
        $set: { 'cart.$.quantity': qt },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User or cart item not found.' });
    }

    res.status(200).json({ message: 'Cart item quantity updated successfully.', updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
// Controller to delete a specific item from the user's cart
exports.deleteCartItem = async (req, res) => {
  const { userId, bookId } = req.params;

  try {
    // Validate user existence
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Remove the cart item with the specified bookId
    user.cart = user.cart.filter(item => !item.book_id.equals(bookId));

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Cart item deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
  