import { Schema, model } from "mongoose";


const FacturaSchema = new Schema({
    fecha: Date,
    numero: Number,
    descuento: Number,
    formaPago: String,
    nroTarjeta: String,
    totalVenta: Number,
    totalCosto: Number,
    //
    DetalleFactura:  {
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
    },
    active: Boolean,
    delete: {
        type:{
            user_uid: String,
            deletedAt: Date
        },
        default: null
    }
});


export default model('Factura',FacturaSchema);
