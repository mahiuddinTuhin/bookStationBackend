const BOOK = require("../../model/book.Schema");
const booksService = require("./../../services/books/books.services");

// get all books
exports.getAllBooks = async (req, res) => {
  try {
    const result = await booksService.findBooksService();

    res.status(200).json({
      status: "successful",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed to load books",
      error: error.message,
    });
  }
};

// create new book
exports.createBook = async (req, res) => {
  try {
    const result = await booksService.createBookService(req.body);
    res.status(201).json({
      status: "success",
      book: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to post books",
      error: error.message,
    });
  }
};

// update book by id
exports.updateBookById = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const result = await booksService.updateBookByIdService(id, data);
    // Handle case where book with given ID was not found
    if (!result) {
      return res.status(404).json({
        status: "error",
        book: "book not found",
      });
    }
    res.status(200).json({
      status: "success",
      book: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update book",
      error: error.message,
    });
  }
};

// delete book by id
exports.deleteBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await booksService.deleteBookByIdService(id);
    // Handle case where book with given ID was not found
    if (!result) {
      return res.status(404).json({
        status: "error",
        book: "book not found",
      });
    }
    res.status(200).json({
      status: "success",
      book: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete book",
      error: error.message,
    });
  }
};

// get book by id
exports.getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await booksService.getBookByIdService(id);
    // Handle case where book with given ID was not found
    if (!result) {
      return res.status(404).json({
        status: "error",
        book: "book not found",
      });
    }
    res.status(200).json({
      status: "successful",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed to load books",
      error: error.message,
    });
  }
};

//  search books with query
exports.searchBooks = async (req, res) => {
  const { query } = req.query;
  try {
    const result = await booksService.searchBooksService(query);
    // Handle case where no books match the search query
    if (result.length === 0) {
      return res.status(404).json({
        status: "error",
        book: "No book found for the given query.",
      });
    }
    res.status(200).json({
      status: "successful",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed to search books",
      error: error.message,
    });
  }
};

//  filter books with specific condition
exports.filterBooks = async (req, res) => {
  const condition = req.query;

  try {
    const result = await booksService.filterBooksService(condition);
    // Handle case where no books match the filter condition
    if (result.length === 0) {
      return res.status(404).json({
        status: "error",
        book: "No books found for the given condition",
      });
    }
    res.status(200).json({
      status: "successful",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed to filter books",
      error: error.message,
    });
  }
};
