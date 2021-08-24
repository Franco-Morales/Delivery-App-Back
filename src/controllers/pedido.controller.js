import PedidoSvc from "../services/pedido.service";

let getAll = async (req, res) => {
  try {
    let pedidos = await PedidoSvc.findAllPedido();
    if (pedidos.length != 0) {
      res.status(200).json(pedidos);
    } else {
      res.status(204).json({ msg: "Empty" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

let getAllbyUser = async (req, res) => {
  try {
    let pedidoUser = await PedidoSvc.findAllByUser(req);
    res.status(200).json(pedidoUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

let getOne = async (req, res) => {
  try {
    let pedido = await PedidoSvc.findOnePedido(req);
    if (pedido) {
      res.status(200).json(pedido);
    } else {
      res.status(204).json({ msg: "Empty" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

let updateOne = async (req, res) => {
  try {
    let pedidoUpdated = await PedidoSvc.updatePedido(req);
    res.status(200).json(pedidoUpdated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

let postOne = async (req, res) => {
  try {
    let pedido = await PedidoSvc.savePedido(req);
    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

let deleteOne = async (req, res) => {
  try {
    let pedidoDeleted = await PedidoSvc.deletePedido(req);
    res.status(200).json(pedidoDeleted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

let active = async (req, res) => {
  try {
    let pedidoActived = await PedidoSvc.activePedido(req);
    res.status(202).json(pedidoActived);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//obtener pedidos según estado
let getPedidosByState = async (req, res) => {
  try {
    let pedidos = await PedidoSvc.getPedidosByState(req.params.state);
    res.status(200).send(pedidos);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//aceptar pedido
let acceptPedido = async (req, res) => {
  try {
    let pedidoStatus = await PedidoSvc.acceptPedido(req.params.id, req.body.status);
    const statusHub = {
      success: () => {
        return res.status(200).json(pedidoStatus);
      },
      warning: () => {
        return res.status(202).json(pedidoStatus);
      },
      error: () => {
        return res.status(500).json(pedidoStatus);
      }
    };
    statusHub[pedidoStatus.status]();
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//demorar pedido

let demorarPedido = async (req, res) => {
  try {
    let demora = await PedidoSvc.demorarPedido(req.params.id);
    res.status(200).json(demora);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//cancelar pedido

let cancelPedido = async (req, res) => {
  try {
    let cancel = await PedidoSvc.cancelPedido(req.params.id, req.body.motivo);
    res.status(200).json(cancel);
  } catch (error) { 
    res.status(500).json({error : error})
  }
}
/**
 * Pedido Controller
 */
const PedidoCtrl = {
  getAll,
  getAllbyUser,
  getOne,
  postOne,
  updateOne,
  deleteOne,
  active,
  getPedidosByState,
  acceptPedido,
  demorarPedido,
  cancelPedido
};

export default PedidoCtrl;
