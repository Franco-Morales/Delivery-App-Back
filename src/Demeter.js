/**
 * Utilizar unicamente como prueba para el llenado de la BD, su uso es excluivo del desarrollo
 */

import RubroGeneral from "./models/rubroGeneral.model";
import RubroArticulo from "./models/RubroArticulo.model";

/**
 * Inicio el proceso de verificación y llenado de la BD
 */
let init = async () => {
    console.info('Module : Demeter : [ INIT ]');

    let check = { ra:0, rg:0};
    try {
        let auxRubGnl = await RubroGeneral.find();
        check.rg = auxRubGnl.length;
        let auxRubArt = await RubroArticulo.find();
        check.ra = auxRubArt.length;

        if( !(check.ra && check.rg) ) {
            await germinate();
        }
    } catch (error) {
        console.error(`Module : Demeter : [ INIT ] : Error : ${error}`);
    }
    console.info('Module : Demeter : [ END ]');
}

/**
 * Inicia el proceso de llenado de la base datos para cada 'Collección'
 */
let germinate = async () => {
    try {
        console.info('Module : Demeter : [ GERMINATE ]');
        await seedRubGnl();
        console.info('Module : Demeter : [ GERMINATE ]');
        await seedRubArt();
    } catch (error) {
        console.error(`Module : Demeter : [ GERMINATE ] : Error : ${error}`);
    }
}

/**
 * Especifico para la Colección Rubro General
 */
let seedRubGnl = async () => {
    let data = [
        {
            denominacion: "Pizzas",
            active: true
        },
        {
            denominacion: "Empanadas",
            active: true
        },
        {
            denominacion: "Hamburguesas",
            active: true
        },
        {
            denominacion: "Lomos",
            active: true
        },
        {
            denominacion: "Papas",
            active: true
        }
    ];
    
    try {
        for (const seed of data) {
            let aux = await RubroGeneral(seed);
            aux.save();
            console.info(`Module : Demeter : [ SEED:${aux.denominacion} ]`);
        }
    } catch (error) {
        console.error(`Module : Demeter : [ SEED:RubroGeneral ] : Error : ${error}`);
    }
}

/**
 * Especifico para la Colección Rubro Articulo
 */
let seedRubArt = async () => {
    let data = [
        {
            denominacion: "Harinas",
            active: true,
            RubArtPadre: undefined
        },
        {
            denominacion: "Salsas",
            active: true,
            RubArtPadre: undefined
        },
        {
            denominacion: "Levaduras",
            active: true,
            RubArtPadre: undefined
        },
        {
            denominacion: "Queso",
            active: true,
            RubArtPadre: undefined
        },
        {
            denominacion: "Fiambres",
            active: true,
            RubArtPadre: undefined
        },
        {
            denominacion: "Otros",
            active: true,
            RubArtPadre: undefined
        },
        {
            denominacion: "Bebidas",
            active: true,
            RubArtPadre: undefined
        }
    ];

    let dataRubArtBebida = [
        {
            denominacion: "Bebidas Gasificadas",
            active: true,
            RubArtPadre: undefined
        },
        {
            denominacion: "Bebidas Alcohólicas",
            active: true,
            RubArtPadre: undefined
        }
    ];

    try {
        for (const seed of data) {
            let aux = await RubroArticulo(seed);
            aux.save();
            console.info(`Module : Demeter : [ SEED:${aux.denominacion} ]`);
            if(aux.denominacion === 'Bebidas') {
                for (const i of dataRubArtBebida) {
                    i.RubArtPadre = aux._id;
                    let arthijo = await RubroArticulo(i);
                    arthijo.save();
                }
            }
        }
    } catch (error) {
        console.error(`Module : Demeter : [ SEED:RubroGeneral ] : Error : ${error}`);
    }
}

/**
 * @version preAlfa
 * @description Se encarga de llenar la Base de Datos con valores por defecto para su posterior uso.
 */
const Demeter = { init }

export default Demeter;