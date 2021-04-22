import RubroArticulo from "../models/rubroArticulo.model";

//Find All Rubro Articulo
let findAllRubroArticulo = async() => {
  try {
    let rubArticulos = await RubroArticulo.find({ active: true });
    return rubArticulos;
  } catch (error) {
    throw new Error(error);
  }
}

//Find One Rubro Aritculo
let findOneRubroArticulo = async(rubArtReq) => {
  try {
    let rubArticulo = await RubroArticulo.findById(rubArtReq.params.id);
    return rubArticulo;
  } catch (error) {
    throw new Error(error);
  }
}

//Save Rubro Articulo
let saveRubroArticulo = async (rubArtReq) => {
  try {
    let { denominacion } = rubArtReq.body;
    let rubArticulo = RubroArticulo({denominacion,active:true});
    let rubArtSaved = await rubArticulo.save();
    return rubArtSaved;
  } catch (error) {
    throw new Error(error);
  }
}

//Update Rubro Articulo
let updateRubroArticulo = async (rubArtReq) =>{
  try {
    let rubArtUpdated = await RubroArticulo.findOneAndUpdate({_id: rubArtReq.params.id},rubArtReq.body,{new:true});
    return rubArtUpdated;
  } catch (error) {
    throw new Error(error);
  }
}

//Delete (Soft Delete)
let deleteRubroArticulo = async (rubArtReq) =>  {
  try {
    let { user_uid } = req.body
    let deleteOptions = {
      user_uid,
      deletedAt: new Date()
  };

    let rubroArtDeleted = await RubroArticulo.findOneAndUpdate(
      {_id: rubArtReq.params.id },
      {
        $set:{
          active: false,
          delete: deleteOptions
        }
    },{new:true});
    return rubroArtDeleted;
  } catch (error) {
    throw new Error(error);
  }
}

//Active Rubro Aritculo
let activeRubroArticulo = async (rubArtReq) =>{
  try {
    let { active } = rubArtReq.body;

    let rubArt = await RubroArticulo.findOneAndUpdate(
      { _id: rubArtReq.params.id },
      { $set: { active } },
      {new:true}
    );
    return rubArt;
  } catch (error) {
    console.log('Error : ',error);
  }
}


/**
* Rubro Arituclo Service
*/
const RubArtSvc = {findAllRubroArticulo, findOneRubroArticulo, saveRubroArticulo, updateRubroArticulo, deleteRubroArticulo, activeRubroArticulo};

export default RubArtSvc;
