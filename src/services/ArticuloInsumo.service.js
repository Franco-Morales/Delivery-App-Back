import ArticuloInsumo from "../models/articuloInsumo.model";


//Find All Articulo Insumo
let findAllArticuloInsumo = async(method='crud') => {
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
    console.error(`Error Svc Art Insumo : ${error}`);
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
    console.error(`Error Svc Art Insumo : ${error}`);
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
      console.error(`Error Svc Art Insumo : ${error}`);
  }
}

//Update Articulo Insumo
let updateArticuloInsumo = async (artInReq) =>{
  try {
      let artInUpdated = await ArticuloInsumo.findOneAndUpdate({_id: artInReq.params.id}, artInReq.body,{new:true});
      return artInUpdated;
  } catch (error) {
      console.error(`Error Svc Art Insumo : ${error}`);
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
      console.error(`Error Svc Art Insumo : ${error}`);
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
    console.error(`Error Svc Art Insumo : ${error}`);
  }
}

/**
 * Articulo Insumo Service
 */
const ArticuloInsumoSvc = {
  findAllArticuloInsumo,
  findOneArticuloInsumo,
  saveArticuloInsumo,
  updateArticuloInsumo,
  deleteArticuloInsumo,
  activeArticuloInsumo
};

export default ArticuloInsumoSvc;