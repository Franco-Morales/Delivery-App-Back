import rubGnlRoutes from "./rubroGeneral.routes";
import rubArtRoutes from "./rubroArticulo.routes";
import pedidoRoutes from "./pedido.routes";
import mdoPagoRoutes from "./mercadoPago.routes";
import facturaRoutes from "./factura.routes";
import artManuRoutes from "./articuloManufacturado.routes";
import artInsRoutes from "./articuloInsumo.routes";
import configRoutes from "./config.routes";
import menuRoutes from "./menu.routes";


const Routes = [ 
    rubGnlRoutes,
    rubArtRoutes,
    pedidoRoutes,
    mdoPagoRoutes,
    facturaRoutes,
    artManuRoutes,
    artInsRoutes,
    configRoutes,
    menuRoutes
]


export default Routes;