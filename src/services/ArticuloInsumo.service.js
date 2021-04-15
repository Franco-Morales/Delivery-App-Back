import ArticuloInsumo from "../models/articuloInsumo.model";

//Find All ArticuloInsumo
let findAllArticuloInsumo = async() => {
    try {
        let artIns = await ArticuloInsumo.find({active:true});
        return artIns;
    } catch (error) {
        throw new Error(error);
    }
}

//Find One ArticuloInsumo
let findOneArticuloInsumo = async(artInReq) => {
    try {
      let artIn = await ArticuloInsumo.findById(artInReq.params.id);
      return artIn;
    } catch (e) {
      throw new Error(error);
    }
}

//Save ArticuloInsumo
let saveArticuloInsumo = async (artInReq) => {
    try {
      let { denominacion, precioCompra, precioVenta, stockActual, stockMinimo, unidadMedida, esInsumo, RubArt } = artInReq.body;
      let artIn = ArticuloInsumo({denominacion, precioCompra, precioVenta, stockActual, stockMinimo, unidadMedida, esInsumo, RubArt, active:true});
      let artInSaved = await artIn.save();
      return artInSaved;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

//Update ArticuloInsumo
let updateArticuloInsumo = async (artInReq) =>{
    try {
        let artInUpdated = await ArticuloInsumo.findOneAndUpdate({_id: artInReq.params.id}, artInReq.body,{new:true});
        return artInUpdated;
    } catch (error) {
        throw new Error(error);
    }
}

//Delete (Soft Delete)
let deleteArticuloInsumo = async (artInReq) =>  {
    try {
        let { user_uid } = artInReq.body;
        let deleteOptions = {
            user_uid,
            deletedAt: new Date()
        };

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
        throw new Error(error);
    }
}

//Active Articulo Insumo
let activeArticuloInsumo = async (artInReq) =>{
  try {
    let { active } = artInReq.body;

    let artIn = await ArticuloInsumo.findOneAndUpdate(
      { _id: artInReq.params.id },
      { $set: { active } },
      {new:true}
    );
    return artIn;
  } catch (error) {
    console.log('Error : ',error);
  }
}


/**º
 * Articulo Insumo Service
 */
const ArticuloInsumoSvc = {
  findAllArticuloInsumo,
  findOneArticuloInsumo,
  saveArticuloInsumo,
  updateArticuloInsumo,
  deleteArticuloInsumo,
  activeArticuloInsumo};

export default ArticuloInsumoSvc;
