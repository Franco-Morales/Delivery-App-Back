import { Schema, model } from "mongoose";

/**
 * Modelo RubroArticulo
 */
const RubArtSchema = new Schema({
    denominancion: String
});


export default model('RubroGeneral',RubArtSchema);