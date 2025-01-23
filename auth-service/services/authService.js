const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('./models/User'); // El modelo de usuario que definimos
const authenticateToken = require('./middlewares/authenticateToken'); // El middleware para verificar el JWT

dotenv.config(); // Cargar las variables de entorno desde el archivo .env

const app = express();
app.use(express.json()); // Para poder parsear JSON en las solicitudes

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado a la base de datos MongoDB"))
  .catch((error) => console.log(error));

// Registro de nuevo usuario
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Comprobar si el usuario ya existe
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "Usuario ya existe" });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear el nuevo usuario
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Guardar el nuevo usuario en la base de datos
    await newUser.save();
    res.status(201).json({ message: "Usuario creado con éxito" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
});

// Login del usuario
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar al usuario en la base de datos
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    // Comparar las contraseñas
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Generar el token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token }); // Devolver el token al cliente
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al autenticar el usuario" });
  }
});

// Ruta para verificar el token JWT (opcional, si deseas tener una ruta de verificación de token)
app.get('/verify-token', authenticateToken, (req, res) => {
  res.json({ message: 'Token es válido', user: req.user });
});

// Ruta de ejemplo protegida (requiere autenticación)
app.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: 'Bienvenido a tu perfil', user: req.user });
});

// Configurar el puerto de la aplicación
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Servidor de autenticación corriendo en el puerto ${port}`);
});
