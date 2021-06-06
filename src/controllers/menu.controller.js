import ArtInsumoSvc from "../services/ArticuloInsumo.service";
import ArtManufactSvc from "../services/ArticuloManufacturado.service";


let getAllMenu = async (req, res) => {
    let menu = [];

    // console.log(req.query);
    try {

        if (req.query.search) {
            let artIns = await ArtInsumoSvc.searchArticuloInsumo(req.query.search);
            let artManufact = await ArtManufactSvc.searchArticuloManufacturado(req.query.search);
            menu = [...artIns, ...artManufact];
        } else {
            let artIns = await ArtInsumoSvc.findAllArticuloInsumo('menu');
            let artManufact = await ArtManufactSvc.findAllArticuloManufacturado();
            menu = [...artIns, ...artManufact];
        }
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({"error":error});
    }
}

/**
 * Menu Controller
 */
const MenuCtrl = { getAllMenu };


export default MenuCtrl;