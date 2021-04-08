import { Schema, model } from "mongoose";


const MercadoPagoSchema = new Schema({
    identificadorPago: number,
    fechaCreacion: Date,
    fechaAprobacion: Date,
    formaPago: String,
    metodoPago: String,
    nroTarjeta: String,
    estado: String
});


export default model('MercadoPago',MercadoPagoSchema);