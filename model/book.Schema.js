const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title of book."],
      lowercase: true,
      trim: true,
      minLength: [3, "Book title length too short."],
      maxLength: [100, "Book title length too large."],
      message: "Something error happend in with the book title.",
    },
    author: {
      type: String,
      required: [true, "Please provide a name of author."],
      lowercase: true,
      trim: true,
      minLength: [3, "author name length too short."],
      maxLength: [100, "author name length too large."],
      message: "Something error happend in with the author name.",
    },
    publisher: {
      type: String,
      required: [true, "Please provide a name of publisher."],
      lowercase: true,
      trim: true,
      minLength: [3, "publisher name length too short."],
      maxLength: [100, "publisher name length too large."],
      message: "Something error happend in with the publisher name.",
    },
    description: {
      type: String,
      required: [true, "Please provide a descriptoin of book."],
      lowercase: true,
      trim: true,
      minLength: [3, "book descriptoin length too short."],
      message: "Something error happend in with the book descriptoin.",
    },
    originalPrice: {
      type: Number,
      required: [true, "Please provide the original price of this book."],
      min: [0, "Price can not be a negative value."],
    },
    isbn: {
      type: String,
      required: [true, "Please provide the ISBN of this book."],
      trim: true,
    },
    edition: {
      type: String,
      required: [true, "Please provide the edition of this book."],
      trim: true,
    },
    pagesNumber: {
      type: Number,
      required: [true, "Please provide the number of pages of this book."],
      min: [1, "Book pages can not be less then 1 page."],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else return false;
        },
      },
      message: "Pages number does not valid.",
    },
    language: {
      type: String,
      required: [true, "Please provide the language of this book."],
      trim: true,
    },
    tags: {
      type: String,
      trim: true,
    },
    category: [
      {
        name: {
          type: String,
          required: true,
        },
        _id: objectId,
      },
    ],
    reviews: [
      {
        review: {
          type: String,
          required: true,
        },
        userId: {
          name: {
            type: String,
            required: true,
          },
          _id: objectId,
        },
        ratings: {
          type: Number,
          required: true,
          enum: {
            values: [1, 2, 3, 4, 5],
            message: "rating must be selected within 1 to 5.",
          },
        },
      },
    ],
    status: {
      type: String,
      required: [true, "Status must be included."],
      enum: {
        values: ["available", "not available", "discontinue"],
        message:
          "{VALUE} can not be accepted. It must be: available/not available/discontinue",
      },
    },
    bookOwners: {
      type: objectId,
      ref: "BookOwners",
    },
    returnPolicy: {
      type: String,
      required: [true, "Status must be included."],
      enum: {
        values: ["7-days-return", "no-return-policy"],
        message:
          "{VALUE} can not be accepted. It must be: 7-days-return/no-return-policy",
      },
    },
    deliveryPolicy: [
      {
        payment: {
          type: String,
          required: [true, "Status must be included."],
          enum: {
            values: ["cash-on-delivery", "prepaid"],
            message:
              "{VALUE} can not be accepted. It must be: cash-on-delivery/prepaid",
          },
        },
        deliveryCharge: {
          type: Number,
          required: [true, "charge must be included."],
          min: [0, "charge can not be a negative value."],
        },
      },
    ],
    bookSummary: {
      type: String,
      required: [true, "Please provide the summery of this book."],
      min: [10, "book's summary is too short."],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const BOOK = mongoose.model("BOOK", bookSchema);

module.exports = BOOK;
