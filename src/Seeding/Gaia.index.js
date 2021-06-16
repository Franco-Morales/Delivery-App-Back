// import minerva from "./minerva";
import Demeter from "./Demeter";
import Hades from "./Hades";

/**
 * La función 'terraform' inicializa el proceso de llenado en la BD, tiene cuatro opciones disponibles
 * @param {string} opt create || update || drop || purge
 */
const terraform = async (opt) => {
    console.log('Module : Gaia : [ INIT ]');
    try {
        if (opt) {
            const choice = {
                create: async function() {
                    await Hades.dropCollections();
                    await Demeter.init();
                },
                update: async function () {
                    await Demeter.init();
                },
                drop: async function () {
                    await Hades.dropCollections();
                },
                purge: async function() {
                    await Hades.purge();
                }
            }
            await choice[opt]();
        } else {
            console.log('Module : Gaia : [ No parameters :( ]');
            return ;
        }
        console.log('Module : Gaia : [ END ]');
    } catch (error) {
        console.error(`Module : Gaia : Error -> ${error}`);
    }
}

/**
 * @module Gaia
 * @description El módulo actua como un index para llamar a las subfunciones, el único método ejecutable que tiene es `terraform()`
 * 
 */
export default { terraform };