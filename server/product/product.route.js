const express = require("express");
const { body } = require("express-validator");
const productController = require("./product.controller");
const router = express.Router();

router.get("/", productController.getAllProducts);

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("url").notEmpty().withMessage("URL is required"),
    body("shortDesc").notEmpty().withMessage("Short description is required"),
    body("longDesc").notEmpty().withMessage("Long description is required"),
  ],
  productController.createProduct
);

router.put(
  "/:id",
  [
    body("name").optional().notEmpty().withMessage("Name cannot be empty"),
    body("url").optional().notEmpty().withMessage("URL cannot be empty"),
    body("shortDesc").optional().notEmpty().withMessage("Short description cannot be empty"),
    body("longDesc").optional().notEmpty().withMessage("Long description cannot be empty"),
  ],
  productController.updateProduct
);

router.delete("/:id", productController.deleteProduct);

module.exports = router;
