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
    stock: Boolean,
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

ArtInsumoSchema.methods.stockValidation = function() {
    this.stock = (this.stockActual>this.stockMinimo);
    return this.stock;
};

export default model('ArtInsumo',ArtInsumoSchema);