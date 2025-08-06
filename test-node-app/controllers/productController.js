const Product = require('../models/Product');
const mongoose = require('mongoose');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res) => {
  try {
    console.log('Fetching all products...');
    
    const { page = 1, limit = 10, category, sortBy = 'createdAt', order = 'desc' } = req.query;
    
    // Build filter object
    const filter = {};
    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }
    
    // Build sort object
    const sort = {};
    sort[sortBy] = order === 'desc' ? -1 : 1;
    
    const products = await Product.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const count = await Product.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      count: products.length,
      total: count,
      page: parseInt(page),
      pages: Math.ceil(count / limit),
      data: products
    });
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    console.log('Fetching product by ID...');
    
    const { id } = req.params;
    
    // Check if ID is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid product ID'
      });
    }
    
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error in getProductById:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Public
const createProduct = async (req, res) => {
  try {
    console.log('Creating new product...');
    const { name, description, price, category, stock, imageUrl, isActive } = req.body;
    
    // Validate required fields
    if (!name || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, description, price, and category'
      });
    }
    
    // Check if product with same name already exists
    const existingProduct = await Product.findOne({ name: { $regex: `^${name}$`, $options: 'i' } });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        error: 'Product with this name already exists'
      });
    }
    
    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock: stock || 0,
      imageUrl,
      isActive: isActive !== undefined ? isActive : true
    });
    
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error in createProduct:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Public
const updateProduct = async (req, res) => {
  try {
    console.log('Updating product...');
    
    const { id } = req.params;
    const { name, description, price, category, stock, imageUrl, isActive } = req.body;
    
    // Check if ID is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid product ID'
      });
    }
    
    // Check if product exists
    let product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    
    // If name is being updated, check for duplicates
    if (name && name !== product.name) {
      const existingProduct = await Product.findOne({ 
        name: { $regex: `^${name}$`, $options: 'i' },
        _id: { $ne: id }
      });
      if (existingProduct) {
        return res.status(400).json({
          success: false,
          error: 'Product with this name already exists'
        });
      }
    }
    
    // Update fields
    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (description !== undefined) updateFields.description = description;
    if (price !== undefined) updateFields.price = price;
    if (category !== undefined) updateFields.category = category;
    if (stock !== undefined) updateFields.stock = stock;
    if (imageUrl !== undefined) updateFields.imageUrl = imageUrl;
    if (isActive !== undefined) updateFields.isActive = isActive;
    
    product = await Product.findByIdAndUpdate(
      id,
      updateFields,
      {
        new: true,
        runValidators: true
      }
    );
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error in updateProduct:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Public
const deleteProduct = async (req, res) => {
  try {
    console.log('Deleting product...');

    const { id } = req.params;
    
    // Check if ID is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid product ID'
      });
    }
    
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    
    await Product.findByIdAndDelete(id);
    
    res.status(200).json({
      success: true,
      data: {},
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error in deleteProduct:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
