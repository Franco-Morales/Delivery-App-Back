import Pedido from "../models/pedido.model";

//Find All Pedido
let findAllPedido = async() => {
    try {
        let pedidos = await Pedido.find({ active: true });
        return pedidos;
    } catch (error) {
        throw new Error(error);
    }
}

//Find One Pedido
let findOnePedido = async(pedidoReq) => {
    try {
      let pedido = await Pedido.findById(pedidoReq.params.id);
      return pedido;
    } catch (e) {
      throw new Error(error);
    }
}

//Save Pedido
let savePedido = async (pedidoReq) => {
    try {
      let { fecha, estado, horaEstimadaFin, tipoEnvio, total, Cliente, DetallePedido, Factura, MdoPago} = pedidoReq.body;
      let pedido = Pedido({fecha, estado, horaEstimadaFin, tipoEnvio, total, cliente, detalle, factura,active:true});
      let pedidoSaved = await pedido.save();
      return pedidoSaved;
    } catch (error) {
        throw new Error(error);
    }
}

//Update Pedido
let updatePedido = async (pedidoReq) =>{
    try {
        let pedidoUpdated = await Pedido.findOneAndUpdate({_id: pedidoReq.params.id},pedidoReq.body,{new:true});
        return pedidoUpdated;
    } catch (error) {
        throw new Error(error);
    }
}

//Delete (Soft Delete)
let deletePedido = async (pedidoReq) =>  {
    try {
        let { user_uid } = pedidoReq.body;
        let deleteOptions = {
            user_uid,
            deletedAt: new Date()
        };

        let pedidoDeleted = await Pedido.findOneAndUpdate(
            {_id: pedidoReq.params.id },
            {
              $set:{
                active: false,
                delete: deleteOptions
              }
          },{new:true});
        return pedidoDeleted;
    } catch (error) {
        throw new Error(error);
    }
}

//Active Pedido
let activePedido = async (pedidoReq) =>{
  try {
    let { active } = pedidoReq.body;

    let pedido = await Pedido.findOneAndUpdate(
      { _id: pedidoReq.params.id },
      { $set: { active } },
      {new:true}
    );
    return pedido;
  } catch (error) {
    console.log('Error : ',error);
  }
}


/**
 * Pedido Service
 */
const PedidoSvc = {findAllPedido, findOnePedido, savePedido, updatePedido, deletePedido, activePedido};

export default PedidoSvc;
