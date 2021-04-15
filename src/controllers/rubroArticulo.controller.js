import RubArtSvc from '../services/rubroArticulo.service';

let getAll = async (req,res) => {
  try {
    let rubArticulos = await RubArtSvc.findAllRubroArticulo();
    if (rubArticulos.length != 0) {
      res.status(200).json(rubArticulos);
    } else {
      res.status(204).json({"msg":"Empty"})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({"error":error});
  }
}

let getOne = async (req,res) => {
  try {
    let rubArt = await RubArtSvc.findOneRubroArticulo(req)
    if(rubArt){
      res.status(200).json(rubArt)
    }else{
      res.status(204).json({"msg":"Empty"})
    }
  } catch (error) {
    res.status(500).json({"error":error});
  }
}

let updateOne = async (req,res) => {
  try {
    let rubArtUpdated = await RubArtSvc.updateRubroArticulo(req)
    if(rubArtUpdated){
      res.status(200).json(rubArtUpdated)
    }else{
      res.status(204).json({"msg":"Empty"})
    }
  } catch (error) {
    res.status(500).json({"error":error});
  }
}

let postOne = async (req,res) => {
  try {
    let rubArt = await RubArtSvc.saveRubroArticulo(req);
    res.status(200).json(rubArt);
  } catch (error) {
    res.status(500).json({"error":error});
  }
}

let deleteOne = async (req,res) => {
  try {
    let rubroArtDeleted = await RubArtSvc.deleteRubroArticulo(req);
    res.status(200).json(rubroArtDeleted);
  } catch (error) {
    res.status(500).json({"error":error});
  }
}

let active = async (req,res) => {
  try {
    let rubArtActived = await RubArtSvc.activeRubroArticulo(req);
    res.status(202).json(rubArtActived);
  } catch (error) {
    res.status(500).json({"error":error});
  }
}

/**
* Rubro Articulo Controller
*/
const RubArtCtrl = { getAll, getOne, postOne, updateOne, deleteOne, active };

export default RubArtCtrl;
