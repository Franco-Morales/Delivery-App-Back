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
            references: 'ArtManuFact'
        },
        ArticuloIsumo: {
            type: Schema.Types.ObjectId,
            references: 'ArtInsumo'
        }
    }
});


export default model('Factura',FacturaSchema);