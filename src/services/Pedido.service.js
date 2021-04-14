import Pedido from "../models/Pedido.model";

//Find All Pedido
let findAllPedido = async() => {
    try {
        let pedidos = await Pedido.find({ delete: null }).select(['-delete']);
        return pedidos;
    } catch (error) {
        throw new Error(error);
    }
}

//Find One Pedido
let findOnePedido = async(pedidoReq) => {
    try {
      let pedido = await Pedido.findById(pedidoReq.params.id).select(['-delete']);
      return pedido;
    } catch (e) {
      throw new Error(error);
    }
}

//Save Pedido
let savePedido = async (pedidoReq) => {
    try {
      //let { fecha, estado, horaEstimadaFin, tipoEnvio, total, cliente, detalle, factura, mercado} = pedidoReq;
      let { fecha, estado, horaEstimadaFin, tipoEnvio, total, cliente, detalle, factura} = pedidoReq;
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
        let pedidoUpdated = await Pedido.findOneAndUpdate({_id: pedidoReq.params.id},pedidoReq.body);
        return pedidoUpdated;
    } catch (error) {
        throw new Error(error);
    }
}

//Delete (Soft Delete)
let deletePedido = async (pedidoReq) =>  {
    try {
        let { user_uid } = pedidoReq.body
        let deleteOptions = {user_uid:user_uid,deletedAt:new Date()}
        let pedidoDeleted = await Pedido.findOneAndUpdate({_id: pedidoReq.params.id},{$set:{active:false,delete:deleteOptions}},{upsert:true})
        return pedidoDeleted;
    } catch (error) {
        throw new Error(error);
    }
}


/**
 * Pedido Service
 */
const PedidoSvc = {findAllPedido, findOnePedido, savePedido, updatePedido, deletePedido};

export default PedidoSvc;
