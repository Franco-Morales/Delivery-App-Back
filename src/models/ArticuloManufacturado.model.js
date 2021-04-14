import { Schema, model } from "mongoose";
import { RubGrlSchema } from "./rubroGeneral.model";

/**
 * Modelo ArticuloManufacturado
 */
const ArtManufactSchema = new Schema({
    tiempoEstimado: Date,
    denominacion: String,
    precioVenta: Number,
    img: String,
    // ArticuloManufacturadoDetalle
    ArtManufactDet: [
        {
            cantidad: Number,
            unidadMedida: String,
            // ArticuloInsumo
            ArtInsumo: {
                type: Schema.Types.ObjectId,
                ref: 'ArtInsumo'
            }
        }
    ],
    RubroGeneral: {
        type: RubGrlSchema
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


const ArtManufactModel = model('ArtManufact',ArtManufactSchema);

export default ArtManufactModel;