const Product = require("./product.model");
const { validationResult, matchedData } = require("express-validator");

module.exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().lean();
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports.createProduct = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ error: result.array() });
  }
  try {
    const data = matchedData(req);
    const newProduct = await Product.create({ ...data });
    res.status(201).json({ message: "Product Created Successfully", product: newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.updateProduct = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ error: result.array() });
  }
  try {
    const { id } = req.params;
    const data = matchedData(req);
    const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product Updated", product: updatedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product Deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
