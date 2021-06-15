import ArticuloInsumoSvc from "../services/articuloInsumo.service";


let getAll = async (req,res) => {
  try {
    let artIns = await ArticuloInsumoSvc.findAllArticuloInsumo();
    if (artIns.length != 0) {
      res.status(200).json(artIns);
    } else {
      res.status(204).json({"msg":"Empty"})
    }
  } catch (error) {
    res.status(500).json({"error":error});
  }
}

let getAllPaginate = async(req,res)=>{
  try {
    let artIns = await ArticuloInsumoSvc.findAllArticuloInsumoPaginate(req);
    if(artIns.artInsumos != []){
      res.status(200).json(artIns);
    }else{
      res.status(204).json({"msg":"Empty"})
    }
  } catch (error) {
    res.status(500).json({"error":error.message});
  }
}

let getOne = async (req,res) => {
  try {
    let artIn = await ArticuloInsumoSvc.findOneArticuloInsumo(req)
    if(artIn){
      res.status(200).json(artIn)
    }else{
      res.status(204).json({"msg":"Empty"})
    }
  } catch (error) {
    res.status(500).json({"error":error});
  }
}

let updateOne = async (req,res) => {
  try {
    let artInUpdated = await ArticuloInsumoSvc.updateArticuloInsumo(req)
    if(artInUpdated){
      res.status(200).json(artInUpdated)
    }else{
      res.status(204).json({"msg":"Empty"})
    }
  } catch (error) {
    res.status(500).json({"error":error});
  }
}

let postOne = async (req,res) => {
  try {
    let artInSaved = await ArticuloInsumoSvc.saveArticuloInsumo(req);
    res.status(200).json(artInSaved);
  } catch (error) {
    res.status(500).json({"error":error});
  }
}

let deleteOne = async (req,res) => {
  try {
    let artInDeleted = await ArticuloInsumoSvc.deleteArticuloInsumo(req);
    res.status(200).json(artInDeleted);
  } catch (error) {
    res.status(500).json({"error":error});
  }
}

let active = async (req,res) => {
  try {
    let artManActived = await ArticuloInsumoSvc.activeArticuloInsumo(req);
    res.status(202).json(artManActived);
  } catch (error) {
    res.status(500).json({"error":error});
  }
}

/**
* Articulo Insumo Controller
*/
const ArticuloInsumoCtrl = { getAll, getAllPaginate, getOne, postOne, updateOne, deleteOne, active };

export default ArticuloInsumoCtrl;
