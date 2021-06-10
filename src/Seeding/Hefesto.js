import Rollback from "./model/Rollback.model";

import rollbackJson from "./data/rollback.seed.json";

const init = async () => {
    try {
        let rollbackModel = Rollback(rollbackJson);
        await rollbackModel.save();
    } catch (error) {
        console.error(`Module : Gaia -> SubRutine : Hefesto -> Init : Error -> ${error}`);
    }
};


const forge = async (data) => {
    try {
        let rollbackRef = await Rollback.findById("60c21eac102f8d2b78550691");
        
        if(data.rubGnl) rollbackRef.rubGnl = data.rubGnl;
        if(data.rubArt) rollbackRef.rubArt = data.rubArt;
        if(data.artInsumo) rollbackRef.artInsumo = data.artInsumo;
        if(data.artManufact) rollbackRef.artManufact = data.artManufact;
        
        await rollbackRef.save();

    } catch (error) {
        console.error(`Module : Gaia -> SubRutine : Hefesto -> forge : Error -> ${error}`);
    }
}

const reBuild = async () => {
    try {
        let rollbackRef = await Rollback.findById("60c21eac102f8d2b78550691");
        return rollbackRef;
    } catch (error) {
        console.error(`Module : Gaia -> SubRutine : Hefesto -> reBuild : Error -> ${error}`);
    }
}

export default { init, forge, reBuild };