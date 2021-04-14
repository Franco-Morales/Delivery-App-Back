import RubGnlSvc from "../services/rubroGeneral.service";


let getAll = async (req,res) => {
  try {
    let rubGenerales = await RubGnlSvc.findAllRubroGeneral();
    if (rubGenerales.length != 0) {
      res.status(200).json(rubGenerales);
    } else {
      res.status(204).json({"msg":"Empty"})
    }
  } catch (error) {
    res.status(500).json({"error":error});
  }
}

let getOne = async (req,res) => {
  try {
    let rubGnl = await RubGnlSvc.findOneRubroGeneral(req)
    if(rubGnl){
      res.status(200).json(rubGnl)
    }else{
      res.status(204).json({"msg":"Empty"})
    }
  } catch (error) {
    res.status(500).json({"error":error});
  }
}

let updateOne = async (req,res) => {
  try {
    let rubGeneralUpdated = await RubGnlSvc.updateRubroGeneral(req)
    res.status(200).json(rubGeneralUpdated);
  } catch (error) {
    res.status(500).json({"error":error});
  }
}

let postOne = async (req,res) => {
  try {
    let rubGnl = await RubGnlSvc.saveRubroGeneral(req);
    res.status(200).json(rubGnl);
  } catch (error) {
    res.status(500).json({"error":error});
  }
}

let deleteOne = async (req,res) => {
  try {
    let rubGeneralDeleted = await RubGnlSvc.deleteRubroGeneral(req)
    res.status(200).json(rubGeneralDeleted);
  } catch (error) {
    res.status(500).json({"error":error});
  }
}

/**
* Rubro General Controller
*/
const RubGnlCtrl = { getAll, getOne, postOne, updateOne, deleteOne };

export default RubGnlCtrl;
