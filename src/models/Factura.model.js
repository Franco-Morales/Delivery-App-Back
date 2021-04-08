import { Schema, model } from "mongoose";


const FacturaSchema = new Schema({
    fecha: Date,
    numero: number,
    descuento: number,
    formaPago: String,
    nroTarjeta: String,
    totalVenta: number,
    totalCosto: number,
    // 
    DetalleFactura:  {
        cantidad: number,
        subTotal: number,
        ArtManufact: {
            type: Schema.Types.ObjectId,
            ref: 'ArtManuFact'
        },
        ArticuloIsumo: {
            type: Schema.Types.ObjectId,
            ref: 'ArtInsumo'
        }
    }
});


export default model('Factura',FacturaSchema);