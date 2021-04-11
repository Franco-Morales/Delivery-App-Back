import RubGnlSvc from "../services/RubroGeneral.service";


let getAll = async (req,res) => {
    try {
        let rubGenerales = await RubGnlSvc.findAllRubGeneral();
        if (rubGenerales.length != 0) {
            res.status(200).json(rubGenerales);
        } else {
            res.status(204).json({"msg":"Empty"})
        }
    } catch (error) {
        res.status(500).json({"error":error});
    }
}

let getOne = async (req,res) => {
    try {
        res.status(200).json([]);
    } catch (error) {
        res.status(500).json({"error":error});
    }
}

let updateOne = async (req,res) => {
    try {
        res.status(200).json([]);
    } catch (error) {
        res.status(500).json({"error":error});
    }
}

let postOne = async (req,res) => {
    try {
        let rubGnl = await RubGnlSvc.saveRubroGeneral(req.body);
        res.status(200).json(rubGnl);
    } catch (error) {
        res.status(500).json({"error":error});
    }
}

let deleteOne = async (req,res) => {
    try {
        res.status(200).json([]);
    } catch (error) {
        res.status(500).json({"error":error});
    }
}

/**
 * Rubro General Controller
 */
const RubGnlCtrl = { getAll, getOne, postOne, updateOne, deleteOne };

export default RubGnlCtrl;