import Pedido from "../models/pedido.model";
import PedidoFilterDTO from "../models/dto/PedidoFilterDTO";
import StatePedido from '../models/const/statePedido';

import Inventario from "../inventario/inventario";
import FacturaSvc from "./Factura.service";


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

/FindAllAndGroupByUser
let findAllPedidoGroupByUser = async(pedidoReq) =>{
  try {
    let pedido = {
      _id: '$_id',
      total:'$total',
      horaEstimadaFin:'$horaEstimadaFin',
      tipoEnvio:'$tipoEnvio',
      total:'$total',
      DetallePedido:'$DetallePedido',
      Factura:'$Factura',
      active:'$active',
      createdAt:'$createdAt',
      updatedAt:'$updatedAt',
      MdoPago:'$MdoPago'
    };
    let pedidos = await Pedido.aggregate([
      {$match:{active:true}},
      {$group:{_id:"$Cliente.firebase_id",pedidos:{$push:pedido}}}
    ])

    return pedidos;
  } catch (error) {
    console.error(`Error Svc Pedido : ${error.message}`);
  }
}

let countMostFood = async(pedidoReq) => {
  try {
    let fecha = pedidoReq.body.fecha;
    let finder = fecha ? {active:true,createdAt:{$gte: new Date(fecha.desde),$lt: new Date(fecha.hasta)}} : {active:true}
    let comida = {};
    let pedidos = await Pedido
    .find(finder)
    .populate({
      path: "DetallePedido",
      populate: {
        path: "ArtManufact",
        model: "ArtManufact",
      },
    })
    pedidos.forEach(e => {
       e.DetallePedido.forEach(c => {
        if(c.ArtManufact){
          comida[c.ArtManufact._id] = {_id:c.ArtManufact._id,denominacion:c.ArtManufact.denominacion,cantidadComprado:comida[c.ArtManufact._id] ? comida[c.ArtManufact._id].cantidadComprado + c.cantidad : c.cantidad};
        }
      })
    })
    let comidaOrdenada = Object.entries(comida).map((e) => ( e[1]  ));
    comidaOrdenada.sort((a,b) => (a.cantidadComprado > b.cantidadComprado) ? -1 : ((b.cantidadComprado > a.cantidadComprado) ? 1 : 0))
    return comidaOrdenada;
  } catch (error) {
    console.error(`Error Svc Pedido : ${error.message}`);
  }
}

let entriesByPeriod = async(pedidoReq) => {
  try {
    let mensual = pedidoReq.body.mensual;
    let groupOptions = mensual ? {año:{$year:"$accepted"},mes:{$month:"$accepted"}} : {año:{$year:"$accepted"},mes:{$month:"$accepted"},dia:{$dayOfMonth:"$accepted"}}

    let pedidos = await Pedido.aggregate([
      {$match:{estado:"entregado"}},
      {$group:{_id:groupOptions,
        ingreso:{$sum:"$total"}}},
      {$sort:{"_id.año":1,"_id.mes":1,"_id.dia":1}}
    ])
    return pedidos
  } catch (error) {
    console.error(`Error Svc Pedido : ${error.message}`);
  }
}

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
  let filtro = {}
  if(state == StatePedido.COCINA){
    filtro = {active:true,estado:{$in:[StatePedido.COCINA,StatePedido.DEMORADO]}}
  } else if ( state == StatePedido.CANCELADO){
    filtro = {active:true,estado:{$in:[StatePedido.ENTREGADO,StatePedido.CANCELADO]}}
  } else {
    filtro = {active:true,estado: state}
  }

  try {
    let pedidos = await Pedido.find(filtro)
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
    console.log("encontrados",pedidos.length)
    pedidos.forEach((pedido) => {
      pedidosDTO.push(new PedidoFilterDTO(pedido));
    });
    return pedidosDTO;
  } catch (error) {
    console.error(`Error Svc Pedido : ${error}`);
  }
};

let acceptPedido = async(id,state)=>{
  let pedido = await Pedido.findOne({_id : id})
  //Si el estado actual del pedido es "en espera" lo aceptara para mandarlo a cocina
  if(state == StatePedido.ESPERA){
    /*let stock = await Inventario.preValidate(pedido);
    if(stock.status){
      await Inventario.restarStock(pedido);
      pedido.estado = StatePedido.COCINA;
      await pedido.save();
      return {"message": "El pedido fue procesado correctamente."}
    }
    else{
      return {"message": "El pedido no se pudo procesar por falta de stock de insumos"}
    }*/
    pedido.estado = StatePedido.COCINA
    pedido.accepted = Date.now()
    await pedido.save()
     return {"message":"El pedido fue procesado correctamente." }
  }

  //Si el estado actual es "en cocina" lo aceptara para marcarlo como finalizado y mandarlo a delivery
  if(state === StatePedido.COCINA){
    pedido.estado = StatePedido.LISTO
    pedido.accepted = Date.now();
    await pedido.save();
    return {"message":"El pedido esta finalizado. Listo para entregar."}
  }

  //Si el estado actual es "listo" lo marcara como entregado
  if(state === StatePedido.LISTO){
    pedido.estado = StatePedido.ENTREGADO;
    pedido.accepted = Date.now();
    let pedidoEntregado = await pedido.save();
    await FacturaSvc.saveFactura(pedidoEntregado);

    return {"message":"El pedido ya fue entregado al cliente con éxito" }
  }
}

let demorarPedido = async (id) =>{
  let pedido = await Pedido.findOne({_id : id})
  pedido.horaEstimadaFin += 10;
  pedido.estado = StatePedido.DEMORADO
  await pedido.save()
  return {"message":"El pedido fue demorado 10 minutos."}
}

let cancelPedido = async (id, motivo) => {
  let pedido = await Pedido.findOne({_id: id})
  pedido.canceled.fecha = Date.now()
  pedido.canceled.motivo = motivo
  pedido.estado = StatePedido.CANCELADO
  await pedido.save()
  return {"message": "El pedido fue cancelado exitosamente"}

}
/**
 * Pedido Service
 */
const PedidoSvc = {
  findAllPedido,
  findAllByUser,
  findAllPedidoGroupByUser,
  entriesByPeriod,
  countMostFood,
  findOnePedido,
  savePedido,
  updatePedido,
  deletePedido,
  activePedido,
  getPedidosByState,
  acceptPedido,
  demorarPedido,
  cancelPedido
};

export default PedidoSvc;
