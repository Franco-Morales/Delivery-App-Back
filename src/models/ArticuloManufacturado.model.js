import { Schema, model } from "mongoose";

/**
 * Model ArticuloManufacturado
 */
const ArtManufactSchema = new Schema({
    tiempoEstimado: Date,
    denominacion: String,
    precioVenta: number,
    img: String,
    // ArticuloManufacturadoDetalle
    ArtManufactDet: [
        {
            cantidad: number,
            unidadMedida: string,
            // ArticuloInsumo
            ArtInsumo: {
                type: Schema.Types.ObjectId,
                ref: 'ArtInsumo'
            }
        }
    ],
    RubroGeneral: {
        denominacion: string
    }
});


export default model('ArtManufact',ArtManufactSchema);