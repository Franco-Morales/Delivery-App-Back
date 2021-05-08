import { Schema, model } from "mongoose";


const ConfigSchema = new Schema({
    emailEmpresa: String,
    tokenMercadoPago: String,
    lat: Number,
    lng: Number
});


export default model('Config',ConfigSchema);
