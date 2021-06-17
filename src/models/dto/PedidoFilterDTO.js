import admin from "../../firebase";
const db = admin.firestore();

class PedidoFilterDTO {
  nombre 
  
  constructor(pedido) {
    this._id = pedido._id;
    this.tiempoFin = pedido.horaEstimadaFin;
    this.envio =
      pedido.tipoEnvio == 1 ? "Envio a domicilio" : "Retiro en local";
    this.horaE = this.getHoralet(pedido.fecha);
    this.total = pedido.total;
    this.DetallePedido = pedido.DetallePedido;
    this.estado = pedido.estado;
    this.nombre = async () => {
      (await this.getUser(pedido.Cliente?.firebase_id)?.nombre) ||
        "Desconocido";
    };
    this.domicilio = this.getDomicilio(pedido.Cliente);
  }

  getHoralet(fecha) {
    let date = new Date(fecha);
    return date.getHours() + ":" + date.getMinutes();
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
