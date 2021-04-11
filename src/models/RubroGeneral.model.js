import { Schema, model } from "mongoose";

/**
 * Modelo RubroGeneral
 */
const RubGrlSchema = new Schema({
    denominacion: String
});


export default model('RubroGeneral',RubGrlSchema);