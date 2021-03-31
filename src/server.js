import Express  from "express";
import Cors from "cors";


const server = Express();

//Middlewares
server.use(Cors());
server.use(Express.json());
server.use(Express.urlencoded({extended:false}));

//Settings
server.set('port', process.env.PORT || 3000);
console.log(process.env.PORT );

//Routes
server.get('/',(req,res)=>res.send("Bienvenido a Delivery App Backend [API_REST]"));


export default server;