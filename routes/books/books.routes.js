const express = require("express");
const booksController = require("../../controller/Books/booksController");
const router = express.Router();

router.route("/searchBooks").get(booksController.searchBooks);
router.route("/filterBooks").get(booksController.filterBooks);

router
  .route("/")
  .get(booksController.getAllBooks)
  .post(booksController.createBook);

router
  .route("/:id")
  .patch(booksController.updateBookById)
  .delete(booksController.deleteBookById)
  .get(booksController.getBookById);

module.exports = router;
