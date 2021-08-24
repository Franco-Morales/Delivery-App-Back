import admin from "../../firebase";
const db = admin.firestore();


const PedidoFilterDTO = {
  save: async pedido => {
    let _id = pedido._id;
    let tiempoFin = pedido.horaEstimadaFin;
    let envio = ( pedido.tipoEnvio == 1) ? "Envio a domicilio" : "Retiro en local";
    let horaE = getTime(pedido.fecha);
    let total = pedido.total;
    let DetallePedido = pedido.DetallePedido;
    let estado = pedido.estado;
    let cliente = await getUserByFID(pedido.Cliente?.firebase_id);

    let domicilio = getDomicilio(pedido.Cliente);
    let horaAccepted= (pedido.accepted)?getTime(pedido.accepted) : "00.00" 
    let horaFin = (pedido.accepted)?getTimeEnd(pedido.accepted, tiempoFin):"Aun no aceptado";
    let horaCancel = (pedido.canceled.fecha)?getTime(pedido.canceled.fecha):"No cancelado"
    let motivoCancel = (pedido.canceled.motivo)?pedido.canceled.motivo:"";

    return { 
      _id, tiempoFin, envio, 
      horaE, total, DetallePedido, 
      estado, cliente, domicilio, 
      horaAccepted, horaFin, horaCancel, 
      motivoCancel 
    };
  }
}
// Metodos privados 
let getTime = date => {
  return formatTime(date.getHours())+":"+ formatTime(date.getMinutes());
}

let getTimeEnd = ( date, tiempoFin ) => {
  date.setTime(date.getTime()+(tiempoFin*60*1000)) //minutos*segundos*milisegundos
  return formatTime(date.getHours())+":"+ formatTime(date.getMinutes());
}

let formatTime = n =>{
  if(n<10){
    return "0"+n.toString();
  }else{
    return n.toString();
  }
}
//Firebase ID = fid
let getUserByFID = async ( fid ) => { 
  let cliente = null;
  try {
    const snapshot = await db
      .collection("clients")
      .where("uid", "==", fid)
      .get();

    snapshot.forEach((doc) => {
      cliente = doc.data();
    });
    return cliente;
  } catch (error) {
    console.log("PedidoDTOFilter : ", error);
  }
}

let getDomicilio = cliente => {
  if (cliente.domicilio) {
    return `${cliente.domicilio?.calle} ${cliente.domicilio?.numero}`;
  } else {
    return "Domicilio desconocido";
  }
}


export default PedidoFilterDTO;