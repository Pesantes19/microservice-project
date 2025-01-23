const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const authenticateToken = (req, res, next) => {
  // Obtener el token desde los encabezados de la solicitud
  const token = req.header('Authorization')?.split(' ')[1]; // Asumiendo que el token viene con el formato "Bearer <token>"
  
  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  // Verificar el token usando la clave secreta
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Access Denied: Invalid token' });
    }
    
    // Si el token es válido, lo agregamos al objeto de la solicitud (req.user)
    req.user = user;
    next(); // Continuamos con la siguiente función de middleware o el controlador
  });
};

module.exports = authenticateToken;
