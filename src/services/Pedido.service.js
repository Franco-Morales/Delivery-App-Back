import Pedido from "../models/pedido.model";
import PedidoFilterDTO from "../models/dto/PedidoFilterDTO";
import StatePedido from '../models/const/statePedido';
import Roles from "../models/const/roleUser";

import Inventario from "../inventario/inventario";

import FacturaSvc from "./Factura.service";

import admin from '../firebase';
import ArticuloManufacturadoModel from "../models/ArticuloManufacturado.model";
const db = admin.firestore()


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

//FindAllAndGroupByUser
let findAllPedidoGroupByUser = async(pedidoReq) =>{
  try {
    let count = await Pedido.countDocuments({active:true});
    let limit = parseInt(pedidoReq.query.limit);
    let skip = parseInt(pedidoReq.query.skip);
    let fecha = pedidoReq.body.fecha;
    let options = fecha ? {active:true,fecha:{$gte: new Date(fecha.desde),$lt: new Date(fecha.hasta)}} : {active:true}
    let pedidos = await Pedido.find(options).sort({"Cliente.firebase_id":1})
    return {data: pedidos,isLast:limit + skip >= count ? true : false,isFirst: skip != 0 ? false : true,count: count};
  } catch (error) {
    console.error(`Error Svc Pedido : ${error.message}`);
  }
}

//GetFirstDate and LastDate
let getFirstAndLastDatePedidosEntregado = async(pedidoReq) => {
  try {
    let finder = {active:true,estado:'entregado'}
    let primerPedido = await Pedido.find(finder).limit(1).sort({fecha:1})
    let ultimoPedido = await Pedido.find(finder).limit(1).sort({fecha:-1})
    let fecha = {fechaInicio: primerPedido[0].fecha,fechaUltimo: ultimoPedido[0].fecha}
    return fecha;
  } catch (error) {
    console.error(`Error Svc Pedido : ${error.message}`);
  }
}
//Count Most Food
let countMostFood = async(pedidoReq) => {
  try {
    let limit = parseInt(pedidoReq.query.limit);
    let skip = parseInt(pedidoReq.query.skip);
    let fecha = pedidoReq.body.fecha;
    let finder = fecha ? {active:true,createdAt:{$gte: new Date(fecha.desde),$lt: new Date(fecha.hasta)}} : {active:true}
    let comida = {};
    let pedidos = await Pedido
    .find(finder)
    .skip(skip)
    .limit(limit)
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
    let mensual = pedidoReq.query.mensual;
    let skip = parseInt(pedidoReq.query.skip);
    let limit = parseInt(pedidoReq.query.limit);
    let count = await Pedido.countDocuments({active:true,estado:'facturado'});
    let fecha = pedidoReq.body.fecha;
    let match = fecha ? {estado:'facturado',accepted:{$gte: new Date(fecha.desde),$lt: new Date(fecha.hasta)}} : {estado:'facturado'};
    let groupOptions = mensual == 'si' ? {anio:{$year:"$accepted"},mes:{$month:"$accepted"}} : {anio:{$year:"$accepted"},mes:{$month:"$accepted"},dia:{$dayOfMonth:"$accepted"}}
    let pedidos = await Pedido.aggregate([
      {$match:match},
      {$group:{_id:groupOptions,
        ingreso:{$sum:"$total"}}},
      {$sort:{"_id.anio":1,"_id.mes":1,"_id.dia":1}},
      {$skip: skip},
      {$limit: limit}
    ]);
    return {data: pedidos,isLast:limit + skip >= count ? true : false,isFirst: skip != 0 ? false : true,count: count}
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
    let contadorCocineros = await cocineroActuales();
    let cocinaDemora = await cocinaDemoraTiempo();
    let horaFinal = pedidoReq.body.horaEstimadaFin+(cocinaDemora/contadorCocineros);
    
    console.log('Cocineros activos : ', contadorCocineros, '| Demora en cocina : ', cocinaDemora, '| Pedido : ',pedidoReq.body.horaEstimadaFin);
    console.log('Hora aprox. de finalización :', horaFinal);

    let {
      fecha,
      estado,
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
      horaEstimadaFin: horaFinal,
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

// Funcion privada para conocer la cantidad actual de cocineros logueados
let cocineroActuales = async () => {
  let cont = 0;
  try {
    const snapshot = await db.collection('clients').where('role', '==', Roles.Cocinero).where('online','==',true).get();
    snapshot.forEach(doc => {
      cont++;
    });
    return cont? cont : 1;
  } catch (error) {
    console.error(`Error Svc Pedido : ${error}`);
  }
}

// Función privada que calcula el la demora en cocina, cantidad de platos en cocina
let cocinaDemoraTiempo = async () => {
  let demora = 0;
  try {
    let pedidosCocina = await getPedidosByState(StatePedido.COCINA);
    
    if(pedidosCocina.length == 0) {
      // console.log('No hay pedidos en cocina :', 10);
      return 10;
    }
    demora = pedidosCocina.reduce((acc,item) => item.tiempoFin+acc,0);
    // console.log('Hay pedidos en cocina :', demora);
    return demora;
  } catch (error) {
    console.error(`Error Svc Pedido : ${error}`);
  }
}

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
  let filtro = { };
  if(state == StatePedido.COCINA) {
    filtro = {  
      active: true,
      estado: { 
        $in: [StatePedido.COCINA, StatePedido.DEMORADO]
      } 
    };
  } else if ( state == StatePedido.CANCELADO) {
    filtro = { 
      active: true,
      estado:{ 
        $in:[StatePedido.ENTREGADO, StatePedido.CANCELADO] 
      } 
    };
  } else if(state === "ALL") {
    filtro = { active: true }
  } else {
    filtro = { active: true, estado: state }
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

    for (let pedido of pedidos) {
      pedidosDTO.push( await PedidoFilterDTO.save(pedido));
    }
    
    return pedidosDTO;
  } catch (error) {
    console.error(`Error Svc Pedido : ${error}`);
  }
};

let acceptPedido = async(id,state) => {
  let pedido = await Pedido.findOne({_id : id})
  //Si el estado actual del pedido es "en espera" lo aceptara para mandarlo a cocina
  try {
    if(state == StatePedido.ESPERA) {
      let stock = await Inventario.preValidate(pedido);
      if(stock.status){
        await Inventario.restarStock(pedido);
        pedido.estado = StatePedido.COCINA;
        pedido.accepted = Date.now();
        await pedido.save();
        // await ArticuloManufacturadoModel.stockValidation();
        return { status: 'success', message: "El pedido fue procesado correctamente." }
      }
      else{
        return { status: 'warning', message: "El pedido no se pudo procesar por falta de stock de insumos"}
      }
    }
  } catch (e) {
    console.error(`Error Svc Pedido : ${e}`);
    return { status: 'error', message: "Error al aceptar un pedido", error: e};
  }

  //Si el estado actual es "en cocina" lo aceptara para marcarlo como finalizado y mandarlo a delivery
  try {
    if(state === StatePedido.COCINA) {
      pedido.estado = StatePedido.LISTO
      pedido.accepted = Date.now();
      await pedido.save();
  
      return { status: 'success', message:"El pedido esta finalizado. Listo para entregar."}
    }
  } catch (e) {
    return { status: 'error', message: "Error al finalizar un pedido", error: e};
  }

  //Si el estado actual es "listo" lo marcara como entregado
  try {
    if(state === StatePedido.LISTO) {
      pedido.estado = StatePedido.ENTREGADO;
      pedido.accepted = Date.now();
      await pedido.save();
  
      return { status: 'success', message:"El pedido ya fue entregado al cliente con éxito" }
    }
  } catch (e) {
    console.error(`Error Svc Pedido : ${e}`);
    return { status: 'error', message: "Error al entregar un pedido", error: e};
  }

  //Si el estado actual es "entregado" lo marcará como facturado
  try {
    if(state === StatePedido.ENTREGADO) {
      pedido.estado = StatePedido.FACTURADO;
      pedido.accepted = Date.now();
  
      let pedidoEntregado = await pedido.save();
  
      await FacturaSvc.saveFactura(pedidoEntregado);
  
      return { status: 'success', message:"El pedido ya fue entregado al cliente con éxito" }
    }
  } catch (e) {
    console.error(`Error Svc Pedido : ${e}`);
    return { status: 'error', message: "Error al facturar un pedido", error: e};
  }
}

let demorarPedido = async (id) =>{
  try {
    let pedido = await Pedido.findOne({_id : id})
    pedido.horaEstimadaFin += 10;
    pedido.estado = StatePedido.DEMORADO
    await pedido.save();

    return { message:"El pedido fue demorado 10 minutos."};
  } catch (e) {
    console.error(`Error Svc Pedido : ${e}`);
  }
}

let cancelPedido = async (id, motivo) => {
  try {
    let pedido = await Pedido.findOne({_id: id})
    pedido.canceled.fecha = Date.now();
    pedido.canceled.motivo = motivo;
    pedido.estado = StatePedido.CANCELADO;
    await pedido.save();

    return { message: "El pedido fue cancelado exitosamente"};
  } catch (e) {
    console.error(`Error Svc Pedido : ${e}`);
  }
}

/**
 * Pedido Service
 */
const PedidoSvc = {
  findAllPedido,
  findAllByUser,
  findAllPedidoGroupByUser,
  getFirstAndLastDatePedidosEntregado,
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