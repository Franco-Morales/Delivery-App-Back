import ArtManufactModel from "../models/articuloManufacturado.model";

//Find All ArticuloManufacturado
let findAllArticuloManufacturado = async() => {
    try {
        let artManFacs = await ArtManufactModel.find({ delete: null }).select(['-delete']);
        return artManFacs;
    } catch (error) {
        console.error(error);
        // throw new Error(error);
    }
}

//Find One ArticuloManufacturado
let findOneArticuloManufacturado = async(artManFacsReq) => {
    try {
      let artManFac = await ArtManufactModel.findById(artManFacsReq.params.id).select(['-delete']);
      return artManFac;
    } catch (e) {
      throw new Error(error);
    }
}

//Save ArticuloManufacturado
let saveArticuloManufacturado = async (artManFacsReq) => {
    try {
      let { tiempoEstimado, denominacion , precioVenta ,img ,ArtManufactDet, RubroGeneral } = artManFacsReq.body;
      let artManFac = ArtManufactModel({tiempoEstimado, denominacion , precioVenta ,img ,ArtManufactDet, RubroGeneral, active:true});
      let artManFacSaved = await artManFac.save();
      return artManFacSaved;
    } catch (error) {
        throw new Error(error);
    }
}

//Update ArticuloManufacturado
let updateArticuloManufacturado = async (artManFacsReq) =>{
    try {
        let artManFacUpdated = await ArtManufactModel.findOneAndUpdate({_id: artManFacsReq.params.id},artManFacsReq.body);
        return artManFacUpdated;
    } catch (error) {
        throw new Error(error);
    }
}

//Delete (Soft Delete)
let deleteArticuloManufacturado = async (artManFacsReq) =>  {
    try {
        let { user_uid } = facturaReq.body;
        let deleteOptions = {
            user_uid,
            deletedAt: new Date()
        };

        let facturaDeleted = await ArtManufactModel.findOneAndUpdate(
            {_id: artManFacsReq.params.id },
            {
              $set:{
                active: false,
                delete: deleteOptions
              }
          },{ upsert: true });
        return facturaDeleted;
    } catch (error) {
        throw new Error(error);
    }
}


/**
 * ArticuloManufacturado Service
 */
const ArticuloManufacturadoSvc = { findAllArticuloManufacturado, findOneArticuloManufacturado, saveArticuloManufacturado, updateArticuloManufacturado, deleteArticuloManufacturado };

export default ArticuloManufacturadoSvc;