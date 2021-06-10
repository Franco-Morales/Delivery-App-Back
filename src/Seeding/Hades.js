import RubroArticulo from "../models/RubroArticulo.model";
import RubroGeneral from "../models/rubroGeneral.model";
import ArticuloInsumo from "../models/ArticuloInsumo.model";
import ArticuloManufacturado from "../models/ArticuloManufacturado.model";

import Rollback from "./model/Rollback.model";
import Hefesto from "./Hefesto";


const dropCollections = async () => {
    try {
        let rollbackRef = await Hefesto.reBuild();

        if (rollbackRef) {
            for (const i of rollbackRef.rubGnl) {
                await RubroGeneral.findByIdAndDelete(i);
            }
    
            for (const i of rollbackRef.rubArt) {
                await RubroArticulo.findByIdAndDelete(i);
            }
    
            for (const i of rollbackRef.artInsumo) {
                await ArticuloInsumo.findByIdAndDelete(i);
            }
    
            for (const i of rollbackRef.artManufact) {
                await ArticuloManufacturado.findByIdAndDelete(i);
            }

            await Rollback.remove();
        } 

        return ;
       
    } catch (error) {
        console.error(`Module : Gaia -> SubRutine : Hades -> dropCollections -> Error : ${error}`);
    }
}

const kill = async () => {
    try {
        await Rollback.remove();
        await RubroArticulo.remove();
        await RubroGeneral.remove();
        await ArticuloInsumo.remove();
        await ArticuloManufacturado.remove();
    } catch (error) {
        console.error(`Module : Gaia -> SubRutine : Hades -> kill-> Error : ${error}`);
    }
}


export default { dropCollections, kill };