import { Schema, model, models, Types } from "mongoose";


const RollBackSchema = new Schema({
    rubGnl: [
        { 
            type: Types.ObjectId,
            ref: "RubroGeneral"
        }
    ],
    rubArt: [
        { 
            type: Types.ObjectId,
            ref: "RubroArticulo"
        }
    ],
    artInsumo: [
        { 
            type: Types.ObjectId,
            ref: "ArtInsumo"
        }
    ],
    artManufact: [
        { 
            type: Types.ObjectId,
            ref: "ArtManufact"
        }
    ]
});


export default model('RollBack',RollBackSchema);