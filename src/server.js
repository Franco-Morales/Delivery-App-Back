import Express  from "express";
import Cors from "cors";

import ServerRoutes from "./routes/index.routes";

const server = Express();

//Middlewares
const corsOpt = {
    origin: ['http://localhost:4200', 'http://localhost:5200'],
    optionsSuccessStatus: 200
}

server.use(Cors(corsOpt));
server.use(Express.json());
server.use(Express.urlencoded({extended:false}));

//Settings
server.set('port', process.env.PORT || 3000);

//Routes
server.get('/',(req,res)=>res.send("Bienvenido a Delivery App Backend [API_REST]"));

for (const route of ServerRoutes) {
    server.use('/api/v1', route);
}

export default server;
