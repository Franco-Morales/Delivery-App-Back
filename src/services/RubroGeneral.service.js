import RubroGeneral from "../models/rubroGeneral.model";

//Find All Rubro General
let findAllRubroGeneral = async() => {
  try {
    let rubGenerales = await RubroGeneral.find({ active: true });
    return rubGenerales;
  } catch (error) {
    console.error(`Error Svc RubroGeneral : ${error}`);
  }
}

//Find One Rubro General
let findOneRubroGeneral = async(rubGnlReq) => {
  let _id = rubGnlReq.params.id;
  let filter = { _id, active: true };
  try {
    let rubGeneral = await RubroGeneral.findOne(filter);
    return rubGeneral;
  } catch (error) {
    console.error(`Error Svc RubroGeneral : ${error}`);
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
    console.error(`Error Svc RubroGeneral : ${error}`);
  }
}

//Update Rubro General
let updateRubroGeneral= async (rubGnlReq) =>{
  try {
    let rubGeneralUpdated = await RubroGeneral.findOneAndUpdate({_id: rubGnlReq.params.id},rubGnlReq.body,{new:true});
    return rubGeneralUpdated;
  } catch (error) {
    console.error(`Error Svc RubroGeneral : ${error}`);
  }
}

//Delete Rubro General
let deleteRubroGeneral = async (rubGnlReq) => {
  let { user_uid } = rubGnlReq.body;
  let deleteOptions = {
    user_uid,
    deletedAt: new Date()
  };
  try {
    let rubroGralDeleted = await RubroGeneral.findOneAndUpdate(
      {_id: rubGnlReq.params.id },
      {
        $set:{
          active: false,
          delete: deleteOptions
        }
      },{new:true});
    return rubroGralDeleted;
  } catch (error) {
    console.error(`Error Svc RubroGeneral : ${error}`);
  }
}
//Active Rubro General
let activeRubroGeneral = async (rubGnlReq) =>{
  let { active } = rubGnlReq.body;
  let actOpt = { active, delete: {} };
  try {
    let rubGeneral = await RubroGeneral.findOneAndUpdate(
      { _id: rubGnlReq.params.id },
      { $set: actOpt },
      {new:true}
    );
    return rubGeneral;
  } catch (error) {
    console.error(`Error Svc RubroGeneral : ${error}`);
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