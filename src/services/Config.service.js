import Config from "../models/pedido.model";

//Find One Config
let findOneConfig = async(configReq) => {
    try {
      let config = await Config.findById(configReq.params.id);
      return config;
    } catch (error) {
      throw new Error(error);
    }
}

//Update Config
let updateConfig = async (configReq) =>{
    try {
        let configUpdated = await Config.findOneAndUpdate({_id: configReq.params.id},configReq.body,{new:true});
        return configUpdated;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Config Service
 */
const ConfigSvc = {findOneConfig, updateConfig};

export default ConfigSvc;
