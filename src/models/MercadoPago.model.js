import { Schema, model } from "mongoose";


const MercadoPagoSchema = new Schema({
    identificadorPago: Number,
    fechaCreacion: Date,
    fechaAprobacion: Date,
    formaPago: String,
    metodoPago: String,
    nroTarjeta: String,
    estado: String,
    active: Boolean,
    delete: {type:{
      user_uid: String,
      deletedAt: Date
    },default: null}
});


export default model('MercadoPago',MercadoPagoSchema);
