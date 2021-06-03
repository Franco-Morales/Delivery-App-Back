import { Schema, model } from "mongoose";

/**
 * Modelo RubroArticulo
 */
const RubArtSchema = new Schema({
  denominacion: String,
  active: Boolean,
  RubArtPadre: {
    type: Schema.Types.ObjectId,
    ref: 'RubroArticulo',
    default: {}
  },
  delete: {
    type:{
        user_uid: String,
        deletedAt: Date
    },
    default: {}
  }
});


export default model('RubroArticulo',RubArtSchema);