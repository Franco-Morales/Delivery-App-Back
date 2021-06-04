import MercadoPagoSvc from "../services/mercadoPago.service";
import ConfigSvc from "../services/Config.service";
import PedidoSvc from "../services/Pedido.service"
import mercadopago from 'mercadopago';

let getAll = async (req,res) => {
    try {
      let mdoPagos = await MercadoPagoSvc.findAllMercadoPago();
      if (mdoPagos.length != 0) {
        res.status(200).json(mdoPagos);
      } else {
        res.status(204).json({"msg":"Empty"})
      }
    } catch (error) {
      res.status(500).json({"error":error});
    }
  }

  let getOne = async (req,res) => {
    try {
      let mdoPago = await MercadoPagoSvc.findOneMercadoPago(req)
      if(mdoPago){
        res.status(200).json(mdoPago)
      }else{
        res.status(204).json({"msg":"Empty"})
      }
    } catch (error) {
      res.status(500).json({"error":error});
    }
  }

  let updateOne = async (req,res) => {
    try {
      let mdoPagoUpdated = await MercadoPagoSvc.updateMercadoPago(req)
      if(mdoPagoUpdated){
        res.status(200).json(mdoPagoUpdated)
      }else{
        res.status(204).json({"msg":"Empty"})
      }
    } catch (error) {
      res.status(500).json({"error":error});
    }
  }

  let postOne = async (req,res) => {
    try {
      let mdoPago = await MercadoPagoSvc.saveMercadoPago(req);
      res.status(200).json(mdoPago);
    } catch (error) {
      res.status(500).json({"error":error});
    }
  }

  let checkout = async(req,res) => {
    try {
      let config = await ConfigSvc.findFirstConfig();
      mercadopago.configure({
        access_token: config.tokenMercadoPago
      })
      let preference = await MercadoPagoSvc.createPreference({
        uidUsuario:req.body.uidUsuario,
        uidPedido: req.body.uidPedido,
        titulo:req.body.titulo,
        descripcion:req.body.descripcion,
        precioTotal:req.body.precioTotal
      })
      mercadopago.preferences.create(preference)
      .then(resp => {
        res.status(200).json(resp.body.init_point)
      })
      .catch(error => res.status(500).json({"error":error.message}))
    } catch (error) {
      res.status(500).json({"error":error.message});
    }
  }

  let getDataPago = async(req,res) => {
    try {
      let config = await ConfigSvc.findFirstConfig();
      let pago = await MercadoPagoSvc.getDataPagoByPedido({
        uidPedido: req.params.id,
        tokenMercadoPago: config.tokenMercadoPago
      });
      let pedidoMdo = await PedidoSvc.findOnePedido(req)

      if(pedidoMdo.MdoPago == null){
        //Crear Mercado Pago
        let mdoPagoCreated = await MercadoPagoSvc.saveMercadoPago({identificadorPago: pago.id ,
        fechaCreacion: pago.card.date_created ,
        fechaAprobacion: pago.date_approved,
        formaPago: pago.payment_type_id,
        metodoPago: pago.payment_method_id,
        nroTarjeta: pago.card.first_six_digits+"XXXXXX"+pago.card.last_four_digits,
        estado: pago.status})
        let mdoPedido = {
          params:{
            id: req.params.id
          },
          body:{
            MdoPago: mdoPagoCreated._id,
            estado: pago.status == 'approved' ? 'aprobado' : 'en espera'
          }
        }
        await PedidoSvc.updatePedido(mdoPedido)
        res.status(200).json(mdoPagoCreated)
      }else{
        let mdoFind = await MercadoPagoSvc.findOneMercadoPago({id:pedidoMdo.MdoPago})
        if(mdoFind.estado != pago.status){
            mdoFind = await MercadoPagoSvc.updateMercadoPago({
              id: pedidoMdo.MdoPago,
              estado: pago.status,
              fechaAprobacion: pago.date_approved
            })
            await PedidoSvc.updatePedido({params:{id:req.params.id},body:{estado:pago.status == 'approved' ? 'aprobado' : 'en espera'}})
        }
        res.status(200).json(mdoFind)
      }
    } catch (error) {
      res.status(500).json({"error":error.message});
    }
  }

  let deleteOne = async (req,res) => {
    try {
      let mdoPagoDeleted = await MercadoPagoSvc.deleteMercadoPago(req);
      res.status(200).json(mdoPagoDeleted);
    } catch (error) {
      res.status(500).json({"error":error.message});
    }
  }

  let active = async (req,res) => {
    try {
      let mdoPagoActived = await MercadoPagoSvc.activeMercadoPago(req);
      res.status(202).json(mdoPagoActived);
    } catch (error) {
      res.status(500).json({"error":error.message});
    }
  }


  /**
  * Mercado Pago Controller
  */
  const MercadoPagoCtrl = { getAll, getOne, postOne, updateOne, checkout, getDataPago, deleteOne, active };

  export default MercadoPagoCtrl;
