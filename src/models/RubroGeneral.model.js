import { Schema, model } from "mongoose";

/**
 * Modelo RubroGeneral
 */
const RubGrlSchema = new Schema({
    denominancion: String
});


export default model('RubroGeneral',RubGrlSchema);