import { Schema, model } from "mongoose";


const ConfigSchema = new Schema({
    emailEmpresa: String,
    tokenMercadoPago: String
});


export default model('Config',ConfigSchema);