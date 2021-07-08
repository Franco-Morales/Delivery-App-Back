import Factura from "../models/factura.model";

import Inventario from "../inventario/inventario";
import { transporter } from "../mailer/mail.index";
import admin from '../firebase';


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

//Gain by Period
let gainByPeriod = async (facturaReq) =>{
  try {
    let fecha = facturaReq.body.fecha;
    let periodo = fecha ? {active:true,fecha:{$gte: new Date(fecha.desde),$lt: new Date(fecha.hasta)}} : {active:true}
    let ganancia = await Factura.aggregate([
      {$match:periodo},
      {$group:{
        _id:null,
        totalVenta:{$sum:"$totalVenta"},
        totalCosto:{$sum:"$totalCosto"},
      }},
      {$addFields:{totalGanancia:{$subtract:["$totalVenta","$totalCosto"]}}}
    ])
    return ganancia;
  } catch (error) {
    console.error(`Error Svc Factura : ${error.message}`);
  }
}

//Save Factura
let saveFactura = async (pedido) => {

  let { accepted, Cliente, _id, DetallePedido, tipoEnvio, total, active } = pedido;
  let montoDecuento = 0;

  if(tipoEnvio) {
    let totalPedido = DetallePedido.reduce( (acc, obj) => acc + obj.subTotal );
    montoDecuento = totalPedido - total;
  }

  let user;
  const db = admin.firestore();

  // console.log(pedido);
  let { totalCosto, totalVenta } = await Inventario.calcularCostos(DetallePedido);

  try {
    const snapshot = await db.collection('clients').where('uid', '==', Cliente.firebase_id).get();
    snapshot.forEach( doc => user = doc.data() );

    let linkFront = `http://localhost:4200/${user.uid}/pedidos/${pedido._id}`;

    let factura = Factura({
      _id,
      fecha: accepted,
      total,
      DetalleFactura: DetallePedido,
      totalVenta,
      totalCosto,
      montoDecuento,
      active
    });

    await factura.save();

    const htmltext = `
      <h3>Factura ${factura._id}</h3>
      <p>Para descargar su factura visite el siguiente <a href="${linkFront}">link</a></p>
    `;

    await transporter.sendMail({
      from: '"El Buen Sabor " <francomorales145@gmail.com>',
      to: user.email,
      subject: "El Buen Sabor [ Asunto ]",
      html: htmltext,
    });

    console.log('email enviado');
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
const FacturaSvc = { findAllFactura, findOneFactura, gainByPeriod, saveFactura, updateFactura, deleteFactura, activeFactura};


export default FacturaSvc;
