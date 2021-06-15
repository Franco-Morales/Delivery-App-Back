import { Types } from "mongoose";
import ArticuloInsumo from "../models/articuloInsumo.model";

//Find All Articulo Insumo
let findAllArticuloInsumo = async(method=null) => {
  let artIns = []
  try {
    if(method==='menu') {
      let filter = { active:true, esInsumo: false}
      artIns = await ArticuloInsumo.find(filter).populate('RubArt');
      return artIns;
    }
    artIns = await ArticuloInsumo.find({active:true}).populate('RubArt');
    return artIns;
  } catch (error) {
    console.error(`Error Svc Art Insumo : ${error.message}`);
  }
}

let findAllArticuloInsumoPaginate = async(req,method = null) => {
  let artIns = [];
  let count = 0;
  try {
    let limit = parseInt(req.query.limit);
    let skip = parseInt(req.query.skip);
    let count = await ArticuloInsumo.countDocuments({active: true});
    if(method == 'menu'){
        let count = await ArticuloInsumo.countDocuments({esInsumo: false,active:true});
      artIns = await ArticuloInsumo.find({active: true, esInsumo: false}).skip(skip).limit(limit).populate('RubArt');
      return ({artInsumos: artIns,isLast:limit + skip >= count ? true : false,isFirst: skip != 0 ? false : true,count: count})
    }
    artIns = await ArticuloInsumo.find({active: true}).skip(skip).limit(limit).populate('RubArt');
    return ({artInsumos: artIns,isLast:limit + skip >= count ? true : false,isFirst: skip != 0 ? false : true,count: count})
  } catch (error) {
    console.error(`Error Svc Art Insumo : ${error.message}`);
  }
}

//Find One Articulo Insumo
let findOneArticuloInsumo = async(artInReq) => {
  let _id = artInReq.params.id;
  let filter = { _id, active: true };
  try {
    let artIn = await ArticuloInsumo.findOne(filter).populate('RubArt');
    return artIn;
  } catch (error) {
    console.error(`Error Svc Art Insumo : ${error.message}`);
  }
}

// Search Articulo Insumo
let searchArticuloInsumo = async (query) => {
  let filter = {
    active: true,
    esInsumo: false,
    denominacion: { $regex: new RegExp(query,'i') }
  };
  try {
    let artIn = await ArticuloInsumo.find(filter);
    return artIn;
  } catch (error) {
    console.error(`Error Svc Art Insumo : ${error.message}`);
  }
}

let filterArtInsumoByRubroArt = async (query,rubArtId) => {
  try {
    let artIn = await ArticuloInsumo.aggregate([
      {$match: {denominacion: { $regex: new RegExp(query,'i')},active: true,esInsumo: false,RubArt: Types.ObjectId(rubArtId)}}
    ]);
    return artIn;
  } catch (error) {
    console.error(`Error Svc Art Insumo : ${error.message}`);
  }
}

//Save Articulo Insumo
let saveArticuloInsumo = async (artInReq) => {
  try {
    let { denominacion, precioCompra, precioVenta, stockActual, stockMinimo, unidadMedida, esInsumo, RubArt } = artInReq.body;
    let artIn = ArticuloInsumo({denominacion, precioCompra, precioVenta, stockActual, stockMinimo, unidadMedida, esInsumo, RubArt, active:true});
    let artInSaved = await artIn.save();
    return artInSaved;
  } catch (error) {
      console.error(`Error Svc Art Insumo : ${error.message}`);
  }
}

//Update Articulo Insumo
let updateArticuloInsumo = async (artInReq) =>{
  try {
      let artInUpdated = await ArticuloInsumo.findOneAndUpdate({_id: artInReq.params.id}, artInReq.body,{new:true});
      return artInUpdated;
  } catch (error) {
      console.error(`Error Svc Art Insumo : ${error.message}`);
  }
}

//Delete Articulo Insumo
let deleteArticuloInsumo = async (artInReq) =>  {
  let { user_uid } = artInReq.body;
  let deleteOptions = {
      user_uid,
      deletedAt: new Date()
  };
  try {
    let artInDeleted = await ArticuloInsumo.findOneAndUpdate(
      {_id: artInReq.params.id },
      {
        $set:{
          active: false,
          delete: deleteOptions
        }
      },{ new: true });
    return artInDeleted;
  } catch (error) {
      console.error(`Error Svc Art Insumo : ${error.message}`);
  }
}

//Active Articulo Insumo
let activeArticuloInsumo = async (artInReq) => {
  let { active } = artInReq.body;
  let actOpt = { active, delete: {} };

  try {
    let artIn = await ArticuloInsumo.findOneAndUpdate(
      { _id: artInReq.params.id },
      { $set: actOpt },
      { new: true }
    );
    return artIn;
  } catch (error) {
    console.error(`Error Svc Art Insumo : ${error.message}`);
  }
}

/**
 * Articulo Insumo Service
 */
const ArticuloInsumoSvc = {
  findAllArticuloInsumo,
  findAllArticuloInsumoPaginate,
  findOneArticuloInsumo,
  searchArticuloInsumo,
  filterArtInsumoByRubroArt,
  saveArticuloInsumo,
  updateArticuloInsumo,
  deleteArticuloInsumo,
  activeArticuloInsumo
};

export default ArticuloInsumoSvc;
