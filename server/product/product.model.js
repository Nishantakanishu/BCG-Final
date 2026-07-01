const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String, // Store image URL or path
    required: true,
  },
  shortDesc: {
    type: String,
    required: true,
  },
  longDesc: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
module.exports = Product;
