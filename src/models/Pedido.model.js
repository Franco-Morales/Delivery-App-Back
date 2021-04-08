import { Schema, model } from "mongoose";


const PedidoSchema = new Schema({
    fecha: Date,
    estado: String,
    horaEstimadaFin: Date,
    tipoEnvio: number,
    total: number,
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
            cantidad: number,
            subTotal: number,
            ArtManufact: {
                type: Schema.Types.ObjectId,
                references: 'ArtManuFact'
            },
            ArticuloIsumo: {
                type: Schema.Types.ObjectId,
                references: 'ArtInsumo'
            }
        } 
    ],
    Factura: {
        type: Schema.Types.ObjectId,
        references: 'Factura'
    }
});


export default model('Pedido',PedidoSchema);