import RubroArticulo from "../models/rubroArticulo.model";

//Find All Rubro Articulo
let findAllRubroArticulo = async() => {
  try {
    let rubArticulos = await RubroArticulo.find({ active: true }).populate({
      path: 'RubArtPadre',
      populate: {
        path: 'RubArtPadre',
        model: 'RubroArticulo'
      } 
    });
    return rubArticulos;
  } catch (error) {
    console.error(`Error Svc Rubro Art : ${error}`);
  }
}

//Find One Rubro Aritculo
let findOneRubroArticulo = async(rubArtReq) => {
  let _id = rubArtReq.params.id;
  try {
    let rubArticulo = await RubroArticulo.aggregate([
      { 
        $addFields: {
          _id: { $toString: '$_id' }
        }
      },
      {
        $graphLookup: {
          from: RubroArticulo.collection.name,
          startWith: '$RubArtPadre',
          connectFromField: 'RubroArticulo.RubArtPadre',
          connectToField: '_id',
          as: 'rubroSuperior'
        }
      },
      {
        $match: {
          active: true,
          _id
        }
      }
    ]);
    return rubArticulo;
  } catch (error) {
    console.error(`Error Svc Rubro Art : ${error}`);
  }
}

//Save Rubro Articulo
let saveRubroArticulo = async (rubArtReq) => {
  try {
    let { denominacion, RubArtPadre } = rubArtReq.body;
    let rubArticulo = RubroArticulo({denominacion,RubArtPadre,active:true});
    let rubArtSaved = await rubArticulo.save();
    return rubArtSaved;
  } catch (error) {
    console.error(`Error Svc Rubro Art : ${error}`);
  }
}

//Update Rubro Articulo
let updateRubroArticulo = async (rubArtReq) =>{
  try {
    let rubArtUpdated = await RubroArticulo.findOneAndUpdate({_id: rubArtReq.params.id},rubArtReq.body,{new:true});
    return rubArtUpdated;
  } catch (error) {
    console.error(`Error Svc Rubro Art : ${error}`);
  }
}

//Delete (Soft Delete)
let deleteRubroArticulo = async (rubArtReq) =>  {
  let { user_uid } = rubArtReq.body
  let deleteOptions = {
    user_uid,
    deletedAt: new Date()
  };
  try {
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
    console.error(`Error Svc Rubro Art : ${error}`);
  }
}

//Active Rubro Aritculo
let activeRubroArticulo = async (rubArtReq) =>{
  let { active } = rubArtReq.body;
  let actOpt = { active, delete: {} };
  try {
    let rubArt = await RubroArticulo.findOneAndUpdate(
      { _id: rubArtReq.params.id },
      { $set: actOpt },
      {new:true}
    );
    return rubArt;
  } catch (error) {
    console.error(`Error Svc Rubro Art : ${error}`);
  }
}


/**
* Rubro Arituclo Service
*/
const RubArtSvc = {findAllRubroArticulo, findOneRubroArticulo, saveRubroArticulo, updateRubroArticulo, deleteRubroArticulo, activeRubroArticulo};

export default RubArtSvc;
