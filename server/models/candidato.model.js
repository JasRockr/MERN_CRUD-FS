import mongoose from 'mongoose';
const { Schema } = mongoose;

const candidatoSchema = new Schema({
  nombres: {
    type: String, 
    required: true,
  },
  apellidos: {
    type: String, 
    required: true,
  },
  ciudad: {
    type: String, 
    required: true 
  },
  slogan: {
    type: String, 
    required: true 
  },
  estado: { 
    type: Boolean, 
    default: true 
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
}, {
  timestamps: true, 
});

export default mongoose.model("Candidato", candidatoSchema);