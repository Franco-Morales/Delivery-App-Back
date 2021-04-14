import { RubroGeneral } from "../models/rubroGeneral.model";

//Find All Rubro General
let findAllRubroGeneral = async() => {
  try {
    // let rubGenerales = await RubroGeneral.find({ active: true }).select(['-delete']);
    let rubGenerales = await RubroGeneral.find({ active: true });
    return rubGenerales;
  } catch (error) {
    throw new Error(error);
  }
}

//Find One Rubro General
let findOneRubroGeneral = async(rubGnlReq) => {
  try {
    let rubGeneral = await RubroGeneral.findById(rubGnlReq.params.id);
    return rubGeneral;
  } catch (e) {
    throw new Error(error);
  }
}

//Save Rubro General
let saveRubroGeneral = async (rubGnlReq) => {
  try {
    let { denominacion } = rubGnlReq.body;
    let auxRubGnl = RubroGeneral({denominacion,active: true});
    let rubGnlSaved = await auxRubGnl.save();
    return rubGnlSaved;
  } catch (error) {
    throw new Error(error);
  }
}

//Update Rubro General
let updateRubroGeneral= async (rubGnlReq) =>{
  try {
    let rubGeneralUpdated = await RubroGeneral.findOneAndUpdate({_id: rubGnlReq.params.id},rubGnlReq.body);
    return rubGeneralUpdated;
  } catch (error) {
    throw new Error(error);
  }
}

//Delete Rubro General
let deleteRubroGeneral = async (rubGnlReq) => {
  try {
    if(rubGnlReq.body.restore) {
      let rubroGralRestored = await RubroGeneral.findOneAndUpdate(
        {_id: rubGnlReq.params.id },
        {
          $set:{
            active: true,
            delete: {}
          }
      });
      return rubroGralRestored;
    }

    let { user_uid } = rubGnlReq.body;
    let deleteOptions = {
      user_uid,
      deletedAt: new Date()
    };

    let rubroGralDeleted = await RubroGeneral.findOneAndUpdate(
      {_id: rubGnlReq.params.id },
      {
        $set:{
          active: false,
          delete: deleteOptions
        }
    });
    return rubroGralDeleted;
  }   catch (error) {
    throw new Error(error);
  }
}

let activeRubroGeneral = async (rubGnlReq) =>{
  try {
    let { active } = rubGnlReq.body;

    let rubGeneral = await RubroGeneral.findOneAndUpdate(
      { _id: rubGnlReq.params.id },
      { $set: { active } }
    );
    return rubGeneral
  } catch (error) {
    console.log('Error : ',error);
  }
}

/**
* Rubro General Service
*/
const RubGnlSvc = { 
  findAllRubroGeneral, 
  findOneRubroGeneral, 
  saveRubroGeneral, 
  deleteRubroGeneral, 
  updateRubroGeneral, 
  activeRubroGeneral
};

export default RubGnlSvc;
