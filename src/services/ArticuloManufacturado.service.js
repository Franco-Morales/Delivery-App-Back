import ArtManufactModel from "../models/articuloManufacturado.model";

//Find All ArticuloManufacturado
let findAllArticuloManufacturado = async() => {
    try {
        let artManFacs = await ArtManufactModel.find({active:true});
        return artManFacs;
    } catch (error) {
        console.error(error);
        // throw new Error(error);
    }
}

//Find One ArticuloManufacturado
let findOneArticuloManufacturado = async(artManFacsReq) => {
    try {
      let artManFac = await ArtManufactModel.findById(artManFacsReq.params.id);
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
        let artManFacUpdated = await ArtManufactModel.findOneAndUpdate({_id: artManFacsReq.params.id},artManFacsReq.body,{new:true});
        return artManFacUpdated;
    } catch (error) {
        throw new Error(error);
    }
}

//Delete (Soft Delete)
let deleteArticuloManufacturado = async (artManFacsReq) =>  {
    try {
        let { user_uid } = artManFacsReq.body;
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
          },{ new: true });
        return facturaDeleted;
    } catch (error) {
        throw new Error(error);
    }
}

//Active Articulo Manufacturado
let activeArticuloManufacturado= async (artManFacsReq) =>{
  try {
    let { active } = artManFacsReq.body;

    let artManFac = await ArtManufactModel.findOneAndUpdate(
      { _id: artManFacsReq.params.id },
      { $set: { active } },
      {new:true}
    );
    return artManFac;
  } catch (error) {
    console.log('Error : ',error);
  }
}


/**
 * ArticuloManufacturado Service
 */
const ArticuloManufacturadoSvc = {
  findAllArticuloManufacturado,
  findOneArticuloManufacturado,
  saveArticuloManufacturado,
  updateArticuloManufacturado,
  deleteArticuloManufacturado,
  activeArticuloManufacturado };

export default ArticuloManufacturadoSvc;
