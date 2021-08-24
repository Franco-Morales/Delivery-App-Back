import RubroArticulo from "../models/RubroArticulo.model";
import RubroGeneral from "../models/rubroGeneral.model";
import ArticuloInsumo from "../models/ArticuloInsumo.model";
import ArticuloManufacturado from "../models/ArticuloManufacturado.model";
import Config from "../models/Config.model";

import Rollback from "./model/Rollback.model";
import Hefesto from "./Hefesto";


const dropCollections = async () => {
    console.log('Subrutine: Hades [ INIT ]');
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

            await Config.findByIdAndDelete(rollbackRef.config._id);

            await Rollback.remove();
        } 
        console.log('Subrutine: Hades [ END ]');
       
    } catch (error) {
        console.error(`Module : Gaia -> SubRutine : Hades -> dropCollections -> Error : ${error}`);
    }
}

const purge = async () => {
    console.log('Subrutine: Hades -> purge [ INIT ]');
    try {
        await Rollback.remove();
        await RubroArticulo.remove();
        await RubroGeneral.remove();
        await ArticuloInsumo.remove();
        await ArticuloManufacturado.remove();

        console.log('Subrutine: Hades -> purge [ END ]');
    } catch (error) {
        console.error(`Module : Gaia -> SubRutine : Hades -> kill-> Error : ${error}`);
    }
}

/**
 * El módulo 'Hades' se encarga de borrar los documentos de la BD
 * 
 * Función principal : @function `init()` 
 * Sub funciones : 
 * @function `dropCollections()` Borra los documentos de las colleciones creadas mediante `Gaia` siempre y cuando exista una coleción 'Rollback'
 * @function `purge()` Borra los documentos de las colleciones en la BD sean creados mediante `Gaia` u otro. Afecta a las coleciones Art Insumo, Art Manufacturado, Rub. General, Rub. Artículo y Config
 */
export default { dropCollections, purge };