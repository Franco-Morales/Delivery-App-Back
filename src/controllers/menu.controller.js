import ArtInsumoSvc from "../services/ArticuloInsumo.service";
import ArtManufactSvc from "../services/ArticuloManufacturado.service";


let getAllMenu = async (req, res) => {
    let menu = [];
    try {

        if (req.query.search) {
            let artIns = await ArtInsumoSvc.searchArticuloInsumo(req.query.search);
            let artManufact = await ArtManufactSvc.searchArticuloManufacturado(req.query.search);
            menu = [...artIns, ...artManufact];
        } else if(req.query.filter){
            let artIns = await ArtInsumoSvc.filterArtInsumoByRubroArt(req.query.filter);
            let artManufact = await ArtManufactSvc.filterArtManufactByRubroGnl(req.query.filter);
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

let getOneMenu = async (req, res) => {
    let plato = { tipo: "", data: {} };
    try {
        let artInsumo = await ArtInsumoSvc.findOneArticuloInsumo(req);
        let artManufact = await ArtManufactSvc.findOneArticuloManufacturado(req);

        if(artInsumo) {
            plato.data = artInsumo;
            plato.tipo = 'artInsumo';
        }

        if(artManufact) {
            plato.data = artManufact;
            plato.tipo = 'artManufact';
        }
        
        res.status(200).json(plato)
    } catch (error) {
        res.status(500).json({"error":error});
    }
}

/**
 * Menu Controller
 */
const MenuCtrl = { getAllMenu, getOneMenu };


export default MenuCtrl;