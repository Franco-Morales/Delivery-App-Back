import ArticuloInsumo from "../models/ArticuloInsumo.model";

//Find All ArticuloInsumo
let findAllArticuloInsumo = async() => {
    try {
        let artIns = await ArticuloInsumo.find({ delete: null }).select(['-delete']);
        return artIns;
    } catch (error) {
        throw new Error(error);
    }
}

//Find One ArticuloInsumo
let findOneArticuloInsumo = async(artInReq) => {
    try {
      let artIn = await ArticuloInsumo.findById(artInReq.params.id).select(['-delete']);
      return artIn;
    } catch (e) {
      throw new Error(error);
    }
}

//Save ArticuloInsumo
let saveArticuloInsumo = async (artInReq) => {
    try {
      let { denominacion, precioCompra, precioVenta, stcokActual, stcokMinimo, unidadMedida, esInsumo } = artInReq;
      let artIn = ArticuloInsumo({denominacion, precioCompra, precioVenta, stcokActual, stcokMinimo, unidadMedida, esInsumos,active:true});
      let artInSaved = await artIn.save();
      return artIn;
    } catch (error) {
        throw new Error(error);
    }
}

//Update ArticuloInsumo
let updateArticuloInsumo = async (artInReq) =>{
    try {
        let artInUpdated = await ArticuloInsumo.findOneAndUpdate({_id: artInReq.params.id},artInReq.body);
        return artInUpdated;
    } catch (error) {
        throw new Error(error);
    }
}

//Delete (Soft Delete)
let deleteArticuloInsumo = async (artInReq) =>  {
    try {
        let { user_uid } = artInReq.body
        let deleteOptions = {user_uid:user_uid,deletedAt:new Date()}
        let artInDeleted = await ArticuloInsumo.findOneAndUpdate({_id: artInReq.params.id},{$set:{active:false,delete:deleteOptions}},{upsert:true})
        return artInDeleted;
    } catch (error) {
        throw new Error(error);
    }
}


/**
 * ArticuloManufacturado Service
 */
const ArticuloInsumoSvc = {findAllArticuloInsumo, findOneArticuloInsumo, saveArticuloInsumo, updateArticuloInsumo, deleteArticuloInsumo};

export default ArticuloInsumoSvc;
