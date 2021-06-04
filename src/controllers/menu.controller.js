import ArtInsumoSvc from "../services/ArticuloInsumo.service";
import ArtManufactSvc from "../services/ArticuloManufacturado.service";


let getAllMenu = async (req, res) => {

    let menu = [];

    try {
        let artIns = await ArtInsumoSvc.findAllArticuloInsumo('menu');
        let artManufact = await ArtManufactSvc.findAllArticuloManufacturado();
        menu = [...artIns, ...artManufact];
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