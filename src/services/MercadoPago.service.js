import { MercadoPagoModel } from "../models/mercadoPago.model";

//Find All Mercado Pago
let findAllMercadoPago = async() => {
  try {
    let mdoPagos = await MercadoPagoModel.find({ delete: null }).select(['-delete']);
    return mdoPagos;
  } catch (error) {
    throw new Error(error);
  }
}

//Find One Mercado Pago
let findOneMercadoPago = async(mdoPagoReq) => {
  try {
    let mdoPago = await MercadoPagoModel.findById(mdoPagoReq.params.id).select(['-delete']);
    return mdoPago;
  } catch (e) {
    throw new Error(error);
  }
}

//Save Mercado Pago
let saveMercadoPago = async (mdoPagoReq) => {
  try {
    let { identificadorPago, fechaCreacion, fechaAprobacion, formaPago, metodoPago, nroTarjeta, estado, } = mdoPagoReq;
    let mdoPago = MercadoPagoModel({identificadorPago, fechaCreacion, fechaAprobacion, formaPago, metodoPago, nroTarjeta, estado,active:true});
    let mdoPagoSaved = await mdoPago.save();
    return mdoPagoSaved;
  } catch (error) {
    throw new Error(error);
  }
}

//Update Mercado Pago
let updateMercadoPago = async (mdoPagoReq) =>{
  try {
    let mdoPagoUpdated = await MercadoPagoModel.findOneAndUpdate({_id: mdoPagoReq.params.id},mdoPagoReq.body);
    return mdoPagoUpdated;
  } catch (error) {
    throw new Error(error);
  }
}

//Delete (Soft Delete)
let deleteMercadoPago = async (mdoPagoReq) =>  {
  try {
    let { user_uid } = pedidoReq.body
    let deleteOptions = {user_uid:user_uid,deletedAt:new Date()}
    let mdoPagoDeleted = await MercadoPagoModel.findOneAndUpdate({_id: mdoPagoReq.params.id},{$set:{active:false,delete:deleteOptions}},{upsert:true})
    return mdoPagoDeleted;
  } catch (error) {
    throw new Error(error);
  }
}


/**
* Mercado Pago Service
*/
const MercadoPagoSvc = {findAllMercadoPago, findOneMercadoPago, saveMercadoPago, updateMercadoPago, deleteMercadoPago};

export default MercadoPagoSvc;