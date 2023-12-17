import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  if (!products) {
    res.status(404);
    throw new Error('No products found');
  }
  res.status(200);
  res.json(products);
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error('Product not found');
  }
  res.status(200);
  res.json(product);
});

// @desc Fetch products by user
// @route GET /api/products/myproducts
// @access Private
const getProductsByUser = asyncHandler(async (req, res) => {
  console.log("getProductsByUser");
  const products = await Product.find({ owner: req.user._id });
  if (!products) {
    res.status(400);
    throw new Error('No products found');
  }
  res.status(200);
  res.json(products);
});

// @desc Fetch products by category
// @route GET /api/products/category/:category
// @access Public
const getProductsByCategory = asyncHandler(async (req, res) => {
  const products = await Product.find({ category: req.params.category });
  if (!products) {
    res.status(400);
    throw new Error('No products found');
  }
  res.status(200);
  res.json(products);
});

// @desc Create a product
// @route POST /api/products/myproducts
// @access Private
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, stock, category, price } = req.body;
  const product = new Product({
    name,
    description,
    category,
    price,
    stock,
    owner: req.user._id,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc Update a product
// @route PUT /api/products/myproducts
// @access Private
const updateProduct = asyncHandler(async (req, res) => {
  const productUpdate = await Product.findByIdAndUpdate(
    req.product._id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(productUpdate);
});

// @desc Delete a product
// @route DELETE /api/products/myproducts
// @access Private
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const productDelete = await Product.findByIdAndDelete(req.product._id);
    res.status(200).json(productDelete);
  } catch (error) {
    res.status(400);
    throw new Error('Product not found');
  }
});
export {
  getProducts,
  getProductById,
  getProductsByUser,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
};
