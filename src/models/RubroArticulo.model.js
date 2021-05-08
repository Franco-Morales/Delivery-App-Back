import { Schema, model } from "mongoose";

/**
 * Modelo RubroArticulo
 */
const RubArtSchema = new Schema({
  denominacion: String,
  active: Boolean,
  delete: {
    type:{
        user_uid: String,
        deletedAt: Date
    },
    default: {}
  }
});


export default model('RubroArticulo',RubArtSchema);