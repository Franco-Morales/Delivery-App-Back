import { Schema, model } from "mongoose";
import { RubroGeneral } from "./RubroGeneral.model";

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
    // RubroGeneral: {
    //     type: RubroGeneral
    // },
    active: Boolean,
    delete: {type:{
      user_uid: String,
      deletedAt: Date
    },default: null}
});


export default model('ArtManufact',ArtManufactSchema);
