import mongoose from 'mongoose';
const { Schema } = mongoose;

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  }, 
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: { 
    type: Boolean, 
    default: false 
  },
  estado: { 
    type: Boolean, 
    default: true 
  },
}, {
  timestamps: true
});

export default mongoose.model('Usuario', usuarioSchema);