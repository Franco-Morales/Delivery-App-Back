import { Schema, model, models } from "mongoose";

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
    return (this.stockActual > this.stockMinimo);
};

ArtInsumoSchema.methods.updateStock = function() {
    this.stock = (this.stockActual > this.stockMinimo);
}


export default models.ArtInsumo ||model('ArtInsumo',ArtInsumoSchema);