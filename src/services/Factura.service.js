import Factura from "../models/factura.model";

//Find All Factura
let findAllFactura = async() => {
    try {
        let facturas = await Factura.find({active:true});
        return facturas;
    } catch (error) {
        throw new Error(error);
    }
}

//Find One Factura
let findOneFactura = async(facturaReq) => {
    try {
      let factura = await Factura.findById(facturaReq.params.id)
      return factura;
    } catch (error) {
      throw new Error(error);
    }
}

//Save Factura
let saveFactura = async (facturaReq) => {
    try {
      let { fecha, numero, descuento, formaPago, nroTarjeta, totalVenta, totalCosto, DetalleFactura} = facturaReq.body;
      let factura = Factura({fecha, numero, descuento, formaPago, nroTarjeta, totalVenta, totalCosto, detalle_factura,active:true});
      let facturaSaved = await factura.save();
      return facturaSaved;
    } catch (error) {
        throw new Error(error);
    }
}

//Update Factura
let updateFactura = async (facturaReq) =>{
    try {
        let facturaUpdated = await Factura.findOneAndUpdate({_id: facturaReq.params.id},facturaReq.body,{new:true});
        return facturaUpdated;
    } catch (error) {
        throw new Error(error);
    }
}

//Delete (Soft Delete)
let deleteFactura = async (facturaReq) =>  {
    try {
        let { user_uid } = facturaReq.body;
        let deleteOptions = {
            user_uid,
            deletedAt: new Date()
        };
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
        throw new Error(error);
    }
}

//Active Factura
let activeFactura = async (facturaReq) =>{
  try {
    let { active } = facturaReq.body;

    let factura = await Factura.findOneAndUpdate(
      { _id: facturaReq.params.id },
      { $set: { active } },
      {new:true}
    );
    return factura;
  } catch (error) {
    console.log('Error : ',error);
  }
}


/**
 * Factura Service
 */
const FacturaSvc = { findAllFactura, findOneFactura, saveFactura, updateFactura, deleteFactura, activeFactura};

export default FacturaSvc;
