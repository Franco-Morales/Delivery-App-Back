import MercadoPago from "../models/mercadoPago.model";

//Find All Mercado Pago
let findAllMercadoPago = async() => {
  try {
    let mdoPagos = await MercadoPago.find({ active: true });
    return mdoPagos;
  } catch (error) {
    throw new Error(error);
  }
}

//Find One Mercado Pago
let findOneMercadoPago = async(mdoPagoReq) => {
  try {
    let mdoPago = await MercadoPago.findById(mdoPagoReq.params.id);
    return mdoPago;
  } catch (e) {
    throw new Error(error);
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
    throw new Error(error);
  }
}

//Update Mercado Pago
let updateMercadoPago = async (mdoPagoReq) =>{
  try {
    let mdoPagoUpdated = await MercadoPago.findOneAndUpdate({_id: mdoPagoReq.params.id},mdoPagoReq.body,{new:true});
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
    let mdoPagoDeleted = await MercadoPago.findOneAndUpdate({_id: mdoPagoReq.params.id},{$set:{active:false,delete:deleteOptions}},{new:true})
    return mdoPagoDeleted;
  } catch (error) {
    throw new Error(error);
  }
}

//Active MercadoPago
let activeMercadoPago = async (mdoPagoReq) =>{
  try {
    let { active } = mdoPagoReq.body;

    let mdoPago = await MercadoPago.findOneAndUpdate(
      { _id: mdoPagoReq.params.id },
      { $set: { active } },
      {new:true}
    );
    return mdoPago;
  } catch (error) {
    console.log('Error : ',error);
  }
}


/**
* Mercado Pago Service
*/
const MercadoPagoSvc = {findAllMercadoPago, findOneMercadoPago, saveMercadoPago, updateMercadoPago, deleteMercadoPago, activeMercadoPago};

export default MercadoPagoSvc;
