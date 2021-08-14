import { Types } from "mongoose";
import ArtManufactModel from "../models/articuloManufacturado.model";
// import RubroGeneral from "../models/rubroGeneral.model";

//Find All ArticuloManufacturado
let findAllArticuloManufacturado = async() => {
  try {
    let artManFacs = await ArtManufactModel.find({active:true}).populate('RubroGeneral');
    return artManFacs;
  } catch (error) {
    console.error(`Error Svc ArtManufact: ${error.message}`);
  }
}

let findAllArticuloManufacturadoPaginate = async(req) => {
  let artManFacs = [];
  try {
    //SIEMPRE EL LIMITE Y SKIP DEBEN SER MULTIPLOS
    let limit = parseInt(req.query.limit);
    let skip = parseInt(req.query.skip);
    let count = await ArtManufactModel.countDocuments({active: true});
    let first = skip != 0 ? false : true;
    let last = limit + skip >= count ? true : false;
    artManFacs = await ArtManufactModel.find({active:true}).skip(skip).limit(limit).populate('RubroGeneral');
    return ({artManFac: artManFacs,isFirst: first,isLast: last,count: count});
  } catch (error) {
    console.error(`Error Svc ArtManufact : ${error.message}`);
  }
}

//Find One ArticuloManufacturado
let findOneArticuloManufacturado = async(artManFacsReq) => {
  let _id = artManFacsReq.params.id;
  let filter = { _id, active: true };
  try {
    let artManFac = await ArtManufactModel.findOne(filter)
      .populate("RubroGeneral")
      .populate({
        path: "ArtManufactDet",
        populate: {
          path: "ArtInsumo",
          model: "ArtInsumo"
        }
      });
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

//Filter Articulo Manufacturado By Rubro General
let filterArtManufactByRubroGnl = async (query,rubGnlId) => {

  try {
    let artManFac = await ArtManufactModel.aggregate([
      {$match:{denominacion: { $regex: new RegExp(query,'i')},active:true,RubroGeneral: Types.ObjectId(rubGnlId)}}
    ]);

    return artManFac;
  } catch (error) {
    console.error(`Error Svc ArtManufact: ${error.message}`);
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
    console.error(`Error Svc ArtManufact: ${error.message}`);
  }
}

//Update ArticuloManufacturado
let updateArticuloManufacturado = async (artManFacsReq) =>{
  try {
    let artManFacUpdated = await ArtManufactModel.findOneAndUpdate({_id: artManFacsReq.params.id},artManFacsReq.body,{new:true});
    return artManFacUpdated;
  } catch (error) {
    console.error(`Error Svc ArtManufact: ${error.message}`);
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
      console.error(`Error Svc ArtManufact: ${error.message}`);
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
      console.error(`Error Svc ArtManufact: ${error.message}`);
    }
  }


  /**
  * ArticuloManufacturado Service
  */
  const ArticuloManufacturadoSvc = {
    findAllArticuloManufacturado,
    findAllArticuloManufacturadoPaginate,
    findOneArticuloManufacturado,
    searchArticuloManufacturado,
    filterArtManufactByRubroGnl,
    saveArticuloManufacturado,
    updateArticuloManufacturado,
    deleteArticuloManufacturado,
    activeArticuloManufacturado
  };

  export default ArticuloManufacturadoSvc;
