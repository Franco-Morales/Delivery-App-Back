import { Schema, model, models } from "mongoose";


const ArtManufactSchema = new Schema({
    tiempoEstimado: Number,
    denominacion: String,
    precioVenta: Number,
    img: String,
    stock: Boolean,
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

ArtManufactSchema.statics.stockValidation = async function(artManufactId) {
    let artManufactDetStock = [];

    try {
        let artManufact = await this.findOne({_id:artManufactId}).populate('ArtManufactDet.ArtInsumo');
    
        artManufact.ArtManufactDet.forEach( detalle => {
            artManufactDetStock.push({ stock: detalle.ArtInsumo.stock });
        });
        let aux = artManufactDetStock.every( item => item.stock);
        artManufact.stock = aux;
        await artManufact.save();
    } catch (error) {
        console.error(`Model : ArtManufact : Statics : Error : ${error}`);
    }
}


export default models.ArtManufact || model('ArtManufact',ArtManufactSchema);