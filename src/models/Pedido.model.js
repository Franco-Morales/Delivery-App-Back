import { Schema, model } from "mongoose";


const PedidoSchema = new Schema({
    fecha: Date,
    estado: String,
    horaEstimadaFin: Number,
    tipoEnvio: Number,
    total: Number,
    
    accepted: Date, // guardo la fecha(hora) estimada de finalizado del pedido(demorado o no)

    // Cliente
    Cliente: {
        firebase_id : String,
        Domicilio : {
            calle: String,
            numero: String,
            localidad: String
        },
        _id: false
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
},
{
    timestamps: true
});


export default model('Pedido',PedidoSchema);
