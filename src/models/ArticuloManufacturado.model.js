import { Schema, model } from "mongoose";


const ArtManufactSchema = new Schema({
    tiempoEstimado: String,
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
            },
            _id: false
        }
    ],
    RubroGeneral: {
        type: Schema.Types.ObjectId,
        ref: "RubroGeneral"
    },
    active: Boolean,
    delete: {
        type:{
            user_uid: String,
            deletedAt: Date
        },
        default: {}
    }
});


export default model('ArtManufact',ArtManufactSchema);