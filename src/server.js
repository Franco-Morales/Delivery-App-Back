import Express  from "express";
import Cors from "cors";

import rubGnlRoutes from "./routes/rubroGeneral.routes";


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

export default server;