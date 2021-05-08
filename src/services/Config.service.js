import Config from "../models/Config.model";

//Find One Config
let findOneConfig = async(configReq) => {
    try {
      let config = await Config.findById(configReq.params.id);
      return config;
    } catch (error) {
      console.error(`Error Svc Config: ${error}`);
    }
}
//Post Config
let postConfig = async (configReq) => {
  let { emailEmpresa, tokenMercadoPago, lat, lng } = configReq.body;
  try {
    let auxConfig = new Config({emailEmpresa, tokenMercadoPago, lat, lng});
    let newConfig = await auxConfig.save();

    return newConfig;
  } catch (error) {
    console.error(`Error Svc Config: ${error}`);
  }
}

//Update Config
let updateConfig = async (configReq) =>{
  try {
    let configUpdated = await Config.findOneAndUpdate({_id: configReq.params.id},configReq.body,{new:true});
    return configUpdated;
  } catch (error) {
    console.error(`Error Svc Config: ${error}`);
  }
}

/**
 * Config Service
 */
const ConfigSvc = {findOneConfig, updateConfig, postConfig};

export default ConfigSvc;