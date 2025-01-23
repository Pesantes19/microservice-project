const express = require('express');
const { register, login } = require('../controllers/authController');  // Importar las funciones de authController

const router = express.Router();

// Ruta para el registro de un usuario
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificación básica de los datos
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Llamar a la función register pasando solo los parámetros necesarios
    const result = await register(username, password);
    res.status(201).json(result);  // Si el registro es exitoso, devuelve un 201 con el resultado
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred during registration' });
  }
});

// Ruta para el login de un usuario
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificación básica de los datos
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Llamar a la función login pasando solo los parámetros necesarios
    const result = await login(username, password);
    res.status(200).json(result);  // Si el login es exitoso, devuelve un 200 con el resultado
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred during login' });
  }
});

module.exports = router;
