import { Schema, model } from "mongoose";


const ArtInsumoSchema = new Schema({
    denominacion: String,
    precioCompra: number,
    precioVenta: number,
    stcokActual: number,
    stcokMinimo: number,
    unidadMedida: String,
    esInsumo: Schema.Types.Boolean,
    //
    RubroArticulo: {
        denominacion: string
    } 
});


export default model('ArtInsumo',ArtInsumoSchema);