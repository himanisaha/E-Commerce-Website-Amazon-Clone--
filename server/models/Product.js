const mongoose = require("mongoose");

// Sub-schema for reviews
const reviewSchema = new mongoose.Schema({
  title: String,
  rating: Number,
  comment: String,
  date: String
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,          // new field for category
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: String,       // product description
  highlights: [String],      // array of strings
  specifications: { type: Map, of: String }, // key-value specifications
  reviews: [reviewSchema],   // array of reviews
  stats: {                   // "Customers say" percentages
    comfortable: Number,
    quality: Number,
    worthPrice: Number
  },
  rating: { type: Number, default: 0 },
  stock: { type: Number, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
