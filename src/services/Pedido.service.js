import Pedido from "../models/pedido.model";
import PedidoFilterDTO from "../models/dto/PedidoFilterDTO";
import Inventario from "../inventario/inventario";
import StatePedido from '../models/const/statePedido';
//Find All Pedido
let findAllPedido = async () => {
  try {
    let pedidos = await Pedido.find({ active: true })
      .populate({
        path: "DetallePedido",
        populate: {
          path: "ArtManufact",
          model: "ArtManufact",
        },
      })
      .populate({
        path: "DetallePedido",
        populate: {
          path: "ArticuloInsumo",
          model: "ArtInsumo",
        },
      });

    return pedidos;
  } catch (error) {
    console.error(`Error Svc Pedido : ${error}`);
  }
};

//Find All Pedido by User Firebase ID
let findAllByUser = async (pedidoReq) => {
  let fid = pedidoReq.params.fid;
  let filter = { active: true, "Cliente.firebase_id": fid };
  try {
    let pedidoByUser = await Pedido.aggregate([{ $match: filter }]);
    return pedidoByUser;
  } catch (error) {
    console.error(`Error Svc Pedido : ${error}`);
  }
};

//Find One Pedido
let findOnePedido = async (pedidoReq) => {
  let _id = pedidoReq.params.id;
  let filter = { _id, active: true };
  try {
    let pedido = await Pedido.findOne(filter);
    return pedido;
  } catch (error) {
    console.error(`Error Svc Pedido : ${error}`);
  }
};

//Save Pedido
let savePedido = async (pedidoReq) => {
  try {
    let {
      fecha,
      estado,
      horaEstimadaFin,
      tipoEnvio,
      total,
      Cliente,
      DetallePedido,
      Factura,
      MdoPago,
    } = pedidoReq.body;
    let pedido = Pedido({
      fecha,
      estado,
      horaEstimadaFin,
      tipoEnvio,
      total,
      Cliente,
      DetallePedido,
      Factura,
      MdoPago,
      active: true,
    });
    let pedidoSaved = await pedido.save();
    return pedidoSaved;
  } catch (error) {
    console.error(`Error Svc Pedido : ${error}`);
  }
};

//Update Pedido
let updatePedido = async (pedidoReq) => {
  try {
    let pedidoUpdated = await Pedido.findOneAndUpdate(
      { _id: pedidoReq.params.id },
      pedidoReq.body,
      { new: true }
    );
    return pedidoUpdated;
  } catch (error) {
    console.error(`Error Svc Pedido : ${error}`);
  }
};

//Delete Pedido
let deletePedido = async (pedidoReq) => {
  let { user_uid } = pedidoReq.body;
  let deleteOptions = {
    user_uid,
    deletedAt: new Date(),
  };
  try {
    let pedidoDeleted = await Pedido.findOneAndUpdate(
      { _id: pedidoReq.params.id },
      {
        $set: {
          active: false,
          delete: deleteOptions,
        },
      },
      { new: true }
    );
    return pedidoDeleted;
  } catch (error) {
    console.error(`Error Svc Pedido : ${error}`);
  }
};

//Active Pedido
let activePedido = async (pedidoReq) => {
  let { active } = pedidoReq.body;
  let actOpt = { active, delete: {} };
  try {
    let pedido = await Pedido.findOneAndUpdate(
      { _id: pedidoReq.params.id },
      { $set: actOpt },
      { new: true }
    );
    return pedido;
  } catch (error) {
    console.error(`Error Svc Pedido : ${error}`);
  }
};

//Pedido por estado
let getPedidosByState = async (state) => {
  try {
    let pedidos = await Pedido.find({ active: true, estado: state })
      .populate({
        path: "DetallePedido",
        populate: {
          path: "ArtManufact",
          model: "ArtManufact",
        },
      })
      .populate({
        path: "DetallePedido",
        populate: {
          path: "ArticuloInsumo",
          model: "ArtInsumo",
        },
      });
    let pedidosDTO = [];
    pedidos.forEach((pedido) => {
      pedidosDTO.push(new PedidoFilterDTO(pedido));
    });
    return pedidosDTO;
  } catch (error) {
    console.error(`Error Svc Pedido : ${error}`);
  }
};

let acceptPedido = async(id,status)=>{
  let pedido = await Pedido.findOne({_id : id})
  //Si el estado actual del pedido es "en espera" lo aceptara para mandarlo a cocina
  if(status == StatePedido.ESPERA){
    //let stock = await Inventario.preValidate(pedido)
    /*if(!stock.status){
      await Inventario.restarStock(pedido)
      pedido.estado = StatePedido.COCINA
      await pedido.save()
      console.log("pedido",pedido)
      return {"message": "El pedido fue procesado correctamente."}
    }
    else{
      return {"message": "El pedido no se pudo procesar por falta de stock de insumos"}
    }*/
    pedido.estado = StatePedido.COCINA
    await pedido.save()
    return {"message":"El pedido fue procesado correctamente." }
  }

  //Si el estado actual es "en cocina" lo aceptara para marcarlo como finalizado y mandarlo a delivery
  if(status === StatePedido.COCINA){
    pedido.estado = StatePedido.LISTO
    await pedido.save()
    return {"message":"El pedido esta finalizado. Listo para entregar."}
  }

  //Si el estado actual es "listo" lo marcara como entregado
  if(status === StatePedido.LISTO){
    pedido.estado = StatePedido.ENTREGADO
    await pedido.save()
    return {"message":"El pedido ya fue entregado al cliente con éxito" }
  }
}
/**
 * Pedido Service
 */
const PedidoSvc = {
  findAllPedido,
  findAllByUser,
  findOnePedido,
  savePedido,
  updatePedido,
  deletePedido,
  activePedido,
  getPedidosByState,
  acceptPedido
};

export default PedidoSvc;
