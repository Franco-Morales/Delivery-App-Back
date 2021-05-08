import Factura from "../models/factura.model";

//Find All Factura
let findAllFactura = async() => {
  try {
    let facturas = await Factura.find({active:true});
    return facturas;
  } catch (error) {
    console.error(`Error Svc Factura : ${error}`);
  }
}

//Find One Factura
let findOneFactura = async(facturaReq) => {
  let _id = facturaReq.params.id;
  let filter = { _id, active: true };
  try {
    let factura = await Factura.findOne(filter);
    return factura;
  } catch (error) {
    console.error(`Error Svc Factura : ${error}`);
  }
}

//Save Factura
let saveFactura = async (facturaReq) => {
  try {
    let { fecha, numero, descuento, formaPago, nroTarjeta, totalVenta, totalCosto, DetalleFactura} = facturaReq.body;
    let factura = Factura({fecha, numero, descuento, formaPago, nroTarjeta, totalVenta, totalCosto, DetalleFactura, active:true});
    let facturaSaved = await factura.save();
    return facturaSaved;
  } catch (error) {
    console.error(`Error Svc Factura : ${error}`);
  }
}

//Update Factura
let updateFactura = async (facturaReq) =>{
  try {
    let facturaUpdated = await Factura.findOneAndUpdate({_id: facturaReq.params.id},facturaReq.body,{new:true});
    return facturaUpdated;
  } catch (error) {
    console.error(`Error Svc Factura : ${error}`);
  }
}

//Delete (Soft Delete)
let deleteFactura = async (facturaReq) =>  {
  let { user_uid } = facturaReq.body;
  let deleteOptions = {
      user_uid,
      deletedAt: new Date()
  };
  try {
    let facturaDeleted = await Factura.findOneAndUpdate(
      {_id: facturaReq.params.id },
      {
        $set:{
          active: false,
          delete: deleteOptions
        }
      },{ new: true });
    return facturaDeleted;
  } catch (error) {
    console.error(`Error Svc Factura : ${error}`);
  }
}

//Active Factura
let activeFactura = async (facturaReq) =>{
  let { active } = facturaReq.body;
  let actOpt = { active, delete: {} };
  try {
    let factura = await Factura.findOneAndUpdate(
      { _id: facturaReq.params.id },
      { $set: actOpt },
      {new:true}
    );
    return factura;
  } catch (error) {
    console.error(`Error Svc Factura : ${error}`);
  }
}

/**
 * Factura Service
 */
const FacturaSvc = { findAllFactura, findOneFactura, saveFactura, updateFactura, deleteFactura, activeFactura};


export default FacturaSvc;