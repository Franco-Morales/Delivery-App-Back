import PedidoSvc from "../services/Pedido.service";
import FacturaSvc from "../services/Factura.service";
const comidaMasPedida = async(req,res)=>{
  try {
    let comida = [];
    comida = await PedidoSvc.countMostFood(req);
    res.status(200).json(comida)
  } catch (e) {
    res.status(500).json({"Error reporte": e.message})
  }
}

const pedidosAgrupadosporCliente = async(req,res) => {
  try {
    let pedidosAgrupados = [];
    pedidosAgrupados = await PedidoSvc.findAllPedidoGroupByUser(req);
    res.status(200).json(pedidosAgrupados)
  } catch (e) {
    res.status(500).json({"Error Reporte Ctrl": e.message})
  }
}

const ingresosPorPeriodo = async(req,res) => {
  try {
    let ingresos = [];
    ingresos = await PedidoSvc.entriesByPeriod(req);
    res.status(200).json(ingresos)
  } catch (error) {
    res.status(500).json({"Error Reporte Ctrl": error.message})
  }
}

const gananciaPorPeriodo = async(req,res) => {
  try {
    let ganancia = {};
    ganancia = await FacturaSvc.gainByPeriod(req);
    res.status(200).json(ganancia)
  } catch (error) {
    res.status(500).json({"Error Reporte Ctrl": error.message})
  }
}

/**
* Reporte Controller
*/
const ReporteCtrl = { comidaMasPedida, pedidosAgrupadosporCliente, ingresosPorPeriodo, gananciaPorPeriodo };


export default ReporteCtrl;
