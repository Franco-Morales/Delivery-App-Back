import Express  from "express";
import Cors from "cors";

import rubGnlRoutes from "./routes/rubroGeneral.routes";
import rubArtRoutes from "./routes/rubroArticulo.routes";
import pedidoRoutes from "./routes/pedido.routes";
import mdoPagoRoutes from "./routes/mercadoPago.routes";
import facturaRoutes from "./routes/factura.routes";
import artManuRoutes from "./routes/articuloManufacturado.routes";
import artInsRoutes from "./routes/articuloInsumo.routes";
import configRoutes from "./routes/config.routes";

const server = Express();

//Middlewares
server.use(Cors());
server.use(Express.json());
server.use(Express.urlencoded({extended:false}));

//Settings
server.set('port', process.env.PORT || 3000);

//Routes
server.get('/',(req,res)=>res.send("Bienvenido a Delivery App Backend [API_REST]"));
server.use('/api/v1',rubGnlRoutes);
server.use('/api/v1',rubArtRoutes);
server.use('/api/v1',pedidoRoutes);
server.use('/api/v1',mdoPagoRoutes);
server.use('/api/v1',facturaRoutes);
server.use('/api/v1',artManuRoutes);
server.use('/api/v1',artInsRoutes);
server.use('/api/v1',configRoutes)

export default server;
