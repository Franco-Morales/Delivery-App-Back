import ArticuloManufacturadoSvc from "../services/ArticuloManufacturado.service";


let getAll = async (req,res) => {
  try {
    let artManFacs = await ArticuloManufacturadoSvc.findAllMArticuloManufacturado();
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

/**
* Articulo Manufacturado Controller
*/
const ArticuloManufacturadoCtrl = { getAll, getOne, postOne, updateOne, deleteOne };

export default ArticuloManufacturadoCtrl;
