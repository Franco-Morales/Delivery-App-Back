import ConfigSvc from "../services/Config.service";


let saveOne = async (req,res) => {
  try {
    let config = await ConfigSvc.postConfig(req);
    // if(config){
    //   res.status(204).json({"msg":"Empty"});
    // }
    res.status(200).json(config);
  } catch (error) {
    res.status(500).json({"error":error});
  }
}

let getOne = async (req,res) => {
  try {
    let config = await ConfigSvc.findOneConfig(req);
    res.status(200).json(config);
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
      res.status(204).json({"msg":"Empty"})
    }
  } catch (error) {
    res.status(500).json({"error": error})
  }
}

/**
* Configuracion Controller
*/
const ConfigCtrl = { getOne, updateOne, saveOne };

export default ConfigCtrl;
