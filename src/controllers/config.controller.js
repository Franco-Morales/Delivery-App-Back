import ConfigSvc from "../services/Config.service";

let getOne = async (req,res) => {
  try {
    let config = await ConfigSvc.findOneConfig(req)
    if(config){
      res.status(200).json(config)
    }else{
      res.status(204).json({"msg":"Empty"})
    }
  } catch (error) {
    res.status(500).json({"error":error});
  }
}

let updateOne = async(req,res) => {
  try {
    let configUpdated = await ConfigSvc.updateConfig(req)
    if(configUpdated){
      res.status(200).json(configUpdated)
    }else{
      res.status(200).json({"msg":"Empty"})
    }
  } catch (e) {
    res.status(500).json({"error": error})
  }
}

/**
* Configuracion Controller
*/
const ConfigCtrl = { getAll, updateOne};

export default ConfigCtrl;
