// product-service/routes/productRoutes.js
const express = require('express');
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');

const router = express.Router();

// Ruta para crear un nuevo producto
router.post('/products', createProduct);

// Ruta para obtener todos los productos
router.get('/products', getProducts);

// Ruta para obtener un producto por su ID
router.get('/products/:id', getProductById);

// Ruta para actualizar un producto por su ID
router.put('/products/:id', updateProduct);

// Ruta para eliminar un producto por su ID
router.delete('/products/:id', deleteProduct);

module.exports = router;
