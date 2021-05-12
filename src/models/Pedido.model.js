import { Schema, model } from "mongoose";


const PedidoSchema = new Schema({
    fecha: Date,
    estado: String,
    horaEstimadaFin: Number,
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
            ArticuloInsumo: {
                type: Schema.Types.ObjectId,
                ref: 'ArtInsumo'
            },
            _id: false
        }
    ],
    Factura: {
        type: Schema.Types.ObjectId,
        ref: 'Factura'
    },
    //Mercado Pago
    MdoPago: {
        type: Schema.Types.ObjectId,
        ref: "MercadoPago"
    },
    active: Schema.Types.Boolean,
    delete: {
        type:{
            user_uid: String,
            deletedAt: Date
        },
        default: {}
    }
});


export default model('Pedido',PedidoSchema);
