import { Schema, model } from "mongoose";

/**
 * Modelo RubroArticulo
 */
const RubArtSchema = new Schema({
    denominancion: String,
    active: Boolean,
    delete: {type:{
      user_uid: String,
      deletedAt: Date
    },default: null}
});


export default model('RubroArticulo',RubArtSchema);
