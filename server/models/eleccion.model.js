import mongoose from "mongoose";
const { Schema } = mongoose;

const eleccionSchema = new Schema({
  titulo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  fecha: { 
    type: Date, 
    default: Date.now 
  },
  creada: { 
    type: Date, 
    default: Date.now 
  },
  estado: { 
    type: Boolean, 
    default: true 
  },
}, {
  timestamps: true
});

export default mongoose.model("Eleccion", eleccionSchema);
