import { Schema, model, models } from "mongoose";

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


export default models.RubroArticulo || model('RubroArticulo',RubArtSchema);