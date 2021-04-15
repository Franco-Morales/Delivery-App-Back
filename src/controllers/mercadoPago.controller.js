import MercadoPagoSvc from "../services/mercadoPago.service";


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

  let deleteOne = async (req,res) => {
    try {
      let mdoPagoDeleted = await MercadoPagoSvc.deleteMercadoPago(req);
      res.status(200).json(mdoPagoDeleted);
    } catch (error) {
      res.status(500).json({"error":error});
    }
  }

  let active = async (req,res) => {
    try {
      let mdoPagoActived = await MercadoPagoSvc.activeMercadoPago(req);
      res.status(202).json(mdoPagoActived);
    } catch (error) {
      res.status(500).json({"error":error});
    }
  }


  /**
  * Mercado Pago Controller
  */
  const MercadoPagoCtrl = { getAll, getOne, postOne, updateOne, deleteOne, active };

  export default MercadoPagoCtrl;
