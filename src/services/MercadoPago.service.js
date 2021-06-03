import MercadoPago from "../models/mercadoPago.model";
import fetch from "node-fetch"

//Find All Mercado Pago
let findAllMercadoPago = async() => {
  try {
    let mdoPagos = await MercadoPago.find({ active: true });
    return mdoPagos;
  } catch (error) {
    console.error(`Error Svc MdoPago : ${error.message}`);
  }
}

//Find One Mercado Pago
let findOneMercadoPago = async(mdoPagoReq) => {
  let _id = mdoPagoReq.params.id;
  let filter = { _id, active: true };
  try {
    let mdoPago = await MercadoPago.findOne(filter);
    return mdoPago;
  } catch (error) {
    console.error(`Error Svc MdoPago : ${error.message}`);
  }
}

//Save Mercado Pago
let saveMercadoPago = async (mdoPagoReq) => {
  try {
    let { identificadorPago, fechaCreacion, fechaAprobacion, formaPago, metodoPago, nroTarjeta, estado, } = mdoPagoReq;
    let mdoPago = MercadoPago({identificadorPago, fechaCreacion, fechaAprobacion, formaPago, metodoPago, nroTarjeta, estado,active:true});
    let mdoPagoSaved = await mdoPago.save();
    return mdoPagoSaved;
  } catch (error) {
    console.error(`Error Svc MdoPago : ${error.message}`);
  }
}

//Update Mercado Pago
let updateMercadoPago = async (mdoPagoReq) =>{
  try {
    let mdoPagoUpdated = await MercadoPago.findOneAndUpdate({_id: mdoPagoReq.params.id},mdoPagoReq.body,{new:true});
    return mdoPagoUpdated;
  } catch (error) {
    console.error(`Error Svc MdoPago : ${error.message}`);
  }
}

//Create Preference
let createPreference = async(preferenceOptions) => {
  try {
    let preference = {
      back_urls: {
        success: `http://localhost:4200/${preferenceOptions.uidUsuario}/pedidos/${preferenceOptions.uidPedido}`,
        failure: `http://localhost:4200/${preferenceOptions.uidUsuario}/pedidos/${preferenceOptions.uidPedido}`,
        pending: `http://localhost:4200/${preferenceOptions.uidUsuario}/pedidos/${preferenceOptions.uidPedido}`
      },
      auto_return: "approved",
      external_reference: preferenceOptions.uidPedido,
      payment_methods: {
        excluded_payment_types: [
          {
            id: "ticket"
          }
        ],
        installments: 12
      },
      items: [
        {
          title:preferenceOptions.titulo,
          description: preferenceOptions.descripcion,
          unit_price: parseFloat(preferenceOptions.precioTotal),
          quantity: 1,
        }
      ]
    };
    return preference;
  } catch (error) {
    console.error(`Error Svc MdoPago : ${error.message}`);
  }
}

//Get Data Mercado Pago By Id Pedido
let getDataPagoByPedido = async(mdoPagoReq)=>{
  try {
    const url = `https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&external_reference=${mdoPagoReq.uidPedido}#json`
    var respuesta = await fetch (url,{
      headers: {
        Authorization: `Bearer ${mdoPagoReq.tokenMercadoPago}`
      }
    })
    let response = await respuesta.json();
    return response.results[0];
  } catch (error) {
    console.error(`Error Svc MdoPago : ${error.message}`);
  }
}

//Delete Mercado Pago
let deleteMercadoPago = async (mdoPagoReq) =>  {
  let { user_uid } = pedidoReq.body
  let deleteOptions = {
    user_uid:user_uid,
    deletedAt:new Date()
  };
  try {
    let mdoPagoDeleted = await MercadoPago.findOneAndUpdate(
      {_id: mdoPagoReq.params.id},
      {
        $set:{
          active:false,
          delete:deleteOptions
        }
      },{ new:true });
    return mdoPagoDeleted;
  } catch (error) {
    console.error(`Error Svc MdoPago : ${error.message}`);
  }
}

//Active Mercado Pago
let activeMercadoPago = async (mdoPagoReq) =>{
  let { active } = mdoPagoReq.body;
  let actOpt = { active, delete: {} };
  try {
    let mdoPago = await MercadoPago.findOneAndUpdate(
      { _id: mdoPagoReq.params.id },
      { $set: actOpt },
      {new:true}
    );
    return mdoPago;
  } catch (error) {
    console.error(`Error Svc MdoPago : ${error.message}`);
  }
}


/**
* Mercado Pago Service
*/
const MercadoPagoSvc = {findAllMercadoPago, findOneMercadoPago, createPreference, getDataPagoByPedido, saveMercadoPago, updateMercadoPago, deleteMercadoPago, activeMercadoPago};


export default MercadoPagoSvc;
