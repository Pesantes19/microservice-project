const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // Asegúrate de tener bcryptjs instalado

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Encriptar la contraseña antes de guardar
userSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) { // Aseguramos que solo encriptamos si es nuevo o si la contraseña fue modificada
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Método para comparar contraseñas (ahora es async)
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
