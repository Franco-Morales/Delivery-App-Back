import rubGnlJson from "./data/rubGnl.seed.json";
import RubroGeneral from "../models/rubroGeneral.model";

import rubArtJson from "./data/rubArt.seed.json";
import RubroArticulo from "../models/RubroArticulo.model";

import insumoJson from "./data/insumo.seed.json";
import ArticuloInsumo from "../models/ArticuloInsumo.model";

import manufactJson from "./data/manufact.seed.json";
import ArticuloManufact from "../models/ArticuloManufacturado.model";

import Hefesto from "./Hefesto";

const init = async () => {
    try {
        await Hefesto.init();
        await germinate();
    } catch (error) {
        console.error(`Module : Gaia -> SubRutine : Demeter -> Init : Error -> ${error}`);
    }
}

const germinate = async () => {
    let seeds = [ seedRubGnl, seedRubArt, seedInsumo, seedManufact ];
    try {
        for (const seed of seeds) {
            await seed();
        }
    } catch (error) {
        console.error(`Module : Gaia -> SubRutine : Demeter -> Germinate : Error -> ${error}`);
    }
}


let seedRubGnl = async () => {
    let ids = [];
    for (let rubGnl of rubGnlJson) {
        let aux = await RubroGeneral(rubGnl);
        aux.save();

        ids.push(aux._id);
    }

    await Hefesto.forge({ rubGnl : ids});
}

let seedRubArt = async () => {
    let ids = [];
    for (let element of rubArtJson) {
        let aux = RubroArticulo(element);
        aux.save();

        ids.push(aux._id);
    }

    await Hefesto.forge({ rubArt : ids});
}

let seedInsumo = async () => {
    let ids = [];
    for (const element of insumoJson) {
        let aux = await ArticuloInsumo(element);
        aux.save();

        ids.push(aux._id);
    }

    await Hefesto.forge({ artInsumo : ids});
}

let seedManufact = async () => {
    let ids = [];
    for (const element of manufactJson) {
        let aux = await ArticuloManufact(element);
        aux.save();

        ids.push(aux._id);
    }

    await Hefesto.forge({ artManufact : ids});
}


export default { init };