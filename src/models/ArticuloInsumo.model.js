import { Schema, model } from "mongoose";


/**
 * ArticuloInsumo
 */
const ArtInsumoSchema = new Schema({
    denominacion: String,
    precioCompra: number,
    precioVenta: number,
    stcokActual: number,
    stcokMinimo: number,
    unidadMedida: String,
    esInsumo: Schema.Types.Boolean,
    //RubroInsumo
    RubArt: {
        type: RubroInsumo
    }
});


export default model('ArtInsumo',ArtInsumoSchema);