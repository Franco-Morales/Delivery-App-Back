import admin from "../../firebase";
const db = admin.firestore();

class PedidoFilterDTO {
  constructor(pedido) {
    this._id = pedido._id;
    this.tiempoFin = pedido.horaEstimadaFin;
    this.envio =
      pedido.tipoEnvio == 1 ? "Envio a domicilio" : "Retiro en local";
    this.horaE = this.getTime(pedido.fecha);
    this.total = pedido.total;
    this.DetallePedido = pedido.DetallePedido;
    this.estado = pedido.estado;
    this.nombre = async () => {
      (await this.getUser(pedido.Cliente?.firebase_id)?.nombre) ||
        "Desconocido";
    };
    this.domicilio = this.getDomicilio(pedido.Cliente);
    this.horaAccepted= (pedido.accepted)?this.getTime(pedido.accepted) : "00.00" 
    this.horaFin = (pedido.accepted)?this.getTimeEnd(pedido.accepted):"Aun no aceptado";
    this.horaCancel = (pedido.canceled.fecha)?this.getTime(pedido.canceled.fecha):"No cancelado"
    this.motivoCancel = (pedido.canceled.motivo)?pedido.canceled.motivo:""
  }

  getTime(date) {
    return this.formatTime(date.getHours())+":"+ this.formatTime(date.getMinutes());
  }

  getTimeEnd(date){
    date.setTime(date.getTime()+(this.tiempoFin*60*1000)) //minutos*segundos*milisegundos
    return this.formatTime(date.getHours())+":"+ this.formatTime(date.getMinutes());
  }
  
  formatTime(n){
    if(n<10){
      return "0"+n.toString();
    }else{
      return n.toString();
    }
  }
  async getUser(uid) {
    try {
      const snapshot = await db
        .collection("clients")
        .where("uid", "==", uid)
        .get();
      let cliente = null;
      snapshot.forEach((doc) => {
        cliente = doc.data();
      });
      return cliente;
    } catch (error) {
      console.log("Err", error);
    }
  }
  getDomicilio(cliente) {
    if (cliente.domicilio) {
      return cliente.domicilio?.calle + " " + cliente.domicilio?.numero;
    } else {
      return "Domicilio desconocido";
    }
  }
}

module.exports = PedidoFilterDTO;
