// services/productService.js
const Product = require('../models/productModel');

// Crear un nuevo producto
const createProduct = async (name, description, price) => {
  try {
    const product = new Product({
      name,
      description,
      price
    });
    // Guardamos el producto en la base de datos
    await product.save();
    return product;
  } catch (error) {
    throw new Error('Error creating product');
  }
};

// Obtener todos los productos
const getAllProducts = async () => {
  try {
    const products = await Product.find(); // Devuelve todos los productos
    return products;
  } catch (error) {
    throw new Error('Error fetching products');
  }
};

// Obtener un producto por su ID
const getProductById = async (id) => {
  try {
    const product = await Product.findById(id); // Busca el producto por ID
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    throw new Error('Error fetching product');
  }
};

// Actualizar un producto por su ID
const updateProduct = async (id, data) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true }); // Devuelve el producto actualizado
    if (!updatedProduct) {
      throw new Error('Product not found');
    }
    return updatedProduct;
  } catch (error) {
    throw new Error('Error updating product');
  }
};

// Eliminar un producto por su ID
const deleteProduct = async (id) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      throw new Error('Product not found');
    }
    return deletedProduct;
  } catch (error) {
    throw new Error('Error deleting product');
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
