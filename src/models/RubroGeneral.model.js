import { Schema, model } from "mongoose";

/**
 * Modelo RubroGeneral
 */
const RubGrlSchema = new Schema({
    denominacion: String,
    active: Boolean,
    delete: {type:{
      user_uid: String,
      deletedAt: Date
    },default: null}
});


export default model('RubroGeneral',RubGrlSchema);
