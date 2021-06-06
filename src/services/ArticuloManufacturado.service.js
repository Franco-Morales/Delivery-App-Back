import ArtManufactModel from "../models/articuloManufacturado.model";

//Find All ArticuloManufacturado
let findAllArticuloManufacturado = async() => {
  try {
    let artManFacs = await ArtManufactModel.find({active:true}).populate('RubroGeneral');
    return artManFacs;
  } catch (error) {
      console.error(`Error Svc ArtManufact: ${error}`);
  }
}

//Find One ArticuloManufacturado
let findOneArticuloManufacturado = async(artManFacsReq) => {
  let _id = artManFacsReq.params.id;
  let filter = { _id, active: true };
  try {
    let artManFac = await ArtManufactModel.findOne(filter).populate('RubroGeneral');
    return artManFac;
  } catch (error) {
    console.error(`Error Svc ArtManufact: ${error}`);
  }
}

//Search Articulo Manufacturado
let searchArticuloManufacturado = async (query) => {
  let filter = { 
    active: true,
    denominacion: {
      $regex: new RegExp(query,'i')
    } 
  };

  try {
    let artManFac = await ArtManufactModel.find(filter);
    return artManFac;
  } catch (error) {
    console.error(`Error Svc ArtManufact: ${error}`);
  }
}

//Save ArticuloManufacturado
let saveArticuloManufacturado = async (artManFacsReq) => {
  let { tiempoEstimado, denominacion , precioVenta ,img ,ArtManufactDet, RubroGeneral } = artManFacsReq.body;
  try {
    let artManFac = ArtManufactModel({tiempoEstimado, denominacion, precioVenta, img , ArtManufactDet, RubroGeneral, active:true});
    let artManFacSaved = await artManFac.save();
    return artManFacSaved;
  } catch (error) {
      console.error(`Error Svc ArtManufact: ${error}`);
  }
}

//Update ArticuloManufacturado
let updateArticuloManufacturado = async (artManFacsReq) =>{
    try {
        let artManFacUpdated = await ArtManufactModel.findOneAndUpdate({_id: artManFacsReq.params.id},artManFacsReq.body,{new:true});
        return artManFacUpdated;
    } catch (error) {
        console.error(`Error Svc ArtManufact: ${error}`);
    }
}

//Delete (Soft Delete)
let deleteArticuloManufacturado = async (artManFacsReq) =>  {
  let { user_uid } = artManFacsReq.body;
  let deleteOptions = {
      user_uid,
      deletedAt: new Date()
  };
    try {
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
        console.error(`Error Svc ArtManufact: ${error}`);
    }
}

//Active Articulo Manufacturado
let activeArticuloManufacturado= async (artManFacsReq) =>{
  let { active } = artManFacsReq.body;
  let actOpt = { active, delete: {} };

  try {
    let artManFac = await ArtManufactModel.findOneAndUpdate(
      filter,
      { $set: actOpt },
      { new: true }
    );
    return artManFac;
  } catch (error) {
    console.error(`Error Svc ArtManufact: ${error}`);
  }
}


/**
 * ArticuloManufacturado Service
 */
const ArticuloManufacturadoSvc = {
  findAllArticuloManufacturado,
  findOneArticuloManufacturado,
  searchArticuloManufacturado,
  saveArticuloManufacturado,
  updateArticuloManufacturado,
  deleteArticuloManufacturado,
  activeArticuloManufacturado 
};

export default ArticuloManufacturadoSvc;