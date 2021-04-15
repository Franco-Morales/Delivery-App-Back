import ArticuloManufacturadoSvc from "../services/articuloManufacturado.service";


let getAll = async (req,res) => {
  try {
    let artManFacs = await ArticuloManufacturadoSvc.findAllArticuloManufacturado();
    if (artManFacs.length != 0) {
      res.status(200).json(artManFacs);
    } else {
      res.status(204).json({"msg":"Empty"})
    }
  } catch (error) {
    res.status(500).json({"error":error});
  }
}

let getOne = async (req,res) => {
  try {
    let artManFac = await ArticuloManufacturadoSvc.findOneArticuloManufacturado(req)
    if(artManFac){
      res.status(200).json(artManFac)
    }else{
      res.status(204).json({"msg":"Empty"})
    }
  } catch (error) {
    res.status(500).json({"error":error});
  }
}

let updateOne = async (req,res) => {
  try {
    let artManFacUpdated = await ArticuloManufacturadoSvc.updateArticuloManufacturado(req)
    if(artManFacUpdated){
      res.status(200).json(artManFacUpdated)
    }else{
      res.status(204).json({"msg":"Empty"})
    }
  } catch (error) {
    res.status(500).json({"error":error});
  }
}

let postOne = async (req,res) => {
  try {
    let artManFacSaved = await ArticuloManufacturadoSvc.saveArticuloManufacturado(req);
    res.status(200).json(artManFacSaved);
  } catch (error) {
    res.status(500).json({"error":error});
  }
}

let deleteOne = async (req,res) => {
  try {
    let artManFacDeleted = await ArticuloManufacturadoSvc.deleteArticuloManufacturado(req);
    res.status(200).json(artManFacDeleted);
  } catch (error) {
    res.status(500).json({"error":error});
  }
}

let active = async (req,res) => {
  try {
    let artManActived = await ArticuloManufacturadoSvc.activeArticuloManufacturado(req);
    res.status(202).json(artManActived);
  } catch (error) {
    res.status(500).json({"error":error});
  }
}

/**
* Articulo Manufacturado Controller
*/
const ArticuloManufacturadoCtrl = { getAll, getOne, postOne, updateOne, deleteOne, active };

export default ArticuloManufacturadoCtrl;
