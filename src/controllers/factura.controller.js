import FacturaSvc from "../services/Factura.service";


let getAll = async (req,res) => {
  try {
    let facturas = await FacturaSvc.findAllFactura();
    if (facturas.length != 0) {
      res.status(200).json(facturas);
    } else {
      res.status(204).json({"msg":"Empty"})
    }
  } catch (error) {
    res.status(500).json({"error":error});
  }
}

let getOne = async (req,res) => {
  try {
    let factura = await FacturaSvc.findOneFactura(req)
    if(factura){
      res.status(200).json(factura)
    }else{
      res.status(204).json({"msg":"Empty"})
    }
  } catch (error) {
    res.status(500).json({"error":error});
  }
}

let updateOne = async (req,res) => {
  try {
    let facturaUpdated = await FacturaSvc.updateFactura(req)
    if(facturaUpdated){
      res.status(200).json(facturaUpdated)
    }else{
      res.status(204).json({"msg":"Empty"})
    }
  } catch (error) {
    res.status(500).json({"error":error});
  }
}

let postOne = async (req,res) => {
  try {
    let facturaSaved = await FacturaSvc.saveFactura(req);
    res.status(200).json(facturaSaved);
  } catch (error) {
    res.status(500).json({"error":error});
  }
}

let deleteOne = async (req,res) => {
  try {
    let facturaDeleted = await FacturaSvc.deleteFactura(req);
    res.status(200).json(facturaDeleted);
  } catch (error) {
    res.status(500).json({"error":error});
  }
}

let active = async (req,res) => {
  try {
    let facturaActived = await FacturaSvc.activeFactura(req);
    res.status(202).json(facturaActived);
  } catch (error) {
    res.status(500).json({"error":error});
  }
}

/**
* Mercado Pago Controller
*/
const FacturaCtrl = { getAll, getOne, postOne, updateOne, deleteOne, active };

export default FacturaCtrl;
