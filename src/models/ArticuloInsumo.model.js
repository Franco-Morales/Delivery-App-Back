import { Schema, model } from "mongoose";

/**
 * ArticuloInsumo
 */
const ArtInsumoSchema = new Schema({
    denominacion: String,
    precioCompra: Number,
    precioVenta: Number,
    stockActual: Number,
    stockMinimo: Number,
    unidadMedida: String,
    esInsumo: Schema.Types.Boolean,
    //RubroInsumo
    RubArt: {
        type: Schema.Types.ObjectId,
        ref: "RubroArticulo"
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


export default model('ArtInsumo',ArtInsumoSchema);