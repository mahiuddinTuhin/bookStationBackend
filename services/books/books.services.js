const Book = require("./../../model/book.Schema");

exports.findBooksService = async () => {
  console.log("getting Books");
  const result = await Book.find({});
  return result;
};

exports.createBookService = async (data) => {
  const result = await Book.create(data);
  return result;
};

exports.updateBookByIdService = async (id, data) => {
  const result = await Book.updateOne({ _id: id }, data);
  return result;
};

exports.deleteBookByIdService = async (id, data) => {
  const result = await Book.deleteOne({ _id: id });
  return result;
};

// const book = await Book.findById(id);
// if (!book) {
//   throw new Error("Book not found by this id.");
// }
exports.getBookByIdService = async (id) => {
  const result = await Book.findOne({ _id: id });
  return result;
};

exports.searchBooksService = async (query) => {
  const result = await Book.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { author: { $regex: query, $options: "i" } },
      { publisher: { $regex: query, $options: "i" } },
    ],
  });
  return result;
};

exports.filterBooksService = async (condition) => {
  const filterOptions = {};

  if (condition.title) {
    filterOptions.title = { $regex: condition.title, $options: "i" };
  }

  if (condition.author) {
    filterOptions.author = { $regex: condition.author, $options: "i" };
  }

  if (condition.publisher) {
    filterOptions.publisher = { $regex: condition.publisher, $options: "i" };
  }

  if (condition.originalPriceMin) {
    filterOptions.originalPrice = {
      $gte: condition.originalPriceMin,
    };
  }

  if (condition.originalPriceMax) {
    filterOptions.originalPrice = {
      $lte: condition.originalPriceMax,
    };
  }
  if (condition.language) {
    filterOptions.language = { $regex: condition.language, $options: "i" };
  }

  if (condition.tags) {
    filterOptions.tags = { $regex: condition.tags, $options: "i" };
  }

  if (condition.category) {
    filterOptions.category = { $regex: condition.category, $options: "i" };
  }

  if (condition.status) {
    filterOptions.status = condition.status;
  }

  if (condition.returnPolicy) {
    filterOptions.returnPolicy = condition.returnPolicy;
  }

  if (condition.deliveryPolicy) {
    filterOptions.deliveryPolicy = condition.deliveryPolicy;
  }

  console.log(filterOptions);
  const result = await Book.find(filterOptions);
  return result;
};

// delete bulk amount of books
exports.BulkdeleteBookByIdService = async (ids) => {
  const result = await Book.deleteMany({ _id: { $in: ids } });
  return result;
};

/* 

# have to add image in the schema
# ask chatgpt to make these services more professional and controller to make more error handling
# make some more api for books
# discover some testing software for backend

*/
