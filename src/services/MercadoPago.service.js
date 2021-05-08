import MercadoPago from "../models/mercadoPago.model";

//Find All Mercado Pago
let findAllMercadoPago = async() => {
  try {
    let mdoPagos = await MercadoPago.find({ active: true });
    return mdoPagos;
  } catch (error) {
    console.error(`Error Svc MdoPago : ${error}`);
  }
}

//Find One Mercado Pago
let findOneMercadoPago = async(mdoPagoReq) => {
  let _id = mdoPagoReq.params.id;
  let filter = { _id, active: true };
  try {
    let mdoPago = await MercadoPago.findOne(filter);
    return mdoPago;
  } catch (e) {
    console.error(`Error Svc MdoPago : ${error}`);
  }
}

//Save Mercado Pago
let saveMercadoPago = async (mdoPagoReq) => {
  try {
    let { identificadorPago, fechaCreacion, fechaAprobacion, formaPago, metodoPago, nroTarjeta, estado, } = mdoPagoReq.body;
    let mdoPago = MercadoPago({identificadorPago, fechaCreacion, fechaAprobacion, formaPago, metodoPago, nroTarjeta, estado,active:true});
    let mdoPagoSaved = await mdoPago.save();
    return mdoPagoSaved;
  } catch (error) {
    console.error(`Error Svc MdoPago : ${error}`);
  }
}

//Update Mercado Pago
let updateMercadoPago = async (mdoPagoReq) =>{
  try {
    let mdoPagoUpdated = await MercadoPago.findOneAndUpdate({_id: mdoPagoReq.params.id},mdoPagoReq.body,{new:true});
    return mdoPagoUpdated;
  } catch (error) {
    console.error(`Error Svc MdoPago : ${error}`);
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
    console.error(`Error Svc MdoPago : ${error}`);
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
    console.error(`Error Svc MdoPago : ${error}`);
  }
}


/**
* Mercado Pago Service
*/
const MercadoPagoSvc = {findAllMercadoPago, findOneMercadoPago, saveMercadoPago, updateMercadoPago, deleteMercadoPago, activeMercadoPago};


export default MercadoPagoSvc;