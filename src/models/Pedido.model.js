import { Schema, model } from "mongoose";
import { MercadoPagoSchema } from "./MercadoPago.model";

const PedidoSchema = new Schema({
    fecha: Date,
    estado: String,
    horaEstimadaFin: Date,
    tipoEnvio: Number,
    total: Number,
    // Cliente
    Cliente: {
        id : String,
        Domicilio : {
            calle: String,
            numero: String,
            localidad: String
        }
    },
    //
    DetallePedido: [
        {
            cantidad: Number,
            subTotal: Number,
            ArtManufact: {
                type: Schema.Types.ObjectId,
                ref: 'ArtManuFact'
            },
            ArticuloIsumo: {
                type: Schema.Types.ObjectId,
                ref: 'ArtInsumo'
            }
        }
    ],
    Factura: {
        type: Schema.Types.ObjectId,
        ref: 'Factura'
    },
    // MercPago: {
    //     type: MercadoPagoSchema
    // },
    active: Boolean,
    delete: {type:{
      user_uid: String,
      deletedAt: Date
    },default: null}
});


export default model('Pedido',PedidoSchema);
