const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
app.use(express.json());  // Para que pueda procesar los datos en formato JSON

// Ruta para la raíz "/"
app.get('/', (req, res) => {
  res.send('Auth Service API is running');
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Rutas para la autenticación
app.use('/api/auth', authRoutes);  // Aquí /api/auth es la ruta base para authRoutes

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Auth Service running on port ${PORT}`));
