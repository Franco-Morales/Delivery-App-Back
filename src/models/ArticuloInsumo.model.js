import { Schema, model } from "mongoose";


/**
 * ArticuloInsumo
 */
const ArtInsumoSchema = new Schema({
    denominacion: String,
    precioCompra: Number,
    precioVenta: Number,
    stcokActual: Number,
    stcokMinimo: Number,
    unidadMedida: String,
    esInsumo: Schema.Types.Boolean,
    //RubroInsumo
    // RubArt: {
    //     type: RubroInsumo
    // },
    active: Boolean,
    delete: {type:{
      user_uid: String,
      deletedAt: Date
    },default: null}
});


export default model('ArtInsumo',ArtInsumoSchema);
