import ArtInsumoSvc from "../services/ArticuloInsumo.service";
import ArtManufactSvc from "../services/ArticuloManufacturado.service";


let getAllMenu = async (req, res) => {
  let menu = [];
  try {
    if (req.query.filter && req.query.search) {
      let artIns = [];
      let artManufact = [];
      if(req.query.filter.match(/^[0-9a-fA-F]{24}$/)){
        artIns = await ArtInsumoSvc.filterArtInsumoByRubroArt(req.query.search,req.query.filter);
        artManufact = await ArtManufactSvc.filterArtManufactByRubroGnl(req.query.search,req.query.filter);
        // console.log('FILTRO CORRECTO')
      }else if (req.query.filter == 'BEBIDA') {
        artIns = await ArtInsumoSvc.searchArticuloInsumo(req.query.search);
        // console.log('FILTRO SOLO BEBIDA')
      }else if (req.query.filter == 'COMIDA') {
        artManufact = await ArtManufactSvc.searchArticuloManufacturado(req.query.search);
        // console.log('FILTRO SOLO COMIDA')
      }else{
        artIns = [];
        artManufact = [];
      }
      menu = [...artIns, ...artManufact];
    } else if(req.query.filter){
      //console.log('FILTRO')
      if(req.query.filter.match(/^[0-9a-fA-F]{24}$/)){
        let artIns = await ArtInsumoSvc.filterArtInsumoByRubroArt('',req.query.filter);
        let artManufact = await ArtManufactSvc.filterArtManufactByRubroGnl('',req.query.filter);
        menu = [...artIns, ...artManufact];
      }else{
        menu = [];
      }
    } else if(req.query.search){
      //console.log('SEARCH')
      let artIns = await ArtInsumoSvc.searchArticuloInsumo(req.query.search);
      let artManufact = await ArtManufactSvc.searchArticuloManufacturado(req.query.search);
      menu = [...artIns, ...artManufact];
    }
    else {
      //console.log('NINGUNO')
      let limit = parseInt(req.query.limit);
      let skip = parseInt(req.query.skip);
      let artIns = await ArtInsumoSvc.findAllArticuloInsumoPaginate(req,'menu');
      let artManufact = await ArtManufactSvc.findAllArticuloManufacturadoPaginate(req);
      let count = artIns.count + artManufact.count;
      let first = skip != 0 ? false : true;
      let last = (artIns.isLast && artManufact.isLast) ? true : false;
      let data = [...artIns.artInsumos, ...artManufact.artManFac];
      let dataPage = {data: data,isFirst: first,isLast: last,count: count,countInsumo: artIns.count,countArtManuFact:artManufact.count}
      menu = dataPage;
    }
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({"Error Menu Controller":error.message});
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
    res.status(500).json({"error":error.message});
  }
}


/**
* Menu Controller
*/
const MenuCtrl = { getAllMenu, getOneMenu };


export default MenuCtrl;
