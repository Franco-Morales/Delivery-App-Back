import { Schema, model } from "mongoose";

/**
 * Modelo RubroGeneral
 */
const RubGrlSchema = new Schema({
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

const RubroGeneral = model('RubroGeneral',RubGrlSchema);


export { RubGrlSchema, RubroGeneral };