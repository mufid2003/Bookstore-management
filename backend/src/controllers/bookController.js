const Book = require('../models/Book');

// Controller to list all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to list only one book
exports.getOneBook = async (req, res) => {

  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to add a new book
exports.addBook = async (req, res) => {
  const {
    title,
    author,
    genre,
    ISBN,
    quantity,
    price,
    description,
    publishdate
  } = req.body;

  const newBook = new Book({
    title,
    author,
    genre,
    ISBN,
    quantity,
    price,
    description,
    publishdate
  });

  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to update a book
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    author,
    genre,
    ISBN,
    quantity,
    price,
    description,
    publishdate
  } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        title,
        author,
        genre,
        ISBN,
        quantity,
        price,
        description,
        publishdate
      },
      { new: true } // Return the updated document
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a book
exports.deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
