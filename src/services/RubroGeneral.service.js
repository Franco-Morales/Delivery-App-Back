import RubroGeneral from "../models/RubroGeneral.model";


let findAllRubGeneral = async() => {
    try {
        let rubGenerales = await RubroGeneral.find();
        return rubGenerales;
    } catch (error) {
        throw new Error(error);
    }
}

let saveRubroGeneral = async (rubGnlReq) => {
    try {
        let { denominacion } = rubGnlReq;
        let auxRubGnl = RubroGeneral({denominacion});
        let rubGnlSaved = await auxRubGnl.save();
        return rubGnlSaved;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Rubro General Service
 */
const RubGnlSvc = { findAllRubGeneral, saveRubroGeneral };

export default RubGnlSvc;