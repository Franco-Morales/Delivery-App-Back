import Rollback from "./model/Rollback.model";

import rollbackJson from "./data/rollback.seed.json";

const init = async () => {
    console.log('Subrutine: Hefesto [ INIT ]');
    try {
        let rollbackModel = Rollback(rollbackJson);
        await rollbackModel.save();
        console.log('Subrutine: Hefesto [ END ]');
    } catch (error) {
        console.error(`Module : Gaia -> SubRutine : Hefesto -> Init : Error -> ${error}`);
    }
};


const forge = async (data) => {
    try {
        let rollbackRef = await Rollback.findById("60c21eac102f8d2b78550691");

        if(data.config) rollbackRef.config = data.config;
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

/**
 * El módulo 'hefesto' se encarga de almacenar y crear la colecion que permite realizar un rollback de manera segura.
 * 
 * Funcion principal : @function `init()`
 * Sub funciones: 
 * @function `forge()` : Actaliza el documento de colección Rollback
 * @function `reBuild()` : Retorna el documento de colección Rollback
 */
export default { init, forge, reBuild };