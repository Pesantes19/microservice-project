const productService = require('../services/productService');

// Crear un nuevo producto
const createProduct = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const product = await productService.createProduct(name, description, price);
    res.status(201).json(product); // Devuelve el producto creado
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los productos
const getProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un producto por su ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productService.getProductById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  try {
    const updatedProduct = await productService.updateProduct(id, { name, description, price });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await productService.deleteProduct(id);
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
