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
    DetalleFactura:  [{
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
    }],
    active: Boolean,
    delete: {
        type:{
            user_uid: String,
            deletedAt: Date
        },
        default: {}
    }
});


export default model('Factura',FacturaSchema);
