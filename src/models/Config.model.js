import { Schema, model } from "mongoose";


const ConfigSchema = new Schema({
    emailEmpresa: String,
    tokenMercadoPago: String,
    latitud: Number,
    longitud: Number
});


export default model('Config',ConfigSchema);
