const jwt = require('jsonwebtoken');
const User = require('../models/user');

const register = async (username, password) => {
  // Verificar si username y password son proporcionados
  if (!username || !password) {
    throw new Error('Username and password are required');
  }

  try {
    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ username });
    if (userExists) throw new Error('User already exists');

    // Crear un nuevo usuario
    const user = new User({ username, password });
    await user.save(); // Guardar el nuevo usuario en la base de datos
    return { message: 'User created successfully' };
  } catch (error) {
    throw new Error(`Error during registration: ${error.message}`);
  }
};

const login = async (username, password) => {
  // Verificar si username y password son proporcionados
  if (!username || !password) {
    throw new Error('Username and password are required');
  }

  try {
    // Buscar el usuario en la base de datos
    const user = await User.findOne({ username });
    if (!user) throw new Error('User not found');

    // Comparar la contraseña proporcionada con la almacenada
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error('Invalid credentials');

    // Crear un token JWT para el usuario
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Retornar el token generado
    return { token };
  } catch (error) {
    throw new Error(`Error during login: ${error.message}`);
  }
};

module.exports = { register, login };
