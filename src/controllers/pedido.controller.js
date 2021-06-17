import PedidoSvc from "../services/pedido.service";


let getAll = async (req,res) => {
  try {
    let pedidos = await PedidoSvc.findAllPedido();
    if (pedidos.length != 0) {
      res.status(200).json(pedidos);
    } else {
      res.status(204).json({"msg":"Empty"})
    }
  } catch (error) {
    res.status(500).json({"error":error.message});
  }
}

let getAllbyUser = async (req, res) => {
  try {
    let pedidoUser = await PedidoSvc.findAllByUser(req);
    res.status(200).json(pedidoUser);
  } catch (error) {
    res.status(500).json({"error":error.message});
  }
}

let getOne = async (req,res) => {
  try {
    let pedido = await PedidoSvc.findOnePedido(req)
    if(pedido){
      res.status(200).json(pedido)
    }else{
      res.status(204).json({"msg":"Empty"})
    }
  } catch (error) {
    res.status(500).json({"error":error.message});
  }
}

let updateOne = async (req,res) => {
  try {
    let pedidoUpdated = await PedidoSvc.updatePedido(req)
    res.status(200).json(pedidoUpdated);
  } catch (error) {
    res.status(500).json({"error": error.message});
  }
}

let postOne = async (req,res) => {
  try {
    let pedido = await PedidoSvc.savePedido(req);
    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({"error":error.message});
  }
}

let deleteOne = async (req,res) => {
  try {
    let pedidoDeleted = await PedidoSvc.deletePedido(req);
    res.status(200).json(pedidoDeleted);
  } catch (error) {
    res.status(500).json({"error":error.message});
  }
}

let active = async (req,res) => {
  try {
    let pedidoActived = await PedidoSvc.activePedido(req);
    res.status(202).json(pedidoActived);
  } catch (error) {
    res.status(500).json({"error":error.message});
  }
}

let getPedidosByState = async(req,res)=>{
  try{
    let pedidos = await PedidoSvc.getPedidosByState(req.params.state);
    res.status(200).send(pedidos)
  } catch (error){
    res.status(500).json({"error":error});
  }
}
/**
* Pedido Controller
*/
const PedidoCtrl = { getAll, getAllbyUser, getOne, postOne, updateOne, deleteOne, active,getPedidosByState };

export default PedidoCtrl;
