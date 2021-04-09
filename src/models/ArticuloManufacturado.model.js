import { Schema, model } from "mongoose";
import { RubroGeneral } from "./RubroGeneral.model";

/**
 * Modelo ArticuloManufacturado
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
        type: RubroGeneral
    }
});


export default model('ArtManufact',ArtManufactSchema);